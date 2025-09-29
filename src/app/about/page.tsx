'use client';

import React from 'react';
import Image from 'next/image';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';



// Mock data for milestones
const milestones = [
  {
    year: '2020',
    title: 'Craft&Art Marketplace Founded',
    description: 'Started with a vision to connect Tanzanian artisans with the world'
  },
  {
    year: '2021',
    title: '100 Artisans Onboarded',
    description: 'Reached our first major milestone of supporting 100 local artisans'
  },
  {
    year: '2022',
    title: 'International Expansion',
    description: 'Launched global shipping to 25 countries across 4 continents'
  },
  {
    year: '2023',
    title: 'Mobile Apps Launch',
    description: 'Released dedicated buyer and seller mobile applications'
  },
  {
    year: '2024',
    title: '1000+ Artisans Strong',
    description: 'Growing community of over 1000 verified Tanzanian artisans'
  }
];

// Mock data for values
const values = [
  {
    icon: '🎨',
    title: 'Authentic Craftsmanship',
    description: 'We celebrate and preserve traditional Tanzanian art forms, ensuring every piece tells a genuine story of cultural heritage.'
  },
  {
    icon: '🤝',
    title: 'Fair Trade',
    description: 'We ensure artisans receive fair compensation for their work, promoting sustainable livelihoods and economic empowerment.'
  },
  {
    icon: '🌍',
    title: 'Global Connection',
    description: 'We bridge cultures by connecting Tanzanian artisans with art lovers worldwide, fostering cross-cultural appreciation.'
  },
  {
    icon: '📱',
    title: 'Innovation',
    description: 'We leverage technology to make traditional crafts accessible in the digital age while preserving their authentic essence.'
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    description: 'We promote eco-friendly practices and sustainable materials, ensuring our impact on the environment is positive.'
  },
  {
    icon: '🎓',
    title: 'Education',
    description: 'We educate both artisans and buyers about traditional techniques, cultural significance, and market opportunities.'
  }
];

// Mock statistics
const stats = [
  { number: '1,200+', label: 'Active Artisans' },
  { number: '50,000+', label: 'Crafts Sold' },
  { number: '25', label: 'Countries Served' },
  { number: '15', label: 'Craft Categories' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl text-extra-thin text-gray-900 mb-6">
              About <span className="text-green-600">Craft&Art Marketplace</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connecting authentic Tanzanian craftsmanship with the world. 
              We empower local artisans while preserving cultural heritage through innovative technology.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl text-light text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-light font-small-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-light text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Craft&Art Marketplace was born from a simple yet powerful vision: to create a bridge between 
                  Tanzania's rich artisan traditions and the global marketplace. Founded in 2020 
                  by Amara Mwalimu, a passionate advocate for cultural preservation, Craft&Art Marketplace began 
                  as a small initiative to help local artisans in Dar es Salaam reach wider audiences.
                </p>
                <p>
                  What started as weekend markets and word-of-mouth recommendations has evolved 
                  into a comprehensive platform that serves over 1,200 artisans across Tanzania. 
                  We've maintained our core mission: ensuring that every artisan receives fair 
                  compensation while preserving the authentic techniques passed down through generations.
                </p>
                <p>
                  Today, Craft&Art Marketplace stands as Tanzania's premier platform for authentic crafts, 
                  connecting skilled artisans with art lovers in 25 countries worldwide. 
                  Our mobile applications have revolutionized how artisans showcase their work 
                  and how buyers discover unique, handcrafted treasures.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl p-8 text-white">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-2xl font-bold mb-4">Preserving Heritage</h3>
                  <p className="text-green-100">
                    Every craft tells a story of Tanzania's rich cultural tapestry
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-light text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Craft&Art Marketplace
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl text-light text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed font-small-text">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-light text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Key milestones in Craft&Art Marketplace's growth and impact
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Content */}
                  <div className="ml-16">
                    <div className="bg-green-100 text-green-800 text-sm text-light px-3 py-1 rounded-full inline-block mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl text-light text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Communities Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-light text-gray-900 mb-4">
              Our Artisan Communities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the diverse regions and communities that make Craft&Art Marketplace's marketplace vibrant
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏺</span>
              </div>
              <h3 className="text-xl text-light text-gray-900 mb-3 text-center">Ceramic & Glass Artists</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Master potters from Dodoma and glass artisans creating functional and decorative pieces using traditional techniques passed down through generations.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl text-light text-gray-900 mb-3 text-center">Natural Material Crafters</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Skilled weavers from coastal regions creating beautiful baskets, mats, and bags from sisal, palm leaves, and other sustainable materials.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl text-light text-gray-900 mb-3 text-center">Jewellery Artisans</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Talented beadwork artists and metalworkers from Maasai and other communities creating stunning traditional and contemporary jewelry pieces.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🧵</span>
              </div>
              <h3 className="text-xl text-light text-gray-900 mb-3 text-center">Textile & Fiber Artists</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Expert weavers and textile artists creating vibrant kanga, kitenge, and handwoven fabrics that celebrate Tanzanian cultural heritage.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-rose-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl text-light text-gray-900 mb-3 text-center">Visual Artists</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Contemporary and traditional painters, sculptors, and mixed-media artists from urban and rural areas showcasing Tanzania's artistic diversity.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="text-xl text-light text-gray-900 mb-3 text-center">Upcycling Innovators</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Creative artisans transforming waste materials into beautiful, functional art pieces, promoting sustainability and environmental consciousness.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-light text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Whether you're an artisan looking to showcase your craft or a buyer seeking 
            authentic Tanzanian art, Craft&Art Marketplace is your gateway to cultural connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 text-light px-8 py-3"
              onClick={() => window.location.href = '/artisan/register'}
            >
              Become an Artisan
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="ceramic-button text-lg px-8 py-4 rounded-xl text-light border-2 border-white text-white bg-black/20 backdrop-blur-sm hover:bg-white hover:text-green-600 shadow-lg hover:scale-105 transition-transform"
              onClick={() => window.open('https://play.google.com/store/apps/details?id=com.craftandartmarketplace.buyer', '_blank')}
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}