'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { Button } from './ui/button'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/stories' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
    marketplace: [
      { label: 'Browse Crafts', href: '/crafts' },
      { label: 'Find Artisans', href: '/artisans' },
      { label: 'Categories', href: '/categories' },
      { label: 'Featured', href: '/featured' },
    ],
    support: [
      { label: 'Support Center', href: '/support' },
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping Info', href: '/support/shipping' },
      { label: 'Returns', href: '/support/returns' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/legal/privacy-policy' },
      { label: 'Terms of Service', href: '/legal/terms-of-service' },
      { label: 'Cookie Policy', href: '/legal/cookie-policy' },
      { label: 'Artisan Agreement', href: '/legal/artisan-agreement' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/persiangreen', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/persiangreen', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/persiangreen', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/persiangreen', label: 'YouTube' },
  ]

  return (
    <footer className="bg-graphite text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-36 h-36 rounded-lg overflow-hidden">
                <Image
                  src="/Craft&Art_logo.png"
                  alt="Craft&Art Marketplace Logo"
                  width={144}
                  height={144}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl text-light logo">Craft&Art Marketplace</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting the world with authentic Tanzanian crafts and the talented artisans who create them. 
              Preserving cultural heritage through meaningful commerce.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-persian-green-500" />
                <span>Dar es Salaam, Tanzania</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-persian-green-500" />
                <span>hello@persiangreen.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-persian-green-500" />
                <span>+255 123 456 789</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg text-light mb-4 text-persian-green-500">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-persian-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="text-lg text-light mb-4 text-persian-green-500">Marketplace</h3>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-persian-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg text-light mb-4 text-persian-green-500">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-persian-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg text-light mb-4 text-persian-green-500">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-persian-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl text-light mb-4 text-persian-green-500">
              Stay Connected
            </h3>
            <p className="text-gray-300 mb-6">
              Get updates on new artisans, featured crafts, and cultural stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
              />
              <Button className="ceramic-button px-6 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex justify-center space-x-6">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-persian-green-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label={social.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            )
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Craft&Art Marketplace. All rights reserved. Made with ❤️ for artisans worldwide.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Powered by Craft&Art Marketplace Technology</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-persian-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}