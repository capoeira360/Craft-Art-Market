'use client'

import { useParams } from 'next/navigation'
import { Navigation } from '../../../components/Navigation'
import { Footer } from '../../../components/Footer'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { ArrowLeft, Calendar, User, Eye, Tag } from 'lucide-react'
import Link from 'next/link'

// Mock blog data - in real app this would come from API/database
const blogPosts = {
  '2': {
    id: '2',
    title: 'How to Care for Your Handwoven Textiles',
    content: `
      <h2>Essential Care Tips for Handwoven Tanzanian Textiles</h2>
      <p>Handwoven textiles from Tanzania are not just beautiful pieces of art; they are cultural treasures that deserve proper care to maintain their beauty and longevity. Here's your comprehensive guide to caring for these precious items.</p>
      
      <h3>Understanding Your Textile</h3>
      <p>Before caring for any handwoven textile, it's important to understand the materials and techniques used. Tanzanian textiles often incorporate natural fibers like cotton, silk, and traditional plant-based materials.</p>
      
      <h3>Cleaning Guidelines</h3>
      <ul>
        <li><strong>Gentle Hand Washing:</strong> Use lukewarm water and mild, pH-neutral detergent</li>
        <li><strong>Avoid Harsh Chemicals:</strong> Never use bleach or fabric softeners</li>
        <li><strong>Test First:</strong> Always test cleaning methods on a small, inconspicuous area</li>
      </ul>
      
      <h3>Drying and Storage</h3>
      <p>Proper drying and storage are crucial for maintaining the integrity of your handwoven textiles:</p>
      <ul>
        <li>Air dry flat, away from direct sunlight</li>
        <li>Store in a cool, dry place with good air circulation</li>
        <li>Use acid-free tissue paper for long-term storage</li>
      </ul>
      
      <h3>Professional Care</h3>
      <p>For valuable or antique pieces, consider professional textile conservation services. They have specialized knowledge and equipment to handle delicate materials safely.</p>
    `,
    author: 'Content Manager',
    publishedAt: '2024-01-12',
    views: 890,
    category: 'Care Guide',
    tags: ['textiles', 'maintenance', 'guide', 'handwoven'],
    excerpt: 'Essential tips and techniques for maintaining the beauty and longevity of your handwoven Tanzanian textiles...'
  },
  '5': {
    id: '5',
    title: 'Traditional Woodcarving Techniques',
    content: `
      <h2>The Ancient Art of Makonde Woodcarving</h2>
      <p>Makonde woodcarving is one of Tanzania's most celebrated art forms, with techniques passed down through generations. This traditional craft represents not just artistic expression, but cultural identity and spiritual beliefs.</p>
      
      <h3>History and Origins</h3>
      <p>The Makonde people, primarily from southeastern Tanzania and northern Mozambique, have been practicing woodcarving for centuries. Their art is deeply rooted in spiritual beliefs and community traditions.</p>
      
      <h3>Traditional Techniques</h3>
      <ul>
        <li><strong>Wood Selection:</strong> African blackwood (Dalbergia melanoxylon) is the preferred material</li>
        <li><strong>Tool Usage:</strong> Simple hand tools including knives, chisels, and scrapers</li>
        <li><strong>Carving Process:</strong> Starting from a single block, carvers work intuitively without preliminary sketches</li>
      </ul>
      
      <h3>Symbolic Meanings</h3>
      <p>Makonde carvings often feature:</p>
      <ul>
        <li>Family trees representing ancestry and community bonds</li>
        <li>Shetani figures depicting spirits and supernatural beings</li>
        <li>Abstract forms expressing modern life and social commentary</li>
      </ul>
      
      <h3>Modern Adaptations</h3>
      <p>While maintaining traditional techniques, contemporary Makonde artists also explore new themes and styles, creating pieces that speak to modern audiences while honoring their cultural heritage.</p>
    `,
    author: 'Content Manager',
    publishedAt: '2024-01-19',
    views: 650,
    category: 'Craft Techniques',
    tags: ['woodcarving', 'traditional', 'techniques', 'makonde'],
    excerpt: 'Discover the ancient art of Makonde woodcarving and the skilled techniques passed down through generations...'
  }
}

export default function BlogPost() {
  const params = useParams()
  const postId = params.id as string
  const post = blogPosts[postId as keyof typeof blogPosts]

  if (!post) {
    return (
      <div className="min-h-screen bg-ivory">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <Card className="p-12 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
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
          
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US')}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
            </div>
          </header>
          
          {/* Article Content */}
          <Card className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>
          
          {/* Related Articles */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.values(blogPosts)
                .filter(p => p.id !== postId)
                .slice(0, 2)
                .map((relatedPost) => (
                <Card key={relatedPost.id} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link href={`/blog/${relatedPost.id}`} className="hover:text-green-600">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{relatedPost.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(relatedPost.publishedAt).toLocaleDateString('en-US')}</span>
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