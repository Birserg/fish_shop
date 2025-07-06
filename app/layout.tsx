import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Рыбный магазин Sunbeam - Премиальная норвежская семга | Sunbeam Fish Shop',
  description: 'Премиальная норвежская семга - оригинальная слабосоленая, с цитрусом, подкопченная и для сашими. Свежая, аутентичная, с доставкой. Premium Norwegian salmon products.',
  keywords: 'семга, норвежская семга, рыба, морепродукты, сашими, копченая семга, премиальная рыба, sunbeam, salmon, Norwegian salmon, fish, seafood, sashimi, smoked salmon, premium fish',
  authors: [{ name: 'Sunbeam Fish Shop' }],
  creator: 'Sunbeam Fish Shop',
  openGraph: {
    title: 'Рыбный магазин Sunbeam - Премиальная норвежская семга',
    description: 'Премиальная норвежская семга с аутентичными вкусами. Ремесленное производство слабосоленой семги и гастрономических деликатесов.',
    url: 'https://sunbeam-fish-shop.vercel.app',
    siteName: 'Sunbeam Fish Shop',
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 600,
        alt: 'Логотип рыбного магазина Sunbeam',
      },
    ],
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Рыбный магазин Sunbeam - Премиальная норвежская семга',
    description: 'Премиальная норвежская семга с аутентичными вкусами',
    images: ['/logo.jpg'],
  },
  alternates: {
    languages: {
      'ru': '/',
      'en': '/?lang=en',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#f59e0b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Sunbeam Fish Shop",
              "alternateName": "Рыбный магазин Sunbeam",
              "description": "Премиальная норвежская семга - оригинальная слабосоленая, с цитрусом, подкопченная и для сашими",
              "url": "https://sunbeam-fish-shop.vercel.app",
              "logo": "https://sunbeam-fish-shop.vercel.app/logo.jpg",
              "image": "https://sunbeam-fish-shop.vercel.app/logo.jpg",
              "telephone": "+66650673689",
              "email": "sunbeam.th.co@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "TH"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "1"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Salmon Products",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Original Lightly Salted Salmon",
                      "alternateName": "Семга оригинальная слабосоленая",
                      "description": "Fresh Norwegian premium-grade salmon, cured using traditional two-stage dry salting technique",
                      "image": "https://sunbeam-fish-shop.vercel.app/fish_1.jpg",
                      "brand": {
                        "@type": "Brand",
                        "name": "Sunbeam"
                      }
                    },
                    "price": "180",
                    "priceCurrency": "THB"
                  }
                ]
              }
            })
          }}
        />
        <Script
          id="preconnect-fonts"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = 'https://fonts.googleapis.com';
                document.head.appendChild(link);

                const link2 = document.createElement('link');
                link2.rel = 'preconnect';
                link2.href = 'https://fonts.gstatic.com';
                link2.crossOrigin = 'anonymous';
                document.head.appendChild(link2);
              })();
            `
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen">
          {children}
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, #f59e0b, #fb923c)',
              color: '#ffffff',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
