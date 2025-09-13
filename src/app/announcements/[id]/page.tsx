'use client'

import { useParams } from 'next/navigation'
import { Navigation } from '../../../components/Navigation'
import { Footer } from '../../../components/Footer'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { ArrowLeft, Calendar, User, Bell, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// Mock announcements data - in real app this would come from API/database
const announcements = {
  '7': {
    id: '7',
    title: 'Mobile App Launch Announcement',
    content: `
      <h2>CraftArtMarketplace Mobile App is Now Available!</h2>
      <p>We're excited to announce the official launch of the CraftArtMarketplace mobile application, bringing the beauty of authentic craftsmanship directly to your fingertips.</p>
      
      <h3>What's New in the Mobile App</h3>
      <ul>
        <li><strong>Enhanced Shopping Experience:</strong> Browse and purchase authentic Tanzanian handicrafts with ease</li>
        <li><strong>Artisan Profiles:</strong> Connect directly with skilled craftspeople and learn their stories</li>
        <li><strong>Offline Browsing:</strong> Save your favorite items and view them even without internet connection</li>
        <li><strong>Push Notifications:</strong> Get notified about new arrivals, special offers, and artisan updates</li>
        <li><strong>Secure Payments:</strong> Multiple payment options including mobile money integration</li>
      </ul>
      
      <h3>Download Now</h3>
      <p>The CraftArtMarketplace mobile app is available for both iOS and Android devices. Download it today from:</p>
      <ul>
        <li>Apple App Store</li>
        <li>Google Play Store</li>
        <li>Direct APK download for Android users</li>
      </ul>
      
      <h3>Special Launch Offer</h3>
      <p>To celebrate our mobile app launch, we're offering:</p>
      <ul>
        <li>15% discount on your first mobile app purchase</li>
        <li>Free shipping on orders over $50</li>
        <li>Exclusive access to limited edition items</li>
      </ul>
      
      <p><strong>Offer valid until February 15, 2024. Use code: MOBILE15</strong></p>
      
      <h3>What's Next</h3>
      <p>We're continuously working to improve your experience. Upcoming features include:</p>
      <ul>
        <li>Augmented Reality (AR) preview of items in your space</li>
        <li>Live video calls with artisans</li>
        <li>Community marketplace for peer-to-peer trading</li>
        <li>Educational content about Tanzanian craft traditions</li>
      </ul>
      
      <p>Thank you for being part of the CraftArtMarketplace community. Together, we're preserving and promoting Tanzania's rich cultural heritage while supporting local artisans.</p>
    `,
    author: 'Admin User',
    publishedAt: '2024-01-20',
    category: 'Product Update',
    priority: 'high',
    tags: ['mobile app', 'launch', 'announcement', 'update'],
    excerpt: 'The CraftArtMarketplace mobile app is now available for download! Discover new features and exclusive launch offers...'
  },
  '8': {
    id: '8',
    title: 'New Artisan Partnership Program',
    content: `
      <h2>Expanding Our Artisan Community</h2>
      <p>We're thrilled to announce the launch of our new Artisan Partnership Program, designed to support and empower more Tanzanian craftspeople to share their incredible work with the world.</p>
      
      <h3>Program Benefits</h3>
      <ul>
        <li><strong>Zero Commission for First 3 Months:</strong> New artisans keep 100% of their sales</li>
        <li><strong>Free Photography Services:</strong> Professional product photography for your listings</li>
        <li><strong>Marketing Support:</strong> Featured placement in our promotional campaigns</li>
        <li><strong>Training Workshops:</strong> Digital literacy and e-commerce training sessions</li>
        <li><strong>Quality Certification:</strong> Official CraftArtMarketplace quality seal for verified artisans</li>
      </ul>
      
      <h3>Eligibility Criteria</h3>
      <p>To join our partnership program, artisans must:</p>
      <ul>
        <li>Be based in Tanzania</li>
        <li>Create authentic, handmade products</li>
        <li>Demonstrate commitment to quality craftsmanship</li>
        <li>Agree to our community guidelines and standards</li>
      </ul>
      
      <h3>How to Apply</h3>
      <p>Interested artisans can apply through:</p>
      <ul>
        <li>Our website application form</li>
        <li>Local community centers in Dar es Salaam, Arusha, and Mwanza</li>
        <li>Partner organizations and craft cooperatives</li>
      </ul>
      
      <h3>Supporting Local Communities</h3>
      <p>This program is part of our broader commitment to:</p>
      <ul>
        <li>Preserve traditional Tanzanian crafts</li>
        <li>Provide sustainable income opportunities</li>
        <li>Bridge the gap between local artisans and global markets</li>
        <li>Promote cultural exchange and understanding</li>
      </ul>
      
      <p>Applications are now open and will be reviewed on a rolling basis. We look forward to welcoming new talented artisans to our growing community!</p>
    `,
    author: 'Admin User',
    publishedAt: '2024-01-18',
    category: 'Community',
    priority: 'medium',
    tags: ['artisan', 'partnership', 'community', 'program'],
    excerpt: 'Join our new Artisan Partnership Program with zero commission for the first 3 months and comprehensive support...'
  }
}

export default function AnnouncementPage() {
  const params = useParams()
  const announcementId = params.id as string
  const announcement = announcements[announcementId as keyof typeof announcements]

  if (!announcement) {
    return (
      <div className="min-h-screen bg-ivory">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <Card className="p-12 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Announcement Not Found</h1>
            <p className="text-gray-600 mb-6">The announcement you're looking for doesn't exist.</p>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      
      <article className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          {/* Announcement Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={`${getPriorityColor(announcement.priority)} border-0`}>
                <Bell className="h-3 w-3 mr-1" />
                {announcement.priority.toUpperCase()} PRIORITY
              </Badge>
              <Badge variant="outline">
                {announcement.category}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {announcement.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{announcement.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(announcement.publishedAt).toLocaleDateString('en-US')}</span>
              </div>
            </div>
          </header>
          
          {/* Announcement Content */}
          <Card className="p-8 border-l-4 border-l-green-500">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: announcement.content }}
            />
          </Card>
          
          {/* Call to Action */}
          <Card className="mt-8 p-6 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
                <p className="text-gray-600">Don't miss important announcements and updates from CraftArtMarketplace.</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Subscribe to Updates
              </Button>
            </div>
          </Card>
          
          {/* Related Announcements */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Announcements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.values(announcements)
                .filter(a => a.id !== announcementId)
                .slice(0, 2)
                .map((relatedAnnouncement) => (
                <Card key={relatedAnnouncement.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${getPriorityColor(relatedAnnouncement.priority)} border-0 text-xs`}>
                      {relatedAnnouncement.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link href={`/announcements/${relatedAnnouncement.id}`} className="hover:text-green-600">
                      {relatedAnnouncement.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{relatedAnnouncement.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(relatedAnnouncement.publishedAt).toLocaleDateString('en-US')}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </article>
      
      <Footer />
    </div>
  )
}