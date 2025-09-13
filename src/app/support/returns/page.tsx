'use client';

import React, { useState } from 'react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import {
  RotateCcw,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Package,
  CreditCard,
  FileText,
  ArrowLeft,
  Search,
  Mail,
  Phone,
  MessageCircle,
  Info,
  DollarSign,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

// Return eligibility data
const returnEligibility = [
  {
    category: 'Standard Items',
    returnWindow: '30 days',
    condition: 'Original condition, unused',
    refundType: 'Full refund',
    shippingCost: 'Customer pays (unless defective)',
    eligible: true
  },
  {
    category: 'Custom/Personalized',
    returnWindow: '14 days',
    condition: 'Defective or not as described only',
    refundType: 'Full refund (if eligible)',
    shippingCost: 'Craft&Art Marketplace pays',
    eligible: false
  },
  {
    category: 'Jewelry',
    returnWindow: '30 days',
    condition: 'Original packaging, unworn',
    refundType: 'Full refund',
    shippingCost: 'Customer pays',
    eligible: true
  },
  {
    category: 'Textiles',
    returnWindow: '30 days',
    condition: 'Unwashed, original tags',
    refundType: 'Full refund',
    shippingCost: 'Customer pays',
    eligible: true
  },
  {
    category: 'Art Pieces',
    returnWindow: '14 days',
    condition: 'Undamaged, original packaging',
    refundType: 'Full refund',
    shippingCost: 'Customer pays',
    eligible: true
  }
];

// Return process steps
const returnSteps = [
  {
    step: 1,
    title: 'Initiate Return',
    description: 'Contact our support team within the return window',
    details: 'Email us at returns@craftandartmarketplace.com or use our return form. Provide your order number and reason for return.',
    timeframe: 'Within return window'
  },
  {
    step: 2,
    title: 'Return Authorization',
    description: 'Receive return authorization and shipping label',
    details: 'We\'ll review your request and send you a return authorization number (RMA) and prepaid shipping label if applicable.',
    timeframe: '1-2 business days'
  },
  {
    step: 3,
    title: 'Package Item',
    description: 'Securely package the item for return',
    details: 'Use original packaging if possible. Include all accessories, tags, and documentation. Attach the return label.',
    timeframe: 'At your convenience'
  },
  {
    step: 4,
    title: 'Ship Return',
    description: 'Send the package using provided shipping method',
    details: 'Drop off at designated carrier location or schedule pickup. Keep tracking number for your records.',
    timeframe: 'Within 7 days of RMA'
  },
  {
    step: 5,
    title: 'Inspection',
    description: 'We inspect the returned item',
    details: 'Our team verifies the item condition and processes your return according to our policy.',
    timeframe: '2-3 business days'
  },
  {
    step: 6,
    title: 'Refund Processing',
    description: 'Refund issued to original payment method',
    details: 'Once approved, refund is processed. Bank processing may take additional 3-5 business days.',
    timeframe: '5-7 business days'
  }
];

// Return FAQs
const returnFAQs = [
  {
    question: 'What items cannot be returned?',
    answer: 'Custom or personalized items (unless defective), items damaged by misuse, items returned after the return window, and items without original packaging or tags cannot be returned.'
  },
  {
    question: 'Who pays for return shipping?',
    answer: 'For defective or incorrectly shipped items, Craft&Art Marketplace covers return shipping. For other returns (change of mind, wrong size, etc.), the customer is responsible for return shipping costs.'
  },
  {
    question: 'How long do refunds take?',
    answer: 'Once we receive and approve your return, refunds are processed within 5-7 business days. Your bank or payment provider may take an additional 3-5 business days to credit your account.'
  },
  {
    question: 'Can I exchange an item instead of returning it?',
    answer: 'Currently, we process returns for refunds only. If you need a different size or color, please place a new order and return the original item.'
  },
  {
    question: 'What if I received a damaged item?',
    answer: 'Contact us immediately with photos of the damage. We\'ll arrange a replacement or full refund, and cover all return shipping costs.'
  },
  {
    question: 'Can I return international orders?',
    answer: 'Yes, but international customers are responsible for return shipping costs unless the item was defective or incorrectly shipped. Customs duties are non-refundable.'
  }
];

export default function ReturnsPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [orderNumber, setOrderNumber] = useState('');

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/support" className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Support
          </Link>
          
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Returns & Refunds</h1>
              <p className="text-xl text-green-100">Easy returns with our 30-day policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Return */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center text-green-800">
                <Search className="w-5 h-5 mr-2" />
                Start a Return
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter your order number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Button className="px-8 bg-green-600 hover:bg-green-700">
                  Start Return
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                You can find your order number in your confirmation email or account dashboard
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs defaultValue="policy" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="policy">Return Policy</TabsTrigger>
              <TabsTrigger value="process">Return Process</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            {/* Return Policy */}
            <TabsContent value="policy" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-graphite mb-4">Our Return Policy</h2>
                <p className="text-gray-600">We want you to be completely satisfied with your purchase</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-graphite mb-2">30-Day Window</h3>
                    <p className="text-gray-600 text-sm">Return most items within 30 days of delivery</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-graphite mb-2">Full Refunds</h3>
                    <p className="text-gray-600 text-sm">Get your money back for eligible returns</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-graphite mb-2">Easy Process</h3>
                    <p className="text-gray-600 text-sm">Simple 6-step return process</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      What We Accept
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Items in original condition
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Unused items with tags attached
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Items in original packaging
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Defective or damaged items
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Items not as described
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-600">
                      <XCircle className="w-5 h-5 mr-2" />
                      What We Don't Accept
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        Custom or personalized items (unless defective)
                      </li>
                      <li className="flex items-start">
                        <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        Items damaged by misuse
                      </li>
                      <li className="flex items-start">
                        <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        Items returned after 30 days
                      </li>
                      <li className="flex items-start">
                        <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        Items without original packaging
                      </li>
                      <li className="flex items-start">
                        <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        Worn or used jewelry
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 mb-2">Important Notes</h3>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Return window starts from delivery date, not order date</li>
                        <li>• Custom items have a 14-day return window (defective only)</li>
                        <li>• International returns may take longer to process</li>
                        <li>• Original shipping costs are non-refundable</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Return Process */}
            <TabsContent value="process" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-graphite mb-4">How to Return an Item</h2>
                <p className="text-gray-600">Follow these simple steps to return your purchase</p>
              </div>

              <div className="space-y-6">
                {returnSteps.map((step, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-graphite">{step.title}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {step.timeframe}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{step.description}</p>
                          <p className="text-sm text-gray-500">{step.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-800 mb-2">Tips for Faster Processing</h3>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Include all original packaging and accessories</li>
                        <li>• Provide clear photos if item is defective</li>
                        <li>• Use the prepaid return label when provided</li>
                        <li>• Keep your tracking number for reference</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Eligibility */}
            <TabsContent value="eligibility" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-graphite mb-4">Return Eligibility by Category</h2>
                <p className="text-gray-600">Different product categories have specific return requirements</p>
              </div>

              <div className="space-y-4">
                {returnEligibility.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-6 gap-4 items-center">
                        <div className="md:col-span-1">
                          <div className="flex items-center">
                            {item.eligible ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                            )}
                            <h3 className="font-semibold text-graphite">{item.category}</h3>
                          </div>
                        </div>
                        <div className="md:col-span-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Window:</span><br />
                            {item.returnWindow}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Condition:</span><br />
                            {item.condition}
                          </p>
                        </div>
                        <div className="md:col-span-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Refund:</span><br />
                            {item.refundType}
                          </p>
                        </div>
                        <div className="md:col-span-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Shipping:</span><br />
                            {item.shippingCost}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Refund Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Return received</span>
                        <span className="font-medium">Day 0</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Inspection completed</span>
                        <span className="font-medium">2-3 days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Refund processed</span>
                        <span className="font-medium">5-7 days</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Money in account</span>
                        <span className="font-medium">8-12 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                      Refund Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Original payment method (preferred)
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Store credit (faster processing)
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Bank transfer (for large amounts)
                      </li>
                      <li className="flex items-start">
                        <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        Mobile money (Tanzania customers)
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* FAQ */}
            <TabsContent value="faq" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-graphite mb-4">Returns FAQ</h2>
                <p className="text-gray-600">Common questions about returns and refunds</p>
              </div>

              <div className="space-y-4">
                {returnFAQs.map((faq, index) => (
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
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-graphite mb-6">
            Need Help with Returns?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to make returns as easy as possible
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">Get instant help with your return</p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Start Chat
              </Button>
            </Card>
            
            <Card className="p-6">
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Returns</h3>
              <p className="text-gray-600 text-sm mb-4">Send us your return request</p>
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                returns@craftandartmarketplace.com
              </Button>
            </Card>
            
            <Card className="p-6">
              <Phone className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-4">Call us for return assistance</p>
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                +255 123 456 789
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}