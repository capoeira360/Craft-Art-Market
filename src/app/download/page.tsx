'use client'

import { useEffect, useState, useCallback } from 'react'
import { QrCode, Smartphone, Download, MessageSquare, Apple, Play } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { detectDevice, generateQRCode, generateSMSLink, formatPhoneNumber } from '../../lib/utils'

export default function DownloadPage() {
  const [device, setDevice] = useState<'ios' | 'android' | 'desktop'>('desktop')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isValidPhone, setIsValidPhone] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [redirecting, setRedirecting] = useState(false)

  const handleDirectDownload = useCallback(() => {
    if (device === 'ios') {
      window.location.href = 'https://apps.apple.com/app/craftartmarketplace/id123456789'
    } else if (device === 'android') {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.craftartmarketplace.app'
    }
  }, [device])

  useEffect(() => {
    setDevice(detectDevice())
    
    // Auto-redirect mobile users after 3 seconds
    if (detectDevice() !== 'desktop') {
      setRedirecting(true)
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            handleDirectDownload()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [handleDirectDownload])

  useEffect(() => {
    const isValid = /^\+255[67]\d{8}$/.test(phoneNumber) || /^0[67]\d{8}$/.test(phoneNumber)
    setIsValidPhone(isValid)
  }, [phoneNumber])

  const handleSMSDownload = () => {
    if (!isValidPhone) return
    
    const formattedPhone = formatPhoneNumber(phoneNumber)
    const message = `Download the Persian Green app: ${device === 'ios' 
      ? 'https://apps.apple.com/app/craftartmarketplace/id123456789'
    : 'https://play.google.com/store/apps/details?id=com.craftartmarketplace.app'
    }`
    
    const smsLink = generateSMSLink(formattedPhone, message)
    window.location.href = smsLink
  }

  const getQRCodeData = () => {
    if (device === 'ios') {
      return 'https://apps.apple.com/app/craftartmarketplace/id123456789'
    } else {
      return 'https://play.google.com/store/apps/details?id=com.craftartmarketplace.app'
    }
  }

  const getDeviceIcon = () => {
    if (device === 'ios') return Apple
    if (device === 'android') return Play
    return Smartphone
  }

  const DeviceIcon = getDeviceIcon()

  if (redirecting && device !== 'desktop') {
    return (
      <div className="min-h-screen bg-gradient-persian-1 flex items-center justify-center text-white">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <DeviceIcon className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Redirecting to App Store...</h1>
          <p className="text-xl mb-6">You'll be redirected in {countdown} seconds</p>
          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
            />
          </div>
          <Button 
            onClick={handleDirectDownload}
            className="bg-white text-persian-green-500 hover:bg-gray-100 font-semibold"
          >
            Download Now
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 gradient-persian-1 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Download Craft&Art Marketplace Apps
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Choose your Craft&Art Marketplace experience: Shop authentic Tanzanian crafts as a buyer, or showcase and sell your creations as an artisan seller.
            </p>
            <div className="flex items-center justify-center gap-4 text-lg">
              <Smartphone className="w-6 h-6" />
              <span>Available on iOS & Android</span>
            </div>
          </div>
        </section>

        {/* App Selection */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-graphite mb-4">
                Choose Your Craft&Art Marketplace Experience
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Whether you're shopping for unique crafts or selling your creations, we have the perfect app for you.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              {/* Craft&Art Marketplace Buyer App */}
              <Card className="paper-grain border-0 shadow-xl">
                <CardHeader className="text-center bg-gradient-to-br from-persian-green-500 to-persian-green-600 text-white rounded-t-lg">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-10 h-10" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Craft&Art Marketplace Buyer</CardTitle>
                  <p className="text-lg opacity-90">Discover & Shop Authentic Crafts</p>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-600 mb-6">Shop authentic Tanzanian crafts directly from artisans. Browse thousands of unique handmade items with Craft&Art Marketplace Buyer app.</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-persian-green-500 rounded-full"></div>
                      <span className="text-gray-700">Browse thousands of authentic crafts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-persian-green-500 rounded-full"></div>
                      <span className="text-gray-700">Direct communication with artisans</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-persian-green-500 rounded-full"></div>
                      <span className="text-gray-700">Secure mobile money payments</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-persian-green-500 rounded-full"></div>
                      <span className="text-gray-700">Track orders and deliveries</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-persian-green-500 rounded-full"></div>
                      <span className="text-gray-700">Wishlist and favorites</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <a 
                      href="https://apps.apple.com/app/craftartmarketplace/id123456789"
                      className="block"
                    >
                      <div className="bg-black text-white rounded-lg p-4 hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <Apple className="w-8 h-8" />
                          <div>
                            <div className="text-xs opacity-75">Download on the</div>
                            <div className="font-semibold">App Store</div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.craftartmarketplace.app"
                      className="block"
                    >
                      <div className="bg-black text-white rounded-lg p-4 hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <Play className="w-8 h-8" />
                          <div>
                            <div className="text-xs opacity-75">Get it on</div>
                            <div className="font-semibold">Google Play</div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              {/* Craft&Art Marketplace Seller App */}
              <Card className="paper-grain border-0 shadow-xl">
                <CardHeader className="text-center bg-gradient-to-br from-copper-patina to-zanzibar-twilight text-white rounded-t-lg">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-10 h-10" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Craft&Art Marketplace Seller</CardTitle>
                  <p className="text-lg opacity-90">Showcase & Sell Your Crafts</p>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-600 mb-6">Manage your artisan business with ease. Upload products, track sales, and connect with customers using Craft&Art Marketplace Seller app.</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-copper-patina rounded-full"></div>
                      <span className="text-gray-700">Upload and manage your products</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-copper-patina rounded-full"></div>
                      <span className="text-gray-700">Track sales and earnings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-copper-patina rounded-full"></div>
                      <span className="text-gray-700">Communicate with customers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-copper-patina rounded-full"></div>
                      <span className="text-gray-700">Manage orders and shipping</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-copper-patina rounded-full"></div>
                      <span className="text-gray-700">Analytics and insights</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <a 
                      href="https://apps.apple.com/app/craftartmarketplace-seller/id123456790"
                      className="block"
                    >
                      <div className="bg-black text-white rounded-lg p-4 hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <Apple className="w-8 h-8" />
                          <div>
                            <div className="text-xs opacity-75">Download on the</div>
                            <div className="font-semibold">App Store</div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.craftartmarketplace.seller"
                      className="block"
                    >
                      <div className="bg-black text-white rounded-lg p-4 hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <Play className="w-8 h-8" />
                          <div>
                            <div className="text-xs opacity-75">Get it on</div>
                            <div className="font-semibold">Google Play</div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Device Detection Info */}
            <div className="text-center mt-12">
              <div className="flex items-center justify-center gap-2 text-sm text-persian-green-600">
                <DeviceIcon className="w-4 h-4" />
                <span>Detected device: {device === 'desktop' ? 'Desktop/Laptop' : device === 'ios' ? 'iPhone/iPad' : 'Android Device'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-graphite mb-4">
                Why Download Craft&Art Marketplace?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the best of Tanzanian craftsmanship with our mobile apps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-persian-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-persian-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-graphite mb-2">Mobile Optimized</h3>
                <p className="text-gray-600">Designed specifically for mobile devices with intuitive touch interfaces</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-persian-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-persian-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-graphite mb-2">Direct Communication</h3>
                <p className="text-gray-600">Chat directly with artisans and customers through in-app messaging</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-persian-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-persian-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-graphite mb-2">Easy Sharing</h3>
                <p className="text-gray-600">Share products and your artisan profile with QR codes and social links</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}