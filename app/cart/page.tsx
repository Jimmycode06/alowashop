'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const router = useRouter()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/product"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 overflow-x-hidden">
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y">
            {cart.map((item) => (
              <div key={`${item.id}-${item.color || 'default'}`} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex gap-4 sm:gap-6 flex-1 min-w-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
                    <div className="mb-2">
                      {item.color && (
                        <p className="text-gray-600 text-sm sm:text-base">Color: <span className="font-semibold capitalize">{item.color.replace('-', ' ')}</span></p>
                      )}
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">Adjustable size - fits all fingers</p>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-primary-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center justify-between sm:items-end gap-4 border-t sm:border-t-0 pt-4 sm:pt-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.color)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-primary-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.color)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-primary-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id, item.color)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                      title="Remove item"
                    >
                      <svg className="w-5 h-5 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal < 50 && (
              <p className="text-sm text-primary-600 mb-4">
                Add ${(50 - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}

            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors mb-4"
            >
              Proceed to Checkout
            </button>

            <Link
              href="/product"
              className="block w-full text-center border-2 border-primary-600 text-primary-600 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
