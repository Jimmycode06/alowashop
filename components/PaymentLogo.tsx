'use client'

import { useState } from 'react'
import Image from 'next/image'

type PaymentLogoProps = {
  name: string
  className?: string
}

export default function PaymentLogo({ name, className = '' }: PaymentLogoProps) {
  const [imageError, setImageError] = useState(false)
  const [pngError, setPngError] = useState(false)
  const isApplePay = name === 'ApplePay' || name === 'apple-pay'
  const isGooglePay = name === 'GooglePay'
  
  // Map internal names to actual file names
  const fileNameMap: Record<string, string> = {
    'Visa': 'Visa',
    'Mastercard': 'Mastercard',
    'Paypal': 'PayPal',
    'PayPal': 'PayPal',
    'ApplePay': 'ApplePay',
    'apple-pay': 'ApplePay',
    'GooglePay': 'GooglePay',
  }
  
  const fileName = fileNameMap[name] || name
  const imagePath = `/images/payment/${fileName}.svg`
  const imagePathPng = `/images/payment/${fileName}.png`

  // If both images fail, show fallback SVG
  if (imageError && pngError) {
    return (
      <div className={`w-14 h-7 sm:w-24 sm:h-12 flex items-center justify-center flex-shrink-0 ${className}`}>
        {isApplePay && (
          <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
        )}
        {isGooglePay && (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        )}
        {(name === 'visa' || name === 'Visa') && (
          <svg viewBox="0 0 141.732 141.732" className="w-full h-full">
            <g fill="#1434CB">
              <path d="M62.935 89.69h-9.303l5.74-35.383h9.304l-5.741 35.383z"/>
              <path d="M100.851 60.11c-1.85-.785-4.794-1.608-8.46-1.608-9.35 0-15.94 4.982-15.94 12.11 0 5.26 4.68 8.18 8.26 9.93 3.66 1.79 4.99 2.95 4.99 4.54 0 2.45-2.99 3.55-5.74 3.55-4.85 0-7.45-1.34-11.51-2.9l-1.58-.73-1.68 10.33c2.78 1.29 7.9 2.41 13.22 2.47 9.94 0 16.42-4.9 16.42-12.48 0-4.17-2.35-7.35-7.5-9.95-3.12-1.61-5.03-2.68-5.03-4.32 0-1.52 1.52-3.15 4.76-3.15 2.7 0 4.68.52 6.15 1.06l1.08.49 1.68-10.15zm-30.75 29.58h-8.46l5.74-35.383h8.46l-5.74 35.383z"/>
              <path d="M47.379 89.69L38.1 54.307h8.888l1.39 7.768c3.4-5.24 8.79-8.966 15.55-8.966h4.6l-1.39 8.59h-4.6c-4.79 0-7.95 2.47-9.35 6.11l-7.39 22.85z"/>
            </g>
          </svg>
        )}
        {(name === 'mastercard' || name === 'Mastercard') && (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <circle cx="9" cy="12" r="7" fill="#EB001B"/>
            <circle cx="15" cy="12" r="7" fill="#F79E1B"/>
            <path d="M12 3.264A8.966 8.966 0 0 0 9 4a9 9 0 0 0 0 16 8.966 8.966 0 0 0 3-.736 9 9 0 0 0 0-15.472z" fill="#FF5F00"/>
          </svg>
        )}
        {(name === 'paypal' || name === 'Paypal' || name === 'PayPal') && (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a.805.805 0 0 0-.777.594l-3.34 21.277a.804.804 0 0 1-.777.594H12.61a.5.5 0 0 1-.494-.593l2.51-15.923a.5.5 0 0 1 .494-.407h4.563c4.298 0 7.664-1.747 8.647-6.797.03-.15.054-.294.077-.437a.375.375 0 0 0-.003-.07z"/>
            <path fill="#009CDE" d="M9.46 7.21h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9L9.46 7.21zm1.088 6.897l1.12-7.106c.082-.518.526-.9 1.05-.9h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.15.054-.294.077-.437.292-1.867-.002-3.137-1.012-4.287C21.098.543 19.09 0 16.52 0H9.06c-.524 0-.972.382-1.054.901L2.47 20.597a.641.641 0 0 0 .633.74h4.606l1.454-9.23z"/>
          </svg>
        )}
      </div>
    )
  }

  // All payment logos now have the same styling - no background, no border
  // Smaller on mobile so they fit on one line; normal size from sm up
  return (
    <div className={`w-14 h-7 sm:w-24 sm:h-12 flex items-center justify-center flex-shrink-0 ${className}`}>
      {!imageError ? (
        <Image
          src={imagePath}
          alt={name}
          width={96}
          height={48}
          className="object-contain w-full h-full"
          onError={() => setImageError(true)}
        />
      ) : !pngError ? (
        <Image
          src={imagePathPng}
          alt={name}
          width={96}
          height={48}
          className="object-contain w-full h-full"
          onError={() => setPngError(true)}
        />
      ) : null}
    </div>
  )
}
