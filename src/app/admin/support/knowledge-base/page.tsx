"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  FileText,
  Tag,
  Calendar,
  User,
  TrendingUp,
  Star,
  MessageSquare,
  Filter,
  Download,
  Upload,
  Settings,
  BarChart3,
  HelpCircle,
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react'

interface KnowledgeBaseArticle {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  status: 'published' | 'draft' | 'archived'
  author: {
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  helpful: number
  notHelpful: number
  featured: boolean
}

interface Category {
  id: string
  name: string
  description: string
  articleCount: number
  icon: string
}

const mockCategories: Category[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Basic guides for new users',
    articleCount: 12,
    icon: '🚀'
  },
  {
    id: 'account-management',
    name: 'Account Management',
    description: 'Managing your account and profile',
    articleCount: 8,
    icon: '👤'
  },
  {
    id: 'billing-payments',
    name: 'Billing & Payments',
    description: 'Payment and subscription information',
    articleCount: 15,
    icon: '💳'
  },
  {
    id: 'technical-support',
    name: 'Technical Support',
    description: 'Technical troubleshooting guides',
    articleCount: 20,
    icon: '🔧'
  },
  {
    id: 'product-features',
    name: 'Product Features',
    description: 'How to use product features',
    articleCount: 25,
    icon: '⭐'
  }
]

const mockArticles: KnowledgeBaseArticle[] = [
  {
    id: 'art-1',
    title: 'How to Create Your First Account',
    content: 'Complete guide on creating and setting up your account...',
    excerpt: 'Learn how to create and set up your account in just a few simple steps.',
    category: 'getting-started',
    tags: ['account', 'setup', 'beginner'],
    status: 'published',
    author: {
      name: 'John Doe',
      email: 'john@company.com'
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
    views: 1250,
    likes: 89,
    helpful: 95,
    notHelpful: 5,
    featured: true
  },
  {
    id: 'art-2',
    title: 'Understanding Your Billing Cycle',
    content: 'Detailed explanation of billing cycles and payment schedules...',
    excerpt: 'Everything you need to know about billing cycles and when payments are processed.',
    category: 'billing-payments',
    tags: ['billing', 'payments', 'subscription'],
    status: 'published',
    author: {
      name: 'Jane Smith',
      email: 'jane@company.com'
    },
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
    views: 890,
    likes: 67,
    helpful: 78,
    notHelpful: 12,
    featured: false
  },
  {
    id: 'art-3',
    title: 'Troubleshooting Login Issues',
    content: 'Step-by-step guide to resolve common login problems...',
    excerpt: 'Common solutions for login problems and account access issues.',
    category: 'technical-support',
    tags: ['login', 'troubleshooting', 'access'],
    status: 'published',
    author: {
      name: 'Bob Wilson',
      email: 'bob@company.com'
    },
    createdAt: '2024-01-05T16:20:00Z',
    updatedAt: '2024-01-11T11:45:00Z',
    views: 2100,
    likes: 156,
    helpful: 180,
    notHelpful: 20,
    featured: true
  },
  {
    id: 'art-4',
    title: 'Advanced Product Features Guide',
    content: 'Comprehensive guide to advanced features and capabilities...',
    excerpt: 'Unlock the full potential of our product with these advanced features.',
    category: 'product-features',
    tags: ['advanced', 'features', 'guide'],
    status: 'draft',
    author: {
      name: 'Alice Cooper',
      email: 'alice@company.com'
    },
    createdAt: '2024-01-14T13:00:00Z',
    updatedAt: '2024-01-14T13:00:00Z',
    views: 0,
    likes: 0,
    helpful: 0,
    notHelpful: 0,
    featured: false
  },
  {
    id: 'art-5',
    title: 'Managing Your Profile Settings',
    content: 'How to update and customize your profile settings...',
    excerpt: 'Learn how to personalize your profile and manage your account settings.',
    category: 'account-management',
    tags: ['profile', 'settings', 'customization'],
    status: 'published',
    author: {
      name: 'John Doe',
      email: 'john@company.com'
    },
    createdAt: '2024-01-07T14:30:00Z',
    updatedAt: '2024-01-09T10:15:00Z',
    views: 650,
    likes: 45,
    helpful: 52,
    notHelpful: 8,
    featured: false
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published': return 'bg-green-100 text-green-800'
    case 'draft': return 'bg-yellow-100 text-yellow-800'
    case 'archived': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'published': return <Globe className="w-4 h-4" />
    case 'draft': return <Clock className="w-4 h-4" />
    case 'archived': return <CheckCircle className="w-4 h-4" />
    default: return <HelpCircle className="w-4 h-4" />
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('updated')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showNewArticleForm, setShowNewArticleForm] = useState(false)

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'views':
        return b.views - a.views
      case 'helpful':
        return b.helpful - a.helpful
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'updated':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    }
  })

  const totalArticles = mockArticles.length
  const publishedArticles = mockArticles.filter(a => a.status === 'published').length
  const draftArticles = mockArticles.filter(a => a.status === 'draft').length
  const totalViews = mockArticles.reduce((sum, article) => sum + article.views, 0)
  const avgHelpfulness = mockArticles.reduce((sum, article) => {
    const total = article.helpful + article.notHelpful
    return sum + (total > 0 ? (article.helpful / total) * 100 : 0)
  }, 0) / mockArticles.length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600">
            Manage support articles, FAQs, and documentation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setShowNewArticleForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold text-gray-900">{totalArticles}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">{publishedArticles} published</span>
              <span className="text-gray-500 ml-2">• {draftArticles} drafts</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(totalViews)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Helpfulness</p>
                <p className="text-2xl font-bold text-gray-900">{avgHelpfulness.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{mockCategories.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>Across all topics</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search articles, tags, or content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="updated">Last Updated</SelectItem>
                      <SelectItem value="created">Date Created</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="views">Most Viewed</SelectItem>
                      <SelectItem value="helpful">Most Helpful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(article.status)}>
                          {getStatusIcon(article.status)}
                          {article.status}
                        </Badge>
                        {article.featured && (
                          <Badge variant="outline">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="outline">
                          +{article.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{formatNumber(article.views)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{article.helpful}</span>
                        </div>
                      </div>
                      <span>{formatDate(article.updatedAt)}</span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{article.author.name}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedArticles.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-4">
                  No articles match your current filters. Try adjusting your search criteria.
                </p>
                <Button onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedStatus('all')
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{category.icon}</div>
                    <div>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {category.articleCount} articles
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Article Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockArticles.slice(0, 5).map((article) => (
                    <div key={article.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm truncate">{article.title}</p>
                        <p className="text-xs text-gray-500">{formatNumber(article.views)} views</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{article.helpful}%</p>
                        <p className="text-xs text-gray-500">helpful</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Popular Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge variant="outline">{category.articleCount}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}