'use client';

import React, { useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import {
  Star,
  Heart,
  Share2,
  Eye,
  ShoppingCart,
  Award,
  TrendingUp,
  Clock,
  MapPin,
  Users,
  Filter,
  Grid,
  List
} from 'lucide-react';

// Mock data for featured items
const featuredItems = [
  {
    id: 1,
    title: 'Handwoven Kilim Rug',
    artisan: 'Amina Hassan',
    location: 'Arusha',
    price: 125000,
    originalPrice: 150000,
    image: '/api/placeholder/400/300',
    category: 'Textile and Fiber',
    rating: 4.9,
    reviews: 23,
    likes: 156,
    views: 1240,
    description: 'Beautiful traditional kilim rug handwoven with natural dyes and local cotton',
    featured: 'Editor\'s Choice',
    badge: 'Best Seller',
    timeLeft: '2 days',
    discount: 17,
    inStock: true,
    stockCount: 3,
    tags: ['Traditional', 'Handwoven', 'Natural Dyes'],
    artisanVerified: true
  },
  {
    id: 2,
    title: 'Ebony Wood Elephant Sculpture',
    artisan: 'Joseph Mwalimu',
    location: 'Dar es Salaam',
    price: 85000,
    originalPrice: null,
    image: '/api/placeholder/400/300',
    category: 'Wood Works',
    rating: 5.0,
    reviews: 18,
    likes: 203,
    views: 890,
    description: 'Exquisite elephant sculpture carved from premium ebony wood',
    featured: 'Artisan Spotlight',
    badge: 'Premium Quality',
    timeLeft: null,
    discount: 0,
    inStock: true,
    stockCount: 1,
    tags: ['Sculpture', 'Ebony', 'Wildlife'],
    artisanVerified: true
  },
  {
    id: 3,
    title: 'Maasai Beaded Necklace Set',
    artisan: 'Mary Sankale',
    location: 'Arusha',
    price: 45000,
    originalPrice: 55000,
    image: '/api/placeholder/400/300',
    category: 'Jewellery',
    rating: 4.8,
    reviews: 31,
    likes: 89,
    views: 567,
    description: 'Traditional Maasai beaded necklace set with authentic patterns',
    featured: 'Cultural Heritage',
    badge: 'Limited Edition',
    timeLeft: '5 days',
    discount: 18,
    inStock: true,
    stockCount: 7,
    tags: ['Maasai', 'Traditional', 'Beadwork'],
    artisanVerified: true
  },
  {
    id: 4,
    title: 'Ceramic Coffee Set',
    artisan: 'Grace Kimaro',
    location: 'Moshi',
    price: 65000,
    originalPrice: null,
    image: '/api/placeholder/400/300',
    category: 'Ceramic and Glass',
    rating: 4.7,
    reviews: 15,
    likes: 124,
    views: 432,
    description: 'Hand-thrown ceramic coffee set with traditional Tanzanian motifs',
    featured: 'New Arrival',
    badge: 'Eco-Friendly',
    timeLeft: null,
    discount: 0,
    inStock: true,
    stockCount: 5,
    tags: ['Ceramic', 'Coffee', 'Traditional Motifs'],
    artisanVerified: true
  },
  {
    id: 5,
    title: 'Sisal Storage Basket',
    artisan: 'Fatuma Ali',
    location: 'Dodoma',
    price: 28000,
    originalPrice: 35000,
    image: '/api/placeholder/400/300',
    category: 'Natural Material',
    rating: 4.6,
    reviews: 42,
    likes: 67,
    views: 789,
    description: 'Durable sisal storage basket with colorful traditional patterns',
    featured: 'Trending Now',
    badge: 'Sustainable',
    timeLeft: '1 day',
    discount: 20,
    inStock: true,
    stockCount: 12,
    tags: ['Sisal', 'Storage', 'Sustainable'],
    artisanVerified: true
  },
  {
    id: 6,
    title: 'Copper Wall Art',
    artisan: 'Hassan Mwamba',
    location: 'Mwanza',
    price: 95000,
    originalPrice: null,
    image: '/api/placeholder/400/300',
    category: 'Metal Works',
    rating: 4.9,
    reviews: 8,
    likes: 145,
    views: 321,
    description: 'Contemporary copper wall art inspired by traditional Tanzanian patterns',
    featured: 'Artist Collaboration',
    badge: 'Unique Design',
    timeLeft: null,
    discount: 0,
    inStock: true,
    stockCount: 2,
    tags: ['Copper', 'Wall Art', 'Contemporary'],
    artisanVerified: true
  }
];

// Featured collections
const featuredCollections = [
  {
    id: 1,
    title: 'Heritage Collection',
    description: 'Traditional crafts preserving centuries-old techniques',
    itemCount: 24,
    image: '/api/placeholder/300/200',
    color: 'from-persian-green-600 to-persian-green-800'
  },
  {
    id: 2,
    title: 'Modern Fusion',
    description: 'Contemporary designs with traditional craftsmanship',
    itemCount: 18,
    image: '/api/placeholder/300/200',
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 3,
    title: 'Eco-Conscious',
    description: 'Sustainable crafts made from natural materials',
    itemCount: 31,
    image: '/api/placeholder/300/200',
    color: 'from-green-600 to-green-800'
  }
];

export default function FeaturedPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(featuredItems.map(item => item.category)))];

  // Filter and sort items
  const filteredItems = featuredItems
    .filter(item => {
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesSale = !showOnSaleOnly || item.discount > 0;
      return matchesCategory && matchesSale;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.likes - a.likes;
        case 'featured':
        default:
          return 0; // Keep original order for featured
      }
    });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-persian-green-600 to-persian-green-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">Curated Selection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Featured Crafts
            </h1>
            <p className="text-xl text-persian-green-100 max-w-3xl mx-auto">
              Discover our handpicked selection of exceptional crafts from Tanzania's most talented artisans. 
              Each piece tells a story of tradition, skill, and cultural heritage.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">{featuredItems.length}</div>
              <div className="text-persian-green-200 text-sm">Featured Items</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{new Set(featuredItems.map(item => item.artisan)).size}</div>
              <div className="text-persian-green-200 text-sm">Featured Artisans</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{categories.length - 1}</div>
              <div className="text-persian-green-200 text-sm">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{featuredItems.filter(item => item.discount > 0).length}</div>
              <div className="text-persian-green-200 text-sm">Special Offers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-graphite mb-4">Featured Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections showcasing the best of Tanzanian craftsmanship
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCollections.map((collection) => (
              <Card key={collection.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className={cn(
                  "relative h-48 bg-gradient-to-br",
                  collection.color
                )}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{collection.title}</h3>
                    <p className="text-sm opacity-90">{collection.itemCount} items</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{collection.description}</p>
                  <Button className="w-full group-hover:bg-persian-green-700 transition-colors">
                    Explore Collection
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showOnSaleOnly}
                  onChange={(e) => setShowOnSaleOnly(e.target.checked)}
                  className="rounded border-gray-300 text-persian-green-600 focus:ring-persian-green-500"
                />
                <span className="text-sm text-gray-700">On sale only</span>
              </label>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                >
                  <option value="featured">Featured</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === 'grid' ? 'bg-persian-green-600 text-white' : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === 'list' ? 'bg-persian-green-600 text-white' : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredItems.length} featured items
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          )}>
            {filteredItems.map((item) => (
              <Card key={item.id} className={cn(
                "group hover:shadow-xl transition-all duration-300 overflow-hidden",
                viewMode === 'list' ? 'flex flex-row' : ''
              )}>
                <div className={cn(
                  "relative overflow-hidden",
                  viewMode === 'list' ? 'w-64 h-48 flex-shrink-0' : 'h-64'
                )}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="bg-persian-green-600 text-white text-xs px-2 py-1 rounded-full">
                      {item.featured}
                    </span>
                    {item.badge && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.discount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        -{item.discount}%
                      </span>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Time left indicator */}
                  {item.timeLeft && (
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timeLeft} left
                    </div>
                  )}
                </div>
                
                <CardContent className={cn(
                  "p-6",
                  viewMode === 'list' ? 'flex-1' : ''
                )}>
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-graphite group-hover:text-persian-green-600 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        {item.views}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-600">by</span>
                      <span className="text-sm font-medium text-persian-green-600">{item.artisan}</span>
                      {item.artisanVerified && (
                        <Award className="w-4 h-4 text-persian-green-600" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                        <span className="text-gray-500">({item.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {item.stockCount} in stock
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xl font-bold text-graphite">
                        {formatPrice(item.price)}
                      </div>
                      {item.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(item.originalPrice)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button className="w-full group-hover:bg-persian-green-700 transition-colors">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* No results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No featured items found</h3>
              <p className="text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-persian-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-graphite mb-6">
            Stay Updated on Featured Items
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Be the first to know about new featured crafts and exclusive offers from our artisans
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persian-green-500"
            />
            <Button className="px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}