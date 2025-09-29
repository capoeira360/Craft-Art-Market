import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Craft&Art Marketplace - Authentic Handcraft & Art Marketplace',
  description: 'Discover authentic handcrafts and connect with talented artisans through our culturally-infused marketplace.',
  keywords: 'artisan, crafts, marketplace, Craft&Art Marketplace, handcraft, art, authentic, cultural',
  authors: [{ name: 'Craft&Art Marketplace Team' }],
  openGraph: {
    title: 'Craft&Art Marketplace - Authentic Handcraft & Art Marketplace',
    description: 'Discover authentic handcrafts and connect with talented artisans',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Craft&Art Marketplace - Authentic Handcraft & Art Marketplace',
    description: 'Discover authentic handcrafts and connect with talented artisans',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2A9D8F',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} antialiased bg-ivory text-graphite`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}