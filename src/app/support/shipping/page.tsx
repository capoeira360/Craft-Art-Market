'use client';

import React, { useState } from 'react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import {
  Truck,
  Globe,
  Clock,
  MapPin,
  Package,
  Shield,
  CreditCard,
  Search,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  Calculator,
  Plane
} from 'lucide-react';
import Link from 'next/link';

// Shipping zones and rates
const shippingZones = [
  {
    zone: 'Tanzania (Domestic)',
    countries: ['Tanzania'],
    standardRate: 'TSh 5,000 - 15,000',
    expressRate: 'TSh 10,000 - 25,000',
    deliveryTime: '2-5 business days',
    expressTime: '1-2 business days',
    freeShippingThreshold: 'TSh 100,000'
  },
  {
    zone: 'East Africa',
    countries: ['Kenya', 'Uganda', 'Rwanda', 'Burundi'],
    standardRate: '$15 - $35',
    expressRate: '$30 - $60',
    deliveryTime: '5-10 business days',
    expressTime: '3-5 business days',
    freeShippingThreshold: '$150'
  },
  {
    zone: 'Africa',
    countries: ['South Africa', 'Nigeria', 'Ghana', 'Egypt', 'Morocco'],
    standardRate: '$25 - $50',
    expressRate: '$45 - $85',
    deliveryTime: '7-14 business days',
    expressTime: '5-8 business days',
    freeShippingThreshold: '$200'
  },
  {
    zone: 'Europe & UK',
    countries: ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Italy'],
    standardRate: '$30 - $65',
    expressRate: '$55 - $95',
    deliveryTime: '10-18 business days',
    expressTime: '7-12 business days',
    freeShippingThreshold: '$250'
  },
  {
    zone: 'North America',
    countries: ['United States', 'Canada'],
    standardRate: '$35 - $70',
    expressRate: '$60 - $110',
    deliveryTime: '12-21 business days',
    expressTime: '8-14 business days',
    freeShippingThreshold: '$300'
  },
  {
    zone: 'Asia Pacific',
    countries: ['Australia', 'Japan', 'Singapore', 'India', 'China'],
    standardRate: '$40 - $80',
    expressRate: '$70 - $120',
    deliveryTime: '14-25 business days',
    expressTime: '10-16 business days',
    freeShippingThreshold: '$350'
  }
];

// Shipping FAQs
const shippingFAQs = [
  {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can track your package using this number on our website or the carrier\'s website. You can also track orders in your account dashboard.'
  },
  {
    question: 'What if my package is delayed?',
    answer: 'Delivery times are estimates and may vary due to customs, weather, or carrier delays. If your package is significantly delayed beyond the estimated delivery window, please contact our support team for assistance.'
  },
  {
    question: 'Do you ship to PO Boxes?',
    answer: 'We can ship to PO Boxes for domestic Tanzania orders only. International orders require a physical address for customs and tracking purposes.'
  },
  {
    question: 'What about customs and duties?',
    answer: 'International customers are responsible for any customs duties, taxes, or fees imposed by their country. These charges are not included in our shipping costs and vary by destination.'
  },
  {
    question: 'Can I change my shipping address?',
    answer: 'You can change your shipping address within 2 hours of placing your order. After that, contact our support team immediately. Once shipped, address changes may not be possible.'
  },
  {
    question: 'What if my package is damaged?',
    answer: 'All shipments are insured. If your package arrives damaged, contact us within 48 hours with photos of the damage. We\'ll arrange a replacement or full refund.'
  }
];

export default function ShippingPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/support" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Support
          </Link>
          
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Shipping Information</h1>
              <p className="text-xl text-blue-100">Everything you need to know about delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Track */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-blue-800">
                <Search className="w-5 h-5 mr-2" />
                Track Your Order
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter your tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="px-8">
                  Track Package
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                You can find your tracking number in your order confirmation email
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs defaultValue="rates" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="rates">Shipping Rates</TabsTrigger>
              <TabsTrigger value="delivery">Delivery Times</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            {/* Shipping Rates */}
            <TabsContent value="rates" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-graphite mb-4">Shipping Rates by Zone</h2>
                <p className="text-gray-600">Rates vary by destination, package weight, and shipping method</p>
              </div>

              <div className="grid gap-6">
                {shippingZones.map((zone, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 text-blue-600 mr-2" />
                          <CardTitle className="text-xl">{zone.zone}</CardTitle>
                        </div>
                        <div className="text-sm text-gray-600">
                          Free shipping over {zone.freeShippingThreshold}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Countries</h4>
                          <p className="text-sm text-gray-600">{zone.countries.join(', ')}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Standard Rate</h4>
                          <p className="text-sm text-gray-600">{zone.standardRate}</p>
                          <p className="text-xs text-gray-500">{zone.deliveryTime}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Express Rate</h4>
                          <p className="text-sm text-gray-600">{zone.expressRate}</p>
                          <p className="text-xs text-gray-500">{zone.expressTime}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Free Shipping</h4>
                          <p className="text-sm text-green-600 font-medium">{zone.freeShippingThreshold}+</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Calculator className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">How Shipping is Calculated</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Based on package weight, dimensions, and destination</li>
                        <li>• Rates shown are for packages up to 2kg</li>
                        <li>• Heavier items may incur additional charges</li>
                        <li>• Final shipping cost calculated at checkout</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Delivery Times */}
            <TabsContent value="delivery" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-graphite mb-4">Delivery Timeframes</h2>
                <p className="text-gray-600">Estimated delivery times from order confirmation</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="bg-green-50">
                    <CardTitle className="flex items-center text-green-800">
                      <Truck className="w-5 h-5 mr-2" />
                      Standard Shipping
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Tanzania</span>
                        <span className="font-medium">2-5 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">East Africa</span>
                        <span className="font-medium">5-10 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Africa</span>
                        <span className="font-medium">7-14 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Europe & UK</span>
                        <span className="font-medium">10-18 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">North America</span>
                        <span className="font-medium">12-21 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Asia Pacific</span>
                        <span className="font-medium">14-25 business days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center text-blue-800">
                      <Plane className="w-5 h-5 mr-2" />
                      Express Shipping
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Tanzania</span>
                        <span className="font-medium">1-2 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">East Africa</span>
                        <span className="font-medium">3-5 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Africa</span>
                        <span className="font-medium">5-8 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Europe & UK</span>
                        <span className="font-medium">7-12 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">North America</span>
                        <span className="font-medium">8-14 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Asia Pacific</span>
                        <span className="font-medium">10-16 business days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-yellow-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 mb-2">Important Notes</h3>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Delivery times are estimates and may vary</li>
                        <li>• Custom orders may require additional 3-7 days for crafting</li>
                        <li>• Weekends and holidays may extend delivery times</li>
                        <li>• Remote areas may require additional 1-3 days</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Policies */}
            <TabsContent value="policies" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-graphite mb-4">Shipping Policies</h2>
                <p className="text-gray-600">Our commitment to safe and reliable delivery</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      Package Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        All packages are fully insured
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Secure packaging for fragile items
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Tracking provided for all shipments
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Signature required for high-value items
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="w-5 h-5 mr-2 text-blue-600" />
                      Processing Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        In-stock items: 1-2 business days
                      </li>
                      <li className="flex items-start">
                        <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        Custom orders: 3-7 business days
                      </li>
                      <li className="flex items-start">
                        <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        Orders placed after 2 PM ship next day
                      </li>
                      <li className="flex items-start">
                        <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        No processing on weekends/holidays
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                      Delivery Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        Physical address required (no PO Boxes for international)
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        Someone must be available to receive package
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        Valid phone number required for delivery
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        Customs forms required for international orders
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-red-600" />
                      Additional Costs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        Customs duties (international orders)
                      </li>
                      <li className="flex items-start">
                        <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        Import taxes (varies by country)
                      </li>
                      <li className="flex items-start">
                        <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        Remote area surcharges (if applicable)
                      </li>
                      <li className="flex items-start">
                        <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        Address correction fees (if needed)
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* FAQ */}
            <TabsContent value="faq" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-graphite mb-4">Shipping FAQ</h2>
                <p className="text-gray-600">Common questions about shipping and delivery</p>
              </div>

              <div className="space-y-4">
                {shippingFAQs.map((faq, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader 
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleFAQ(index)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                        <div className={`transform transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </CardHeader>
                    {expandedFAQ === index && (
                      <CardContent className="pt-0">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-graphite mb-6">
            Need Help with Shipping?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team can help with tracking, delivery issues, and shipping questions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Contact Support
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Track My Order
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}