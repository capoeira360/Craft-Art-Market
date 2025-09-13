'use client';

import React from 'react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, Download, Shield, CreditCard, Package, RefreshCw, MessageCircle, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function BuyerProtectionPage() {
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
              <span>Customer Protection Policy</span>
            </div>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Buyer Protection
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
                    <Shield className="w-5 h-5 text-persian-green-600" />
                    <p className="text-graphite font-medium">Your Protection Guarantee</p>
                  </div>
                  <p className="text-graphite/70 text-sm">
                    Craft&Art Marketplace is committed to providing a safe and secure shopping experience. Our comprehensive buyer protection 
                    program ensures your satisfaction and protects your investment in authentic Tanzanian crafts.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">1. Protection Overview</h2>
                <p className="text-graphite/80 mb-4">
                  When you shop on Craft&Art Marketplace, you're protected by our comprehensive buyer protection program that covers your 
                  purchase from the moment you place your order until you're completely satisfied with your authentic 
                  Tanzanian craft.
                </p>
                
                <p className="text-graphite/80 mb-6">
                  Our protection covers all purchases made through the Craft&Art Marketplace platform, including custom orders, 
                  pre-orders, and standard product purchases. We work directly with our verified artisans to ensure 
                  every transaction meets our high standards.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-persian-green-500" />
                  2. Payment Protection
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.1 Secure Payment Processing</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Encrypted Transactions:</strong> All payments processed through SSL-encrypted connections</li>
                  <li><strong>PCI Compliance:</strong> Our payment systems meet international security standards</li>
                  <li><strong>Multiple Payment Options:</strong> Credit cards, M-Pesa, bank transfers, and digital wallets</li>
                  <li><strong>Fraud Detection:</strong> Advanced algorithms monitor for suspicious activity</li>
                  <li><strong>Secure Storage:</strong> Payment information is never stored on CraftArtMarketplace servers</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.2 Payment Hold System</h3>
                <p className="text-graphite/80 mb-4">
                  To protect both buyers and artisans, Craft&Art Marketplace holds payment until order completion:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-graphite mb-1">Payment Secured</h4>
                      <p className="text-graphite/70 text-sm">Your payment is held safely until order fulfillment</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Package className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h4 className="font-semibold text-graphite mb-1">Order Shipped</h4>
                      <p className="text-graphite/70 text-sm">Artisan ships your order with tracking information</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-graphite mb-1">Payment Released</h4>
                      <p className="text-graphite/70 text-sm">Artisan receives payment after delivery confirmation</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Package className="w-6 h-6 text-persian-green-500" />
                  3. Order Protection
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.1 Order Guarantee Coverage</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800 mb-2">What's Covered</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Item not received</li>
                      <li>• Significantly different from description</li>
                      <li>• Damaged during shipping</li>
                      <li>• Quality issues or defects</li>
                      <li>• Authenticity concerns</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2">Resolution Options</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Full refund</li>
                      <li>• Partial refund</li>
                      <li>• Replacement item</li>
                      <li>• Store credit</li>
                      <li>• Repair or restoration</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.2 Delivery Protection</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>Tracking Coverage:</strong> All orders include tracking when available</li>
                  <li><strong>Delivery Confirmation:</strong> Proof of delivery required for order completion</li>
                  <li><strong>Lost Package Protection:</strong> Full refund if package is confirmed lost</li>
                  <li><strong>Delivery Insurance:</strong> High-value items automatically insured</li>
                  <li><strong>Safe Delivery:</strong> Signature required for orders over TSh 500,000</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <RefreshCw className="w-6 h-6 text-persian-green-500" />
                  4. Return and Refund Policy
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.1 Return Eligibility</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-graphite font-medium">Product Category</th>
                        <th className="text-left py-2 text-graphite font-medium">Return Window</th>
                        <th className="text-left py-2 text-graphite font-medium">Conditions</th>
                      </tr>
                    </thead>
                    <tbody className="text-graphite/70">
                      <tr className="border-b">
                        <td className="py-2">Textiles & Clothing</td>
                        <td className="py-2">30 days</td>
                        <td className="py-2">Unworn, original tags</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Wood Carvings</td>
                        <td className="py-2">14 days</td>
                        <td className="py-2">Undamaged, original packaging</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Jewelry</td>
                        <td className="py-2">30 days</td>
                        <td className="py-2">Unworn, original packaging</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Pottery & Ceramics</td>
                        <td className="py-2">7 days</td>
                        <td className="py-2">Undamaged, original packaging</td>
                      </tr>
                      <tr>
                        <td className="py-2">Custom/Commissioned</td>
                        <td className="py-2">Case-by-case</td>
                        <td className="py-2">Significant deviation from order</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.2 Refund Process</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Step-by-Step Refund Process</h4>
                  <ol className="text-blue-700 text-sm space-y-2">
                    <li><strong>1. Initiate Return:</strong> Contact Craft&Art Marketplace support within return window</li>
                    <li><strong>2. Return Authorization:</strong> Receive return shipping label and instructions</li>
                    <li><strong>3. Package Item:</strong> Securely package item in original condition</li>
                    <li><strong>4. Ship Return:</strong> Send item using provided shipping label</li>
                    <li><strong>5. Inspection:</strong> Craft&Art Marketplace inspects returned item (2-3 business days)</li>
                    <li><strong>6. Refund Processed:</strong> Refund issued to original payment method (5-7 business days)</li>
                  </ol>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.3 Refund Timeline</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>Credit Cards:</strong> 5-7 business days after approval</li>
                  <li><strong>M-Pesa/Mobile Money:</strong> 1-2 business days after approval</li>
                  <li><strong>Bank Transfer:</strong> 3-5 business days after approval</li>
                  <li><strong>Store Credit:</strong> Immediate after approval</li>
                  <li><strong>Original Payment Method:</strong> Refunds processed to original payment source</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-persian-green-500" />
                  5. Dispute Resolution
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.1 Filing a Dispute</h3>
                <p className="text-graphite/80 mb-4">
                  If you're not satisfied with your purchase, you can file a dispute through your Craft&Art Marketplace account:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Log into your Craft&Art Marketplace account and navigate to "Order History"</li>
                  <li>Select the problematic order and click "Report Issue"</li>
                  <li>Choose the appropriate issue category and provide details</li>
                  <li>Upload photos or documentation supporting your claim</li>
                  <li>Submit the dispute for Craft&Art Marketplace review</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.2 Dispute Categories</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Order Issues</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Item not received</li>
                      <li>• Wrong item shipped</li>
                      <li>• Damaged in transit</li>
                      <li>• Significantly delayed</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Quality Issues</h4>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• Poor craftsmanship</li>
                      <li>• Not as described</li>
                      <li>• Authenticity concerns</li>
                      <li>• Material defects</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.3 Resolution Timeline</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-graphite font-medium">Stage</th>
                        <th className="text-left py-2 text-graphite font-medium">Timeline</th>
                        <th className="text-left py-2 text-graphite font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-graphite/70">
                      <tr className="border-b">
                        <td className="py-2">Initial Review</td>
                        <td className="py-2">24-48 hours</td>
                        <td className="py-2">Craft&Art Marketplace reviews dispute details</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Artisan Response</td>
                        <td className="py-2">3-5 business days</td>
                        <td className="py-2">Artisan provides their perspective</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Investigation</td>
                        <td className="py-2">5-7 business days</td>
                        <td className="py-2">Craft&Art Marketplace investigates and mediates</td>
                      </tr>
                      <tr>
                        <td className="py-2">Final Resolution</td>
                        <td className="py-2">1-2 business days</td>
                        <td className="py-2">Decision communicated to both parties</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-persian-green-500" />
                  6. Customer Support
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.1 Support Channels</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Immediate Support</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Live chat (9 AM - 6 PM EAT)</li>
                      <li>• WhatsApp: +255 754 123 456</li>
                      <li>• Phone: +255 22 123 4567</li>
                      <li>• Emergency hotline available</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Extended Support</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Email: support@craftartmarketplace.com</li>
                      <li>• Support ticket system</li>
                      <li>• Video call consultations</li>
                      <li>• In-person meetings (Dar es Salaam)</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.2 Response Times</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>Live Chat:</strong> Immediate during business hours</li>
                  <li><strong>WhatsApp:</strong> Within 1 hour during business hours</li>
                  <li><strong>Phone:</strong> Immediate during business hours</li>
                  <li><strong>Email:</strong> Within 4 hours during business days</li>
                  <li><strong>Support Tickets:</strong> Within 24 hours</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  7. Limitations and Exclusions
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">7.1 Protection Limitations</h3>
                <p className="text-graphite/80 mb-4">
                  While our buyer protection is comprehensive, certain limitations apply:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Protection applies only to purchases made through Craft&Art Marketplace platform</li>
                  <li>Custom orders have different return policies due to their personalized nature</li>
                  <li>Buyer must report issues within specified timeframes</li>
                  <li>Items must be returned in original condition unless damaged upon receipt</li>
                  <li>Shipping costs for returns may be buyer's responsibility in some cases</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">7.2 Excluded Items</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Items damaged due to misuse or normal wear and tear</li>
                  <li>Products altered or modified after delivery</li>
                  <li>Items returned without proper authorization</li>
                  <li>Perishable or consumable products (if applicable)</li>
                  <li>Digital products or services</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4">8. Contact Buyer Protection Team</h2>
                <p className="text-graphite/80 mb-4">
                  For specific questions about buyer protection or to file a claim:
                </p>
                <div className="bg-persian-green-50 p-4 rounded-lg">
                  <p className="text-graphite font-medium">Craft&Art Marketplace Buyer Protection Team</p>
                  <p className="text-graphite/70">Email: protection@craftandartmarketplace.com</p>
                  <p className="text-graphite/70">Phone: +255 22 123 4567 (Option 2)</p>
                  <p className="text-graphite/70">WhatsApp: +255 754 123 456</p>
                  <p className="text-graphite/70">Address: Msimbazi Street, Kariakoo, Dar es Salaam, Tanzania</p>
                  <p className="text-graphite/70 mt-2">Protection Specialist: David Mwanga</p>
                </div>

                <div className="mt-8 pt-6 border-t border-copper-patina/20">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Shop with Confidence</h4>
                    <p className="text-green-700 text-sm mb-3">
                      Our buyer protection program ensures you can shop for authentic Tanzanian crafts with complete 
                      peace of mind. Every purchase is backed by our commitment to customer satisfaction.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
                      Start Shopping Protected
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link href="/legal/artisan-agreement">
                <Button variant="outline" className="border-persian-green-200 text-graphite hover:border-persian-green-500 hover:text-persian-green-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Artisan Agreement
                </Button>
              </Link>
              
              <Link href="/legal/intellectual-property">
                <Button className="ceramic-button text-white">
                  Next: Intellectual Property
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