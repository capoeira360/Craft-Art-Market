'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, ChevronRight, Star, MapPin, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Artisan {
  id: string
  name: string
  location: string
  specialty: string
  rating: number
  reviewCount: number
  image: string
  videoBackground: string
  story: string
  yearsExperience: number
  verified: boolean
}

const artisans: Artisan[] = [
  {
    id: '1',
    name: 'Amara Mwalimu',
    location: 'Dar es Salaam',
    specialty: 'Kitenge Textiles',
    rating: 4.9,
    reviewCount: 127,
    image: '/artisans/amara.jpg',
    videoBackground: '/videos/kitenge-weaving.mp4',
    story: 'Third-generation textile artist preserving traditional Kitenge patterns with modern flair.',
    yearsExperience: 15,
    verified: true,
  },
  {
    id: '2',
    name: 'Jengo Makonde',
    location: 'Mtwara',
    specialty: 'Wood Carving',
    rating: 4.8,
    reviewCount: 89,
    image: '/artisans/jengo.jpg',
    videoBackground: '/videos/wood-carving.mp4',
    story: 'Master carver specializing in traditional Makonde sculptures and contemporary art pieces.',
    yearsExperience: 22,
    verified: true,
  },
  {
    id: '3',
    name: 'Neema Tingatinga',
    location: 'Arusha',
    specialty: 'Tingatinga Painting',
    rating: 4.9,
    reviewCount: 156,
    image: '/artisans/neema.jpg',
    videoBackground: '/videos/tingatinga-painting.mp4',
    story: 'Renowned Tingatinga artist bringing vibrant African wildlife and culture to canvas.',
    yearsExperience: 18,
    verified: true,
  },
  {
    id: '4',
    name: 'Baraka Maasai',
    location: 'Ngorongoro',
    specialty: 'Beadwork & Jewelry',
    rating: 4.7,
    reviewCount: 73,
    image: '/artisans/baraka.jpg',
    videoBackground: '/videos/beadwork.mp4',
    story: 'Traditional Maasai beadwork artist creating authentic jewelry with cultural significance.',
    yearsExperience: 12,
    verified: true,
  },
  {
    id: '5',
    name: 'Fatuma Zanzibari',
    location: 'Stone Town',
    specialty: 'Henna Art',
    rating: 4.8,
    reviewCount: 94,
    image: '/artisans/fatuma.jpg',
    videoBackground: '/videos/henna-art.mp4',
    story: 'Master henna artist blending Swahili, Arab, and Indian influences in intricate designs.',
    yearsExperience: 20,
    verified: true,
  },
]

export function ArtisanCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % artisans.length)
      }, 5000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    // Animate carousel transition
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        x: `-${currentIndex * 100}%`,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    // Handle video playback
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch(() => {
            // Handle autoplay restrictions
          })
        } else {
          video.pause()
        }
      }
    })
  }, [currentIndex])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 3000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + artisans.length) % artisans.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % artisans.length)
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Carousel */}
      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-xl">
        <div 
          ref={carouselRef}
          className="flex h-full transition-transform duration-800 ease-out"
          style={{ width: `${artisans.length * 100}%` }}
        >
          {artisans.map((artisan, index) => (
            <div key={artisan.id} className="artisan-card relative w-full h-full flex-shrink-0">
              {/* Video Background */}
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                className="artisan-video absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                poster={artisan.image}
                onError={(e) => {
                  // Hide video on error and show poster image
                  const video = e.target as HTMLVideoElement;
                  video.style.display = 'none';
                }}
              >
                <source src={artisan.videoBackground} type="video/mp4" />
              </video>
              {/* Fallback background image */}
              <div 
                className="artisan-bg absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${artisan.image})` }}
              />
              
              {/* Overlay */}
              <div className="artisan-overlay absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/30"></div>
              
              {/* Content - Repositioned for better fit */}
               <div className="artisan-content absolute inset-0 flex flex-col justify-end pb-8 px-6 md:px-12">
                 {/* Artisan Header - Compact layout */}
                 <div className="flex items-center gap-3 mb-4">
                   <div className="relative">
                     <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-persian-green-500 flex items-center justify-center border-3 border-white/30">
                       <span className="text-sm md:text-base font-bold text-white">
                         {artisan.name.split(' ').map(n => n[0]).join('')}
                       </span>
                     </div>
                     {artisan.verified && (
                       <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1">
                         <span className="w-1 h-1 bg-white rounded-full"></span>
                         <span className="text-xs">✓</span>
                       </div>
                     )}
                   </div>
                   <div className="flex-1">
                     <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">
                       {artisan.name}
                     </h2>
                     <div className="flex items-center gap-3 text-sm text-white/90">
                       <span className="flex items-center gap-1">
                         <MapPin className="w-3 h-3" />
                         {artisan.location}
                       </span>
                       <div className="flex items-center gap-1">
                         <Star className="w-3 h-3 text-yellow-400 fill-current" />
                         <span>{artisan.rating} ({artisan.reviewCount})</span>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Specialty - More compact */}
                 <div className="mb-3">
                   <span className="text-teal-300 text-sm md:text-base font-semibold bg-black/30 px-3 py-1 rounded-full">
                     {artisan.specialty} • {artisan.yearsExperience}y exp
                   </span>
                 </div>

                 {/* Story - Truncated for better fit */}
                 <div className="mb-4 max-w-lg">
                   <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-2">
                     {artisan.story}
                   </p>
                 </div>

                 {/* Action Button - Positioned at bottom */}
                 <div className="flex justify-start">
                   <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
                     View Portfolio
                   </button>
                 </div>
               </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-3">
        {artisans.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-persian-green-500 scale-125'
                : 'bg-gray-300 hover:bg-persian-green-300'
            }`}
          />
        ))}
      </div>

      {/* Artisan Cards Preview */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {artisans.map((artisan, index) => (
          <Card 
            key={artisan.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg paper-grain ${
              index === currentIndex ? 'ring-2 ring-persian-green-500 scale-105' : ''
            }`}
            onClick={() => goToSlide(index)}
          >
            <CardContent className="p-4">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${artisan.image})` }}
                />
              </div>
              <h4 className="font-semibold text-graphite mb-1">{artisan.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{artisan.specialty}</p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{artisan.rating}</span>
                </div>
                <span className="text-gray-500">{artisan.location}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}