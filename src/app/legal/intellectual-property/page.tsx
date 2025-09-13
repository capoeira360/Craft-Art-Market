'use client';

import React from 'react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, Download, Copyright, Shield, Eye, AlertTriangle, FileText, Users, Globe, Scale } from 'lucide-react';

export default function IntellectualPropertyPage() {
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
              <Copyright className="w-5 h-5" />
              <span>Intellectual Property Rights</span>
            </div>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Intellectual Property Policy
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
                    <Copyright className="w-5 h-5 text-persian-green-600" />
                    <p className="text-graphite font-medium">Protecting Cultural Heritage</p>
                  </div>
                  <p className="text-graphite/70 text-sm">
                    CraftArtMarketplace is committed to protecting the intellectual property rights of artisans, respecting traditional 
                    cultural knowledge, and ensuring authentic representation of Tanzanian heritage crafts.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">1. Policy Overview</h2>
                <p className="text-graphite/80 mb-4">
                  This Intellectual Property Policy outlines how CraftArtMarketplace protects, respects, and manages intellectual 
                  property rights related to traditional Tanzanian crafts, artisan creations, platform content, 
                  and cultural heritage preservation.
                </p>
                
                <p className="text-graphite/80 mb-6">
                  We recognize that traditional crafts often embody generations of cultural knowledge and artistic 
                  expression. Our policy balances the protection of individual artisan rights with respect for 
                  collective cultural heritage and traditional knowledge systems.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-persian-green-500" />
                  2. Artisan Intellectual Property Rights
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.1 Original Creations</h3>
                <p className="text-graphite/80 mb-4">
                  Artisans retain full ownership of their original creative works, including:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Design Rights:</strong> Original patterns, motifs, and artistic compositions</li>
                  <li><strong>Creative Expression:</strong> Unique interpretations of traditional techniques</li>
                  <li><strong>Innovation:</strong> New applications or combinations of traditional methods</li>
                  <li><strong>Artistic Style:</strong> Personal artistic signature and distinctive approaches</li>
                  <li><strong>Product Photography:</strong> Images of their work created for CraftArtMarketplace listings</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.2 Traditional Knowledge</h3>
                <p className="text-graphite/80 mb-4">
                  We recognize that many crafts are based on traditional knowledge that belongs to communities:
                </p>
                <div className="bg-amber-50 p-4 rounded-lg mb-4 border-l-4 border-amber-400">
                  <h4 className="font-semibold text-amber-800 mb-2">Cultural Heritage Respect</h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Traditional techniques are acknowledged as community heritage</li>
                    <li>• Artisans are recognized as custodians of cultural knowledge</li>
                    <li>• Cultural context and significance are preserved in product descriptions</li>
                    <li>• Community consent is sought for sensitive cultural representations</li>
                  </ul>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.3 License to CraftArtMarketplace</h3>
                 <p className="text-graphite/80 mb-4">
                   By listing products on CraftArtMarketplace, artisans grant us a limited license to:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Display and promote products on the CraftArtMarketplace platform</li>
                  <li>Use product images in marketing materials and social media</li>
                  <li>Include products in CraftArtMarketplace catalogs and promotional content</li>
                  <li>Translate product descriptions for international audiences</li>
                  <li>Create derivative marketing materials while maintaining attribution</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-persian-green-500" />
                  3. Copyright Protection
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.1 CraftArtMarketplace Platform Content</h3>
                 <p className="text-graphite/80 mb-4">
                   CraftArtMarketplace owns or has licensed rights to all platform content, including:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Platform Elements</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Website design and layout</li>
                      <li>• CraftArtMarketplace logo and branding</li>
                      <li>• Software and applications</li>
                      <li>• User interface elements</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Content Materials</h4>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Educational articles and blogs</li>
                      <li>• Cultural heritage documentation</li>
                      <li>• Video tutorials and guides</li>
                      <li>• Marketing and promotional content</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.2 User-Generated Content</h3>
                <p className="text-graphite/80 mb-4">
                  When users contribute content to CraftArtMarketplace (reviews, photos, stories), they grant us rights to:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li>Display the content on our platform</li>
                  <li>Use content in marketing materials with proper attribution</li>
                  <li>Moderate and edit content for clarity and appropriateness</li>
                  <li>Translate content for international audiences</li>
                  <li>Archive content for historical and cultural preservation</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  4. Infringement Prevention
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.1 Prohibited Activities</h3>
                <p className="text-graphite/80 mb-4">
                  The following activities are strictly prohibited on CraftArtMarketplace:
                </p>
                <div className="bg-red-50 p-4 rounded-lg mb-4 border-l-4 border-red-400">
                  <h4 className="font-semibold text-red-800 mb-2">Intellectual Property Violations</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Copying or reproducing other artisans' original designs</li>
                    <li>• Using copyrighted images without permission</li>
                    <li>• Misrepresenting the origin or authenticity of products</li>
                    <li>• Infringing on registered trademarks or brand names</li>
                    <li>• Appropriating sacred or culturally sensitive designs inappropriately</li>
                  </ul>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.2 Verification Process</h3>
                <p className="text-graphite/80 mb-4">
                  CraftArtMarketplace implements several measures to prevent intellectual property infringement:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>Artisan Verification:</strong> Identity and craft authenticity verification</li>
                  <li><strong>Product Review:</strong> Manual review of all new product listings</li>
                  <li><strong>Image Analysis:</strong> Technology-assisted detection of copied images</li>
                  <li><strong>Community Reporting:</strong> User reporting system for suspected violations</li>
                  <li><strong>Cultural Consultation:</strong> Expert review for culturally sensitive items</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-persian-green-500" />
                  5. DMCA and Takedown Procedures
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.1 Filing a Copyright Claim</h3>
                <p className="text-graphite/80 mb-4">
                  If you believe your intellectual property rights have been infringed, you can file a claim by providing:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-graphite mb-2">Required Information</h4>
                  <ol className="text-graphite/70 text-sm space-y-2">
                    <li><strong>1. Identification:</strong> Your contact information and authority to act</li>
                    <li><strong>2. Copyrighted Work:</strong> Description of the work being infringed</li>
                    <li><strong>3. Infringing Material:</strong> Location of the allegedly infringing content</li>
                    <li><strong>4. Good Faith Statement:</strong> Declaration that use is not authorized</li>
                    <li><strong>5. Accuracy Statement:</strong> Statement that information is accurate</li>
                    <li><strong>6. Signature:</strong> Physical or electronic signature</li>
                  </ol>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.2 Response Timeline</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-blue-800 font-medium">Stage</th>
                        <th className="text-left py-2 text-blue-800 font-medium">Timeline</th>
                        <th className="text-left py-2 text-blue-800 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-blue-700">
                      <tr className="border-b">
                        <td className="py-2">Initial Review</td>
                        <td className="py-2">24 hours</td>
                        <td className="py-2">CraftArtMarketplace reviews claim validity</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Content Removal</td>
                        <td className="py-2">48 hours</td>
                        <td className="py-2">Valid claims result in content removal</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Notification</td>
                        <td className="py-2">72 hours</td>
                        <td className="py-2">Affected party notified of action</td>
                      </tr>
                      <tr>
                        <td className="py-2">Counter-Notice</td>
                        <td className="py-2">10-14 days</td>
                        <td className="py-2">Time for counter-notification</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-persian-green-500" />
                  6. Cultural Heritage Protection
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.1 Traditional Knowledge Respect</h3>
                <p className="text-graphite/80 mb-4">
                  CraftArtMarketplace is committed to protecting and respecting traditional cultural knowledge:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Community Consultation:</strong> Engaging with cultural communities on sensitive items</li>
                  <li><strong>Attribution Requirements:</strong> Proper crediting of traditional techniques and origins</li>
                  <li><strong>Sacred Item Protection:</strong> Restrictions on items with religious or ceremonial significance</li>
                  <li><strong>Educational Context:</strong> Providing cultural background and significance</li>
                  <li><strong>Benefit Sharing:</strong> Ensuring communities benefit from their cultural heritage</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.2 Cultural Advisory Board</h3>
                <p className="text-graphite/80 mb-4">
                  CraftArtMarketplace works with a Cultural Advisory Board comprising:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Board Members</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Traditional craft masters</li>
                      <li>• Cultural heritage experts</li>
                      <li>• Community representatives</li>
                      <li>• Academic researchers</li>
                    </ul>
                  </div>
                  
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-800 mb-2">Responsibilities</h4>
                    <ul className="text-teal-700 text-sm space-y-1">
                      <li>• Review culturally sensitive listings</li>
                      <li>• Provide guidance on traditional practices</li>
                      <li>• Mediate cultural appropriation concerns</li>
                      <li>• Advise on educational content</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-persian-green-500" />
                  7. International Considerations
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">7.1 Cross-Border Protection</h3>
                <p className="text-graphite/80 mb-4">
                  As CraftArtMarketplace serves international customers, we consider various international IP frameworks:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Berne Convention:</strong> International copyright protection standards</li>
                  <li><strong>WIPO Treaties:</strong> World Intellectual Property Organization guidelines</li>
                  <li><strong>UNESCO Conventions:</strong> Cultural heritage protection frameworks</li>
                  <li><strong>National Laws:</strong> Compliance with destination country IP laws</li>
                  <li><strong>Trade Agreements:</strong> Bilateral and multilateral IP provisions</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">7.2 Geographic Indications</h3>
                <p className="text-graphite/80 mb-6">
                  We recognize and protect geographic indications for traditional Tanzanian crafts:
                </p>
                <div className="bg-purple-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-purple-800 mb-2">Protected Designations</h4>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Makonde wood carvings (specific to Makonde region)</li>
                    <li>• Tingatinga paintings (originated in Dar es Salaam)</li>
                    <li>• Maasai beadwork (traditional Maasai communities)</li>
                    <li>• Zanzibar doors (traditional Zanzibari craftsmanship)</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-persian-green-500" />
                  8. Enforcement and Penalties
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">8.1 Violation Consequences</h3>
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-red-800 font-medium">Violation Type</th>
                        <th className="text-left py-2 text-red-800 font-medium">First Offense</th>
                        <th className="text-left py-2 text-red-800 font-medium">Repeat Offense</th>
                      </tr>
                    </thead>
                    <tbody className="text-red-700">
                      <tr className="border-b">
                        <td className="py-2">Minor IP Infringement</td>
                        <td className="py-2">Warning + Content Removal</td>
                        <td className="py-2">Temporary Suspension</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Significant Copying</td>
                        <td className="py-2">Temporary Suspension</td>
                        <td className="py-2">Account Termination</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Cultural Appropriation</td>
                        <td className="py-2">Immediate Removal + Education</td>
                        <td className="py-2">Permanent Ban</td>
                      </tr>
                      <tr>
                        <td className="py-2">Fraudulent Claims</td>
                        <td className="py-2">Account Review</td>
                        <td className="py-2">Legal Action</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">8.2 Appeal Process</h3>
                <p className="text-graphite/80 mb-6">
                  Users can appeal IP-related decisions through our formal appeal process, which includes 
                  review by our legal team and, when appropriate, consultation with our Cultural Advisory Board.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">9. Contact IP Team</h2>
                <p className="text-graphite/80 mb-4">
                  For intellectual property matters, copyright claims, or cultural heritage concerns:
                </p>
                <div className="bg-persian-green-50 p-4 rounded-lg">
                  <p className="text-graphite font-medium">CraftArtMarketplace Intellectual Property Team</p>
                  <p className="text-graphite/70">Email: ip@craftartmarketplace.com</p>
                <p className="text-graphite/70">Legal Department: legal@craftartmarketplace.com</p>
                  <p className="text-graphite/70">Phone: +255 22 123 4567 (Option 3)</p>
                  <p className="text-graphite/70">Address: Msimbazi Street, Kariakoo, Dar es Salaam, Tanzania</p>
                  <p className="text-graphite/70 mt-2">IP Specialist: Dr. Fatuma Mwalimu</p>
                </div>

                <div className="mt-8 pt-6 border-t border-copper-patina/20">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Protecting Cultural Heritage Together</h4>
                    <p className="text-blue-700 text-sm mb-3">
                      CraftArtMarketplace is committed to preserving and protecting Tanzania's rich cultural heritage while supporting 
                      artisan livelihoods. Help us maintain the authenticity and integrity of traditional crafts.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                      Report IP Concern
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link href="/legal/buyer-protection">
                <Button variant="outline" className="border-persian-green-200 text-graphite hover:border-persian-green-500 hover:text-persian-green-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Buyer Protection
                </Button>
              </Link>
              
              <Link href="/legal/community-guidelines">
                <Button className="ceramic-button text-white">
                  Next: Community Guidelines
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