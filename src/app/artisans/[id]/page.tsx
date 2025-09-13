'use client'

import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  MapPin, 
  Star, 
  Award, 
  Calendar, 
  Users, 
  ShoppingBag, 
  Clock,
  ArrowLeft,
  Heart,
  Share2,
  CheckCircle,
  Globe2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/components/Footer'

// Artisan data - would typically come from API
const artisans = [
  {
    id: 1,
    name: 'Amara Mwalimu',
    specialty: 'Henna Art & Traditional Patterns',
    location: 'Stone Town, Zanzibar',
    region: 'Zanzibar',
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
    bio: 'Master henna artist preserving centuries-old Zanzibari traditions. Amara learned from her grandmother and has been creating intricate henna designs for weddings and celebrations for over 15 years.',
    detailedBio: 'Amara Mwalimu is a third-generation henna artist from Stone Town, Zanzibar, who has dedicated her life to preserving and evolving the ancient art of henna decoration. Born into a family of traditional artists, she learned the sacred patterns and techniques from her grandmother, who was renowned throughout Zanzibar for her intricate bridal henna designs.\n\nWith over 15 years of professional experience, Amara has become one of the most sought-after henna artists in East Africa. Her work seamlessly blends traditional Zanzibari motifs with contemporary artistic elements, creating unique designs that tell stories of heritage, love, and celebration. She specializes in bridal henna, ceremonial body art, and cultural pattern documentation.\n\nAmara is also passionate about education and cultural preservation. She regularly conducts workshops for young women in her community, teaching them the traditional techniques while encouraging artistic innovation. Her work has been featured in several cultural exhibitions and she has collaborated with international artists to showcase Zanzibari henna art on global platforms.',
    techniques: ['Traditional Henna', 'Bridal Designs', 'Cultural Patterns', 'Modern Fusion', 'Ceremonial Art'],
    yearsExperience: 15,
    totalSales: 450,
    responseTime: '2 hours',
    languages: ['Swahili', 'English', 'Arabic'],
    education: 'Traditional apprenticeship under master artisan grandmother',
    achievements: [
      'Featured in Zanzibar Cultural Heritage Exhibition 2023',
      'Winner of East African Traditional Arts Competition 2022',
      'Cultural Ambassador for Zanzibari Henna Art',
      'Certified Master Artisan by Tanzania Cultural Board'
    ],
    services: [
      'Bridal Henna Ceremonies',
      'Cultural Event Decorations',
      'Private Henna Sessions',
      'Henna Art Workshops',
      'Pattern Design Consultation'
    ],
    priceRange: '$25 - $200',
    availability: 'Available 6 days a week',
    gallery: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop'
    ],
    reviews: [
      {
        id: 1,
        name: 'Fatima Al-Rashid',
        rating: 5,
        comment: 'Amara created the most beautiful bridal henna for my wedding. The intricate patterns were absolutely stunning and lasted perfectly throughout the celebrations.',
        date: '2024-01-15',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'Amazing experience! Amara explained the cultural significance of each pattern while creating beautiful art on my hands. Highly recommended!',
        date: '2024-01-10',
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: 3,
        name: 'Maria Santos',
        rating: 4,
        comment: 'Beautiful work and very professional. The henna lasted longer than expected and the designs were exactly what I wanted.',
        date: '2024-01-08',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      }
    ]
  },
  {
    id: 2,
    name: 'Juma Kikwete',
    specialty: 'Makonde Wood Carving',
    location: 'Arusha, Northern Tanzania',
    region: 'Arusha',
    rating: 4.8,
    reviewCount: 89,
    verified: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=1200&h=600&fit=crop',
    bio: 'Third-generation Makonde carver specializing in traditional masks and contemporary sculptures. Juma\'s work bridges ancient traditions with modern artistic expression.',
    detailedBio: 'Juma Kikwete comes from a long line of master Makonde wood carvers in Northern Tanzania. The Makonde people are renowned for their exceptional wood carving skills, and Juma represents the third generation of his family to carry on this ancient tradition.\n\nSpecializing in both traditional ceremonial masks and contemporary sculptural pieces, Juma has developed a unique style that honors his ancestors while speaking to modern audiences. His work often explores themes of identity, spirituality, and the connection between humanity and nature.\n\nJuma sources his wood exclusively from sustainable forests and works closely with local communities to ensure that his craft supports environmental conservation. He has exhibited his work in galleries across East Africa and has pieces in private collections worldwide. Beyond his artistic practice, Juma is committed to teaching young people the traditional techniques of Makonde carving, ensuring that this cultural heritage continues to thrive.',
    techniques: ['Traditional Carving', 'Mask Making', 'Contemporary Sculpture', 'Wood Finishing', 'Cultural Restoration'],
    yearsExperience: 22,
    totalSales: 320,
    responseTime: '4 hours',
    languages: ['Swahili', 'English', 'Makonde'],
    education: 'Traditional Makonde carving apprenticeship, Certificate in Fine Arts',
    achievements: [
      'Featured artist at Arusha Cultural Center',
      'Winner of Traditional Arts Excellence Award 2023',
      'Cultural Heritage Preservation Ambassador',
      'Exhibited at East African Art Biennale'
    ],
    services: [
      'Custom Wood Sculptures',
      'Traditional Mask Creation',
      'Art Restoration Services',
      'Carving Workshops',
      'Cultural Consultation'
    ],
    priceRange: '$50 - $500',
    availability: 'Available by appointment',
    gallery: [
      'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'
    ],
    reviews: [
      {
        id: 1,
        name: 'Michael Thompson',
        rating: 5,
        comment: 'Juma created a stunning custom sculpture for our home. His attention to detail and cultural knowledge made the experience truly special.',
        date: '2024-01-20',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
    ]
  }
]

interface ArtisanProfileProps {
  params: {
    id: string
  }
}

export default function ArtisanProfile({ params }: ArtisanProfileProps) {
  const artisan = artisans.find(a => a.id === parseInt(params.id))
  
  if (!artisan) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-craftart-50 to-craftart-100">
      {/* Hero Section with Cover Image */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={artisan.coverImage}
          alt={`${artisan.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-6 left-6 z-20">
          <Link 
            href="/artisans" 
            className="inline-flex items-center gap-2 text-white hover:text-white/80 bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl transition-all duration-300 border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Artisans</span>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 z-20 flex gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-black/20 border-white/30 text-white hover:bg-black/40 backdrop-blur-sm"
          >
            <Heart className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-black/20 border-white/30 text-white hover:bg-black/40 backdrop-blur-sm"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src={artisan.image}
                    alt={artisan.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {artisan.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-craftart-500 rounded-full p-2 border-4 border-white">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{artisan.name}</h1>
                  {artisan.featured && (
                    <Badge className="bg-gradient-to-r from-craftart-500 to-craftart-600 text-white border-0">
                      <Award className="w-4 h-4 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                
                <p className="text-xl text-white/90 mb-3 font-medium">{artisan.specialty}</p>
                
                <div className="flex items-center justify-center gap-6 text-white/80 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{artisan.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{artisan.yearsExperience} years experience</span>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-5 h-5',
                          i < Math.floor(artisan.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{artisan.rating}</span>
                  <span className="text-white/80">({artisan.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-craftart-500 to-craftart-600 rounded-full" />
                  <h2 className="text-3xl font-bold text-gray-900">About {artisan.name}</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  {artisan.detailedBio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-6 leading-relaxed text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Techniques & Skills */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-craftart-500 to-craftart-600 rounded-full" />
                  <h2 className="text-3xl font-bold text-gray-900">Techniques & Expertise</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {artisan.techniques.map((technique, index) => (
                    <div key={index} className="group">
                      <div className="bg-gradient-to-br from-craftart-50 to-craftart-100 p-4 rounded-xl border border-craftart-200 hover:border-craftart-300 transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-craftart-500 rounded-full group-hover:scale-110 transition-transform" />
                          <span className="font-medium text-gray-800">{technique}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services Offered */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-craftart-500 to-craftart-600 rounded-full" />
                  <h2 className="text-3xl font-bold text-gray-900">Services Offered</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {artisan.services.map((service, index) => (
                    <div key={index} className="group">
                      <div className="bg-gradient-to-r from-white to-craftart-50 p-5 rounded-xl border border-craftart-200 hover:border-craftart-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-craftart-500 to-craftart-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-semibold text-gray-800 text-lg">{service}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-craftart-500 to-craftart-600 rounded-full" />
                  <h2 className="text-3xl font-bold text-gray-900">Achievements & Recognition</h2>
                </div>
                <div className="space-y-4">
                  {artisan.achievements.map((achievement, index) => (
                    <div key={index} className="group">
                      <div className="bg-gradient-to-r from-craftart-50 via-white to-craftart-50 p-6 rounded-xl border border-craftart-200 hover:border-craftart-400 transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-craftart-500 to-craftart-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium text-lg leading-relaxed">{achievement}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-craftart-500 to-craftart-600 rounded-full" />
                  <h2 className="text-3xl font-bold text-gray-900">Client Reviews</h2>
                </div>
                <div className="space-y-6">
                  {artisan.reviews.map((review) => (
                    <div key={review.id} className="group">
                      <div className="bg-gradient-to-r from-white to-craftart-50 p-6 rounded-xl border border-craftart-200 hover:border-craftart-300 transition-all duration-300 hover:shadow-md">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-craftart-200 flex-shrink-0">
                            <Image
                              src={review.avatar}
                              alt={review.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-gray-900">{review.name}</h4>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      'w-4 h-4',
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    )}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-6 h-6 bg-craftart-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  Quick Stats
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between p-3 bg-craftart-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-craftart-600" />
                      <span className="text-gray-700 font-medium">Experience</span>
                    </div>
                    <span className="font-bold text-craftart-700">{artisan.yearsExperience} years</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-craftart-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 text-craftart-600" />
                      <span className="text-gray-700 font-medium">Crafts Sold</span>
                    </div>
                    <span className="font-bold text-craftart-700">{artisan.totalSales}+</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-craftart-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-craftart-600" />
                      <span className="text-gray-700 font-medium">Response Time</span>
                    </div>
                    <span className="font-bold text-craftart-700">{artisan.responseTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-craftart-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-craftart-600" />
                      <span className="text-gray-700 font-medium">Reviews</span>
                    </div>
                    <span className="font-bold text-craftart-700">{artisan.reviewCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-6 h-6 bg-craftart-500 rounded-lg flex items-center justify-center">
                    <Globe2 className="w-4 h-4 text-white" />
                  </div>
                  Languages
                </h3>
                <div className="flex flex-wrap gap-3">
                  {artisan.languages.map((language, index) => (
                    <Badge 
                      key={index} 
                      className="bg-gradient-to-r from-craftart-100 to-craftart-200 text-craftart-800 border border-craftart-300 hover:from-craftart-200 hover:to-craftart-300 transition-all duration-300 px-4 py-2 text-sm font-medium"
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability & Pricing */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Availability & Pricing</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-craftart-50 to-craftart-100 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">Price Range:</span>
                      <span className="font-bold text-craftart-700">{artisan.priceRange}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Availability:</span>
                      <span className="font-bold text-green-600">{artisan.availability}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-craftart-500 to-craftart-600 hover:from-craftart-600 hover:to-craftart-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Contact Artisan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}