'use client';

import React from 'react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, Download, Heart, DollarSign, Package, Shield, Users, Star, AlertTriangle } from 'lucide-react';

export default function ArtisanAgreementPage() {
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
              <Heart className="w-5 h-5" />
              <span>Artisan Partnership Agreement</span>
            </div>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Artisan Agreement
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
                    <Heart className="w-5 h-5 text-persian-green-600" />
                    <p className="text-graphite font-medium">Partnership Agreement</p>
                  </div>
                  <p className="text-graphite/70 text-sm">
                    This agreement outlines the terms and conditions for artisans joining the CraftArtMarketplace, 
                    including commission structure, quality standards, and mutual responsibilities.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">1. Agreement Overview</h2>
                <p className="text-graphite/80 mb-4">
                  Welcome to Craft&Art Marketplace! This Artisan Agreement ("Agreement") is entered into
                     between Craft&Art Marketplace Ltd. ("Craft&Art Marketplace," "we," "us," or "our") and you ("Artisan," "you," or "your") as an independent 
                  artisan seeking to sell your handcrafted products through our platform.
                </p>
                
                <p className="text-graphite/80 mb-6">
                  By creating an artisan account and listing products on Craft&Art Marketplace, you agree to be bound by this Agreement, 
                  our Terms of Service, Privacy Policy, and all applicable laws and regulations.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">2. Artisan Eligibility</h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.1 Basic Requirements</h3>
                <p className="text-graphite/80 mb-4">To become a Craft&Art Marketplace artisan, you must:</p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Be at least 18 years old or have legal guardian consent</li>
                  <li>Be a resident of Tanzania or have legal authorization to conduct business in Tanzania</li>
                  <li>Possess valid identification documents (National ID, Passport, or Business License)</li>
                  <li>Have a valid bank account or mobile money account for payments</li>
                  <li>Demonstrate authentic craftsmanship skills and cultural knowledge</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.2 Craft Categories</h3>
                <p className="text-graphite/80 mb-4">Craft&Art Marketplace welcomes artisans specializing in traditional Tanzanian crafts including:</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-graphite mb-2">Textile Arts</h4>
                    <ul className="text-graphite/70 text-sm space-y-1">
                      <li>• Kitenge and Kanga designs</li>
                      <li>• Traditional weaving</li>
                      <li>• Batik and tie-dye</li>
                      <li>• Embroidery and beadwork</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-graphite mb-2">Sculptural Arts</h4>
                    <ul className="text-graphite/70 text-sm space-y-1">
                      <li>• Makonde wood carving</li>
                      <li>• Stone sculpture</li>
                      <li>• Pottery and ceramics</li>
                      <li>• Metal work and jewelry</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-persian-green-500" />
                  3. Commission and Payment Structure
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.1 Commission Rates</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-graphite font-medium">Product Category</th>
                        <th className="text-left py-2 text-graphite font-medium">CraftArtMarketplace Commission</th>
                        <th className="text-left py-2 text-graphite font-medium">Artisan Earnings</th>
                      </tr>
                    </thead>
                    <tbody className="text-graphite/70">
                      <tr className="border-b">
                        <td className="py-2">Textiles & Clothing</td>
                        <td className="py-2">15%</td>
                        <td className="py-2">85%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Wood Carvings</td>
                        <td className="py-2">12%</td>
                        <td className="py-2">88%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Jewelry & Accessories</td>
                        <td className="py-2">18%</td>
                        <td className="py-2">82%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Pottery & Ceramics</td>
                        <td className="py-2">14%</td>
                        <td className="py-2">86%</td>
                      </tr>
                      <tr>
                        <td className="py-2">Custom/Commissioned Work</td>
                        <td className="py-2">10%</td>
                        <td className="py-2">90%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.2 Payment Schedule</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Weekly Payments:</strong> Earnings are processed every Friday for sales completed the previous week</li>
                  <li><strong>Minimum Payout:</strong> TSh 50,000 minimum balance required for payout</li>
                  <li><strong>Payment Methods:</strong> M-Pesa, Tigo Pesa, bank transfer, or mobile banking</li>
                  <li><strong>Currency:</strong> All payments made in Tanzanian Shillings (TSh)</li>
                  <li><strong>Processing Time:</strong> 1-3 business days depending on payment method</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.3 Bonus Programs</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800 mb-2">Performance Bonuses</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• 5% bonus for 4.8+ star rating</li>
                      <li>• 3% bonus for 50+ monthly sales</li>
                      <li>• 2% bonus for featured products</li>
                      <li>• 10% bonus during cultural festivals</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2">Loyalty Rewards</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• 1% commission reduction after 1 year</li>
                      <li>• 2% commission reduction after 3 years</li>
                      <li>• Priority customer support</li>
                      <li>• Free professional photography</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Package className="w-6 h-6 text-persian-green-500" />
                  4. Product Standards and Requirements
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.1 Quality Standards</h3>
                <p className="text-graphite/80 mb-4">All products listed on CraftArtMarketplace must meet our quality criteria:</p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Authenticity:</strong> Products must be genuinely handcrafted using traditional techniques</li>
                  <li><strong>Cultural Accuracy:</strong> Designs should respect and accurately represent Tanzanian heritage</li>
                  <li><strong>Material Quality:</strong> Use of high-quality, durable materials appropriate for the craft</li>
                  <li><strong>Craftsmanship:</strong> Demonstrate skilled workmanship with attention to detail</li>
                  <li><strong>Safety:</strong> Products must be safe for intended use and meet applicable safety standards</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.2 Product Photography</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Minimum 5 high-resolution photos per product (1200x1200 pixels)</li>
                  <li>Clear, well-lit images showing multiple angles</li>
                  <li>Lifestyle photos demonstrating product use when applicable</li>
                  <li>Accurate color representation</li>
                  <li>Professional photography services available through Craft&Art Marketplace</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.3 Product Descriptions</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Detailed descriptions in both English and Swahili</li>
                  <li>Cultural significance and traditional techniques explained</li>
                  <li>Accurate dimensions, materials, and care instructions</li>
                  <li>Story behind the piece and artisan background</li>
                  <li>Estimated production/shipping time</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-persian-green-500" />
                  5. Artisan Responsibilities
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.1 Order Fulfillment</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Processing Time:</strong> Orders must be processed within 2-5 business days</li>
                  <li><strong>Communication:</strong> Respond to customer inquiries within 24 hours</li>
                  <li><strong>Packaging:</strong> Secure, professional packaging that protects the product</li>
                  <li><strong>Shipping:</strong> Use Craft&Art Marketplace-approved shipping partners or coordinate pickup</li>
                  <li><strong>Tracking:</strong> Provide tracking information when available</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.2 Customer Service</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Maintain professional and respectful communication</li>
                  <li>Address customer concerns promptly and fairly</li>
                  <li>Honor return and exchange policies</li>
                  <li>Provide care instructions and usage guidance</li>
                  <li>Collaborate with Craft&Art Marketplace support team when needed</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.3 Inventory Management</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Keep product listings accurate and up-to-date</li>
                  <li>Update inventory levels regularly</li>
                  <li>Mark items as out-of-stock when unavailable</li>
                  <li>Notify Craft&Art Marketplace of extended production delays</li>
                  <li>Maintain consistent product quality across batches</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-persian-green-500" />
                  6. CraftArtMarketplace Support and Services
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.1 Marketing and Promotion</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Feature products in Craft&Art Marketplace marketing campaigns</li>
                   <li>Social media promotion across Craft&Art Marketplace channels</li>
                  <li>Participation in craft fairs and cultural events</li>
                  <li>SEO optimization for product listings</li>
                  <li>Email marketing to Craft&Art Marketplace customer base</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.2 Training and Development</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Digital marketing workshops for artisans</li>
                  <li>Photography training sessions</li>
                  <li>Business development mentorship</li>
                  <li>Cultural preservation education programs</li>
                  <li>Access to Craft&Art Marketplace artisan community network</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.3 Technical Support</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>24/7 platform technical support</li>
                  <li>Assistance with product listing optimization</li>
                  <li>Payment processing support</li>
                  <li>Mobile app training and troubleshooting</li>
                  <li>Regular platform updates and improvements</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-persian-green-500" />
                  7. Performance Standards
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">7.1 Key Performance Indicators</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-graphite font-medium">Metric</th>
                        <th className="text-left py-2 text-graphite font-medium">Minimum Standard</th>
                        <th className="text-left py-2 text-graphite font-medium">Excellence Level</th>
                      </tr>
                    </thead>
                    <tbody className="text-graphite/70">
                      <tr className="border-b">
                        <td className="py-2">Customer Rating</td>
                        <td className="py-2">4.0 stars</td>
                        <td className="py-2">4.8+ stars</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Order Fulfillment Time</td>
                        <td className="py-2">≤ 5 business days</td>
                        <td className="py-2">≤ 2 business days</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Response Time</td>
                        <td className="py-2">≤ 24 hours</td>
                        <td className="py-2">≤ 4 hours</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Order Cancellation Rate</td>
                        <td className="py-2">≤ 5%</td>
                        <td className="py-2">≤ 2%</td>
                      </tr>
                      <tr>
                        <td className="py-2">Return Rate</td>
                        <td className="py-2">≤ 10%</td>
                        <td className="py-2">≤ 5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">7.2 Performance Review Process</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>Monthly Reviews:</strong> Performance metrics evaluated monthly</li>
                  <li><strong>Improvement Plans:</strong> Support provided for artisans below standards</li>
                  <li><strong>Recognition Programs:</strong> Outstanding performers featured and rewarded</li>
                  <li><strong>Feedback System:</strong> Regular feedback from customers and Craft&Art Marketplace team</li>
                  <li><strong>Continuous Improvement:</strong> Ongoing training and development opportunities</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  8. Prohibited Activities
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">8.1 Product Restrictions</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Mass-produced or factory-made items</li>
                  <li>Products that infringe on intellectual property rights</li>
                  <li>Items that misrepresent cultural significance</li>
                  <li>Dangerous or illegal products</li>
                  <li>Products made from endangered species materials</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">8.2 Conduct Violations</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Attempting to circumvent Craft&Art Marketplace's payment system</li>
                  <li>Providing false or misleading product information</li>
                  <li>Harassment or inappropriate communication with customers</li>
                  <li>Manipulating reviews or ratings</li>
                  <li>Sharing customer information with third parties</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4">9. Agreement Termination</h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">9.1 Voluntary Termination</h3>
                <p className="text-graphite/80 mb-4">
                  You may terminate this agreement at any time by providing 30 days written notice to Craft&Art Marketplace. 
                  Upon termination, you must fulfill all pending orders and may withdraw any remaining balance.
                </p>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">9.2 Termination by CraftArtMarketplace</h3>
                 <p className="text-graphite/80 mb-4">
                   Craft&Art Marketplace may terminate this agreement immediately for:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Violation of this agreement or CraftArtMarketplace policies</li>
                  <li>Consistently poor performance metrics</li>
                  <li>Fraudulent or illegal activities</li>
                  <li>Failure to respond to communications for 30+ days</li>
                  <li>Repeated customer complaints or disputes</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4">10. Contact Information</h2>
                <p className="text-graphite/80 mb-4">
                  For questions about this Artisan Agreement or to discuss partnership opportunities:
                </p>
                <div className="bg-persian-green-50 p-4 rounded-lg">
                  <p className="text-graphite font-medium">Craft&Art Marketplace Artisan Relations Team</p>
                  <p className="text-graphite/70">Email: artisans@craftandartmarketplace.com</p>
                  <p className="text-graphite/70">Phone: +255 22 123 4567</p>
                  <p className="text-graphite/70">WhatsApp: +255 754 123 456</p>
                  <p className="text-graphite/70">Address: Msimbazi Street, Kariakoo, Dar es Salaam, Tanzania</p>
                  <p className="text-graphite/70 mt-2">Artisan Success Manager: Amina Hassan</p>
                </div>

                <div className="mt-8 pt-6 border-t border-copper-patina/20">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Ready to Join Craft&Art Marketplace?</h4>
                     <p className="text-green-700 text-sm">
                       Start your journey as a Craft&Art Marketplace artisan today! Our team is ready to help you showcase your 
                      beautiful crafts to customers around the world.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
                      Apply to Become an Artisan
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link href="/legal/cookie-policy">
                <Button variant="outline" className="border-persian-green-200 text-graphite hover:border-persian-green-500 hover:text-persian-green-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Cookie Policy
                </Button>
              </Link>
              
              <Link href="/legal/buyer-protection">
                <Button className="ceramic-button text-white">
                  Next: Buyer Protection
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