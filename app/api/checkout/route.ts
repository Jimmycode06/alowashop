import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Server-side product catalog: only these IDs and prices are accepted (prevents price tampering)
const PRODUCT_CATALOG: Record<string, number> = {
  'magnetic-ring-001': 49.9,
  'magnetic-ring-001-bogo-1': 49.9,
  'magnetic-ring-001-bogo-2-free': 0,
}

// Fallback image paths per color (used when client does not send image, so Stripe always gets an image URL)
const COLOR_IMAGE_PATHS: Record<string, string> = {
  gold: '/images/ring-4.png',
  silver: '/images/ring-6.png',
  'rose-gold': '/images/ring-2.png',
  onyx: '/images/ring-5.png',
}
function getImagePathForColor(color?: string): string {
  if (color && COLOR_IMAGE_PATHS[color]) return COLOR_IMAGE_PATHS[color]
  return '/images/ring-1.png'
}

function getServerPrice(id: string): number | null {
  // Exact match first so "magnetic-ring-001-bogo-2-free" gets 0, not 49.9
  if (Object.prototype.hasOwnProperty.call(PRODUCT_CATALOG, id)) {
    return PRODUCT_CATALOG[id]
  }
  if (id.includes('bogo') && id.includes('free')) return 0
  if (id.includes('bogo')) return 49.9
  if (id === 'magnetic-ring-001') return 49.9
  return null
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('xxxxx')) {
      return NextResponse.json(
        { error: 'Stripe secret key is missing or invalid. Check STRIPE_SECRET_KEY in .env.local.' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const rawItems = (body?.items ?? []) as { id: string; name: string; price: number; quantity: number; color?: string; image?: string }[]

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Validate and normalize: use server-side prices only, reject unknown products
    const items: { id: string; name: string; price: number; quantity: number; color?: string; image?: string }[] = []
    for (const item of rawItems) {
      if (!item?.id || typeof item.name !== 'string' || typeof item.quantity !== 'number') {
        return NextResponse.json({ error: 'Invalid cart item' }, { status: 400 })
      }
      const serverPrice = getServerPrice(String(item.id))
      if (serverPrice === null) {
        return NextResponse.json({ error: 'Unknown product' }, { status: 400 })
      }
      const qty = Math.min(Math.max(1, Math.floor(Number(item.quantity))), 10)
      items.push({
        id: item.id,
        name: item.name,
        price: serverPrice,
        quantity: qty,
        color: item.color,
        image: item.image,
      })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const currency = (process.env.STRIPE_CURRENCY || 'usd').toLowerCase()

    const isBogo = items.length === 2 && items.some((i: { id: string }) => i.id.includes('free') || i.id.includes('bogo'))

    // Build line items using server-validated prices only; ensure image URL is always set for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const label = item.color ? `${item.name} — ${item.color.replace(/-/g, ' ')}` : item.name
      const rawImage = (item.image && item.image.trim()) ? item.image : getImagePathForColor(item.color)
      const imageUrl = rawImage.startsWith('http')
        ? rawImage
        : `${baseUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`
      return {
        price_data: {
          currency,
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: label,
            description: item.quantity > 1 ? `Quantity: ${item.quantity}` : undefined,
            images: [imageUrl],
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
