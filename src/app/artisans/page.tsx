'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, MapPin, Award, Heart, Share2, Filter, Search, Users, Clock, Verified } from 'lucide-react'
import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { cn } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

// Subscription plans for artisans
const subscriptionPlans = {
  'basic': { name: 'Basic Plan', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', features: ['5 Product Listings', 'Basic Analytics', 'Email Support'] },
  'premium': { name: 'Premium Plan', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', features: ['20 Product Listings', 'Advanced Analytics', 'Priority Support', 'Featured Listings'] },
  'enterprise': { name: 'Enterprise Plan', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', features: ['Unlimited Listings', 'Full Analytics Suite', '24/7 Support', 'Marketing Tools', 'Custom Branding'] }
}

interface Artisan {
  id: string
  name: string
  location: string
  region: string
  specialty: string
  rating: number
  reviewCount: number
  yearsExperience: number
  image: string
  coverImage: string
  bio: string
  techniques: string[]
  achievements: string[]
  featured: boolean
  verified: boolean
  totalSales: number
  responseTime: string
  subscriptionPlan: 'basic' | 'premium' | 'enterprise'
}

const artisans: Artisan[] = [
  {
    id: '1',
    name: 'Amara Mwalimu',
    location: 'Stone Town, Zanzibar',
    region: 'Zanzibar',
    specialty: 'Henna Art & Traditional Patterns',
    rating: 4.9,
    reviewCount: 127,
    yearsExperience: 15,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
    bio: 'Master henna artist preserving centuries-old Zanzibari traditions. Amara learned from her grandmother and has been creating intricate henna designs for weddings and celebrations across East Africa.',
    techniques: ['Traditional Henna', 'Bridal Designs', 'Cultural Patterns', 'Natural Dyes'],
    achievements: ['UNESCO Cultural Heritage Award 2022', 'Featured in National Geographic', 'Royal Wedding Artist'],
    featured: true,
    verified: true,
    totalSales: 450,
    responseTime: '2 hours',
    subscriptionPlan: 'premium'
  },
  {
    id: '2',
    name: 'Juma Kikwete',
    location: 'Arusha, Northern Tanzania',
    region: 'Arusha',
    specialty: 'Makonde Wood Carving',
    rating: 4.8,
    reviewCount: 89,
    yearsExperience: 22,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=800&h=400&fit=crop',
    bio: 'Third-generation Makonde carver specializing in traditional masks and contemporary sculptures. Juma\'s work bridges ancient traditions with modern artistic expression.',
    techniques: ['Traditional Carving', 'Mask Making', 'Contemporary Sculpture', 'Wood Selection'],
    achievements: ['Tanzania Arts Festival Winner 2021', 'International Exhibition Paris', 'Master Craftsman Certificate'],
    featured: true,
    verified: true,
    totalSales: 320,
    responseTime: '4 hours',
    subscriptionPlan: 'enterprise'
  },
  {
    id: '3',
    name: 'Fatuma Hassan',
    location: 'Dar es Salaam, Coastal Tanzania',
    region: 'Dar es Salaam',
    specialty: 'Kitenge Fashion & Textiles',
    rating: 4.7,
    reviewCount: 203,
    yearsExperience: 12,
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    bio: 'Contemporary fashion designer blending traditional Kitenge patterns with modern silhouettes. Fatuma empowers local women through her textile cooperative.',
    techniques: ['Pattern Design', 'Tailoring', 'Fabric Printing', 'Fashion Design'],
    achievements: ['East Africa Fashion Week 2023', 'Women Entrepreneur Award', 'Sustainable Fashion Pioneer'],
    featured: false,
    verified: true,
    totalSales: 680,
    responseTime: '1 hour',
    subscriptionPlan: 'basic'
  },
  {
    id: '4',
    name: 'Edward Tingatinga',
    location: 'Oyster Bay, Dar es Salaam',
    region: 'Dar es Salaam',
    specialty: 'Tingatinga Painting',
    rating: 4.9,
    reviewCount: 156,
    yearsExperience: 18,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop',
    bio: 'Renowned Tingatinga painter carrying forward the legacy of this iconic Tanzanian art form. Edward\'s vibrant wildlife paintings capture the spirit of African nature.',
    techniques: ['Enamel Painting', 'Wildlife Art', 'Color Theory', 'Traditional Techniques'],
    achievements: ['Tingatinga Society President', 'International Wildlife Art Award', 'Museum Collections Worldwide'],
    featured: true,
    verified: true,
    totalSales: 520,
    responseTime: '3 hours',
    subscriptionPlan: 'premium'
  },
  {
    id: '5',
    name: 'Mama Neema',
    location: 'Mwanza, Lake Victoria',
    region: 'Mwanza',
    specialty: 'Traditional Pottery & Ceramics',
    rating: 4.6,
    reviewCount: 74,
    yearsExperience: 25,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
    bio: 'Master potter preserving ancient ceramic traditions of the Lake Victoria region. Mama Neema creates functional art that tells stories of Tanzanian heritage.',
    techniques: ['Hand Building', 'Traditional Firing', 'Natural Glazes', 'Cultural Motifs'],
    achievements: ['Cultural Heritage Master', 'Community Arts Leader', 'Traditional Knowledge Keeper'],
    featured: false,
    verified: true,
    totalSales: 280,
    responseTime: '6 hours',
    subscriptionPlan: 'basic'
  },
  {
    id: '6',
    name: 'Salim Mwalimu',
    location: 'Moshi, Kilimanjaro',
    region: 'Kilimanjaro',
    specialty: 'Maasai Beadwork & Jewelry',
    rating: 4.8,
    reviewCount: 112,
    yearsExperience: 14,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=800&h=400&fit=crop',
    bio: 'Traditional Maasai beadwork artist creating authentic jewelry and accessories. Salim works directly with Maasai communities to preserve cultural traditions.',
    techniques: ['Traditional Beading', 'Color Symbolism', 'Cultural Patterns', 'Authentic Materials'],
    achievements: ['Maasai Cultural Ambassador', 'Fair Trade Certified', 'Community Development Award'],
    featured: false,
    verified: true,
    totalSales: 390,
    responseTime: '5 hours',
    subscriptionPlan: 'premium'
  }
]

const regions = ['All Regions', 'Zanzibar', 'Arusha', 'Dar es Salaam', 'Mwanza', 'Kilimanjaro']
const specialties = ['All Specialties', 'Henna Art', 'Wood Carving', 'Textiles', 'Painting', 'Pottery', 'Beadwork']

export default function ArtisansPage() {
  const [selectedRegion, setSelectedRegion] = useState('All Regions')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // GSAP animations
    gsap.fromTo('.hero-content', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )

    gsap.fromTo('.artisan-card', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.artisan-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  const filteredArtisans = artisans.filter(artisan => {
    const matchesRegion = selectedRegion === 'All Regions' || artisan.region === selectedRegion
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || artisan.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
    const matchesSearch = searchQuery === '' || 
      artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesRegion && matchesSpecialty && matchesSearch
  })

  const featuredArtisans = filteredArtisans.filter(artisan => artisan.featured)

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="kitenge-pattern w-full h-full" />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-craftart-500/10 via-transparent to-zanzibar-twilight/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="hero-content max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl text-extra-thin text-graphite mb-6">
              Meet Our Talented
              <span className="block text-craftart-500">Artisans</span>
            </h1>
            <p className="text-xl text-graphite/80 mb-8 leading-relaxed">
              Discover the master craftspeople preserving East African traditions while creating contemporary masterpieces. Each artisan brings generations of knowledge and passion to their craft.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 justify-center">
              <div className="text-center">
                <div className="text-3xl text-light text-craftart-600 mb-2">{artisans.length}+</div>
                <div className="text-sm text-graphite/70 text-light">Master Artisans</div>
              </div>
              <div className="text-center">
                  <div className="text-3xl text-light text-craftart-600 mb-2">6</div>
                  <div className="text-sm text-graphite/70 text-light">Craft Specialties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-light text-craftart-600 mb-2">5</div>
                  <div className="text-sm text-graphite/70 text-light">Regions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-light text-craftart-600 mb-2">100%</div>
                  <div className="text-sm text-graphite/70 text-light">Authentic</div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-y border-craftart-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-graphite/40" />
              <input
                type="text"
                placeholder="Search artisans, crafts, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-craftart-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-craftart-500/50 focus:border-craftart-500 bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-3 border border-craftart-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-craftart-500/50 focus:border-craftart-500 bg-white/80 backdrop-blur-sm min-w-[140px]"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-3 border border-craftart-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-craftart-500/50 focus:border-craftart-500 bg-white/80 backdrop-blur-sm min-w-[160px]"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-craftart-200 text-graphite hover:bg-craftart-50 hover:border-craftart-300"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            
            {/* Results Count */}
            <div className="text-sm text-graphite/70">
              Showing {filteredArtisans.length} of {artisans.length} artisans
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      {featuredArtisans.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-craftart-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-light text-graphite mb-4">
                Featured Artisans
              </h2>
              <p className="text-lg text-graphite/70 max-w-2xl mx-auto">
                Discover our most celebrated craftspeople, recognized for their exceptional skill and cultural contributions.
              </p>
            </div>
            
            <div className="artisan-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArtisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Artisans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-light text-graphite mb-4">
              All Artisans
            </h2>
            <p className="text-lg text-graphite/70 max-w-2xl mx-auto">
              Browse our complete collection of talented artisans from across East Africa.
            </p>
          </div>
          
          {filteredArtisans.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-craftart-100 flex items-center justify-center">
                <Users className="w-12 h-12 text-craftart-400" />
              </div>
              <h3 className="text-xl text-light text-graphite mb-2">No artisans found</h3>
              <p className="text-graphite/60 mb-6">Try adjusting your search criteria or filters.</p>
              <Button 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedRegion('All Regions')
                  setSelectedSpecialty('All Specialties')
                }}
                className="bg-craftart-500 hover:bg-craftart-600 text-white"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="artisan-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} featured={false} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

function ArtisanCard({ artisan, featured }: { artisan: Artisan; featured: boolean }) {
  const [isLiked, setIsLiked] = useState(false)
  const plan = subscriptionPlans[artisan.subscriptionPlan]

  return (
    <Card className={cn(
      'artisan-card group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2',
      'bg-white/90 backdrop-blur-sm border-0 shadow-lg',
      featured && 'ring-2 ring-craftart-200 shadow-craftart-100/50'
    )}>
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={artisan.coverImage}
          alt={`${artisan.name}'s workshop`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <div className="bg-craftart-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Award className="w-3 h-3" />
              Featured
            </div>
          </div>
        )}
        
        {/* Subscription Plan */}
        <div className="absolute top-4 right-4">
          <div className={cn('px-3 py-1 rounded-full text-xs font-medium border', plan.color)}>
            {plan.name}
          </div>
        </div>
        
        {/* Actions */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              'p-2 rounded-full backdrop-blur-sm transition-all duration-200',
              isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            )}
          >
            <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
          </button>
          <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-200">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Profile Section */}
      <div className="relative px-6 pt-6 pb-4">
        {/* Profile Image */}
        <div className="absolute -top-8 left-6">
          <div className="relative">
            <Image
              src={artisan.image}
              alt={artisan.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-lg"
            />
            {artisan.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-craftart-500 rounded-full flex items-center justify-center border-2 border-white">
                <Verified className="w-3 h-3 text-white fill-current" />
              </div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="mt-8">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl text-light text-graphite group-hover:text-craftart-600 transition-colors">
                {artisan.name}
              </h3>
              <p className="text-craftart-600 text-light">{artisan.specialty}</p>
            </div>
            <div className="flex items-center gap-1 bg-craftart-50 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-light text-graphite">{artisan.rating}</span>
              <span className="text-xs text-graphite/60">({artisan.reviewCount})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-graphite/70 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{artisan.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{artisan.yearsExperience}y exp</span>
            </div>
          </div>
          
          <p className="text-graphite/80 text-sm leading-relaxed mb-4 line-clamp-3">
            {artisan.bio}
          </p>
          
          {/* Techniques */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {artisan.techniques.slice(0, 3).map((technique, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-craftart-100 text-craftart-700 text-xs rounded-full text-light"
                >
                  {technique}
                </span>
              ))}
              {artisan.techniques.length > 3 && (
                <span className="px-2 py-1 bg-graphite/10 text-graphite/60 text-xs rounded-full text-light">
                  +{artisan.techniques.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-3 bg-craftart-50/50 rounded-lg">
            <div className="text-center">
              <div className="text-lg text-light text-craftart-600">{artisan.totalSales}</div>
              <div className="text-xs text-graphite/60">Sales</div>
            </div>
            <div className="text-center">
                <div className="text-lg text-light text-craftart-600">{artisan.responseTime}</div>
                <div className="text-xs text-graphite/60">Response</div>
              </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3">
            <Link href={`/artisans/${artisan.id}`} className="flex-1">
              <Button className="w-full bg-craftart-500 hover:bg-craftart-600 text-white">
                View Profile
              </Button>
            </Link>
            <Button variant="outline" className="border-craftart-200 text-craftart-600 hover:bg-craftart-50">
              Message
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}