'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  ArrowRight,
  Users,
  Package,
  Star,
  TrendingUp,
  Eye,
  Heart,
  Filter,
  Grid,
  List,
  Share2,
  Bookmark,
  ChevronDown,
  Sparkles,
  Award,
  Clock,
  MapPin
} from 'lucide-react';

// Enhanced mock data for categories
const categories = [
  {
    id: 1,
    name: 'Ceramic and Glass',
    description: 'Hand-thrown pottery, decorative ceramics, glasswork, and functional items reflecting traditional techniques passed down through generations',
    image: '/api/placeholder/400/300',
    itemCount: 67,
    artisanCount: 12,
    averageRating: 4.6,
    trending: false,
    subcategories: ['Bowls & Plates', 'Vases', 'Decorative Items', 'Traditional Pots', 'Glass Art'],
    priceRange: '12,000 - 180,000 TZS',
    featured: true,
    newItems: 5,
    popularityScore: 85,
    region: 'Coastal Tanzania',
    establishedYear: 1890
  },
  {
    id: 2,
    name: 'Wood Works',
    description: 'Exquisite wood sculptures, masks, and functional items carved from ebony, mahogany, and other local woods by master craftsmen',
    image: '/api/placeholder/400/300',
    itemCount: 89,
    artisanCount: 15,
    averageRating: 4.9,
    trending: false,
    subcategories: ['Sculptures', 'Masks', 'Furniture', 'Decorative Items', 'Utensils'],
    priceRange: '25,000 - 500,000 TZS',
    featured: true,
    newItems: 8,
    popularityScore: 92,
    region: 'Central Tanzania',
    establishedYear: 1850
  },
  {
    id: 3,
    name: 'Jewellery',
    description: 'Colorful beaded jewelry, traditional ornaments, and contemporary accessories with deep cultural significance and artistic beauty',
    image: '/api/placeholder/400/300',
    itemCount: 234,
    artisanCount: 31,
    averageRating: 4.7,
    trending: true,
    subcategories: ['Necklaces', 'Bracelets', 'Earrings', 'Traditional Ornaments', 'Hair Accessories'],
    priceRange: '8,000 - 150,000 TZS',
    featured: true,
    newItems: 12,
    popularityScore: 88,
    region: 'Northern Tanzania',
    establishedYear: 1920
  },
  {
    id: 4,
    name: 'Textile and Fiber',
    description: 'Traditional woven fabrics, clothing, and textile art including kanga, kitenge, and handwoven rugs that tell stories of our heritage',
    image: '/api/placeholder/400/300',
    itemCount: 156,
    artisanCount: 23,
    averageRating: 4.8,
    trending: true,
    subcategories: ['Kanga & Kitenge', 'Handwoven Rugs', 'Traditional Clothing', 'Batik Art', 'Embroidered Items'],
    priceRange: '15,000 - 200,000 TZS',
    featured: true,
    newItems: 15,
    popularityScore: 90,
    region: 'Eastern Tanzania',
    establishedYear: 1880
  },
  {
    id: 5,
    name: 'Visual Art',
    description: 'Paintings, drawings, prints, and contemporary visual art pieces by talented Tanzanian artists expressing modern and traditional themes',
    image: '/api/placeholder/400/300',
    itemCount: 92,
    artisanCount: 19,
    averageRating: 4.8,
    trending: true,
    subcategories: ['Paintings', 'Drawings', 'Prints', 'Mixed Media', 'Digital Art'],
    priceRange: '20,000 - 350,000 TZS',
    featured: false,
    newItems: 7,
    popularityScore: 78,
    region: 'Urban Centers',
    establishedYear: 1960
  },
  {
    id: 6,
    name: 'Metal Works',
    description: 'Traditional and contemporary metal crafts including copper, brass, and iron work showcasing exceptional skill and artistry',
    image: '/api/placeholder/400/300',
    itemCount: 45,
    artisanCount: 8,
    averageRating: 4.7,
    trending: false,
    subcategories: ['Sculptures', 'Jewelry', 'Decorative Items', 'Functional Items', 'Traditional Tools'],
    priceRange: '20,000 - 300,000 TZS',
    featured: false,
    newItems: 3,
    popularityScore: 72,
    region: 'Western Tanzania',
    establishedYear: 1900
  },
  {
    id: 7,
    name: 'Paper Works',
    description: 'Handmade paper crafts, origami, bookbinding, and paper-based art pieces that celebrate the beauty of sustainable materials',
    image: '/api/placeholder/400/300',
    itemCount: 38,
    artisanCount: 7,
    averageRating: 4.5,
    trending: false,
    subcategories: ['Handmade Paper', 'Books & Journals', 'Paper Art', 'Greeting Cards', 'Packaging'],
    priceRange: '5,000 - 80,000 TZS',
    featured: false,
    newItems: 2,
    popularityScore: 65,
    region: 'Urban Centers',
    establishedYear: 1970
  },
  {
    id: 8,
    name: 'Leather Works',
    description: 'Handcrafted leather items including bags, shoes, and traditional accessories made with time-honored techniques and quality materials',
    image: '/api/placeholder/400/300',
    itemCount: 52,
    artisanCount: 9,
    averageRating: 4.5,
    trending: false,
    subcategories: ['Bags & Purses', 'Shoes & Sandals', 'Belts', 'Traditional Items', 'Accessories'],
    priceRange: '15,000 - 250,000 TZS',
    featured: false,
    newItems: 4,
    popularityScore: 70,
    region: 'Southern Tanzania',
    establishedYear: 1910
  },
  {
    id: 9,
    name: 'Natural Material',
    description: 'Traditional baskets, mats, and woven items made from sisal, palm leaves, and other natural materials in harmony with nature',
    image: '/api/placeholder/400/300',
    itemCount: 78,
    artisanCount: 18,
    averageRating: 4.8,
    trending: true,
    subcategories: ['Storage Baskets', 'Decorative Baskets', 'Mats', 'Bags', 'Wall Hangings'],
    priceRange: '10,000 - 120,000 TZS',
    featured: true,
    newItems: 9,
    popularityScore: 86,
    region: 'Rural Tanzania',
    establishedYear: 1800
  },
  {
    id: 10,
    name: 'Upcycling',
    description: 'Creative items made from recycled and repurposed materials, promoting sustainability while creating beautiful and functional art',
    image: '/api/placeholder/400/300',
    itemCount: 43,
    artisanCount: 11,
    averageRating: 4.6,
    trending: true,
    subcategories: ['Recycled Art', 'Furniture', 'Decorative Items', 'Functional Items', 'Fashion'],
    priceRange: '8,000 - 150,000 TZS',
    featured: false,
    newItems: 6,
    popularityScore: 75,
    region: 'Urban Centers',
    establishedYear: 2000
  },
  {
    id: 11,
    name: 'Toys and Dolls',
    description: 'Traditional and contemporary handmade toys, dolls, and children\'s items that spark imagination and preserve cultural stories',
    image: '/api/placeholder/400/300',
    itemCount: 29,
    artisanCount: 6,
    averageRating: 4.7,
    trending: false,
    subcategories: ['Traditional Dolls', 'Wooden Toys', 'Stuffed Animals', 'Educational Toys', 'Games'],
    priceRange: '5,000 - 60,000 TZS',
    featured: false,
    newItems: 1,
    popularityScore: 68,
    region: 'Central Tanzania',
    establishedYear: 1950
  }
];

// Enhanced stats data
const stats = [
  {
    label: 'Total Categories',
    value: 11,
    icon: Package,
    color: 'text-persian-green-600',
    bgColor: 'bg-persian-green-100',
    description: 'Diverse craft categories'
  },
  {
    label: 'Active Artisans',
    value: 159,
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: 'Skilled craftspeople'
  },
  {
    label: 'Total Items',
    value: 923,
    icon: Eye,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: 'Unique handcrafted items'
  },
  {
    label: 'Avg Rating',
    value: 4.7,
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    description: 'Customer satisfaction'
  }
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const categoriesRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animation
    const heroTl = gsap.timeline();
    heroTl.from('.hero-title', {
      duration: 1.2,
      y: 100,
      opacity: 0,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.8')
    .from('.hero-search', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.6');

    // Stats animation
    gsap.from('.stat-card', {
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: statsRef.current,
        start: 'top 80%'
      }
    });

    // Categories animation
    gsap.from('.category-card', {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: categoriesRef.current,
        start: 'top 80%'
      }
    });

    // Floating animation for hero background elements
    gsap.to('.floating-element', {
      y: -20,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animated counter for stats
  useEffect(() => {
    const animateCounters = () => {
      stats.forEach((stat, index) => {
        const element = document.querySelector(`#stat-${index}`);
        if (element) {
          gsap.to(element, {
            innerHTML: stat.value,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              once: true
            }
          });
        }
      });
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort categories
  const filteredCategories = categories
    .filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           category.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFeatured = !showFeaturedOnly || category.featured;
      const matchesTrending = !showTrendingOnly || category.trending;
      
      return matchesSearch && matchesFeatured && matchesTrending;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'items':
          return b.itemCount - a.itemCount;
        case 'artisans':
          return b.artisanCount - a.artisanCount;
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'popularity':
          return b.popularityScore - a.popularityScore;
        case 'newest':
          return b.newItems - a.newItems;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const toggleFavorite = (categoryId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(categoryId)) {
      newFavorites.delete(categoryId);
    } else {
      newFavorites.add(categoryId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-white to-persian-green-50">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-persian-green-600 via-persian-green-700 to-persian-green-800 text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-persian-green-300/20 rounded-full blur-lg"></div>
          <div className="floating-element absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          <div className="floating-element absolute bottom-32 right-1/3 w-28 h-28 bg-persian-green-400/15 rounded-full blur-xl"></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-persian-green-900/20 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="hero-title mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-persian-green-100 bg-clip-text text-transparent">
              Craft Categories
            </h1>
            <div className="flex items-center justify-center gap-2 text-persian-green-200">
              <Sparkles className="w-6 h-6" />
              <span className="text-lg font-medium">Discover Authentic Tanzanian Craftsmanship</span>
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          
          <p className="hero-subtitle text-xl md:text-2xl text-persian-green-100 max-w-4xl mx-auto mb-12 leading-relaxed">
            Explore our diverse collection of traditional Tanzanian crafts, organized by category. 
            Each category represents generations of cultural heritage, artistic excellence, and the 
            passionate dedication of our master artisans.
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="hero-search relative max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search categories, subcategories, or artisan specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl text-graphite text-lg bg-white/95 backdrop-blur-sm border-0 shadow-2xl focus:outline-none focus:ring-4 focus:ring-persian-green-300/50 focus:shadow-3xl transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              )}
            </div>
            
            {/* Quick Search Suggestions */}
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-10">
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-2">Popular searches:</div>
                  <div className="flex flex-wrap gap-2">
                    {['Jewelry', 'Wood Carvings', 'Textiles', 'Ceramics'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchQuery(suggestion)}
                        className="px-3 py-1 bg-persian-green-50 text-persian-green-700 rounded-full text-sm hover:bg-persian-green-100 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section ref={statsRef} className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-4">
              Our Marketplace at a <span className="text-persian-green-600">Glance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the scale and diversity of our artisan community
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="stat-card text-center group">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                    stat.bgColor
                  )}>
                    <IconComponent className={cn("w-8 h-8", stat.color)} />
                  </div>
                  <div className="text-4xl font-bold text-graphite mb-2">
                    <span id={`stat-${index}`}>0</span>
                    {stat.label === 'Avg Rating' && <span className="text-2xl">★</span>}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Filters and Controls */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="rounded border-gray-300 text-persian-green-600 focus:ring-persian-green-500"
                />
                <span className="text-sm text-gray-700 flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Featured only
                </span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTrendingOnly}
                  onChange={(e) => setShowTrendingOnly(e.target.checked)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Trending only
                </span>
              </label>
            </div>
            
            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persian-green-500 bg-white"
                >
                  <option value="name">Name</option>
                  <option value="items">Number of Items</option>
                  <option value="artisans">Number of Artisans</option>
                  <option value="rating">Average Rating</option>
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest Items</option>
                </select>
              </div>
              
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === 'grid' ? 'bg-persian-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === 'list' ? 'bg-persian-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredCategories.length}</span> of <span className="font-semibold">{categories.length}</span> categories
            </div>
            
            {(showFeaturedOnly || showTrendingOnly || searchQuery) && (
              <button
                onClick={() => {
                  setShowFeaturedOnly(false);
                  setShowTrendingOnly(false);
                  setSearchQuery('');
                }}
                className="text-sm text-persian-green-600 hover:text-persian-green-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Grid */}
      <section ref={categoriesRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category) => (
                <Card key={category.id} className="category-card group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Enhanced Overlay Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {category.featured && (
                        <span className="bg-gradient-to-r from-persian-green-600 to-persian-green-700 text-white text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                      {category.trending && (
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                      {category.newItems > 0 && (
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {category.newItems} New
                        </span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => toggleFavorite(category.id)}
                        className={cn(
                          "p-2 rounded-full shadow-lg transition-all duration-300",
                          favorites.has(category.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/90 text-gray-600 hover:bg-white"
                        )}
                      >
                        <Heart className={cn("w-4 h-4", favorites.has(category.id) && "fill-current")} />
                      </button>
                      <button className="p-2 bg-white/90 text-gray-600 rounded-full shadow-lg hover:bg-white transition-all duration-300">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      {category.itemCount} items • {category.artisanCount} artisans
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-graphite mb-2 group-hover:text-persian-green-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Enhanced Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-persian-green-100 rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 text-persian-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-graphite">{category.itemCount}</div>
                          <div className="text-gray-500 text-xs">Items</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-graphite">{category.artisanCount}</div>
                          <div className="text-gray-500 text-xs">Artisans</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Star className="w-4 h-4 text-yellow-600 fill-current" />
                        </div>
                        <div>
                          <div className="font-semibold text-graphite">{category.averageRating}</div>
                          <div className="text-gray-500 text-xs">Rating</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-graphite text-xs">{category.region}</div>
                          <div className="text-gray-500 text-xs">Region</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price Range */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Price Range</div>
                      <div className="font-semibold text-persian-green-600">{category.priceRange}</div>
                    </div>
                    
                    {/* Subcategories */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Subcategories:</h4>
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.slice(0, 3).map((sub, index) => (
                          <span key={index} className="text-xs bg-persian-green-50 text-persian-green-700 px-2 py-1 rounded-full border border-persian-green-200">
                            {sub}
                          </span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="text-xs text-gray-500 px-2 py-1">+{category.subcategories.length - 3} more</span>
                        )}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-persian-green-600 to-persian-green-700 hover:from-persian-green-700 hover:to-persian-green-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                      Explore Category
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-6">
              {filteredCategories.map((category) => (
                <Card key={category.id} className="category-card group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {category.featured && (
                          <span className="bg-persian-green-600 text-white text-xs px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                        {category.trending && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                            Trending
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-graphite mb-2 group-hover:text-persian-green-600 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleFavorite(category.id)}
                            className={cn(
                              "p-2 rounded-full transition-all duration-300",
                              favorites.has(category.id)
                                ? "bg-red-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            )}
                          >
                            <Heart className={cn("w-4 h-4", favorites.has(category.id) && "fill-current")} />
                          </button>
                          <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-300">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Stats Row */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-graphite">{category.itemCount}</div>
                          <div className="text-xs text-gray-500">Items</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-graphite">{category.artisanCount}</div>
                          <div className="text-xs text-gray-500">Artisans</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-graphite">{category.averageRating}★</div>
                          <div className="text-xs text-gray-500">Rating</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-bold text-persian-green-600">{category.priceRange}</div>
                          <div className="text-xs text-gray-500">Price Range</div>
                        </div>
                      </div>
                      
                      {/* Subcategories */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.map((sub, index) => (
                            <span key={index} className="text-xs bg-persian-green-50 text-persian-green-700 px-3 py-1 rounded-full border border-persian-green-200">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-gradient-to-r from-persian-green-600 to-persian-green-700 hover:from-persian-green-700 hover:to-persian-green-800">
                          Explore Category
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" className="px-6">
                          Quick View
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {/* No results */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-500 mb-4">No categories found</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                {searchQuery 
                  ? `No categories match "${searchQuery}". Try adjusting your search or filters.`
                  : 'Try adjusting your filters to see more categories.'
                }
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setShowFeaturedOnly(false);
                  setShowTrendingOnly(false);
                }}
                variant="outline"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-persian-green-50 via-white to-persian-green-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-persian-green-600 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-persian-green-600 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-persian-green-600 rotate-45"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-persian-green-600 rounded-full"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-graphite mb-6">
              Can't find what you're <span className="text-persian-green-600">looking for?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Browse all crafts, explore our featured collections, or contact our expert team 
              to help you discover the perfect handcrafted piece that speaks to your heart.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-persian-green-600 to-persian-green-700 hover:from-persian-green-700 hover:to-persian-green-800 shadow-xl hover:shadow-2xl transition-all duration-300">
              <Package className="w-5 h-5 mr-2" />
              Browse All Crafts
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 border-persian-green-600 text-persian-green-600 hover:bg-persian-green-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Users className="w-5 h-5 mr-2" />
              Contact Our Experts
            </Button>
          </div>
          
          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-persian-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-persian-green-600" />
              </div>
              <h4 className="font-semibold text-graphite mb-2">Quick Response</h4>
              <p className="text-sm text-gray-600">Get expert recommendations within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-persian-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-persian-green-600" />
              </div>
              <h4 className="font-semibold text-graphite mb-2">Curated Selection</h4>
              <p className="text-sm text-gray-600">Handpicked items by cultural experts</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-persian-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-persian-green-600" />
              </div>
              <h4 className="font-semibold text-graphite mb-2">Authentic Stories</h4>
              <p className="text-sm text-gray-600">Every piece comes with its cultural story</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}