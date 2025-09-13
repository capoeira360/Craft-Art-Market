'use client';

import React, { useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  ShoppingBag,
  Users,
  Shield,
  CreditCard,
  Truck,
  Star,
  ArrowRight,
  Clock,
  Globe
} from 'lucide-react';

// FAQ Categories
const faqCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: HelpCircle,
    color: 'text-persian-green-600',
    bgColor: 'bg-persian-green-50',
    questions: [
      {
        question: 'How do I create an account on Craft&Art Marketplace?',
        answer: 'Creating an account is simple! Click the "Sign Up" button in the top right corner, fill in your details, and verify your email address. You can also sign up using your Google or Facebook account for faster registration.'
      },
      {
        question: 'What is Craft&Art Marketplace and how does it work?',
        answer: 'Craft&Art Marketplace is a platform connecting authentic artisans with global customers. Browse unique handcrafted items, purchase directly from artisans, and support local communities while getting beautiful, authentic crafts.'
      },
      {
        question: 'Is Craft&Art Marketplace available on mobile?',
        answer: 'Yes! Craft&Art Marketplace has dedicated mobile apps for both buyers and sellers. Download the Craft&Art Marketplace Buyer app to shop on-the-go, or the Craft&Art Marketplace Seller app if you\'re an artisan. Both apps are available on iOS and Android.'
      }
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping & Orders',
    icon: ShoppingBag,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    questions: [
      {
        question: 'How do I place an order?',
        answer: 'Browse our catalog, select items you like, add them to your cart, and proceed to checkout. You\'ll need to provide shipping information and payment details. Once confirmed, you\'ll receive an order confirmation email.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept major credit cards (Visa, Mastercard, American Express), PayPal, and mobile money services like M-Pesa for Tanzanian customers. All payments are processed securely through our encrypted payment system.'
      },
      {
        question: 'Can I track my order?',
        answer: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can also track your order status in your account dashboard or through our mobile app.'
      },
      {
        question: 'What if I need to cancel or modify my order?',
        answer: 'You can cancel or modify orders within 2 hours of placement. After that, contact our support team immediately. Once an artisan begins crafting your custom item, cancellation may not be possible.'
      }
    ]
  },
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    icon: Truck,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    questions: [
      {
        question: 'Do you ship internationally?',
        answer: 'Yes! We ship authentic Tanzanian crafts worldwide. Shipping costs and delivery times vary by destination. International orders typically take 7-21 business days depending on your location and chosen shipping method.'
      },
      {
        question: 'How much does shipping cost?',
        answer: 'Shipping costs depend on your location, package weight, and shipping method. Domestic Tanzania shipping starts at 5,000 TZS. International shipping starts at $15 USD. Free shipping is available for orders over $100 USD.'
      },
      {
        question: 'What if my package is damaged or lost?',
        answer: 'All shipments are insured. If your package arrives damaged or goes missing, contact us within 48 hours with photos (for damage) or tracking information. We\'ll arrange a replacement or full refund.'
      }
    ]
  },
  {
    id: 'artisans',
    title: 'For Artisans',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    questions: [
      {
        question: 'How do I become a Craft&Art Marketplace artisan?',
        answer: 'Apply through our artisan registration form. We review applications based on craft quality, authenticity, and cultural significance. Successful applicants receive training, tools, and ongoing support to succeed on our platform.'
      },
      {
        question: 'What commission does Craft&Art Marketplace charge?',
        answer: 'Craft&Art Marketplace charges a 15% commission on sales, which covers payment processing, marketing, customer support, and platform maintenance. This is competitive with other marketplaces and includes valuable services.'
      },
      {
        question: 'How and when do I get paid?',
        answer: 'Payments are processed weekly every Friday for orders completed the previous week. You can receive payments via bank transfer, mobile money (M-Pesa), or PayPal, depending on your location and preference.'
      },
      {
        question: 'Can I sell custom or made-to-order items?',
        answer: 'Yes! Custom orders are encouraged. Set your custom order preferences in your seller dashboard, including lead times, customization options, and pricing. Customers can request custom pieces directly through your profile.'
      }
    ]
  },
  {
    id: 'account',
    title: 'Account & Security',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    questions: [
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. The link expires in 24 hours for security. If you don\'t receive the email, check your spam folder.'
      },
      {
        question: 'How do I update my profile information?',
        answer: 'Log into your account and go to "Account Settings" or "Profile." You can update your personal information, shipping addresses, payment methods, and communication preferences. Changes are saved automatically.'
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes! We use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties without your consent. Read our Privacy Policy for complete details.'
      }
    ]
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    icon: Star,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'We offer 30-day returns for most items in original condition. Custom or personalized items may have different return policies. Return shipping costs depend on the reason for return - we cover costs for defective items.'
      },
      {
        question: 'How do I initiate a return?',
        answer: 'Contact our support team within 30 days of delivery. Provide your order number and reason for return. We\'ll guide you through the process and provide a return shipping label if applicable.'
      },
      {
        question: 'When will I receive my refund?',
        answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method. Bank processing times may add 3-5 additional days.'
      }
    ]
  }
];

// Quick Help Topics
const quickHelp = [
  {
    title: 'Order Status',
    description: 'Track your current orders',
    icon: ShoppingBag,
    link: '/account/orders'
  },
  {
    title: 'Contact Support',
    description: 'Get help from our team',
    icon: MessageCircle,
    link: '/contact'
  },
  {
    title: 'Shipping Info',
    description: 'Delivery times and costs',
    icon: Truck,
    link: '#shipping'
  },
  {
    title: 'Return Policy',
    description: 'Return and refund process',
    icon: Star,
    link: '#returns'
  }
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('getting-started');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Filter FAQs based on search query
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-persian-green-600 to-persian-green-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How can we help you?
          </h1>
          <p className="text-xl mb-8 text-persian-green-100">
            Find answers to common questions or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-graphite text-lg focus:outline-none focus:ring-2 focus:ring-persian-green-300"
            />
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-graphite mb-8 text-center">
            Quick Help
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickHelp.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-persian-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-persian-green-200 transition-colors">
                      <IconComponent className="w-6 h-6 text-persian-green-600" />
                    </div>
                    <h3 className="font-semibold text-graphite mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <ArrowRight className="w-4 h-4 text-persian-green-600 mx-auto group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-graphite mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {(searchQuery ? filteredCategories : faqCategories).map((category) => {
              const IconComponent = category.icon;
              const isExpanded = expandedCategory === category.id;
              
              return (
                <Card key={category.id} className="overflow-hidden">
                  <CardHeader 
                    className={cn(
                      "cursor-pointer transition-colors",
                      category.bgColor,
                      "hover:opacity-80"
                    )}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-white", category.color)}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                        <span className="text-sm text-gray-500">({category.questions.length})</span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </CardHeader>
                  
                  {isExpanded && (
                    <CardContent className="p-0">
                      <div className="space-y-0">
                        {category.questions.map((faq, index) => {
                          const questionId = `${category.id}-${index}`;
                          const isQuestionExpanded = expandedQuestion === questionId;
                          
                          return (
                            <div key={index} className="border-t border-gray-100">
                              <button
                                className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                                onClick={() => toggleQuestion(questionId)}
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-graphite pr-4">{faq.question}</h4>
                                  {isQuestionExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                  )}
                                </div>
                              </button>
                              
                              {isQuestionExpanded && (
                                <div className="px-6 pb-6">
                                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
          
          {searchQuery && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No results found</h3>
              <p className="text-gray-400">Try different keywords or contact our support team</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-persian-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-graphite mb-6">
            Still need help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to help you 24/7
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
                Call Now
              </Button>
            </Card>
          </div>
          
          <div className="mt-8 p-6 bg-white rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>Average response time: 2 minutes (chat) | 4 hours (email)</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}