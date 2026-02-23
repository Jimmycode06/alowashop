'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function ProductCard() {
  const { addToCart } = useCart()

  const product = {
    id: 'magnetic-ring-001',
    name: 'Premium Magnetic Therapy Ring',
    price: 49.99,
    originalPrice: 79.99,
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: 'medium',
    })
  }

  return (
    <div className="group bg-white rounded-3xl shadow-2xl overflow-hidden max-w-sm hover:shadow-glow-lg transition-all duration-500 hover:-translate-y-2">
      <div className="relative aspect-square bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-transparent"></div>
        <div className="relative z-10 animate-float">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-white to-primary-50 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <svg className="w-24 h-24 text-primary-600 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
          -38%
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{product.name}</h3>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-extrabold gradient-text">${product.price.toFixed(2)}</span>
          <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Experience natural pain relief with our premium magnetic therapy ring. 
          Scientifically designed for improved circulation and comfort.
        </p>
        <div className="flex gap-3">
          <Link
            href="/product"
            className="flex-1 text-center border-2 border-primary-600 text-primary-600 py-3.5 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3.5 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-lg hover:shadow-glow hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
