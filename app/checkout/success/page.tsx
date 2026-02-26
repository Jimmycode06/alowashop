'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useEffect } from 'react'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Thank you for your order</h1>
      <p className="text-gray-600 mb-8">
        Your payment was successful. You will receive a confirmation email from Stripe shortly.
      </p>
      <Link
        href="/product"
        className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
      >
        Continue shopping
      </Link>
    </div>
  )
}
