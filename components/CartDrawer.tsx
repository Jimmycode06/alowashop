'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { trackInitiateCheckout } from '@/lib/meta-pixel'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    setIsRedirecting(true)
    setCheckoutError(null)
    trackInitiateCheckout({ value: total, currency: 'USD', numItems: cart.length })
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            color: item.color,
            image: item.image,
          })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      if (data.url) {
        onClose()
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : 'Something went wrong')
      setIsRedirecting(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-display font-normal text-gray-900 tracking-wide uppercase">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.color || 'default'}`}
                    className="flex gap-4 pb-4 border-b border-gray-100"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{item.name}</h3>
                      {item.color && (
                        <p className="text-xs text-gray-600 mb-1">Color: <span className="capitalize">{item.color}</span></p>
                      )}
                      <p className="text-xs text-gray-500 mb-2">Adjustable size</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.color)}
                            className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:border-primary-600 transition-colors text-xs"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.color)}
                            className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:border-primary-600 transition-colors text-xs"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id, item.color)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors ml-1"
                            title="Remove item"
                          >
                            <svg className="w-4 h-4 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        <div className="text-right">
                          {item.price === 0 ? (
                            <span className="text-sm font-semibold text-green-600">FREE</span>
                          ) : (
                            <span className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Summary */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="mb-4">
                <div className="flex justify-between items-center font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {checkoutError && (
                <p className="text-red-600 text-xs mb-3" role="alert">{checkoutError}</p>
              )}

              <button
                onClick={handleCheckout}
                disabled={isRedirecting}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRedirecting ? 'Redirecting...' : 'Proceed to Checkout'}
              </button>

              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full text-center border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                View Full Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
