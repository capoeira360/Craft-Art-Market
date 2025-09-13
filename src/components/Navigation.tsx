'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Download } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAppDownload = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      window.location.href = 'persiangreen://open'
      setTimeout(() => {
        if (/Android/i.test(navigator.userAgent)) {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.craftandartmarketplace.app'
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = 'https://apps.apple.com/app/craftandartmarketplace/id123456789'
        }
      }, 2000)
    } else {
      window.location.href = '/download'
    }
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/stories', label: 'Craft Stories' },
    { href: '/artisans', label: 'Artisans' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  // Helper function to check if navigation item is active
  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-persian-green-100' 
        : 'bg-gradient-to-b from-black/20 to-transparent backdrop-blur-sm'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-110 transition-transform">
              <Image
                src="/Craft&Art_logo.png"
                alt="Craft&Art Marketplace Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className={cn(
              'text-xl font-bold transition-colors drop-shadow-sm',
              isScrolled ? 'text-graphite' : 'text-white'
            )}>
              Craft&Art Marketplace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = isActiveRoute(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'font-medium transition-all duration-200 relative group px-4 py-2',
                    'hover:text-persian-green-600 active:scale-95',
                    'focus:outline-none focus:ring-2 focus:ring-persian-green-500/50',
                    isScrolled 
                      ? isActive
                        ? 'text-persian-green-700 font-semibold'
                        : 'text-graphite hover:text-persian-green-600'
                      : isActive
                        ? 'text-persian-green-200 font-bold'
                        : 'text-white hover:text-persian-green-100 drop-shadow-lg font-semibold'
                  )}
                >
                  {item.label}
                  <span className={cn(
                    'absolute -bottom-1 left-4 h-0.5 bg-persian-green-400 transition-all duration-300 shadow-sm',
                    isActive 
                      ? 'w-[calc(100%-2rem)] bg-persian-green-500' 
                      : 'w-0 group-hover:w-[calc(100%-2rem)] group-hover:bg-persian-green-300'
                  )}></span>
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={handleAppDownload}
              className={cn(
                'ceramic-button flex items-center gap-2 transition-all duration-200',
                'active:scale-95 focus:outline-none focus:ring-2 focus:ring-persian-green-500/50',
                'hover:shadow-lg active:shadow-md',
                !isScrolled && 'bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm text-white'
              )}
            >
              <Download className="w-4 h-4" />
              Download App
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'md:hidden p-2 rounded-lg transition-all duration-200',
              'active:scale-95 focus:outline-none focus:ring-2 focus:ring-persian-green-500/50',
              'hover:shadow-md transform hover:-translate-y-0.5',
              isScrolled 
                ? 'text-graphite hover:bg-persian-green-50 active:bg-persian-green-100 hover:text-persian-green-600' 
                : 'text-white hover:bg-white/20 active:bg-white/30 drop-shadow-lg hover:text-persian-green-100'
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-persian-green-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => {
                const isActive = isActiveRoute(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block font-medium py-3 px-4 transition-all duration-200 relative group',
                      'hover:text-persian-green-600',
                      'focus:outline-none focus:ring-2 focus:ring-persian-green-500/50',
                      isActive
                        ? 'text-persian-green-700 font-bold'
                        : 'text-graphite font-semibold'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                    <span className={cn(
                      'absolute -bottom-1 left-4 h-0.5 bg-persian-green-400 transition-all duration-300 shadow-sm',
                      isActive 
                        ? 'w-[calc(100%-2rem)] bg-persian-green-500' 
                        : 'w-0 group-hover:w-[calc(100%-2rem)] group-hover:bg-persian-green-300'
                    )}></span>
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-persian-green-100">
                <Button
                  onClick={() => {
                    handleAppDownload()
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full ceramic-button flex items-center justify-center gap-2 transition-all duration-200',
                    'active:scale-95 focus:outline-none focus:ring-2 focus:ring-persian-green-500/50',
                    'hover:shadow-lg active:shadow-md'
                  )}
                >
                  <Download className="w-4 h-4" />
                  Download App
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}