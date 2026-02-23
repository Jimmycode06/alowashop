'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const { cart, setIsCartOpen } = useCart()
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="glass sticky top-0 z-50 border-b border-gray-200/50 backdrop-blur-xl bg-white/80">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-3xl font-display font-normal tracking-wider text-gray-900 hover:opacity-80 transition-opacity duration-300">
            ALOWA
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/product" className="text-gray-700 hover:text-primary-600 transition-colors font-medium relative group">
              Product
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-all duration-300 group"
          >
            <div className="relative p-2 rounded-lg hover:bg-primary-50 transition-colors">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-scale-in">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline font-medium">Cart</span>
          </button>
        </div>
      </div>
    </header>
  )
}
