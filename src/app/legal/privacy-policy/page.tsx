'use client';

import React from 'react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, Shield, Download, Lock, Eye, Database, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      {/* Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-persian-green-500 to-zanzibar-twilight">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/legal" className="text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5" />
              <span>Privacy & Data Protection</span>
            </div>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Privacy Policy
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Last Updated: January 10, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                <button className="hover:text-white transition-colors">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8 p-4 bg-persian-green-50 rounded-lg border-l-4 border-persian-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-5 h-5 text-persian-green-600" />
                    <p className="text-graphite font-medium">Your Privacy Matters</p>
                  </div>
                  <p className="text-graphite/70 text-sm">
                    At Craft&Art Marketplace, we are committed to protecting your privacy and ensuring the security of your personal information. 
                    This policy explains how we collect, use, and safeguard your data.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Database className="w-6 h-6 text-persian-green-500" />
                  1. Information We Collect
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">1.1 Personal Information</h3>
                <p className="text-graphite/80 mb-4">
                  We collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Register for a Craft&Art Marketplace account</li>
                  <li>Make a purchase or list products for sale</li>
                  <li>Contact our customer support</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                
                <p className="text-graphite/80 mb-6">
                  This information may include: name, email address, phone number, postal address, payment information, 
                  and profile information such as artisan specialties or buying preferences.
                </p>

                <h3 className="text-xl font-semibold text-graphite mb-3">1.2 Automatically Collected Information</h3>
                <p className="text-graphite/80 mb-4">
                  When you visit our platform, we automatically collect certain information about your device and usage patterns:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our platform</li>
                  <li>Referring website information</li>
                  <li>Search queries and interaction data</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-persian-green-500" />
                  2. How We Use Your Information
                </h2>
                
                <p className="text-graphite/80 mb-4">
                  We use the collected information for various purposes:
                </p>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.1 Platform Operations</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Process transactions and manage your account</li>
                  <li>Facilitate communication between buyers and artisans</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Verify artisan authenticity and product quality</li>
                  <li>Process payments and manage financial transactions</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.2 Platform Improvement</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Analyze usage patterns to improve our services</li>
                  <li>Personalize your experience and recommendations</li>
                  <li>Develop new features and functionality</li>
                  <li>Conduct research and analytics</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.3 Communication</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Send transactional emails (order confirmations, shipping updates)</li>
                  <li>Provide important platform updates and security notices</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Notify you about new artisan products or platform features</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-persian-green-500" />
                  3. Information Sharing and Disclosure
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.1 With Artisans and Buyers</h3>
                <p className="text-graphite/80 mb-4">
                  To facilitate transactions, we share necessary information between buyers and artisans:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Contact information for order fulfillment</li>
                  <li>Shipping addresses for product delivery</li>
                  <li>Order details and payment status</li>
                  <li>Communication through our messaging system</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.2 Service Providers</h3>
                <p className="text-graphite/80 mb-4">
                  We work with trusted third-party service providers who assist us in operating our platform:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Payment processors (Stripe, PayPal, M-Pesa)</li>
                  <li>Shipping and logistics partners</li>
                  <li>Email service providers</li>
                  <li>Analytics and marketing platforms</li>
                  <li>Cloud hosting and security services</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.3 Legal Requirements</h3>
                <p className="text-graphite/80 mb-6">
                  We may disclose your information when required by law or to protect our rights, including:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Compliance with legal obligations</li>
                  <li>Response to valid legal requests</li>
                  <li>Protection against fraud or security threats</li>
                  <li>Enforcement of our terms of service</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4">4. Data Security</h2>
                <p className="text-graphite/80 mb-4">
                  We implement comprehensive security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure payment processing with PCI DSS compliance</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and employee training</li>
                  <li>Data backup and disaster recovery procedures</li>
                  <li>Monitoring for unauthorized access attempts</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4">5. Your Privacy Rights</h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.1 Access and Control</h3>
                <p className="text-graphite/80 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Update or correct inaccurate data</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.2 Communication Preferences</h3>
                <p className="text-graphite/80 mb-6">
                  You can manage your communication preferences through your account settings or by contacting us directly. 
                  Note that you cannot opt-out of essential transactional communications related to your orders or account security.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">6. Cookies and Tracking Technologies</h2>
                <p className="text-graphite/80 mb-4">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.1 Essential Cookies</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Authentication and security</li>
                  <li>Shopping cart functionality</li>
                  <li>Platform preferences and settings</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.2 Analytics Cookies</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Usage statistics and performance monitoring</li>
                  <li>User behavior analysis</li>
                  <li>Platform optimization insights</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.3 Marketing Cookies</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Personalized content and recommendations</li>
                  <li>Targeted advertising (with consent)</li>
                  <li>Social media integration</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4">7. International Data Transfers</h2>
                <p className="text-graphite/80 mb-6">
                  As Craft&Art Marketplace serves customers globally, your information may be transferred to and processed in countries other than Tanzania. 
                  We ensure appropriate safeguards are in place to protect your data during international transfers, 
                  including standard contractual clauses and adequacy decisions.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">8. Data Retention</h2>
                <p className="text-graphite/80 mb-4">
                  We retain your personal information for as long as necessary to:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Provide our services and support your account</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Maintain business records for tax and accounting purposes</li>
                </ul>
                
                <p className="text-graphite/80 mb-6">
                  When you delete your account, we will remove or anonymize your personal information within 30 days, 
                  except where retention is required by law.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">9. Children's Privacy</h2>
                <p className="text-graphite/80 mb-6">
                  Craft&Art Marketplace is not intended for children under 16 years of age. We do not knowingly collect personal information from children. 
                  If you are a parent or guardian and believe your child has provided us with personal information, 
                  please contact us immediately so we can delete such information.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-graphite/80 mb-6">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. 
                  We will notify you of any material changes by posting the new policy on our platform and sending you an email notification. 
                  Your continued use of Craft&Art Marketplace after such changes constitutes acceptance of the updated policy.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">11. Contact Us</h2>
                <p className="text-graphite/80 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-persian-green-50 p-4 rounded-lg">
                  <p className="text-graphite font-medium">Craft&Art Marketplace Privacy Officer</p>
                  <p className="text-graphite/70">Email: privacy@craftandartmarketplace.com</p>
                  <p className="text-graphite/70">Phone: +255 22 123 4567</p>
                  <p className="text-graphite/70">Address: Msimbazi Street, Kariakoo, Dar es Salaam, Tanzania</p>
                  <p className="text-graphite/70 mt-2">Data Protection Officer: Dr. Amina Hassan</p>
                </div>

                <div className="mt-8 pt-6 border-t border-copper-patina/20">
                  <p className="text-sm text-graphite/60">
                    This Privacy Policy is effective as of January 10, 2024. We encourage you to review this policy periodically 
                    to stay informed about how we protect your information.
                  </p>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link href="/legal/terms-of-service">
                <Button variant="outline" className="border-persian-green-200 text-graphite hover:border-persian-green-500 hover:text-persian-green-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Terms of Service
                </Button>
              </Link>
              
              <Link href="/legal/cookie-policy">
                <Button className="ceramic-button text-white">
                  Next: Cookie Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}