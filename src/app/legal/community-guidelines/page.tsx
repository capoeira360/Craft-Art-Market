'use client';

import React from 'react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, Download, Users, Heart, MessageCircle, Shield, Star, AlertTriangle, Flag, CheckCircle } from 'lucide-react';

export default function CommunityGuidelinesPage() {
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
              <Users className="w-5 h-5" />
              <span>Community Standards</span>
            </div>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Community Guidelines
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
                    <p className="text-graphite font-medium">Building a Respectful Community</p>
                  </div>
                  <p className="text-graphite/70 text-sm">
                    Craft&Art Marketplace is more than a marketplace—it's a community celebrating global culture and craftsmanship. 
                    These guidelines help us maintain a respectful, inclusive, and supportive environment for all.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">1. Our Community Values</h2>
                <p className="text-graphite/80 mb-4">
                  Craft&Art Marketplace is built on the foundation of respect, authenticity, and cultural appreciation. Our community 
                  guidelines reflect the values that make our platform a welcoming space for artisans, customers, 
                  and cultural enthusiasts from around the world.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Core Values
                    </h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Respect for cultural heritage</li>
                      <li>• Support for artisan livelihoods</li>
                      <li>• Authentic representation</li>
                      <li>• Inclusive community building</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Community Goals
                    </h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Foster cultural understanding</li>
                      <li>• Promote fair trade practices</li>
                      <li>• Encourage meaningful connections</li>
                      <li>• Preserve traditional knowledge</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-persian-green-500" />
                  2. Communication Standards
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.1 Respectful Communication</h3>
                <p className="text-graphite/80 mb-4">
                  All interactions on Craft&Art Marketplace should be conducted with respect and professionalism:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Courteous Language:</strong> Use polite and respectful language in all communications</li>
                  <li><strong>Cultural Sensitivity:</strong> Be mindful of cultural differences and traditions</li>
                  <li><strong>Constructive Feedback:</strong> Provide helpful and specific feedback when reviewing products</li>
                  <li><strong>Professional Tone:</strong> Maintain professionalism in business communications</li>
                  <li><strong>Patience and Understanding:</strong> Allow time for responses and clarifications</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.2 Language Guidelines</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">✓ Encouraged</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Positive and supportive comments</li>
                        <li>• Constructive questions about products</li>
                        <li>• Cultural appreciation and learning</li>
                        <li>• Helpful suggestions and advice</li>
                        <li>• Sharing personal experiences</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">✗ Prohibited</h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• Offensive or discriminatory language</li>
                        <li>• Personal attacks or harassment</li>
                        <li>• Cultural stereotypes or insensitivity</li>
                        <li>• Spam or irrelevant content</li>
                        <li>• False or misleading information</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.3 Multi-Language Support</h3>
                <p className="text-graphite/80 mb-6">
                  Craft&Art Marketplace welcomes communication in multiple languages, with primary support for:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>Swahili:</strong> Primary language for local Tanzanian community</li>
                  <li><strong>English:</strong> International communication and business</li>
                  <li><strong>Local Languages:</strong> Tribal languages for cultural context when appropriate</li>
                  <li><strong>Translation Support:</strong> Craft&Art Marketplace provides translation assistance when needed</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-persian-green-500" />
                  3. Review and Rating Guidelines
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.1 Honest and Fair Reviews</h3>
                <p className="text-graphite/80 mb-4">
                  Reviews help build trust in our community and assist other customers in making informed decisions:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Authentic Experience:</strong> Only review products you have actually purchased and received</li>
                  <li><strong>Balanced Perspective:</strong> Include both positive aspects and areas for improvement</li>
                  <li><strong>Specific Details:</strong> Provide specific information about quality, craftsmanship, and service</li>
                  <li><strong>Cultural Context:</strong> Appreciate the cultural significance and traditional techniques</li>
                  <li><strong>Fair Expectations:</strong> Consider that handmade items may have natural variations</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.2 Review Content Standards</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">What Makes a Great Review</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Detailed description of the product received</li>
                    <li>• Assessment of quality and craftsmanship</li>
                    <li>• Comments on packaging and shipping experience</li>
                    <li>• Artisan communication and service quality</li>
                    <li>• Photos of the actual product (encouraged)</li>
                    <li>• Cultural learning or appreciation gained</li>
                  </ul>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.3 Prohibited Review Practices</h3>
                <div className="bg-red-50 p-4 rounded-lg mb-6 border-l-4 border-red-400">
                  <h4 className="font-semibold text-red-800 mb-2">Review Violations</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Fake or incentivized reviews</li>
                    <li>• Reviews for products not purchased</li>
                    <li>• Personal attacks on artisans</li>
                    <li>• Reviews focused on shipping delays beyond artisan control</li>
                    <li>• Discriminatory comments about cultural practices</li>
                    <li>• Attempts to manipulate ratings</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-persian-green-500" />
                  4. Safety and Security
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.1 Personal Information Protection</h3>
                <p className="text-graphite/80 mb-4">
                  Protecting personal information is crucial for community safety:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Privacy Respect:</strong> Never share others' personal information without consent</li>
                  <li><strong>Secure Communication:</strong> Use Craft&Art Marketplace's messaging system for initial communications</li>
                  <li><strong>Contact Information:</strong> Be cautious about sharing personal contact details</li>
                  <li><strong>Meeting Safety:</strong> If meeting in person, choose public locations</li>
                  <li><strong>Financial Security:</strong> Use Craft&Art Marketplace's secure payment system for transactions</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.2 Fraud Prevention</h3>
                <div className="bg-amber-50 p-4 rounded-lg mb-4 border-l-4 border-amber-400">
                  <h4 className="font-semibold text-amber-800 mb-2">Warning Signs to Report</h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Requests for payment outside Craft&Art Marketplace platform</li>
                    <li>• Unusually low prices for high-value items</li>
                    <li>• Pressure to complete transactions quickly</li>
                    <li>• Requests for personal financial information</li>
                    <li>• Sellers with no reviews or verification</li>
                    <li>• Products that seem too good to be true</li>
                  </ul>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.3 Account Security</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Use strong, unique passwords for your Craft&Art Marketplace account</li>
                  <li>Enable two-factor authentication when available</li>
                  <li>Log out from shared or public computers</li>
                  <li>Report suspicious account activity immediately</li>
                  <li>Keep your contact information up to date</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  5. Prohibited Behavior
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.1 Harassment and Discrimination</h3>
                <p className="text-graphite/80 mb-4">
                  Craft&Art Marketplace has zero tolerance for harassment, discrimination, or hate speech:
                </p>
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-red-800 mb-2">Strictly Prohibited</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Harassment based on race, ethnicity, religion, gender, or sexual orientation</li>
                    <li>• Bullying, intimidation, or threatening behavior</li>
                    <li>• Hate speech or discriminatory language</li>
                    <li>• Sexual harassment or inappropriate advances</li>
                    <li>• Doxxing or sharing personal information maliciously</li>
                    <li>• Stalking or persistent unwanted contact</li>
                  </ul>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.2 Fraudulent Activities</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>False Representation:</strong> Misrepresenting products, services, or identity</li>
                  <li><strong>Payment Fraud:</strong> Using stolen payment methods or chargebacks abuse</li>
                  <li><strong>Fake Reviews:</strong> Creating or purchasing fake reviews and ratings</li>
                  <li><strong>Counterfeit Goods:</strong> Selling fake or misrepresented authentic items</li>
                  <li><strong>Bait and Switch:</strong> Advertising one product but delivering another</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.3 Platform Abuse</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Spamming users with unsolicited messages or promotions</li>
                  <li>Creating multiple accounts to circumvent restrictions</li>
                  <li>Attempting to hack or compromise platform security</li>
                  <li>Using automated tools to manipulate platform features</li>
                  <li>Violating intellectual property rights of others</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Flag className="w-6 h-6 text-persian-green-500" />
                  6. Reporting and Enforcement
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.1 How to Report Violations</h3>
                <p className="text-graphite/80 mb-4">
                  If you encounter behavior that violates our community guidelines:
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Reporting Methods</h4>
                  <ol className="text-blue-700 text-sm space-y-2">
                    <li><strong>1. In-Platform Reporting:</strong> Use the "Report" button on profiles, listings, or messages</li>
                    <li><strong>2. Email Report:</strong> Send detailed report to safety@craftartmarketplace.com</li>
                    <li><strong>3. Phone Report:</strong> Call +1 555 123 4567 for urgent safety concerns</li>
                    <li><strong>4. WhatsApp:</strong> Message +1 555 987 6543 for quick reporting</li>
                    <li><strong>5. Support Ticket:</strong> Create a detailed ticket through your account</li>
                  </ol>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.2 What to Include in Reports</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Specific details about the violation</li>
                  <li>Screenshots or evidence when possible</li>
                  <li>Usernames or profile information of involved parties</li>
                  <li>Date and time of the incident</li>
                  <li>Any relevant conversation history</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.3 Enforcement Actions</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-graphite font-medium">Violation Severity</th>
                        <th className="text-left py-2 text-graphite font-medium">First Offense</th>
                        <th className="text-left py-2 text-graphite font-medium">Repeat Offense</th>
                      </tr>
                    </thead>
                    <tbody className="text-graphite/70">
                      <tr className="border-b">
                        <td className="py-2">Minor (spam, inappropriate language)</td>
                        <td className="py-2">Warning + Education</td>
                        <td className="py-2">Temporary Restriction</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Moderate (harassment, fake reviews)</td>
                        <td className="py-2">Temporary Suspension</td>
                        <td className="py-2">Extended Suspension</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Severe (fraud, discrimination)</td>
                        <td className="py-2">Immediate Suspension</td>
                        <td className="py-2">Permanent Ban</td>
                      </tr>
                      <tr>
                        <td className="py-2">Critical (threats, illegal activity)</td>
                        <td className="py-2">Immediate Ban + Legal Action</td>
                        <td className="py-2">Legal Prosecution</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">7. Cultural Sensitivity Guidelines</h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">7.1 Respecting Traditional Knowledge</h3>
                <p className="text-graphite/80 mb-4">
                  When engaging with traditional crafts and cultural items:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Learn and Appreciate:</strong> Take time to understand the cultural significance</li>
                  <li><strong>Ask Questions Respectfully:</strong> Inquire about traditions with genuine interest</li>
                  <li><strong>Avoid Appropriation:</strong> Respect sacred or ceremonial items</li>
                  <li><strong>Support Authenticity:</strong> Value genuine traditional techniques</li>
                  <li><strong>Share Knowledge:</strong> Help educate others about cultural significance</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">7.2 Cross-Cultural Communication</h3>
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-green-800 mb-2">Best Practices</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Be patient with language barriers and cultural differences</li>
                    <li>• Ask for clarification when cultural context is unclear</li>
                    <li>• Appreciate the time and skill involved in traditional crafts</li>
                    <li>• Respect different business practices and communication styles</li>
                    <li>• Celebrate the diversity of Tanzanian cultural expressions</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">8. Community Support</h2>
                <p className="text-graphite/80 mb-4">
                  For questions about community guidelines or to report concerns:
                </p>
                <div className="bg-persian-green-50 p-4 rounded-lg">
                  <p className="text-graphite font-medium">Craft&Art Marketplace Community Team</p>
                  <p className="text-graphite/70">Email: community@craftandartmarketplace.com</p>
                  <p className="text-graphite/70">Safety Team: safety@craftandartmarketplace.com</p>
                  <p className="text-graphite/70">Phone: +1 555 123 4567 (Option 4)</p>
                  <p className="text-graphite/70">WhatsApp: +1 555 987 6543</p>
                  <p className="text-graphite/70">Address: 123 Artisan Way, Creative District, New York, NY 10001</p>
                  <p className="text-graphite/70 mt-2">Community Manager: Grace Mwangi</p>
                </div>

                <div className="mt-8 pt-6 border-t border-copper-patina/20">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Join Our Positive Community</h4>
                    <p className="text-green-700 text-sm mb-3">
                      Help us build a welcoming, respectful community that celebrates global culture and 
                      supports artisan livelihoods. Together, we can create meaningful connections across cultures.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
                      Learn More About Our Community
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link href="/legal/intellectual-property">
                <Button variant="outline" className="border-persian-green-200 text-graphite hover:border-persian-green-500 hover:text-persian-green-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Intellectual Property
                </Button>
              </Link>
              
              <Link href="/legal/accessibility">
                <Button className="ceramic-button text-white">
                  Next: Accessibility Statement
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