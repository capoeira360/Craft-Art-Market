'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight, Clock, User, Eye, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Story {
  id: string
  title: string
  excerpt: string
  author: string
  readTime: number
  views: number
  likes: number
  category: string
  image: string
  publishedAt: string
  featured: boolean
}

const stories: Story[] = [
  {
    id: '1',
    title: 'The Art of Tingatinga: Colors That Tell Stories',
    excerpt: 'Discover how Edward Saidi Tingatinga revolutionized African art with his vibrant paintings that capture the essence of Tanzanian wildlife and culture.',
    author: 'Amara Mwalimu',
    readTime: 8,
    views: 2847,
    likes: 156,
    category: 'Traditional Art',
    image: '/stories/tingatinga-art.jpg',
    publishedAt: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: 'Kitenge Patterns: Weaving Heritage into Modern Fashion',
    excerpt: 'Explore the rich symbolism behind traditional Kitenge patterns and how contemporary designers are preserving this cultural treasure.',
    author: 'Jengo Makonde',
    readTime: 6,
    views: 1923,
    likes: 89,
    category: 'Textiles',
    image: '/stories/kitenge-patterns.jpg',
    publishedAt: '2024-01-12',
    featured: true
  },
  {
    id: '3',
    title: 'Makonde Sculptures: Carving Stories in Ebony',
    excerpt: 'Journey into the world of Makonde wood carving, where master artisans transform ebony into powerful expressions of African spirituality.',
    author: 'Neema Tingatinga',
    readTime: 10,
    views: 3156,
    likes: 203,
    category: 'Wood Carving',
    image: '/stories/makonde-sculptures.jpg',
    publishedAt: '2024-01-10',
    featured: false
  },
  {
    id: '4',
    title: 'Maasai Beadwork: Every Bead Tells a Story',
    excerpt: 'Uncover the intricate meanings behind Maasai beadwork, where colors and patterns communicate age, status, and tribal identity.',
    author: 'Baraka Maasai',
    readTime: 7,
    views: 2134,
    likes: 127,
    category: 'Jewelry',
    image: '/stories/maasai-beadwork.jpg',
    publishedAt: '2024-01-08',
    featured: false
  },
  {
    id: '5',
    title: 'Zanzibar Henna: Ancient Art Meets Modern Expression',
    excerpt: 'Discover how Zanzibari henna artists blend Arab, Indian, and African influences to create stunning temporary masterpieces.',
    author: 'Fatuma Zanzibari',
    readTime: 5,
    views: 1567,
    likes: 94,
    category: 'Body Art',
    image: '/stories/zanzibar-henna.jpg',
    publishedAt: '2024-01-05',
    featured: false
  },
  {
    id: '6',
    title: 'The Revival of Traditional Pottery in Modern Tanzania',
    excerpt: 'Meet the artisans who are breathing new life into ancient pottery techniques, creating functional art for contemporary homes.',
    author: 'Mwalimu Pottery',
    readTime: 9,
    views: 1789,
    likes: 112,
    category: 'Pottery',
    image: '/stories/traditional-pottery.jpg',
    publishedAt: '2024-01-03',
    featured: false
  }
]

export default function StoriesPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const storiesRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Hero parallax effect
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      // Story cards animation
      gsap.fromTo('.story-card', 
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storiesRef.current,
            start: 'top 80%',
          }
        }
      )

      // Parallax illustrations
      gsap.to('.tingatinga-element', {
        y: -100,
        rotation: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })

    return () => ctx.revert()
  }, [])

  const featuredStories = stories.filter(story => story.featured)
  const regularStories = stories.filter(story => !story.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="parallax-bg absolute inset-0 gradient-persian-1"></div>
        <div className="absolute inset-0 kitenge-overlay opacity-20"></div>
        
        {/* Floating Tingatinga Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="tingatinga-element absolute top-20 left-10 w-32 h-32 bg-copper-patina rounded-full opacity-30 animate-pulse"></div>
          <div className="tingatinga-element absolute top-1/3 right-16 w-24 h-24 bg-zanzibar-twilight rounded-full opacity-20 animate-bounce"></div>
          <div className="tingatinga-element absolute bottom-32 left-1/4 w-20 h-20 bg-persian-green-300 rounded-full opacity-25 animate-ping"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory to-copper-patina">Stories</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Immerse yourself in the rich tapestry of Tanzanian craftsmanship. 
            Discover the stories, traditions, and artisans behind every masterpiece.
          </p>
          <Button className="ceramic-button text-lg px-8 py-4 rounded-xl font-semibold">
            Start Reading
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-graphite mb-4">
              Featured <span className="text-persian-green-500">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive deep into the most captivating tales of Tanzanian craftsmanship
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredStories.map((story, index) => (
              <Card key={story.id} className={`story-card group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden paper-grain ${index === 0 ? 'md:col-span-2' : ''}`}>
                <div className="relative">
                  <div 
                    className={`bg-cover bg-center transition-transform duration-500 group-hover:scale-105 ${index === 0 ? 'h-80' : 'h-64'}`}
                    style={{ backgroundImage: `url(${story.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-persian-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {story.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <h3 className={`font-bold text-graphite mb-4 group-hover:text-persian-green-500 transition-colors ${index === 0 ? 'text-3xl' : 'text-2xl'}`}>
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {story.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{story.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{story.readTime} min read</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{story.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{story.likes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section ref={parallaxRef} className="relative py-32 overflow-hidden gradient-persian-6">
        <div className="absolute inset-0 kitenge-overlay opacity-10"></div>
        
        {/* Animated Tingatinga Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="tingatinga-element absolute top-16 left-1/4 w-40 h-40 bg-ivory/20 rounded-full"></div>
          <div className="tingatinga-element absolute bottom-20 right-1/3 w-32 h-32 bg-copper-patina/30 rounded-full"></div>
          <div className="tingatinga-element absolute top-1/2 left-16 w-24 h-24 bg-zanzibar-twilight/25 rounded-full"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Every Craft Has a Soul
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Behind every piece lies generations of wisdom, cultural heritage, and the passionate hands of master artisans.
          </p>
        </div>
      </section>

      {/* All Stories */}
      <section ref={storiesRef} className="py-20 bg-gray-50 paper-grain">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-graphite mb-4">
              More <span className="text-persian-green-500">Stories</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {regularStories.map((story) => (
              <Card key={story.id} className="story-card group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden paper-grain">
                <div className="relative">
                  <div 
                    className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${story.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-persian-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {story.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-graphite mb-3 group-hover:text-persian-green-500 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {story.excerpt.substring(0, 120)}...
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span>{story.author}</span>
                        <span>•</span>
                        <span>{story.readTime} min</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{story.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{story.likes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-400">
                        Published {formatDate(story.publishedAt)}
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="ceramic-button text-lg px-8 py-3">
              Load More Stories
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}