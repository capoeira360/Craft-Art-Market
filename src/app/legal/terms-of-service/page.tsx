'use client';

import React from 'react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, FileText, Download } from 'lucide-react';

export default function TermsOfServicePage() {
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
              <FileText className="w-5 h-5" />
              <span>Legal Document</span>
            </div>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Terms of Service
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Last Updated: January 15, 2024</span>
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
                  <p className="text-graphite font-medium mb-2">Welcome to Craft&Art Marketplace</p>
                  <p className="text-graphite/70 text-sm">
                    These Terms of Service govern your use of the Craft Art Marketplace (Craft&Art Marketplace) platform. 
                    By accessing or using our services, you agree to be bound by these terms.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">1. Acceptance of Terms</h2>
                <p className="text-graphite/80 mb-6">
                  By accessing and using the Craft&Art Marketplace platform, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">2. Platform Description</h2>
                <p className="text-graphite/80 mb-4">
                  Craft&Art Marketplace is an online marketplace that connects Tanzanian artisans with global customers, facilitating the sale of authentic 
                  handcrafted products including:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Traditional Tanzanian crafts and artwork</li>
                  <li>Handwoven textiles and Kitenge fabrics</li>
                  <li>Wood carvings and sculptures</li>
                  <li>Beadwork and jewelry</li>
                  <li>Tingatinga paintings</li>
                  <li>Other authentic cultural artifacts</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4">3. User Accounts</h2>
                <h3 className="text-xl font-semibold text-graphite mb-3">3.1 Account Registration</h3>
                <p className="text-graphite/80 mb-4">
                  To access certain features of Craft&Art Marketplace, you must register for an account. You agree to provide accurate, current, 
                  and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.2 Account Security</h3>
                <p className="text-graphite/80 mb-6">
                  You are responsible for safeguarding the password and for maintaining the confidentiality of your account. 
                  You agree not to disclose your password to any third party and to take sole responsibility for activities that occur under your account.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">4. Artisan Responsibilities</h2>
                <h3 className="text-xl font-semibold text-graphite mb-3">4.1 Product Authenticity</h3>
                <p className="text-graphite/80 mb-4">
                  Artisans warrant that all products listed on Craft&Art Marketplace are:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li>Authentic handcrafted items created by the artisan</li>
                  <li>Accurately described and photographed</li>
                  <li>Free from defects not disclosed in the product description</li>
                  <li>Compliant with all applicable laws and regulations</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.2 Cultural Sensitivity</h3>
                <p className="text-graphite/80 mb-6">
                  Artisans must respect Tanzanian cultural heritage and traditions. Products that misrepresent or inappropriately 
                  commercialize sacred or culturally sensitive items are prohibited.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">5. Buyer Responsibilities</h2>
                <h3 className="text-xl font-semibold text-graphite mb-3">5.1 Payment</h3>
                <p className="text-graphite/80 mb-4">
                  Buyers agree to pay all charges incurred in connection with their purchases, including applicable taxes and shipping fees. 
                  Payment is due at the time of purchase unless otherwise agreed upon.
                </p>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.2 Cultural Respect</h3>
                <p className="text-graphite/80 mb-6">
                  Buyers are expected to treat artisans and their cultural heritage with respect. Inappropriate behavior, 
                  cultural insensitivity, or harassment will result in account suspension or termination.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">6. Prohibited Activities</h2>
                <p className="text-graphite/80 mb-4">Users may not:</p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Use the platform for any illegal or unauthorized purpose</li>
                  <li>Violate any laws in your jurisdiction</li>
                  <li>Transmit any worms, viruses, or any code of a destructive nature</li>
                  <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>Submit false or misleading information</li>
                  <li>Upload or transmit viruses or any other type of malicious code</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4">7. Commission and Fees</h2>
                <p className="text-graphite/80 mb-4">
                  Craft&Art Marketplace charges a commission of 15% on all successful sales. This commission covers:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Platform maintenance and development</li>
                  <li>Payment processing</li>
                  <li>Customer support</li>
                  <li>Marketing and promotion</li>
                  <li>Quality assurance and authenticity verification</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4">8. Intellectual Property</h2>
                <p className="text-graphite/80 mb-6">
                  The Craft&Art Marketplace platform and its original content, features, and functionality are owned by Craft&Art Marketplace and are protected by 
                  international copyright, trademark, patent, trade secret, and other intellectual property laws. 
                  Artisans retain ownership of their product designs and cultural heritage.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">9. Dispute Resolution</h2>
                <p className="text-graphite/80 mb-6">
                  Craft&Art Marketplace provides mediation services for disputes between buyers and artisans. We encourage direct communication 
                  first, but our support team is available to help resolve issues fairly and promptly. 
                  Serious disputes may be referred to appropriate Tanzanian legal authorities.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">10. Limitation of Liability</h2>
                <p className="text-graphite/80 mb-6">
                  Craft&Art Marketplace shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                  resulting from your use of the platform.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">11. Termination</h2>
                <p className="text-graphite/80 mb-6">
                  We may terminate or suspend your account and bar access to the platform immediately, without prior notice or liability, 
                  under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">12. Changes to Terms</h2>
                <p className="text-graphite/80 mb-6">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                  we will provide at least 30 days notice prior to any new terms taking effect. 
                  What constitutes a material change will be determined at our sole discretion.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">13. Governing Law</h2>
                <p className="text-graphite/80 mb-6">
                  These Terms shall be interpreted and governed by the laws of the United Republic of Tanzania, 
                  without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms 
                  will be brought exclusively in the courts of Tanzania.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">14. Contact Information</h2>
                <p className="text-graphite/80 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-persian-green-50 p-4 rounded-lg">
                  <p className="text-graphite font-medium">Craft&Art Marketplace Legal Department</p>
                  <p className="text-graphite/70">Email: legal@craftandartmarketplace.com</p>
                  <p className="text-graphite/70">Phone: +255 22 123 4567</p>
                  <p className="text-graphite/70">Address: Msimbazi Street, Kariakoo, Dar es Salaam, Tanzania</p>
                </div>

                <div className="mt-8 pt-6 border-t border-copper-patina/20">
                  <p className="text-sm text-graphite/60">
                    These Terms of Service are effective as of January 15, 2024, and will remain in effect except with respect to any changes 
                    in their provisions in the future, which will be in effect immediately after being posted on this page.
                  </p>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link href="/legal">
                <Button variant="outline" className="border-persian-green-200 text-graphite hover:border-persian-green-500 hover:text-persian-green-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Legal Documents
                </Button>
              </Link>
              
              <Link href="/legal/privacy-policy">
                <Button className="ceramic-button text-white">
                  Next: Privacy Policy
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