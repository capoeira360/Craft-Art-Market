'use client';

import React from 'react';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Truck,
  RotateCcw,
  Shield,
  CreditCard,
  Clock,
  ArrowRight,
  Search,
  FileText
} from 'lucide-react';
import Link from 'next/link';

// Support categories
const supportCategories = [
  {
    title: 'Shipping Information',
    description: 'Delivery times, costs, and tracking',
    icon: Truck,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    href: '/support/shipping'
  },
  {
    title: 'Returns & Refunds',
    description: 'Return policy and refund process',
    icon: RotateCcw,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    href: '/support/returns'
  },
  {
    title: 'Order Help',
    description: 'Order status, modifications, and issues',
    icon: FileText,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    href: '/help#shopping'
  },
  {
    title: 'Payment & Security',
    description: 'Payment methods and account security',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    href: '/help#account'
  }
];

// Quick actions
const quickActions = [
  {
    title: 'Track Your Order',
    description: 'Check the status of your recent orders',
    icon: Search,
    action: 'Track Order'
  },
  {
    title: 'Start a Return',
    description: 'Begin the return process for an item',
    icon: RotateCcw,
    action: 'Start Return'
  },
  {
    title: 'Contact Support',
    description: 'Get help from our customer service team',
    icon: MessageCircle,
    action: 'Contact Us'
  }
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-persian-green-600 to-persian-green-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Support Center
          </h1>
          <p className="text-xl mb-8 text-persian-green-100">
            Get help with shipping, returns, orders, and more
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-graphite mb-8 text-center">
            Quick Actions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-persian-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-persian-green-200 transition-colors">
                      <IconComponent className="w-6 h-6 text-persian-green-600" />
                    </div>
                    <h3 className="font-semibold text-graphite mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                    <Button className="w-full">
                      {action.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-graphite mb-8 text-center">
            Browse Support Topics
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/support/shipping">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-graphite mb-2">Shipping Information</h3>
                      <p className="text-gray-600 mb-4">Delivery times, shipping costs, and tracking information</p>
                      <div className="flex items-center text-blue-600 font-medium">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/support/returns">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                      <RotateCcw className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-graphite mb-2">Returns & Refunds</h3>
                      <p className="text-gray-600 mb-4">Easy returns with our 30-day policy</p>
                      <div className="flex items-center text-green-600 font-medium">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-persian-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-graphite mb-6">
            Still need help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is available 24/7 to assist you
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <MessageCircle className="w-8 h-8 text-persian-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
              <Button className="w-full">
                Start Chat
              </Button>
            </Card>
            
            <Card className="p-6">
              <Mail className="w-8 h-8 text-persian-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">Send us a detailed message</p>
              <Button variant="outline" className="w-full">
                Send Email
              </Button>
            </Card>
            
            <Card className="p-6">
              <Phone className="w-8 h-8 text-persian-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-4">Call us for immediate assistance</p>
              <Button variant="outline" className="w-full">
                +255 123 456 789
              </Button>
            </Card>
          </div>
          
          <div className="mt-8 p-6 bg-white rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>Average response time: 2 minutes (chat) | 4 hours (email) | Immediate (phone)</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}