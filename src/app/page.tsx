'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight, Download, Star, Users, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArtisanCarousel } from '@/components/ArtisanCarousel'
import { PersianGreenLoader } from '@/components/PersianGreenLoader'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.hero-title', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )

      gsap.fromTo('.hero-subtitle', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      )

      gsap.fromTo('.hero-cta', 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)' }
      )

      // Features animation
      gsap.fromTo('.feature-card', 
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          }
        }
      )

      // Stats animation
      gsap.fromTo('.stat-item', 
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  const handleAppDownload = () => {
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      // Try deep link first
      window.location.href = 'persiangreen://open'
      
      // Fallback to app store after 2 seconds
      setTimeout(() => {
        if (/Android/i.test(navigator.userAgent)) {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.craftandartmarketplace.app'
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = 'https://apps.apple.com/app/craftandartmarketplace/id123456789'
        }
      }, 2000)
    } else {
      // Desktop - redirect to download page
      window.location.href = '/download'
    }
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden kitenge-overlay">
        <div className="absolute inset-0 gradient-persian-1 opacity-90"></div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ivory to-copper-patina">
              Craft&Art Marketplace
            </span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Connect with local artisans, explore traditional crafts, and bring the beauty of Tanzania to your world through our culturally-infused marketplace.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleAppDownload}
              className="ceramic-button text-lg px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <Download className="w-6 h-6" />
              Download App
              <ArrowRight className="w-5 h-5" />
            </Button>

          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-copper-patina opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-zanzibar-twilight opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-ivory opacity-10 animate-ping"></div>
      </section>

      {/* Artisan Spotlight Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-graphite mb-4">
              Meet Our <span className="text-craftart-500">Artisans</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the stories behind the crafts and the talented hands that create them.
            </p>
          </div>
          <ArtisanCarousel />
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-gray-50 paper-grain">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-graphite mb-4">
              Why Choose <span className="text-craftart-500">Craft&Art Marketplace</span>?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card border-0 shadow-lg hover:shadow-xl transition-shadow paper-grain">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-craftart-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-graphite mb-4">Authentic Artisans</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect directly with verified Tanzanian artisans who preserve traditional crafting techniques passed down through generations.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card border-0 shadow-lg hover:shadow-xl transition-shadow paper-grain">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-copper-patina rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-graphite mb-4">Quality Guaranteed</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every piece is carefully curated and authenticated to ensure you receive genuine, high-quality Tanzanian crafts.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card border-0 shadow-lg hover:shadow-xl transition-shadow paper-grain">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-zanzibar-twilight rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-graphite mb-4">Global Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Support local communities and preserve cultural heritage while bringing beautiful, meaningful art to your home.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 gradient-persian-1 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-item">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Verified Artisans</div>
            </div>
            <div className="stat-item">
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="text-4xl md:text-5xl font-bold mb-2">25+</div>
              <div className="text-lg opacity-90">Craft Categories</div>
            </div>
            <div className="stat-item">
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal & Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-4">
              Trust & <span className="text-craftart-500">Transparency</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn about our policies, protections, and commitment to creating a safe, fair marketplace for everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/legal/terms-of-service" className="group">
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-graphite mb-2">Terms of Service</h3>
                  <p className="text-sm text-gray-600">Platform rules and user responsibilities</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/legal/privacy-policy" className="group">
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-graphite mb-2">Privacy Policy</h3>
                  <p className="text-sm text-gray-600">How we protect your personal data</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/legal/buyer-protection" className="group">
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-craftart-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-graphite mb-2">Buyer Protection</h3>
                  <p className="text-sm text-gray-600">Your rights and purchase guarantees</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/legal/community-guidelines" className="group">
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-graphite mb-2">Community Guidelines</h3>
                  <p className="text-sm text-gray-600">Standards for respectful interaction</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/legal">
              <Button variant="outline" className="border-craftart-200 text-graphite hover:border-craftart-500 hover:text-craftart-600">
                View All Legal Documents
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-graphite mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Download our app today and discover the rich cultural heritage of Tanzania through authentic crafts and meaningful connections.
          </p>
          <Button 
            onClick={handleAppDownload}
            className="ceramic-button text-lg px-12 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto hover:scale-105 transition-transform"
          >
            <Download className="w-6 h-6" />
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}