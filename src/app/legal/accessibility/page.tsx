'use client';

import React from 'react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, Download, Eye, Ear, MousePointer, Keyboard, Smartphone, Monitor, Heart, Mail, Phone, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';

export default function AccessibilityPage() {
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
              <Eye className="w-5 h-5" />
              <span>Accessibility Commitment</span>
            </div>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Accessibility Statement
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
                <div className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-blue-600" />
                    <p className="text-graphite font-medium">Our Commitment to Accessibility</p>
                  </div>
                  <p className="text-graphite/70 text-sm">
                    CraftArtMarketplace is committed to ensuring digital accessibility for people with disabilities. We continually 
                    improve the user experience for everyone and apply relevant accessibility standards.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">1. Accessibility Standards</h2>
                <p className="text-graphite/80 mb-4">
                  CraftArtMarketplace strives to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
                  These guidelines explain how to make web content more accessible to people with disabilities and 
                  user-friendly for everyone.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      WCAG 2.1 AA Compliance
                    </h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Perceivable content and UI</li>
                      <li>• Operable interface components</li>
                      <li>• Understandable information</li>
                      <li>• Robust content interpretation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      Platform Coverage
                    </h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Web application (desktop)</li>
                      <li>• Mobile responsive design</li>
                      <li>• Progressive web app features</li>
                      <li>• Email communications</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-persian-green-500" />
                  2. Visual Accessibility Features
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.1 Visual Design and Contrast</h3>
                <p className="text-graphite/80 mb-4">
                  Our visual design prioritizes readability and usability for users with visual impairments:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>High Contrast Ratios:</strong> All text meets WCAG AA contrast requirements (4.5:1 minimum)</li>
                  <li><strong>Color Independence:</strong> Information is not conveyed by color alone</li>
                  <li><strong>Scalable Text:</strong> Text can be enlarged up to 200% without loss of functionality</li>
                  <li><strong>Clear Typography:</strong> Readable fonts with appropriate spacing and sizing</li>
                  <li><strong>Focus Indicators:</strong> Visible focus indicators for keyboard navigation</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.2 Screen Reader Compatibility</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Supported Screen Readers</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-blue-700 font-medium mb-1">Desktop:</p>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• NVDA (Windows)</li>
                        <li>• JAWS (Windows)</li>
                        <li>• VoiceOver (macOS)</li>
                        <li>• Orca (Linux)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-blue-700 font-medium mb-1">Mobile:</p>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• VoiceOver (iOS)</li>
                        <li>• TalkBack (Android)</li>
                        <li>• Voice Assistant (Samsung)</li>
                        <li>• Select to Speak (Android)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">2.3 Visual Assistance Features</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>Alternative Text:</strong> Comprehensive alt text for all images and graphics</li>
                  <li><strong>Image Descriptions:</strong> Detailed descriptions for complex artisan product images</li>
                  <li><strong>Video Captions:</strong> Closed captions for all video content</li>
                  <li><strong>Audio Descriptions:</strong> Audio descriptions for visual video content</li>
                  <li><strong>Zoom Support:</strong> Compatible with browser zoom and magnification tools</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Ear className="w-6 h-6 text-persian-green-500" />
                  3. Hearing Accessibility Features
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.1 Audio Content Accessibility</h3>
                <p className="text-graphite/80 mb-4">
                  We ensure that audio content is accessible to users with hearing impairments:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Video Captions:</strong> Accurate closed captions for all video content</li>
                  <li><strong>Transcript Availability:</strong> Full transcripts for audio and video content</li>
                  <li><strong>Visual Alerts:</strong> Visual indicators for audio notifications</li>
                  <li><strong>Sign Language:</strong> Sign language interpretation for important announcements</li>
                  <li><strong>Text Alternatives:</strong> Text-based alternatives for audio-only content</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">3.2 Communication Accessibility</h3>
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-green-800 mb-2">Alternative Communication Methods</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Text-based customer support chat</li>
                    <li>• Email support with detailed responses</li>
                    <li>• WhatsApp messaging for customer service</li>
                    <li>• Video relay services for phone support</li>
                    <li>• Written communication preferences in user profiles</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Keyboard className="w-6 h-6 text-persian-green-500" />
                  4. Motor and Mobility Accessibility
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.1 Keyboard Navigation</h3>
                <p className="text-graphite/80 mb-4">
                  Full keyboard accessibility ensures users can navigate without a mouse:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Tab Navigation:</strong> Logical tab order through all interactive elements</li>
                  <li><strong>Keyboard Shortcuts:</strong> Standard keyboard shortcuts for common actions</li>
                  <li><strong>Skip Links:</strong> Skip navigation links to jump to main content</li>
                  <li><strong>Focus Management:</strong> Clear focus indicators and proper focus management</li>
                  <li><strong>No Mouse Dependency:</strong> All functionality available via keyboard</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.2 Touch and Click Accessibility</h3>
                <div className="bg-amber-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-amber-800 mb-2">Touch Target Guidelines</h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Minimum 44px touch targets for mobile devices</li>
                    <li>• Adequate spacing between clickable elements</li>
                    <li>• Large, easy-to-tap buttons and links</li>
                    <li>• Drag and drop alternatives for complex interactions</li>
                    <li>• Timeout extensions for time-sensitive actions</li>
                  </ul>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">4.3 Assistive Technology Support</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>Switch Navigation:</strong> Compatible with switch-based navigation devices</li>
                  <li><strong>Voice Control:</strong> Works with voice control software</li>
                  <li><strong>Eye Tracking:</strong> Compatible with eye-tracking devices</li>
                  <li><strong>Head Mouse:</strong> Support for head-controlled mouse alternatives</li>
                  <li><strong>Sticky Keys:</strong> Compatible with operating system accessibility features</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-persian-green-500" />
                  5. Mobile Accessibility
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.1 Mobile-Specific Features</h3>
                <p className="text-graphite/80 mb-4">
                  Our mobile experience is designed with accessibility in mind:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Responsive Design:</strong> Adapts to different screen sizes and orientations</li>
                  <li><strong>Touch Gestures:</strong> Standard touch gestures with alternatives</li>
                  <li><strong>Voice Input:</strong> Support for voice input and dictation</li>
                  <li><strong>Haptic Feedback:</strong> Tactile feedback for important interactions</li>
                  <li><strong>Simplified Navigation:</strong> Streamlined mobile navigation patterns</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">5.2 Platform Integration</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-800 mb-2">Operating System Features</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-blue-700 font-medium mb-1">iOS Integration:</p>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• VoiceOver compatibility</li>
                        <li>• Dynamic Type support</li>
                        <li>• Switch Control support</li>
                        <li>• Voice Control integration</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-blue-700 font-medium mb-1">Android Integration:</p>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• TalkBack compatibility</li>
                        <li>• Font size scaling</li>
                        <li>• High contrast mode</li>
                        <li>• Select to Speak support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">6. Cognitive Accessibility</h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.1 Clear and Simple Design</h3>
                <p className="text-graphite/80 mb-4">
                  We design for cognitive accessibility with clear, predictable interfaces:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Consistent Layout:</strong> Predictable page layouts and navigation patterns</li>
                  <li><strong>Clear Language:</strong> Simple, jargon-free language throughout the platform</li>
                  <li><strong>Error Prevention:</strong> Clear form validation and error messages</li>
                  <li><strong>Progress Indicators:</strong> Clear progress indicators for multi-step processes</li>
                  <li><strong>Help and Support:</strong> Contextual help and support throughout the experience</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">6.2 Memory and Attention Support</h3>
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-green-800 mb-2">Cognitive Support Features</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Auto-save functionality for forms and preferences</li>
                    <li>• Clear breadcrumb navigation</li>
                    <li>• Recently viewed items and search history</li>
                    <li>• Simplified checkout process with clear steps</li>
                    <li>• Optional reading assistance and text-to-speech</li>
                    <li>• Customizable interface complexity levels</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4">7. Language and Cultural Accessibility</h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">7.1 Multi-Language Support</h3>
                <p className="text-graphite/80 mb-4">
                  CraftArtMarketplace provides accessibility across language barriers:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Primary Languages:</strong> Full support for Swahili and English</li>
                  <li><strong>Translation Services:</strong> Professional translation for key content</li>
                  <li><strong>Cultural Context:</strong> Culturally appropriate design and content</li>
                  <li><strong>Local Support:</strong> Customer service in local languages</li>
                  <li><strong>Right-to-Left Support:</strong> Prepared for Arabic and other RTL languages</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">7.2 Literacy Support</h3>
                <div className="bg-purple-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-purple-800 mb-2">Reading Assistance</h4>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Text-to-speech for all written content</li>
                    <li>• Visual symbols and icons to support text</li>
                    <li>• Simplified language options</li>
                    <li>• Audio instructions for complex processes</li>
                    <li>• Video tutorials with captions and transcripts</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-amber-500" />
                  8. Known Limitations and Ongoing Improvements
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">8.1 Current Limitations</h3>
                <p className="text-graphite/80 mb-4">
                  We are transparent about areas where we are still working to improve accessibility:
                </p>
                <div className="bg-amber-50 p-4 rounded-lg mb-4 border-l-4 border-amber-400">
                  <h4 className="font-semibold text-amber-800 mb-2">Areas Under Development</h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Advanced voice navigation features (planned Q2 2024)</li>
                    <li>• Enhanced mobile app accessibility (in development)</li>
                    <li>• AI-powered image descriptions for artisan products</li>
                    <li>• Real-time sign language interpretation for video calls</li>
                    <li>• Advanced cognitive accessibility customization options</li>
                  </ul>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">8.2 Continuous Improvement Process</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>Regular Audits:</strong> Quarterly accessibility audits by certified experts</li>
                  <li><strong>User Testing:</strong> Regular testing with users who have disabilities</li>
                  <li><strong>Feedback Integration:</strong> Continuous improvement based on user feedback</li>
                  <li><strong>Technology Updates:</strong> Staying current with accessibility technology advances</li>
                  <li><strong>Training Programs:</strong> Ongoing accessibility training for our development team</li>
                </ul>

                <h2 className="text-2xl font-bold text-graphite mb-4 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-persian-green-500" />
                  9. Accessibility Support and Feedback
                </h2>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">9.1 Getting Help</h3>
                <p className="text-graphite/80 mb-4">
                  If you experience any accessibility barriers while using CraftArtMarketplace:
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Contact Our Accessibility Team</h4>
                  <div className="space-y-2 text-blue-700 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span><strong>Email:</strong> accessibility@craftartmarketplace.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span><strong>Phone:</strong> +255 22 123 4567 (Option 5)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span><strong>WhatsApp:</strong> +255 754 123 456</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      <span><strong>Live Chat:</strong> Available 24/7 with accessibility support</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">9.2 Response Commitment</h3>
                <ul className="list-disc list-inside text-graphite/80 mb-4 space-y-2">
                  <li><strong>Initial Response:</strong> Within 24 hours for accessibility-related inquiries</li>
                  <li><strong>Issue Resolution:</strong> Priority handling for accessibility barriers</li>
                  <li><strong>Workaround Provision:</strong> Temporary solutions while permanent fixes are developed</li>
                  <li><strong>Follow-up Support:</strong> Continued support until issues are fully resolved</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-graphite mb-3">9.3 Feedback and Suggestions</h3>
                <p className="text-graphite/80 mb-6">
                  We welcome feedback and suggestions for improving accessibility. Your input helps us 
                  create a more inclusive platform for everyone. Please share your experiences, both 
                  positive and areas for improvement, with our accessibility team.
                </p>

                <h2 className="text-2xl font-bold text-graphite mb-4">10. Legal and Compliance Information</h2>
                <p className="text-graphite/80 mb-4">
                  CraftArtMarketplace is committed to compliance with applicable accessibility laws and standards:
                </p>
                <ul className="list-disc list-inside text-graphite/80 mb-6 space-y-2">
                  <li><strong>International Standards:</strong> WCAG 2.1 Level AA compliance</li>
                  <li><strong>Regional Compliance:</strong> Adherence to East African accessibility guidelines</li>
                  <li><strong>Continuous Monitoring:</strong> Regular compliance assessments and updates</li>
                  <li><strong>Third-Party Audits:</strong> Annual accessibility audits by certified professionals</li>
                </ul>

                <div className="mt-8 pt-6 border-t border-copper-patina/20">
                  <div className="bg-persian-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-persian-green-800 mb-2">Accessibility Coordinator</h4>
                    <p className="text-persian-green-700 text-sm mb-3">
                      Dr. Amina Hassan, Digital Accessibility Specialist<br/>
                      Email: amina.hassan@craftartmarketplace.com<br/>
                      Phone: +255 22 123 4567 (Direct: Ext. 205)
                    </p>
                    <p className="text-persian-green-700 text-sm">
                      "Our goal is to ensure that CraftArtMarketplace is accessible to everyone, regardless of ability. 
                      We are committed to continuous improvement and welcome your feedback."
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Link href="/legal/community-guidelines">
                <Button variant="outline" className="border-persian-green-200 text-graphite hover:border-persian-green-500 hover:text-persian-green-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Community Guidelines
                </Button>
              </Link>
              
              <Link href="/legal">
                <Button className="ceramic-button text-white">
                  Back to Legal Directory
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