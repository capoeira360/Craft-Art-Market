'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  Tag,
  MoreHorizontal,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  FolderOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ContentItem {
  id: string
  title: string
  type: 'article' | 'page' | 'blog' | 'announcement'
  status: 'published' | 'draft' | 'scheduled' | 'archived'
  author: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  views: number
  category: string
  tags: string[]
  excerpt: string
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Tanzanian Handicrafts: A Cultural Heritage',
    type: 'article',
    status: 'published',
    author: 'Admin User',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16',
    publishedAt: '2024-01-16',
    views: 1250,
    category: 'Culture',
    tags: ['handicrafts', 'culture', 'heritage', 'tanzania'],
    excerpt: 'Exploring the rich tradition of Tanzanian handicrafts and their significance in preserving cultural heritage...'
  },
  {
    id: '2',
    title: 'How to Care for Your Handwoven Textiles',
    type: 'blog',
    status: 'published',
    author: 'Content Manager',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    publishedAt: '2024-01-12',
    views: 890,
    category: 'Care Guide',
    tags: ['textiles', 'maintenance', 'guide', 'handwoven'],
    excerpt: 'Essential tips and techniques for maintaining the beauty and longevity of your handwoven Tanzanian textiles...'
  },
  {
    id: '3',
    title: 'New Artisan Partnership Program Launch',
    type: 'announcement',
    status: 'scheduled',
    author: 'Admin User',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    publishedAt: '2024-01-25',
    views: 0,
    category: 'Announcements',
    tags: ['partnership', 'artisans', 'program', 'craftandartmarketplace'],
    excerpt: 'Introducing our new partnership program to support local Tanzanian artisans and expand our marketplace reach...'
  },
  {
    id: '4',
    title: 'About Craft&Art Marketplace - Craft Art Marketplace',
    type: 'page',
    status: 'published',
    author: 'Admin User',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    publishedAt: '2024-01-01',
    views: 2100,
    category: 'Company',
    tags: ['about', 'company', 'mission', 'craftandartmarketplace'],
    excerpt: 'Learn about our mission to connect authentic Tanzanian artisans with customers worldwide...'
  },
  {
    id: '5',
    title: 'Traditional Woodcarving Techniques',
    type: 'blog',
    status: 'published',
    author: 'Content Manager',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-19',
    publishedAt: '2024-01-19',
    views: 650,
    category: 'Craft Techniques',
    tags: ['woodcarving', 'traditional', 'techniques', 'makonde'],
    excerpt: 'Discover the ancient art of Makonde woodcarving and the skilled techniques passed down through generations...'
  },
  {
    id: '6',
    title: 'Beadwork Artistry from Maasai Communities',
    type: 'article',
    status: 'published',
    author: 'Cultural Editor',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-14',
    publishedAt: '2024-01-14',
    views: 980,
    category: 'Culture',
    tags: ['beadwork', 'maasai', 'jewelry', 'traditional'],
    excerpt: 'Explore the vibrant world of Maasai beadwork and the cultural significance behind each colorful creation...'
  },
  {
    id: '7',
    title: 'Sustainable Crafting Practices',
    type: 'blog',
    status: 'draft',
    author: 'Content Manager',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22',
    views: 0,
    category: 'Sustainability',
    tags: ['sustainability', 'eco-friendly', 'environment'],
    excerpt: 'How Tanzanian artisans are embracing sustainable practices to protect the environment while creating beautiful crafts...'
  },
  {
    id: '8',
    title: 'Terms of Service',
    type: 'page',
    status: 'published',
    author: 'Legal Team',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-20',
    publishedAt: '2024-01-01',
    views: 450,
    category: 'Legal',
    tags: ['terms', 'legal', 'policy'],
    excerpt: 'Platform rules and user responsibilities for the Craft&Art Marketplace...'
  },
  {
    id: '9',
    title: 'Privacy Policy',
    type: 'page',
    status: 'published',
    author: 'Legal Team',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    publishedAt: '2024-01-01',
    views: 380,
    category: 'Legal',
    tags: ['privacy', 'legal', 'data-protection'],
    excerpt: 'How we protect your personal data and respect your privacy on Craft&Art Marketplace...'
  },
  {
    id: '10',
    title: 'Mobile App Launch Announcement',
    type: 'announcement',
    status: 'published',
    author: 'Product Team',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-09',
    publishedAt: '2024-01-09',
    views: 1850,
    category: 'Product Updates',
    tags: ['mobile-app', 'launch', 'ios', 'android'],
    excerpt: 'Download our new mobile apps for iOS and Android to browse and purchase authentic Tanzanian crafts on the go...'
  }
]

export default function ContentManagement() {
  const router = useRouter()
  const [content, setContent] = useState<ContentItem[]>(mockContent)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [isClient, setIsClient] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('updatedAt')

  const handleDeleteContent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
      return
    }
    
    setIsDeleting(id)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setContent(prev => prev.filter(item => item.id !== id))
      
      // Show success message
      alert('Content deleted successfully!')
    } catch (error) {
      alert('Failed to delete content. Please try again.')
    } finally {
      setIsDeleting(null)
    }
  }

  const handlePreviewContent = (item: ContentItem) => {
    // Redirect to appropriate page based on content type and title
    let targetUrl = '/'
    
    if (item.type === 'page') {
      if (item.title.toLowerCase().includes('about')) {
        targetUrl = '/about'
      } else if (item.title.toLowerCase().includes('terms')) {
        targetUrl = '/legal/terms-of-service'
      } else if (item.title.toLowerCase().includes('privacy')) {
        targetUrl = '/legal/privacy-policy'
      } else {
        targetUrl = '/'
      }
    } else if (item.type === 'article' || item.type === 'blog') {
      // For articles and blogs, redirect to a blog/article page
      targetUrl = `/blog/${item.id}`
    } else if (item.type === 'announcement') {
      // For announcements, redirect to announcements page
      targetUrl = `/announcements/${item.id}`
    }
    
    window.open(targetUrl, '_blank')
  }

  const handleDuplicateContent = async (item: ContentItem) => {
    try {
      const duplicatedItem: ContentItem = {
        ...item,
        id: (parseInt(item.id) + 1000).toString(),
        title: `${item.title} (Copy)`,
        status: 'draft',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        publishedAt: undefined,
        views: 0
      }
      
      setContent(prev => [duplicatedItem, ...prev])
      alert('Content duplicated successfully!')
    } catch (error) {
      alert('Failed to duplicate content. Please try again.')
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      setContent(prev => prev.map(item => {
        if (item.id === id) {
          const newStatus = item.status === 'published' ? 'draft' : 'published'
          return {
            ...item,
            status: newStatus,
            publishedAt: newStatus === 'published' ? new Date().toISOString().split('T')[0] : undefined,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        }
        return item
      }))
      
      alert('Content status updated successfully!')
    } catch (error) {
      alert('Failed to update content status. Please try again.')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'draft':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'archived':
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-4 w-4" />
      case 'blog':
        return <FileText className="h-4 w-4" />
      case 'page':
        return <Globe className="h-4 w-4" />
      case 'announcement':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || item.type === selectedType
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'updatedAt':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      case 'views':
        return b.views - a.views
      default:
        return 0
    }
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">Manage articles, pages, blogs, and announcements for Craft&Art Marketplace</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline"
            onClick={() => {
              // Simulate navigation to categories management
              alert('Categories management - Manage craft categories like Woodcarving, Beadwork, Textiles, etc.')
              // router.push('/admin/content/categories')
            }}
          >
            <Tag className="h-4 w-4 mr-2" />
            Categories
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              // Simulate navigation to media library
              alert('Media Library - Manage images and videos of Tanzanian crafts and artisans')
              // router.push('/admin/content/media')
            }}
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            Media Library
          </Button>
          <Button 
            onClick={() => {
              // Simulate navigation to content editor
              alert('Content Editor - Create new articles about Tanzanian culture, craft guides, and marketplace updates')
              // router.push('/admin/content/editor')
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-2xl font-bold text-gray-900">{content.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">
                {content.filter(item => item.status === 'published').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-yellow-600">
                {content.filter(item => item.status === 'draft').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">
                {content.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
              </p>
            </div>
            <Eye className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="article">Cultural Articles</option>
            <option value="blog">Craft Guides</option>
            <option value="page">Info Pages</option>
            <option value="announcement">Announcements</option>
          </select>
          
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>
          
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="updatedAt">Last Updated</option>
            <option value="createdAt">Date Created</option>
            <option value="title">Title</option>
            <option value="views">Views</option>
          </select>
        </div>
      </Card>

      {/* Content List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {item.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className="capitalize">
                      {item.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <Badge className={`capitalize ${getStatusColor(item.status)}`}>
                        {item.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{item.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{item.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {isClient ? new Date(item.updatedAt).toLocaleDateString() : 'Loading...'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="Preview"
                        onClick={() => handlePreviewContent(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="Edit"
                        onClick={() => router.push(`/admin/content/editor?id=${item.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700" 
                        title="Delete"
                        onClick={() => handleDeleteContent(item.id)}
                        disabled={isDeleting === item.id}
                      >
                        {isDeleting === item.id ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                      <div className="relative group">
                        <Button variant="ghost" size="sm" title="More options">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                          <button
                            onClick={() => handleDuplicateContent(item)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <FileText className="h-4 w-4" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => handleToggleStatus(item.id)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            {item.status === 'published' ? (
                              <>
                                <XCircle className="h-4 w-4" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                Publish
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Empty State */}
      {sortedContent.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria, or create new content about Tanzanian crafts and culture</p>
          <Button 
            onClick={() => {
              alert('Content Editor - Create new articles about Tanzanian culture, craft guides, and marketplace updates')
              // router.push('/admin/content/editor')
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Content
          </Button>
        </Card>
      )}
    </div>
  )
}