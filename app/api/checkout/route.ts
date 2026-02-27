import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('xxxxx')) {
      return NextResponse.json(
        { error: 'Stripe secret key is missing or invalid. Check STRIPE_SECRET_KEY in .env.local.' },
        { status: 500 }
      )
    }

    const { items } = await req.json() as { items: { id: string; name: string; price: number; quantity: number; color?: string; image?: string }[] }

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const currency = (process.env.STRIPE_CURRENCY || 'usd').toLowerCase()

    const isBogo = items.length === 2 && items.some((i: { id: string }) => i.id.includes('free') || i.id.includes('bogo'))

    // Build line items with descriptive names and images for a modern Stripe Checkout recap
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const label = item.color ? `${item.name} — ${item.color.replace('-', ' ')}` : item.name
      const imageUrl = item.image?.startsWith('http')
        ? item.image
        : item.image
          ? `${baseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`
          : undefined
      return {
        price_data: {
          currency,
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: label,
            description: item.quantity > 1 ? `Quantity: ${item.quantity}` : undefined,
            ...(imageUrl && { images: [imageUrl] }),
          },
        },
        quantity: item.quantity,
      }
    })

    const metadata: Record<string, string> = isBogo
      ? { ring1_color: items[0]?.color ?? '', ring2_color: items[1]?.color ?? '' }
      : { color: items[0]?.color ?? '' }

    const totalValue = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      metadata,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&value=${totalValue.toFixed(2)}&currency=${currency}`,
      cancel_url: `${baseUrl}/cart`,
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'FR', 'DE', 'ES', 'IT', 'BE', 'NL', 'AT', 'IE', 'PT', 'CH'],
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed'
    const stripeMessage = err && typeof err === 'object' && 'raw' in err && err.raw && typeof (err.raw as { message?: string }).message === 'string'
      ? (err.raw as { message: string }).message
      : null
    console.error('Checkout error:', err)
    return NextResponse.json(
      { error: stripeMessage || message },
      { status: 500 }
    )
  }
}
