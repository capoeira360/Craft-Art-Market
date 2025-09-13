'use client';

import React, { useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  MapPin,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';

// Mock data for crafts
const crafts = [
  {
    id: 1,
    name: 'Handwoven Kilim Rug',
    artisan: 'Amara Mwalimu',
    location: 'Dar es Salaam',
    price: 125000,
    originalPrice: 150000,
    rating: 4.8,
    reviews: 24,
    image: '/api/placeholder/300/300',
    category: 'Textile and Fiber',
    featured: true,
    inStock: true,
    description: 'Traditional Tanzanian kilim rug with geometric patterns'
  },
  {
    id: 2,
    name: 'Ebony Wood Sculpture',
    artisan: 'Joseph Kimaro',
    location: 'Arusha',
    price: 85000,
    originalPrice: null,
    rating: 4.9,
    reviews: 18,
    image: '/api/placeholder/300/300',
    category: 'Woodwork',
    featured: false,
    inStock: true,
    description: 'Hand-carved ebony sculpture depicting traditional Maasai warrior'
  },
  {
    id: 3,
    name: 'Beaded Jewelry Set',
    artisan: 'Fatuma Said',
    location: 'Zanzibar',
    price: 45000,
    originalPrice: 55000,
    rating: 4.7,
    reviews: 31,
    image: '/api/placeholder/300/300',
    category: 'Jewellery',
    featured: true,
    inStock: true,
    description: 'Colorful beaded necklace and earring set with traditional patterns'
  },
  {
    id: 4,
    name: 'Ceramic Pottery Bowl',
    artisan: 'Hassan Mwamba',
    location: 'Mwanza',
    price: 35000,
    originalPrice: null,
    rating: 4.6,
    reviews: 12,
    image: '/api/placeholder/300/300',
    category: 'Ceramic and Glass',
    featured: false,
    inStock: true,
    description: 'Hand-thrown ceramic bowl with traditional Tanzanian motifs'
  },
  {
    id: 5,
    name: 'Woven Basket Collection',
    artisan: 'Grace Mollel',
    location: 'Kilimanjaro',
    price: 65000,
    originalPrice: 75000,
    rating: 4.8,
    reviews: 19,
    image: '/api/placeholder/300/300',
    category: 'Natural Material',
    featured: false,
    inStock: false,
    description: 'Set of three traditional sisal baskets in different sizes'
  },
  {
    id: 6,
    name: 'Batik Fabric Art',
    artisan: 'Rehema Juma',
    location: 'Dar es Salaam',
    price: 95000,
    originalPrice: null,
    rating: 4.9,
    reviews: 27,
    image: '/api/placeholder/300/300',
    category: 'Textiles',
    featured: true,
    inStock: true,
    description: 'Beautiful batik fabric artwork depicting Tanzanian wildlife'
  }
];

const categories = [
  'All Categories',
  'Ceramic and Glass',
  'Wood Works',
  'Jewellery',
  'Textile and Fiber',
  'Visual Art',
  'Metal Works',
  'Paper Works',
  'Leather Works',
  'Natural Material',
  'Upcycling',
  'Toys and Dolls'
];

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Best Rating', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' }
];

export default function CraftsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Filter and sort crafts
  const filteredCrafts = crafts
    .filter(craft => {
      const matchesSearch = craft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           craft.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           craft.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || craft.category === selectedCategory;
      const matchesPrice = craft.price >= priceRange[0] && craft.price <= priceRange[1];
      const matchesStock = !showInStockOnly || craft.inStock;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'featured':
          return b.featured ? 1 : -1;
        default:
          return 0;
      }
    });

  const toggleFavorite = (craftId: number) => {
    setFavorites(prev => 
      prev.includes(craftId) 
        ? prev.filter(id => id !== craftId)
        : [...prev, craftId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-persian-green-600 to-persian-green-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Browse Authentic Tanzanian Crafts
            </h1>
            <p className="text-xl text-persian-green-100 max-w-3xl mx-auto">
              Discover unique handcrafted items made by talented artisans across Tanzania. 
              Each piece tells a story of tradition, culture, and exceptional craftsmanship.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search crafts, artisans, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-graphite text-lg focus:outline-none focus:ring-2 focus:ring-persian-green-300"
            />
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left side - Filters */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persian-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Right side - Sort and View */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredCrafts.length} of {crafts.length} crafts
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Crafts Grid/List */}
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          )}>
            {filteredCrafts.map((craft) => (
              <Card key={craft.id} className={cn(
                "group hover:shadow-lg transition-all duration-300",
                viewMode === 'list' && "flex flex-row",
                !craft.inStock && "opacity-75"
              )}>
                <div className={cn(
                  "relative overflow-hidden",
                  viewMode === 'grid' ? "aspect-square" : "w-48 h-48 flex-shrink-0"
                )}>
                  <img
                    src={craft.image}
                    alt={craft.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay buttons */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                      onClick={() => toggleFavorite(craft.id)}
                    >
                      <Heart className={cn(
                        "w-4 h-4",
                        favorites.includes(craft.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      )} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                  
                  {/* Featured badge */}
                  {craft.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-persian-green-600 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Out of stock overlay */}
                  {!craft.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                
                <CardContent className={cn(
                  "p-4",
                  viewMode === 'list' && "flex-1"
                )}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-graphite group-hover:text-persian-green-600 transition-colors">
                        {craft.name}
                      </h3>
                      <p className="text-sm text-gray-600">{craft.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-persian-green-600">
                        {formatPrice(craft.price)}
                      </div>
                      {craft.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(craft.originalPrice)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{craft.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({craft.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{craft.artisan}, {craft.location}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {craft.description}
                  </p>
                  
                  <Button 
                    className="w-full" 
                    disabled={!craft.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {craft.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* No results */}
          {filteredCrafts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No crafts found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}