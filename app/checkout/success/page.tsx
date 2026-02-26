'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { trackPurchase } from '@/lib/meta-pixel'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  useEffect(() => {
    const value = searchParams.get('value')
    const currency = searchParams.get('currency') || 'USD'
    if (value) {
      const numValue = parseFloat(value)
      if (!Number.isNaN(numValue)) trackPurchase({ value: numValue, currency })
    }
  }, [searchParams])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Success icon with animation */}
        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-200 animate-scale-in">
          <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-normal text-gray-900 mb-3 tracking-wide">
          Thank you for your order
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Your payment was successful. You will receive a confirmation email from Stripe shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/product"
            className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
          >
            Back to home
          </Link>
        </div>

        <Link
          href="/"
          className="mt-16 inline-block text-3xl font-display font-normal tracking-wider text-gray-900 hover:opacity-70 transition-opacity duration-300"
        >
          ALOWA
        </Link>
      </div>
    </div>
  )
}
