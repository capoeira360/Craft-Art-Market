'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight, Star, Heart, ShoppingBag, Clock, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { detectDevice, getAppStoreUrl, cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Subscription plans for artisans
const subscriptionPlans = {
  'basic': { name: 'Basic Plan', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', monthlyPrice: 15000 },
  'premium': { name: 'Premium Plan', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', monthlyPrice: 35000 },
  'enterprise': { name: 'Enterprise Plan', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', monthlyPrice: 75000 }
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  category: string
  artisan: string
  location: string
  image: string
  gallery: string[]
  featured: boolean
  inStock: boolean
  materials: string[]
  dimensions: string
  craftTime: string
  artisanSubscriptionPlan: 'basic' | 'premium' | 'enterprise'
}

const products: Product[] = [
  {
    id: '1',
    name: 'Tingatinga Elephant Painting',
    description: 'Vibrant hand-painted elephant on canvas, showcasing the traditional Tingatinga art style with bold colors and intricate patterns.',
    price: 85000,
    originalPrice: 120000,
    rating: 4.8,
    reviews: 127,
    category: 'Paintings',
    artisan: 'Amara Tingatinga',
    location: 'Dar es Salaam',
    image: '/products/tingatinga-elephant.jpg',
    gallery: ['/products/tingatinga-elephant-1.jpg', '/products/tingatinga-elephant-2.jpg'],
    featured: true,
    inStock: true,
    materials: ['Canvas', 'Acrylic Paint', 'Natural Pigments'],
    dimensions: '60cm x 80cm',
    craftTime: '3 weeks',
    artisanSubscriptionPlan: 'premium'
  },
  {
    id: '2',
    name: 'Kitenge Fabric Handbag',
    description: 'Handcrafted handbag featuring authentic Kitenge patterns, perfect for adding African elegance to any outfit.',
    price: 45000,
    rating: 4.9,
    reviews: 89,
    category: 'Fashion',
    artisan: 'Jengo Makonde',
    location: 'Arusha',
    image: '/products/kitenge-handbag.jpg',
    gallery: ['/products/kitenge-handbag-1.jpg', '/products/kitenge-handbag-2.jpg'],
    featured: true,
    inStock: true,
    materials: ['Kitenge Fabric', 'Leather', 'Cotton Lining'],
    dimensions: '35cm x 25cm x 10cm',
    craftTime: '1 week',
    artisanSubscriptionPlan: 'enterprise'
  },
  {
    id: '3',
    name: 'Makonde Ebony Sculpture',
    description: 'Intricate ebony wood sculpture representing the tree of life, carved by master Makonde artisans using traditional techniques.',
    price: 150000,
    originalPrice: 200000,
    rating: 5.0,
    reviews: 34,
    category: 'Sculptures',
    artisan: 'Neema Makonde',
    location: 'Mtwara',
    image: '/products/makonde-sculpture.jpg',
    gallery: ['/products/makonde-sculpture-1.jpg', '/products/makonde-sculpture-2.jpg'],
    featured: true,
    inStock: true,
    materials: ['Ebony Wood', 'Natural Wax'],
    dimensions: '40cm x 15cm x 15cm',
    craftTime: '6 weeks',
    artisanSubscriptionPlan: 'enterprise'
  },
  {
    id: '4',
    name: 'Maasai Beaded Necklace',
    description: 'Traditional Maasai beaded necklace with vibrant colors representing strength, courage, and cultural heritage.',
    price: 25000,
    rating: 4.7,
    reviews: 156,
    category: 'Jewelry',
    artisan: 'Baraka Maasai',
    location: 'Ngorongoro',
    image: '/products/maasai-necklace.jpg',
    gallery: ['/products/maasai-necklace-1.jpg', '/products/maasai-necklace-2.jpg'],
    featured: false,
    inStock: true,
    materials: ['Glass Beads', 'Leather', 'Metal Wire'],
    dimensions: 'Adjustable 40-50cm',
    craftTime: '3 days',
    artisanSubscriptionPlan: 'basic'
  },
  {
    id: '5',
    name: 'Zanzibar Spice Box Set',
    description: 'Beautifully carved wooden spice box containing authentic Zanzibar spices, perfect for culinary enthusiasts.',
    price: 35000,
    rating: 4.6,
    reviews: 78,
    category: 'Home & Kitchen',
    artisan: 'Fatuma Zanzibari',
    location: 'Stone Town',
    image: '/products/spice-box.jpg',
    gallery: ['/products/spice-box-1.jpg', '/products/spice-box-2.jpg'],
    featured: false,
    inStock: true,
    materials: ['Teak Wood', 'Various Spices', 'Brass Hinges'],
    dimensions: '25cm x 20cm x 8cm',
    craftTime: '2 weeks',
    artisanSubscriptionPlan: 'basic'
  },
  {
    id: '6',
    name: 'Traditional Clay Pottery Set',
    description: 'Hand-thrown pottery set featuring traditional Tanzanian designs, perfect for serving and decoration.',
    price: 55000,
    rating: 4.8,
    reviews: 92,
    category: 'Pottery',
    artisan: 'Mwalimu Pottery',
    location: 'Iringa',
    image: '/products/pottery-set.jpg',
    gallery: ['/products/pottery-set-1.jpg', '/products/pottery-set-2.jpg'],
    featured: false,
    inStock: false,
    materials: ['Local Clay', 'Natural Glazes', 'Organic Pigments'],
    dimensions: 'Various sizes',
    craftTime: '4 weeks',
    artisanSubscriptionPlan: 'basic'
  }
]

export default function ProductsPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)
  const [showRedirectModal, setShowRedirectModal] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Show redirect modal after 1 second
    const timer = setTimeout(() => {
      setShowRedirectModal(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showRedirectModal && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (showRedirectModal && countdown === 0) {
      // Redirect to mobile app or download page
      const device = detectDevice()
      if (device === 'ios' || device === 'android') {
        window.location.href = getAppStoreUrl(device)
      } else {
        router.push('/download')
      }
    }
  }, [showRedirectModal, countdown, router])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.hero-content', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )

      // Product cards animation
      gsap.fromTo('.product-card', 
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: productsRef.current,
            start: 'top 80%',
          }
        }
      )

      // Floating elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      })
    })

    return () => ctx.revert()
  }, [])

  const featuredProducts = products.filter(product => product.featured)
  const regularProducts = products.filter(product => !product.featured)

  const formatPrice = (price: number) => {
    return `TSh ${price.toLocaleString()}`
  }

  const handleProductClick = () => {
    setShowRedirectModal(true)
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Redirect Modal */}
      {showRedirectModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-persian-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-graphite mb-4">
              Get the Full Experience
            </h3>
            <p className="text-gray-600 mb-6">
              To purchase products and connect with artisans, please use our mobile app for the best experience.
            </p>
            <div className="text-4xl font-bold text-persian-green-500 mb-4">
              {countdown}
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Redirecting to app download in {countdown} seconds...
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowRedirectModal(false)}
                variant="outline" 
                className="flex-1"
              >
                Stay Here
              </Button>
              <Button 
                onClick={() => router.push('/download')}
                className="flex-1 bg-persian-green-500 hover:bg-persian-green-600"
              >
                Download Now
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden gradient-persian-2">
        <div className="absolute inset-0 kitenge-overlay opacity-15"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-element absolute top-20 left-10 w-24 h-24 bg-copper-patina/30 rounded-full"></div>
          <div className="floating-element absolute top-1/3 right-16 w-32 h-32 bg-zanzibar-twilight/20 rounded-full"></div>
          <div className="floating-element absolute bottom-32 left-1/4 w-20 h-20 bg-ivory/40 rounded-full"></div>
        </div>
        
        <div className="hero-content relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Authentic <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory to-copper-patina">Crafts</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover handcrafted treasures from Tanzania's most talented artisans. 
            Each piece tells a story of heritage, skill, and cultural pride.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleProductClick}
              className="ceramic-button text-lg px-8 py-4 rounded-xl font-semibold"
            >
              Shop Now
              <ShoppingBag className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 py-4 rounded-xl font-semibold border-white text-white hover:bg-white hover:text-persian-green-500"
            >
              View Stories
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-graphite mb-4">
              Featured <span className="text-persian-green-500">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked masterpieces from our most celebrated artisans
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="product-card group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden paper-grain"
                onClick={handleProductClick}
              >
                <div className="relative">
                  <div 
                    className="h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    {product.originalPrice && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Sale
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <div className={cn(
                        "px-2 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm",
                        subscriptionPlans[product.artisanSubscriptionPlan].color
                      )}>
                        {subscriptionPlans[product.artisanSubscriptionPlan].name}
                      </div>
                      <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <span className="text-sm text-persian-green-500 font-medium">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-graphite mb-2 group-hover:text-persian-green-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {product.description.substring(0, 100)}...
                    </p>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center gap-1 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-persian-green-500">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-4">
                      <p>By {product.artisan} • {product.location}</p>
                      <p className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        Craft time: {product.craftTime}
                      </p>
                    </div>
                    
                    <Button 
                      className="w-full ceramic-button"
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'View Details' : 'Out of Stock'}
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section ref={productsRef} className="py-20 bg-gray-50 paper-grain">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-graphite mb-4">
              More <span className="text-persian-green-500">Products</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {regularProducts.map((product) => (
              <Card 
                key={product.id} 
                className="product-card group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden paper-grain"
                onClick={handleProductClick}
              >
                <div className="relative">
                  <div 
                    className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <div className={cn(
                        "px-2 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm",
                        subscriptionPlans[product.artisanSubscriptionPlan].color
                      )}>
                        {subscriptionPlans[product.artisanSubscriptionPlan].name}
                      </div>
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-5">
                    <div className="mb-2">
                      <span className="text-xs text-persian-green-500 font-medium">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-graphite mb-2 group-hover:text-persian-green-500 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center gap-1 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-persian-green-500">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-4">
                      <p>By {product.artisan}</p>
                    </div>
                    
                    <Button 
                      size="sm"
                      className="w-full ceramic-button"
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'View Details' : 'Out of Stock'}
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={handleProductClick}
              className="ceramic-button text-lg px-8 py-3"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}