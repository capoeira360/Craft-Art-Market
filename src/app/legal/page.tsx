'use client';

import React from 'react';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { FileText, Shield, Cookie, Scale, Users, Globe, Eye, Lock } from 'lucide-react';

// Mock data for legal documents
const legalDocuments = [
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    description: 'Our terms and conditions for using the CraftArtMarketplace platform, including user responsibilities and platform guidelines.',
    icon: FileText,
    lastUpdated: 'January 15, 2024',
    category: 'Platform Rules'
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your personal information on the CraftArtMarketplace.',
    icon: Shield,
    lastUpdated: 'January 10, 2024',
    category: 'Data Protection'
  },
  {
    id: 'cookie-policy',
    title: 'Cookie Policy',
    description: 'Information about how we use cookies and similar technologies to enhance your browsing experience.',
    icon: Cookie,
    lastUpdated: 'December 20, 2023',
    category: 'Technical'
  },
  {
    id: 'artisan-agreement',
    title: 'Artisan Agreement',
    description: 'Terms and conditions specifically for artisans selling their crafts on the CraftArtMarketplace platform.',
    icon: Users,
    lastUpdated: 'January 5, 2024',
    category: 'Seller Terms'
  },
  {
    id: 'buyer-protection',
    title: 'Buyer Protection Policy',
    description: 'Our commitment to protecting buyers and ensuring authentic, quality handcrafted products.',
    icon: Lock,
    lastUpdated: 'December 15, 2023',
    category: 'Buyer Rights'
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property Policy',
    description: 'Guidelines on intellectual property rights, cultural heritage protection, and content ownership.',
    icon: Scale,
    lastUpdated: 'November 30, 2023',
    category: 'Legal Rights'
  },
  {
    id: 'community-guidelines',
    title: 'Community Guidelines',
    description: 'Standards for respectful interaction and cultural sensitivity within the CraftArtMarketplace community.',
    icon: Globe,
    lastUpdated: 'January 8, 2024',
    category: 'Community'
  },
  {
    id: 'accessibility-statement',
    title: 'Accessibility Statement',
    description: 'Our commitment to making CraftArtMarketplace accessible to all users, including those with disabilities.',
    icon: Eye,
    lastUpdated: 'December 1, 2023',
    category: 'Accessibility'
  }
];

const categories = [
  'All Documents',
  'Platform Rules',
  'Data Protection',
  'Seller Terms',
  'Buyer Rights',
  'Legal Rights',
  'Community',
  'Technical',
  'Accessibility'
];

export default function LegalPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All Documents');

  const filteredDocuments = selectedCategory === 'All Documents' 
    ? legalDocuments 
    : legalDocuments.filter(doc => doc.category === selectedCategory);

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-graphite to-zanzibar-twilight overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 kitenge-overlay"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Legal Information
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
              Transparency and trust through clear legal documentation
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Data Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                <span>Fair Terms</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>Cultural Respect</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Documents Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-4">Legal Documents</h2>
            <p className="text-xl text-graphite/70 max-w-2xl mx-auto">
              Access all our legal documents and policies in one place
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-persian-green-500 text-white shadow-lg'
                    : 'border-persian-green-200 text-graphite hover:border-persian-green-500 hover:text-persian-green-600'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDocuments.map((document) => {
              const IconComponent = document.icon;
              return (
                <Card key={document.id} className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-persian-green-100 rounded-lg">
                      <IconComponent className="w-6 h-6 text-persian-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-graphite mb-2">{document.title}</h3>
                      <span className="inline-block px-2 py-1 bg-copper-patina/20 text-copper-patina text-xs rounded-full">
                        {document.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-graphite/70 mb-4 leading-relaxed">{document.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-graphite/60">Updated: {document.lastUpdated}</span>
                    <Link href={`/legal/${document.id}`}>
                      <Button className="ceramic-button text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform">
                        Read Document
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gradient-to-br from-persian-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-4">Quick Access</h2>
            <p className="text-xl text-graphite/70 max-w-2xl mx-auto">
              Frequently accessed legal information
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/legal/terms-of-service" className="group">
              <Card className="p-6 text-center shadow-lg border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group-hover:bg-persian-green-50">
                <FileText className="w-8 h-8 text-persian-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-graphite group-hover:text-persian-green-600">Terms of Service</h3>
              </Card>
            </Link>
            
            <Link href="/legal/privacy-policy" className="group">
              <Card className="p-6 text-center shadow-lg border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group-hover:bg-persian-green-50">
                <Shield className="w-8 h-8 text-persian-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-graphite group-hover:text-persian-green-600">Privacy Policy</h3>
              </Card>
            </Link>
            
            <Link href="/legal/artisan-agreement" className="group">
              <Card className="p-6 text-center shadow-lg border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group-hover:bg-persian-green-50">
                <Users className="w-8 h-8 text-persian-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-graphite group-hover:text-persian-green-600">Artisan Agreement</h3>
              </Card>
            </Link>
            
            <Link href="/legal/buyer-protection" className="group">
              <Card className="p-6 text-center shadow-lg border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group-hover:bg-persian-green-50">
                <Lock className="w-8 h-8 text-persian-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-graphite group-hover:text-persian-green-600">Buyer Protection</h3>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Legal Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm text-center">
            <h2 className="text-3xl font-bold text-graphite mb-4">Need Legal Assistance?</h2>
            <p className="text-xl text-graphite/70 mb-6">
              Our legal team is here to help with any questions about our policies or terms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="ceramic-button text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform">
                  Contact Legal Team
                </Button>
              </Link>
              <Button variant="outline" className="border-persian-green-200 text-graphite hover:border-persian-green-500 hover:text-persian-green-600 px-6 py-3 rounded-lg">
                Download All Policies (PDF)
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}