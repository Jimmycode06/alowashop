import type { Metadata } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawerWrapper from '@/components/CartDrawerWrapper'
import PromoBanner from '@/components/PromoBanner'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'ALOWA - Magnetic Therapy Ring | Natural Pain Relief',
  description: 'Discover the power of magnetotherapy with ALOWA premium magnetic ring. Experience natural pain relief and improved circulation.',
  icons: {
    icon: '/images/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1306789584652736');
fbq('track', 'PageView');`}
        </Script>
      </head>
      <body className={`${inter.variable} ${cormorant.variable} font-sans overflow-x-hidden`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1306789584652736&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <CartProvider>
          <PromoBanner />
          <Header />
          <main className="min-h-screen overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <CartDrawerWrapper />
        </CartProvider>
      </body>
    </html>
  )
}
