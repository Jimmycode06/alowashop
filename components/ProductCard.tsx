'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'

export default function ProductCard() {
  const { addToCart } = useCart()

  const product = {
    id: 'magnetic-ring-001',
    name: 'Premium Magnetic Therapy Ring',
    price: 49.99,
    originalPrice: 79.99,
    image: '/images/ring-1.png',  // première image de la page produit
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
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 400px"
        />
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
