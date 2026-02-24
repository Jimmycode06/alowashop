'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import PaymentLogo from '@/components/PaymentLogo'
import ScrollingBanner from '@/components/ScrollingBanner'

type BundleOption = 'single' | 'bogo'

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('gold')
  const [selectedColorBogo, setSelectedColorBogo] = useState({ ring1: 'gold', ring2: 'gold' })
  const [bundleOption, setBundleOption] = useState<BundleOption>('bogo')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [imageError, setImageError] = useState<boolean[]>([])
  const [faqCategory, setFaqCategory] = useState('product')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [openColorSelect1, setOpenColorSelect1] = useState(false)
  const [openColorSelect2, setOpenColorSelect2] = useState(false)
  const [openColorSelectSingle, setOpenColorSelectSingle] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const { addToCart, setIsCartOpen } = useCart()
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setOpenColorSelect1(false)
      setOpenColorSelect2(false)
      setOpenColorSelectSingle(false)
    }
    
    if (openColorSelect1 || openColorSelect2 || openColorSelectSingle) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [openColorSelect1, openColorSelect2, openColorSelectSingle])

  // Fermer la lightbox avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null)
    }
    if (lightboxImage) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [lightboxImage])

  // Product images - replace these paths with your actual images
  const productImages = [
    '/images/ring-1.png',  // Main product image
    '/images/ring-2.png',  // Side view
    '/images/ring-3.png',  // Detail view
    '/images/ring-4.png',  // Lifestyle/on hand
  ]

  const product = {
    id: 'magnetic-ring-001',
    name: 'ALOWA Magnetic Therapy Ring',
    singlePrice: 49.90,
    originalPrice: 79.99,
    description: 'Experience the healing power of magnetotherapy with our premium magnetic ring. This scientifically-designed ring uses therapeutic magnets to improve circulation, reduce inflammation, and provide natural pain relief.',
    colors: [
      { value: 'gold', label: 'Gold', class: 'bg-gradient-to-br from-yellow-300 to-yellow-600', popular: true },
      { value: 'silver', label: 'Silver', class: 'bg-gradient-to-br from-gray-100 to-gray-300' },
      { value: 'onyx', label: 'Onyx', class: 'bg-gradient-to-br from-gray-700 to-gray-900' },
      { value: 'rose-gold', label: 'Rose Gold', class: 'bg-gradient-to-br from-rose-300 to-rose-500' },
    ],
    features: [
      'Therapeutic grade neodymium magnets',
      'Adjustable size for comfortable fit',
      'Hypoallergenic ice construction',
      'Water-resistant design',
      '30-day money-back guarantee',
      'Free shipping in the US',
    ],
    benefits: [
      'Natural pain relief without medication',
      'Improved blood circulation',
      'Reduced inflammation and swelling',
      'Enhanced energy flow',
      'Non-invasive therapy',
      'Safe for daily wear',
    ],
    specifications: {
      material: 'Ice with Neodymium Magnets',
      weight: '5.2g',
      thickness: '1.3mm',
      magnets: '4 therapeutic grade magnets',
    },
  }

  const getCurrentPrice = () => {
    if (bundleOption === 'bogo') {
      return product.singlePrice // Buy 1 Get 1 = price of 1
    }
    return product.singlePrice
  }

  const getTotalPrice = () => {
    if (bundleOption === 'bogo') {
      return product.singlePrice // Price for 2 rings
    }
    return product.singlePrice * quantity
  }

  const handleAddToCart = () => {
    if (bundleOption === 'bogo') {
      // Add 2 rings with selected colors - one paid, one free
      // Use unique IDs to ensure they are separate items
      addToCart({
        id: `${product.id}-bogo-1`,
        name: product.name,
        price: product.singlePrice,
        quantity: 1,
        color: selectedColorBogo.ring1,
      })
      addToCart({
        id: `${product.id}-bogo-2-free`,
        name: `${product.name} (FREE)`,
        price: 0, // Free ring
        quantity: 1,
        color: selectedColorBogo.ring2,
      })
    } else {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.singlePrice,
          quantity: 1,
          color: selectedColor,
        })
      }
    }
    // Open the cart drawer
    setIsCartOpen(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-16 animate-fade-in">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden group relative">
            {/* Main Product Image */}
            {!imageError[selectedImageIndex] ? (
              <Image
                src={productImages[selectedImageIndex]}
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                fill
                className="object-cover z-10"
                priority={selectedImageIndex === 0}
                onError={() => {
                  setImageError(prev => {
                    const newErrors = [...prev]
                    newErrors[selectedImageIndex] = true
                    return newErrors
                  })
                }}
              />
            ) : null}
            {/* Fallback placeholder if image doesn't exist or failed to load */}
            {(imageError[selectedImageIndex] || !productImages[selectedImageIndex]) && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 flex items-center justify-center z-0">
                <div className="text-center relative z-10">
                  <div className="w-80 h-80 mx-auto bg-gradient-to-br from-white to-primary-50 rounded-full flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-500 animate-float">
                    <svg className="w-40 h-40 text-primary-600 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">Magnetic Therapy Ring</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Image Thumbnails */}
          <div className="mt-6 flex gap-3">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-24 h-24 rounded-xl border-2 overflow-hidden transition-all duration-300 hover:scale-110 cursor-pointer ${
                  selectedImageIndex === index
                    ? 'border-primary-600 shadow-lg ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                {!imageError[index] ? (
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover z-10"
                    onError={() => {
                      setImageError(prev => {
                        const newErrors = [...prev]
                        newErrors[index] = true
                        return newErrors
                      })
                    }}
                  />
                ) : null}
                {/* Fallback gradient if image doesn't exist */}
                <div className={`absolute inset-0 z-0 ${index === 0 ? 'bg-primary-100' : index === 1 ? 'bg-primary-200' : index === 2 ? 'bg-primary-300' : 'bg-primary-400'}`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="animate-slide-up">
          {/* Badge and Rating */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-600">🇺🇸 Proud USA brand</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-600 ml-1">1495 Reviews</span>
            </div>
          </div>

          {/* Features List */}
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm"><strong>Advanced therapy ring:</strong> combines magnetic fields & pressure points</span>
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm"><strong>Enhanced wellness:</strong> improve your rest, vitality, and calm</span>
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm"><strong>Elegant & subtle:</strong> stylish accessory that complements any look</span>
            </li>
          </ul>

          <h1 className="text-4xl font-display font-normal text-gray-900 mb-8 leading-tight tracking-wide uppercase">
            {product.name}
          </h1>
          
          {/* Bundle Options - Calmi Style */}
          <div className="mb-6">
            <div className="text-sm font-semibold text-gray-700 mb-4">Bundle & Save</div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Single Ring Option */}
              <label
                className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all duration-300 ${
                  bundleOption === 'single'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="bundle"
                  value="single"
                  checked={bundleOption === 'single'}
                  onChange={() => setBundleOption('single')}
                  className="sr-only"
                />
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    bundleOption === 'single' ? 'border-primary-600' : 'border-gray-400'
                  }`}>
                    {bundleOption === 'single' && (
                      <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 mb-1">1 ring only</div>
                    <div className="text-xs text-gray-500 mb-2">40% OFF</div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-gray-400 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                      <span className="text-xl font-bold text-gray-900">${product.singlePrice.toFixed(2)}</span>
                    </div>
                    {/* Color Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenColorSelectSingle(!openColorSelectSingle)
                        }}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 pl-1 pr-2 bg-white text-left flex items-center justify-between cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full border-2 border-gray-200 flex-shrink-0 ${product.colors.find(c => c.value === selectedColor)?.class || 'bg-gray-300'}`}></div>
                          <span className="text-gray-700">{product.colors.find(c => c.value === selectedColor)?.label || 'Select color'}</span>
                        </div>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${openColorSelectSingle ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openColorSelectSingle && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                          {product.colors.map((color) => (
                            <button
                              key={color.value}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedColor(color.value)
                                setOpenColorSelectSingle(false)
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg"
                            >
                              <div className={`w-5 h-5 rounded-full border-2 border-gray-200 ${color.class}`}></div>
                              <span className="text-sm text-gray-700">{color.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </label>

              {/* BOGO Option */}
              <label
                className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all duration-300 ${
                  bundleOption === 'bogo'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="bundle"
                  value="bogo"
                  checked={bundleOption === 'bogo'}
                  onChange={() => setBundleOption('bogo')}
                  className="sr-only"
                />
                <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                  POPULAR
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    bundleOption === 'bogo' ? 'border-primary-600' : 'border-gray-400'
                  }`}>
                    {bundleOption === 'bogo' && (
                      <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 mb-1">Buy 1 Get 1 FREE</div>
                    <div className="text-xs text-red-600 font-semibold mb-2">SPRING SALE!</div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-gray-400 line-through text-sm">${(product.singlePrice * 2).toFixed(2)}</span>
                      <span className="text-xl font-bold text-gray-900">${product.singlePrice.toFixed(2)}</span>
                    </div>
                    {/* Two Color Selectors */}
                    <div className="space-y-2">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenColorSelect1(!openColorSelect1)
                            setOpenColorSelect2(false)
                          }}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 pl-1 pr-2 bg-white text-left flex items-center justify-between cursor-pointer hover:border-gray-400 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded-full border-2 border-gray-200 ${product.colors.find(c => c.value === selectedColorBogo.ring1)?.class || 'bg-gray-300'}`}></div>
                            <span className="text-gray-700">{product.colors.find(c => c.value === selectedColorBogo.ring1)?.label || 'Select color'}</span>
                          </div>
                          <svg className={`w-4 h-4 text-gray-400 transition-transform ${openColorSelect1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openColorSelect1 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                            {product.colors.map((color) => (
                              <button
                                key={color.value}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedColorBogo({ ...selectedColorBogo, ring1: color.value })
                                  setOpenColorSelect1(false)
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg"
                              >
                                <div className={`w-5 h-5 rounded-full border-2 border-gray-200 ${color.class}`}></div>
                                <span className="text-sm text-gray-700">{color.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenColorSelect2(!openColorSelect2)
                            setOpenColorSelect1(false)
                          }}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 pl-1 pr-2 bg-white text-left flex items-center justify-between cursor-pointer hover:border-gray-400 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded-full border-2 border-gray-200 ${product.colors.find(c => c.value === selectedColorBogo.ring2)?.class || 'bg-gray-300'}`}></div>
                            <span className="text-gray-700">{product.colors.find(c => c.value === selectedColorBogo.ring2)?.label || 'Select color'}</span>
                          </div>
                          <svg className={`w-4 h-4 text-gray-400 transition-transform ${openColorSelect2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openColorSelect2 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                            {product.colors.map((color) => (
                              <button
                                key={color.value}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedColorBogo({ ...selectedColorBogo, ring2: color.value })
                                  setOpenColorSelect2(false)
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg"
                              >
                                <div className={`w-5 h-5 rounded-full border-2 border-gray-200 ${color.class}`}></div>
                                <span className="text-sm text-gray-700">{color.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Quantity Selection (only for single) */}
          {bundleOption === 'single' && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-primary-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-primary-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Section */}
          <div className="mb-6">
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors mb-4 shadow-lg flex items-center justify-between px-6"
            >
              <span>ADD TO CART</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 line-through text-sm">${bundleOption === 'bogo' ? (product.singlePrice * 2).toFixed(2) : (product.originalPrice * quantity).toFixed(2)}</span>
                <span className="text-2xl font-bold">${getTotalPrice().toFixed(2)}</span>
              </div>
            </button>
            
            {/* Payment Methods */}
            <div className="mb-6">
              <div className="flex items-center justify-center -space-x-6 flex-wrap">
                {['Visa', 'Mastercard', 'PayPal', 'ApplePay', 'GooglePay'].map((payment) => (
                  <PaymentLogo key={payment} name={payment} />
                ))}
              </div>
            </div>
          </div>

          {/* Service Guarantees Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {/* Free Shipping */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
                  🚚
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm mb-1">Delivery in 4-7 days</div>
                  <div className="text-xs text-gray-600">Fast & reliable</div>
                </div>
              </div>
            </div>

            {/* Easy Returns */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
                  📦
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm mb-1">Easy Returns</div>
                  <div className="text-xs text-gray-600">30-day money-back guarantee</div>
                </div>
              </div>
            </div>

            {/* Secure Payment */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
                  💳
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm mb-1">Secure Payment</div>
                  <div className="text-xs text-gray-600">Protected & flexible</div>
                </div>
              </div>
            </div>

            {/* Quality Guarantee */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
                  ⭐
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm mb-1">Premium Quality</div>
                  <div className="text-xs text-gray-600">Designed in USA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-normal text-gray-900 mb-2 tracking-wide uppercase">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm">Your questions, our answers</p>
        </div>

        {/* FAQ Category Tabs */}
        <div className="flex gap-3 mb-8 justify-center">
          {[
            { id: 'general', label: 'General Information' },
            { id: 'product', label: 'Product Information' },
            { id: 'shipping', label: 'Shipping & Delivery' },
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setFaqCategory(category.id)
                setOpenFaqIndex(null)
              }}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                faqCategory === category.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Questions */}
        <div className="space-y-3">
          {(
            faqCategory === 'general' ? [
              { q: 'What is magnetotherapy?', a: 'Magnetotherapy is a natural therapy that uses magnetic fields to improve circulation, reduce inflammation, and provide pain relief. Our ALOWA ring uses therapeutic-grade magnets to deliver these benefits directly to your body.' },
              { q: 'How does the ALOWA ring work?', a: 'The ALOWA ring uses strategically placed neodymium magnets that create a magnetic field. This field interacts with your body\'s natural magnetic properties to improve blood flow, reduce inflammation, and promote natural healing.' },
              { q: 'Is magnetotherapy safe?', a: 'Yes, magnetotherapy is generally safe for most people. However, if you have a pacemaker or other implanted medical devices, please consult your doctor before using magnetic products.' },
            ] :
            faqCategory === 'product' ? [
              { q: 'What materials are used in the ALOWA ring?', a: 'The ALOWA ring is made from premium ice with therapeutic-grade neodymium magnets. The ice construction is hypoallergenic, lightweight, and durable.' },
              { q: 'How do I adjust the ring size?', a: 'The ALOWA ring is designed to be adjustable and fits all finger sizes. Simply bend the ring gently to fit your finger comfortably. It\'s suitable for both men and women.' },
              { q: 'Can I wear the ring while swimming or showering?', a: 'Yes! The ALOWA ring is water-resistant and can be worn during daily activities including swimming and showering. However, we recommend removing it during intense physical activities to prevent damage.' },
              { q: 'How long should I wear the ring?', a: 'You can wear the ALOWA ring all day long for continuous benefits. Many users find it comfortable to wear 24/7, but you can also wear it during specific times when you need pain relief.' },
            ] :
            [
              { q: 'How long does shipping take?', a: 'All orders are processed within 1-2 business days. US orders typically arrive in 4-7 business days with free shipping. International orders take 5-9 business days.' },
              { q: 'Do you offer free shipping?', a: 'Yes! We offer free shipping on all orders within the United States. International shipping rates apply for orders outside the US.' },
              { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, you can return it within 30 days for a full refund.' },
              { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package\'s journey to your doorstep.' },
            ]
          ).map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      openFaqIndex === index ? 'rotate-45' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              {openFaqIndex === index && (
                <div className="px-5 pb-5 text-gray-700 leading-relaxed border-t border-gray-100 pt-4 animate-slide-up">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling Banner */}
      <div className="mt-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <ScrollingBanner />
      </div>

      {/* Comparison Table */}
      <div className="mt-16 max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-normal text-gray-900 mb-2 tracking-wide uppercase">
            <span className="italic">ALOWA</span> vs. <span className="font-bold">Other Brands</span>
          </h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-3 gap-0">
            {/* Header */}
            <div className="bg-gray-50 p-4 border-b border-gray-200 text-center">
              <span className="text-sm font-medium text-gray-600">Features</span>
            </div>
            <div className="bg-gray-100 p-4 border-b border-gray-200 text-center">
              <span className="text-lg font-bold text-gray-900 italic">ALOWA</span>
            </div>
            <div className="bg-white p-4 border-b border-gray-200 text-center">
              <span className="text-lg font-bold text-gray-900">Other brands</span>
            </div>
            
            {/* Rows */}
            {[
              { feature: 'Immediate therapeutic effect', alowa: true, others: false },
              { feature: 'Premium ice construction', alowa: true, others: false },
              { feature: 'Adjustable size - fits all fingers', alowa: true, others: false },
              { feature: 'Hypoallergenic & lightweight', alowa: true, others: false },
              { feature: 'Water-resistant design', alowa: true, others: false },
              { feature: '30-day money-back guarantee', alowa: true, others: false },
            ].map((row, index) => (
              <>
                <div className={`p-4 border-b border-gray-200 text-center flex items-center justify-center bg-gray-50 ${index === 5 ? '' : 'border-b'}`}>
                  <span className="text-sm text-gray-700">{row.feature}</span>
                </div>
                <div className={`bg-gray-100 p-4 border-b border-gray-200 flex items-center justify-center ${index === 5 ? '' : 'border-b'}`}>
                  {row.alowa ? (
                    <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </div>
                <div className={`bg-white p-4 border-b border-gray-200 flex items-center justify-center ${index === 5 ? '' : 'border-b'}`}>
                  {row.others ? (
                    <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-display font-normal text-gray-900 mb-8 tracking-wide uppercase text-center">
          Customer Reviews
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Sarah M.',
              verified: true,
              date: '25/01/2025',
              rating: 5,
              comment: 'Comfortable to wear all day, really helps with my joint pain.',
              color: 'Gold',
              image: '', // avatar = première lettre seulement
              lifestyleImage: '/images/sarah.png',
            },
            {
              name: 'Marie R.',
              verified: true,
              date: '24/01/2025',
              rating: 5,
              comment: 'Great quality and the magnetic therapy really works.',
              color: 'Rose Gold',
              image: '',
              lifestyleImage: '/images/marie.png',
            },
            {
              name: 'Emma L.',
              verified: false,
              date: '23/01/2025',
              rating: 4,
              comment: 'Nice design, very discreet. Helps with circulation.',
              color: 'Onyx',
              image: '',
            },
            {
              name: 'Sophie K.',
              verified: true,
              date: '22/01/2025',
              rating: 5,
              comment: 'Excellent product, exceeded my expectations.',
              color: 'Gold',
              image: '',
            },
            {
              name: 'Lisa P.',
              verified: true,
              date: '21/01/2025',
              rating: 4,
              comment: 'Adjustable size fits perfectly. Very comfortable.',
              color: 'Silver',
              image: '',
            },
            {
              name: 'Julie T.',
              verified: true,
              date: '20/01/2025',
              rating: 5,
              comment: 'Best purchase I made this year. Highly recommend!',
              color: 'Rose Gold',
              image: '',
            },
          ].map((review, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              {/* Customer Info */}
              <div className="flex items-start gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                  {/* Toujours la première lettre en fond */}
                  <div className="absolute inset-0 flex bg-gradient-to-br from-gray-200 to-gray-300 items-center justify-center z-0">
                    <span className="text-gray-600 font-semibold text-sm">{review.name.charAt(0)}</span>
                  </div>
                  {/* Image par-dessus si définie et chargée */}
                  {review.image && (
                    <img
                      src={review.image}
                      alt={review.name}
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 text-sm">{review.name}</span>
                    {review.verified && (
                      <span className="text-xs text-green-600 font-medium">Verified</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'text-green-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

              {/* Photo lifestyle (petite, clic pour agrandir) */}
              {review.lifestyleImage && (
                <div className="mb-3 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setLightboxImage(review.lifestyleImage!)}
                    className="block w-32 h-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    <img
                      src={review.lifestyleImage}
                      alt={`${review.name} - photo`}
                      className="block w-full h-full object-cover"
                    />
                  </button>
                </div>
              )}

              {/* Product Info - Text only */}
              <div className="text-xs text-gray-600">
                ALOWA Ring - {review.color}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox : clic sur une photo d'avis pour agrandir */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxImage(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Escape' && setLightboxImage(null)}
          aria-label="Fermer"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
            aria-label="Fermer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightboxImage}
            alt="Agrandissement"
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
