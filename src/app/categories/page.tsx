'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, Share2, Eye, TrendingUp, Star, Users, ShoppingBag, Award, ChevronRight, Grid, List } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

// Enhanced mock data with more detailed information
const categories = [
  {
    id: 1,
    name: 'Traditional Pottery',
    description: 'Handcrafted ceramic pieces with authentic Persian designs and glazing techniques',
    image: '/images/pottery-hero.jpg',
    artisanCount: 45,
    productCount: 234,
    priceRange: '$25 - $150',
    difficulty: 'Intermediate',
    rating: 4.8,
    trending: true,
    featured: true,
    tags: ['Ceramic', 'Traditional', 'Decorative'],
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 2,
    name: 'Persian Carpets',
    description: 'Exquisite hand-woven carpets featuring intricate patterns and premium materials',
    image: '/images/carpets-collection.jpg',
    artisanCount: 32,
    productCount: 156,
    priceRange: '$200 - $2000',
    difficulty: 'Advanced',
    rating: 4.9,
    trending: true,
    featured: true,
    tags: ['Textile', 'Luxury', 'Heritage'],
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 3,
    name: 'Metalwork & Jewelry',
    description: 'Intricate silver and gold jewelry with traditional Persian motifs and gemstones',
    image: '/images/jewelry-showcase.jpg',
    artisanCount: 28,
    productCount: 189,
    priceRange: '$50 - $500',
    difficulty: 'Advanced',
    rating: 4.7,
    trending: false,
    featured: true,
    tags: ['Jewelry', 'Precious Metals', 'Artisan'],
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 4,
    name: 'Calligraphy Art',
    description: 'Beautiful Persian calligraphy pieces combining traditional scripts with modern aesthetics',
    image: '/images/calligraphy-art.jpg',
    artisanCount: 18,
    productCount: 92,
    priceRange: '$30 - $200',
    difficulty: 'Beginner',
    rating: 4.6,
    trending: true,
    featured: false,
    tags: ['Art', 'Typography', 'Cultural'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 5,
    name: 'Textile Arts',
    description: 'Traditional fabric arts including embroidery, weaving, and decorative textiles',
    image: '/images/textile-arts.jpg',
    artisanCount: 35,
    productCount: 167,
    priceRange: '$40 - $300',
    difficulty: 'Intermediate',
    rating: 4.5,
    trending: false,
    featured: true,
    tags: ['Textile', 'Embroidery', 'Traditional'],
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 6,
    name: 'Woodcraft',
    description: 'Handcrafted wooden items featuring traditional Persian woodworking techniques',
    image: '/images/woodcraft-items.jpg',
    artisanCount: 22,
    productCount: 134,
    priceRange: '$35 - $250',
    difficulty: 'Intermediate',
    rating: 4.4,
    trending: false,
    featured: false,
    tags: ['Wood', 'Furniture', 'Decorative'],
    color: 'from-orange-500 to-red-600'
  }
];

const statsData = [
  { label: 'Total Categories', value: 12, icon: Grid, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { label: 'Active Artisans', value: 180, icon: Users, color: 'text-green-600', bgColor: 'bg-green-50' },
  { label: 'Featured Products', value: 972, icon: ShoppingBag, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { label: 'Avg Rating', value: 4.7, icon: Star, color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
];

const trendingCategories = [
  { name: 'Traditional Pottery', growth: '+23%', color: 'text-green-600' },
  { name: 'Persian Carpets', growth: '+18%', color: 'text-green-600' },
  { name: 'Calligraphy Art', growth: '+15%', color: 'text-green-600' }
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (categoryId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(categoryId)) {
      newFavorites.delete(categoryId);
    } else {
      newFavorites.add(categoryId);
    }
    setFavorites(newFavorites);
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || category.difficulty.toLowerCase() === selectedDifficulty;
    const matchesPrice = selectedPriceRange === 'all' || 
      (selectedPriceRange === 'low' && category.priceRange.includes('$25') || category.priceRange.includes('$30') || category.priceRange.includes('$35')) ||
      (selectedPriceRange === 'medium' && (category.priceRange.includes('$50') || category.priceRange.includes('$40'))) ||
      (selectedPriceRange === 'high' && (category.priceRange.includes('$200') || category.priceRange.includes('$500')));
    
    return matchesSearch && matchesDifficulty && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'rating': return b.rating - a.rating;
      case 'artisans': return b.artisanCount - a.artisanCount;
      default: return b.productCount - a.productCount;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-persian-green-600 to-persian-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 kitenge-overlay"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center space-x-2 text-white/80 text-sm mb-8">
              <span>Home</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Categories</span>
            </nav>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Craft Categories
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
              Discover authentic Tanzanian crafts across diverse categories, each telling a unique story of tradition and artistry
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-4 text-white/80 mb-8">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5" />
                <span>12 Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>180+ Artisans</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span>970+ Products</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search categories, crafts, or techniques..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-16 py-4 text-lg rounded-lg border-0 shadow-lg focus:ring-2 focus:ring-white/30 focus:outline-none bg-white/95 backdrop-blur-sm placeholder-gray-500"
                />
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-persian-green-600 text-white p-2 rounded-lg hover:bg-persian-green-700 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className={`text-4xl font-bold text-gray-900 mb-2 transition-all duration-1000 ${animatedStats ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                    {typeof stat.value === 'number' && stat.value > 10 ? 
                      animatedStats ? stat.value : 0 : stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <section className="bg-gray-50 border-y border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-gray-700">Difficulty:</label>
                <select 
                  value={selectedDifficulty} 
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-gray-700">Price Range:</label>
                <select 
                  value={selectedPriceRange} 
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under $50</option>
                  <option value="medium">$50 - $200</option>
                  <option value="high">$200+</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
                >
                  <option value="popularity">Popularity</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                  <option value="artisans">Artisan Count</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2 ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-persian-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-persian-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trending Categories Sidebar */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              Trending Categories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <span className={`text-sm font-bold ${category.color}`}>{category.growth}</span>
                </div>
                <div className="mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-gray-600">Growing popularity</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              All Categories
              <span className="text-lg font-normal text-gray-600 ml-3">({filteredCategories.length} found)</span>
            </h2>
          </div>
          
          <div className={viewMode === 'grid' ? 
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : 
            "space-y-6"
          }>
            {filteredCategories.map((category, index) => (
              <div key={category.id} className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                viewMode === 'list' ? 'flex items-center bg-white p-6' : 'bg-white'
              }`}>
                {/* Category Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-32 h-32 rounded-xl flex-shrink-0' : 'h-64'
                }`}>
                  <div className={`w-full h-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <div className="text-white text-6xl font-bold opacity-20">
                      {category.name.charAt(0)}
                    </div>
                  </div>
                  
                  {/* Trending Badge */}
                  {category.trending && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Trending
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {category.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      Featured
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleFavorite(category.id)}
                      className={`p-2 rounded-full transition-colors ${
                        favorites.has(category.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.has(category.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 bg-white text-gray-600 rounded-full hover:bg-blue-50 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white text-gray-600 rounded-full hover:bg-green-50 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Category Content */}
                <div className={viewMode === 'list' ? 'ml-6 flex-1' : 'p-6'}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-persian-green-600 transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600 ml-1">{category.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                  
                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Category Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {category.artisanCount} Artisans
                    </div>
                    <div className="flex items-center text-gray-600">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {category.productCount} Products
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Price Range</div>
                      <div className="font-semibold text-persian-green-600">{category.priceRange}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Difficulty</div>
                      <div className={`font-semibold ${
                        category.difficulty === 'Beginner' ? 'text-green-600' :
                        category.difficulty === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{category.difficulty}</div>
                    </div>
                  </div>
                  
                  {/* Explore Button */}
                  <button className="w-full mt-4 bg-persian-green-600 text-white py-3 rounded-xl hover:bg-persian-green-700 transition-colors font-medium flex items-center justify-center">
                    Explore Category
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-persian-green-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-2xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your
            <span className="block text-yellow-300">Craft Journey?</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of craft enthusiasts and discover the perfect category for your next project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-persian-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              Browse All Products
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-persian-green-600 transition-colors">
              Meet Our Artisans
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}