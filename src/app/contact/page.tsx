'use client';

import React, { useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Globe } from 'lucide-react';

// Mock data for contact information
const contactInfo = {
  email: 'support@craftandartmarketplace.com',
  phone: '+255 22 123 4567',
  whatsapp: '+255 754 123 456',
  address: 'Msimbazi Street, Kariakoo\nDar es Salaam, Tanzania',
  hours: {
    weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
    weekends: 'Saturday: 9:00 AM - 4:00 PM\nSunday: Closed'
  }
};

// Mock data for office locations
const offices = [
  {
    id: 1,
    city: 'Dar es Salaam',
    address: 'Msimbazi Street, Kariakoo\nDar es Salaam, Tanzania',
    phone: '+255 22 123 4567',
    email: 'daressalaam@craftandartmarketplace.com',
    manager: 'Amara Mwalimu',
    isMain: true
  },
  {
    id: 2,
    city: 'Arusha',
    address: 'Sokoine Road, Arusha\nArusha, Tanzania',
    phone: '+255 27 254 8901',
    email: 'arusha@craftandartmarketplace.com',
    manager: 'Joseph Kimaro',
    isMain: false
  },
  {
    id: 3,
    city: 'Stone Town',
    address: 'Creek Road, Stone Town\nZanzibar, Tanzania',
    phone: '+255 24 223 3456',
    email: 'zanzibar@craftandartmarketplace.com',
    manager: 'Fatuma Said',
    isMain: false
  }
];

// Mock data for FAQ
const faqs = [
  {
    id: 1,
    question: 'How can I become a Craft&Art Marketplace artisan?',
    answer: 'To join Craft&Art Marketplace as an artisan, you can apply through our artisan registration form or visit one of our offices. We welcome skilled craftspeople who create authentic Tanzanian art and crafts.'
  },
  {
    id: 2,
    question: 'What is the commission structure for artisans?',
    answer: 'Craft&Art Marketplace takes a 15% commission on sales to cover platform maintenance, marketing, and payment processing. Artisans receive 85% of the sale price directly to their mobile money accounts.'
  },
  {
    id: 3,
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship authentic Tanzanian crafts worldwide. Shipping costs and delivery times vary by destination. Contact us for specific shipping quotes to your location.'
  },
  {
    id: 4,
    question: 'How do you ensure craft authenticity?',
    answer: 'All crafts on Craft&Art Marketplace are verified by our cultural heritage experts. We work directly with artisans and conduct regular quality checks to ensure authenticity and cultural accuracy.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-persian-green-500 to-zanzibar-twilight overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 kitenge-overlay"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
              Connect with Craft&Art Marketplace - We're here to help artisans, customers, and partners
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Expert Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>Global Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-graphite mb-6">Send us a Message</h2>
              <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-graphite mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-copper-patina/30 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-graphite mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-copper-patina/30 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-graphite mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-copper-patina/30 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent transition-all"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="artisan">Become an Artisan</option>
                      <option value="wholesale">Wholesale Partnership</option>
                      <option value="support">Customer Support</option>
                      <option value="media">Media & Press</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-graphite mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-copper-patina/30 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent transition-all"
                      placeholder="Brief subject of your message"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-graphite mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-copper-patina/30 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full ceramic-button text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-graphite mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Main Contact Info */}
                <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-graphite mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-persian-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-graphite">Email</p>
                        <p className="text-graphite/70">{contactInfo.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-persian-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-graphite">Phone</p>
                        <p className="text-graphite/70">{contactInfo.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-persian-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-graphite">WhatsApp</p>
                        <p className="text-graphite/70">{contactInfo.whatsapp}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-persian-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-graphite">Address</p>
                        <p className="text-graphite/70 whitespace-pre-line">{contactInfo.address}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Business Hours */}
                <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-graphite mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-persian-green-500" />
                    Business Hours
                  </h3>
                  <div className="space-y-2">
                    <p className="text-graphite/70">{contactInfo.hours.weekdays}</p>
                    <p className="text-graphite/70 whitespace-pre-line">{contactInfo.hours.weekends}</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-gradient-to-br from-persian-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-4">Our Locations</h2>
            <p className="text-xl text-graphite/70 max-w-2xl mx-auto">
              Visit us at any of our offices across Tanzania
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((office) => (
              <Card key={office.id} className={cn(
                "p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                office.isMain && "ring-2 ring-persian-green-500/20"
              )}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-graphite">{office.city}</h3>
                  {office.isMain && (
                    <span className="bg-persian-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Main Office
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-persian-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-graphite/70 whitespace-pre-line">{office.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-persian-green-500" />
                    <p className="text-sm text-graphite/70">{office.phone}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-persian-green-500" />
                    <p className="text-sm text-graphite/70">{office.email}</p>
                  </div>
                  
                  <div className="pt-2 border-t border-copper-patina/20">
                    <p className="text-sm font-medium text-graphite">Office Manager</p>
                    <p className="text-sm text-graphite/70">{office.manager}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-graphite/70 max-w-2xl mx-auto">
              Find quick answers to common questions about Craft&Art Marketplace
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <Card key={faq.id} className="mb-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full p-6 text-left hover:bg-persian-green-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-graphite pr-4">{faq.question}</h3>
                    <div className={cn(
                      "w-6 h-6 rounded-full bg-persian-green-500 flex items-center justify-center transition-transform",
                      expandedFaq === faq.id && "rotate-45"
                    )}>
                      <div className="w-3 h-0.5 bg-white"></div>
                      <div className="w-0.5 h-3 bg-white absolute"></div>
                    </div>
                  </div>
                </button>
                
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-graphite/70 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}