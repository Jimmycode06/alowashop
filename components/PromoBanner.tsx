'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'alowa-promo-banner-closed'

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const closed = localStorage.getItem(STORAGE_KEY)
    if (closed === '1') setIsVisible(false)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, '1')
  }

  if (!isVisible) return null

  return (
    <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden border-b border-slate-600/40">
      {/* Subtle shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="relative flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 px-4 sm:px-6 text-center flex-wrap">
        <span className="text-xs sm:text-sm font-medium text-white uppercase tracking-wide">
          Add 20% off
        </span>
        <span className="text-white/80 text-xs sm:text-sm uppercase tracking-wide">with</span>
        <span className="text-xs sm:text-sm font-medium text-white uppercase tracking-wide">
          HELLO20
        </span>
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close banner"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
