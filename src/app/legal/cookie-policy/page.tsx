'use client';

import React from 'react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, Cookie, Download, Settings, Shield, BarChart, Target } from 'lucide-react';

export default function CookiePolicyPage() {
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
              <Cookie className="w-5 h-5" />
              <span>Cookie & Tracking Policy</span>
            </div>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Cookie Policy
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Last Updated: December 20, 2023</span>
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
                    <Cookie className="w-5 h-5 text-persian-green-600" />
                    <p className="text-graphite font-medium">Understanding Cookies</p>
                  </div>
                  <p className="text-graphite/70 text-sm">
                    This Cookie Policy explains how CraftArtMarketplace uses cookies and similar technologies to enhance your browsing experience, 
                    analyze usage patterns, and provide personalized content.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">1. What Are Cookies?</h2>
                <p className="text-graphite/80 mb-4">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. 
                  They help websites remember information about your visit, such as your preferred language, login status, and other settings.
                </p>
                
                <p className="text-graphite/80 mb-6">
                  Cookies make your browsing experience more efficient and personalized by allowing websites to remember your preferences 
                  and provide relevant content and functionality.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">2. Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-persian-green-500" />
                  2.1 Essential Cookies
                </h3>
                <p className="text-graphite/80 mb-4">
                  These cookies are necessary for the basic functionality of our platform and cannot be disabled:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-graphite font-medium">Cookie Name</th>
                        <th className="text-left py-2 text-graphite font-medium">Purpose</th>
                        <th className="text-left py-2 text-graphite font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-graphite/70">
                      <tr className="border-b">
                        <td className="py-2">craftart_session</td>
                        <td className="py-2">Maintains your login session</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">csrf_token</td>
                        <td className="py-2">Security protection against attacks</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">cart_items</td>
                        <td className="py-2">Remembers items in your shopping cart</td>
                        <td className="py-2">7 days</td>
                      </tr>
                      <tr>
                        <td className="py-2">language_pref</td>
                        <td className="py-2">Stores your language preference</td>
                        <td className="py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3 flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-persian-green-500" />
                  2.2 Analytics Cookies
                </h3>
                <p className="text-graphite/80 mb-4">
                  These cookies help us understand how visitors interact with our platform:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-graphite font-medium">Cookie Name</th>
                        <th className="text-left py-2 text-graphite font-medium">Purpose</th>
                        <th className="text-left py-2 text-graphite font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-graphite/70">
                      <tr className="border-b">
                        <td className="py-2">_ga</td>
                        <td className="py-2">Google Analytics - distinguishes users</td>
                        <td className="py-2">2 years</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">_ga_*</td>
                        <td className="py-2">Google Analytics - session data</td>
                        <td className="py-2">2 years</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">craftart_analytics</td>
                        <td className="py-2">Internal analytics and usage tracking</td>
                        <td className="py-2">1 year</td>
                      </tr>
                      <tr>
                        <td className="py-2">hotjar_*</td>
                        <td className="py-2">User behavior analysis and heatmaps</td>
                        <td className="py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-persian-green-500" />
                  2.3 Marketing and Personalization Cookies
                </h3>
                <p className="text-graphite/80 mb-4">
                  These cookies enable personalized content and targeted advertising (with your consent):
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-graphite font-medium">Cookie Name</th>
                        <th className="text-left py-2 text-graphite font-medium">Purpose</th>
                        <th className="text-left py-2 text-graphite font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-graphite/70">
                      <tr className="border-b">
                        <td className="py-2">user_preferences</td>
                        <td className="py-2">Stores your browsing and purchase preferences</td>
                        <td className="py-2">1 year</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">recommended_items</td>
                        <td className="py-2">Powers personalized product recommendations</td>
                        <td className="py-2">6 months</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">fb_pixel</td>
                        <td className="py-2">Facebook advertising and retargeting</td>
                        <td className="py-2">3 months</td>
                      </tr>
                      <tr>
                        <td className="py-2">google_ads</td>
                        <td className="py-2">Google Ads conversion tracking</td>
                        <td className="py-2">90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">3. Third-Party Cookies</h2>
                <p className="text-graphite/80 mb-4">
                  We work with trusted third-party services that may set their own cookies:
                </p>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.1 Analytics Services</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Google Analytics:</strong> Provides detailed insights into website usage and user behavior</li>
                  <li><strong>Hotjar:</strong> Offers heatmaps and session recordings to improve user experience</li>
                  <li><strong>Mixpanel:</strong> Tracks user interactions and conversion funnels</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.2 Payment Processors</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Stripe:</strong> Secure payment processing and fraud detection</li>
                  <li><strong>PayPal:</strong> Alternative payment method integration</li>
                  <li><strong>M-Pesa:</strong> Mobile money integration for Tanzanian users</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.3 Social Media Platforms</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>Facebook:</strong> Social login and sharing functionality</li>
                  <li><strong>Instagram:</strong> Product showcase and social integration</li>
                  <li><strong>WhatsApp:</strong> Customer support chat integration</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-persian-green-500" />
                  4. Managing Your Cookie Preferences
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.1 Cookie Consent Manager</h3>
                <p className="text-graphite/80 mb-4">
                  When you first visit CraftArtMarketplace, you'll see a cookie consent banner that allows you to:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Accept all cookies for the full CraftArtMarketplace experience</li>
                  <li>Customize your preferences by cookie category</li>
                  <li>Reject non-essential cookies (some features may be limited)</li>
                  <li>Learn more about each type of cookie we use</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.2 Browser Settings</h3>
                <p className="text-graphite/80 mb-4">
                  You can also manage cookies through your browser settings:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Chrome:</strong> Settings {'>'}  Privacy and Security {'>'} Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings {'>'} Privacy & Security {'>'} Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences {'>'} Privacy {'>'} Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings {'>'} Cookies and site permissions {'>'} Cookies and site data</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.3 Mobile Devices</h3>
                <p className="text-graphite/80 mb-6">
                  On mobile devices, you can manage cookies through your browser app settings or by using our mobile app's 
                  privacy settings. Our mobile apps also respect your device's advertising ID preferences.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">5. Impact of Disabling Cookies</h2>
                <p className="text-graphite/80 mb-4">
                  While you can disable cookies, doing so may affect your experience on CraftArtMarketplace:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-semibold text-red-800 mb-2">Limited Functionality</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Shopping cart may not work properly</li>
                      <li>• Login sessions may not persist</li>
                      <li>• Language preferences won't be saved</li>
                      <li>• Personalized recommendations disabled</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800 mb-2">Still Available</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Browse products and artisan profiles</li>
                      <li>• Read craft stories and cultural content</li>
                      <li>• Contact customer support</li>
                      <li>• Access basic platform features</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">6. Cookie Security</h2>
                <p className="text-graphite/80 mb-4">
                  We implement several security measures to protect cookie data:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>Secure Flag:</strong> Cookies are only transmitted over HTTPS connections</li>
                  <li><strong>HttpOnly Flag:</strong> Prevents client-side script access to sensitive cookies</li>
                  <li><strong>SameSite Attribute:</strong> Protects against cross-site request forgery attacks</li>
                  <li><strong>Encryption:</strong> Sensitive cookie data is encrypted before storage</li>
                  <li><strong>Regular Audits:</strong> We regularly review and update our cookie practices</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4">7. Updates to This Policy</h2>
                <p className="text-graphite/80 mb-6">
                  We may update this Cookie Policy to reflect changes in our practices, technology, or legal requirements. 
                  When we make significant changes, we'll notify you through:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>A prominent notice on our platform</li>
                  <li>Email notification to registered users</li>
                  <li>Updated cookie consent banner</li>
                  <li>Push notifications in our mobile app</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4">8. Contact Us About Cookies</h2>
                <p className="text-graphite/80 mb-4">
                  If you have questions about our use of cookies or want to exercise your rights regarding cookie data:
                </p>
                <div className="bg-persian-green-50 p-4 rounded-lg">
                  <p className="text-graphite font-medium">CraftArtMarketplace Privacy Team</p>
                  <p className="text-graphite/70">Email: privacy@craftartmarketplace.com</p>
                  <p className="text-graphite/70">Phone: +255 22 123 4567</p>
                  <p className="text-graphite/70">Address: Msimbazi Street, Kariakoo, Dar es Salaam, Tanzania</p>
                  <p className="text-graphite/70 mt-2">Cookie Specialist: Sarah Mwalimu</p>
                </div>

                <div className="mt-8 pt-6 border-t border-copper-patina/20">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Quick Cookie Settings</h4>
                    <p className="text-blue-700 text-sm mb-3">
                      You can update your cookie preferences at any time by clicking the "Cookie Settings" link in our footer 
                      or by visiting your account privacy settings.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                      Manage Cookie Preferences
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link href="/legal/privacy-policy">
                <Button variant="outline" className="border-persian-green-200 text-graphite hover:border-persian-green-500 hover:text-persian-green-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Privacy Policy
                </Button>
              </Link>
              
              <Link href="/legal/artisan-agreement">
                <Button className="ceramic-button text-white">
                  Next: Artisan Agreement
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