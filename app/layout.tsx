import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sunbeam - Fresh Seafood Delivered',
  description: 'Premium fresh fish and seafood delivered to your door. Best quality, best prices.',
  keywords: 'fish, seafood, fresh fish, fish delivery, seafood shop, sunbeam',
  authors: [{ name: 'Sunbeam Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script src="/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
