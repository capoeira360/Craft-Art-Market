'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Globe, 
  FileText, 
  Image, 
  Link, 
  Bold, 
  Italic, 
  List, 
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Upload
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ContentData {
  id?: string
  title: string
  type: 'article' | 'page' | 'blog' | 'announcement'
  status: 'published' | 'draft' | 'scheduled'
  content: string
  excerpt: string
  category: string
  tags: string[]
  featuredImage?: string
  publishedAt?: string
  seoTitle?: string
  seoDescription?: string
  slug: string
}

const initialContent: ContentData = {
  title: '',
  type: 'article',
  status: 'draft',
  content: '',
  excerpt: '',
  category: '',
  tags: [],
  slug: ''
}

const categories = [
  'Culture',
  'Care Guide',
  'Announcements',
  'Company',
  'Collections',
  'Tutorials',
  'News',
  'Events'
]

export default function ContentEditor() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const contentId = searchParams.get('id')
  const isEditing = !!contentId

  const [contentData, setContentData] = useState<ContentData>(initialContent)
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch content by ID
      // For now, we'll simulate loading existing content
      setContentData({
        id: contentId,
        title: 'Persian Handicrafts: A Cultural Heritage',
        type: 'article',
        status: 'published',
        content: `# Persian Handicrafts: A Cultural Heritage\n\nPersian handicrafts represent centuries of artistic tradition and cultural heritage. These beautiful creations showcase the skill and creativity of Persian artisans.\n\n## History and Tradition\n\nThe art of Persian handicrafts dates back thousands of years, with each region developing its own unique styles and techniques.\n\n### Key Characteristics\n\n- **Intricate Patterns**: Complex geometric and floral designs\n- **Natural Materials**: Use of silk, wool, cotton, and precious metals\n- **Traditional Techniques**: Passed down through generations\n- **Cultural Significance**: Each piece tells a story\n\n## Modern Relevance\n\nToday, Persian handicrafts continue to be valued for their beauty and craftsmanship, finding new audiences worldwide.`,
        excerpt: 'Exploring the rich tradition of Persian handicrafts and their significance in modern times...',
        category: 'Culture',
        tags: ['handicrafts', 'culture', 'heritage'],
        slug: 'persian-handicrafts-cultural-heritage',
        seoTitle: 'Persian Handicrafts: A Cultural Heritage | Persian Green',
        seoDescription: 'Discover the rich tradition of Persian handicrafts and their cultural significance in this comprehensive guide.'
      })
    }
  }, [isEditing, contentId])

  const handleSave = async (status: 'draft' | 'published' | 'scheduled' = contentData.status) => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setContentData(prev => ({ ...prev, status }))
    setLastSaved(new Date())
    setIsSaving(false)
    
    if (status === 'published') {
      // Redirect to content list after publishing
      router.push('/admin/content')
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !contentData.tags.includes(tagInput.trim())) {
      setContentData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setContentData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setContentData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const toolbarButtons = [
    { icon: Bold, label: 'Bold', action: () => {} },
    { icon: Italic, label: 'Italic', action: () => {} },
    { icon: Heading1, label: 'H1', action: () => {} },
    { icon: Heading2, label: 'H2', action: () => {} },
    { icon: Heading3, label: 'H3', action: () => {} },
    { icon: List, label: 'List', action: () => {} },
    { icon: Quote, label: 'Quote', action: () => {} },
    { icon: Code, label: 'Code', action: () => {} },
    { icon: Link, label: 'Link', action: () => {} },
    { icon: Image, label: 'Image', action: () => {} },
    { icon: AlignLeft, label: 'Align Left', action: () => {} },
    { icon: AlignCenter, label: 'Align Center', action: () => {} },
    { icon: AlignRight, label: 'Align Right', action: () => {} }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/admin/content')}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {isEditing ? 'Edit Content' : 'Create New Content'}
              </h1>
              {lastSaved && (
                <p className="text-sm text-gray-500">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSave('draft')}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button 
              onClick={() => handleSave('published')}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              {contentData.status === 'published' ? 'Update' : 'Publish'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Editor */}
        <div className="flex-1 p-6">
          {!showPreview ? (
            <div className="space-y-6">
              {/* Title */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={contentData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter content title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={contentData.slug}
                      onChange={(e) => setContentData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-slug"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={contentData.excerpt}
                      onChange={(e) => setContentData(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description of the content..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </Card>

              {/* Content Editor */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Content
                    </label>
                    
                    {/* Toolbar */}
                    <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1">
                      {toolbarButtons.map((button, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          onClick={button.action}
                          className="p-2 h-8 w-8"
                          title={button.label}
                        >
                          <button.icon className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <textarea
                    value={contentData.content}
                    onChange={(e) => setContentData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your content here... (Markdown supported)"
                    rows={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                  />
                </div>
              </Card>
            </div>
          ) : (
            /* Preview */
            <Card className="p-6">
              <div className="prose max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {contentData.title || 'Untitled'}
                </h1>
                <div className="text-gray-600 mb-6">
                  {contentData.excerpt}
                </div>
                <div className="whitespace-pre-wrap">
                  {contentData.content}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 space-y-6">
          {/* Publish Settings */}
          <Card className="p-4">
            <h3 className="font-medium text-gray-900 mb-4">Publish Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={contentData.status}
                  onChange={(e) => setContentData(prev => ({ 
                    ...prev, 
                    status: e.target.value as 'draft' | 'published' | 'scheduled'
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  value={contentData.type}
                  onChange={(e) => setContentData(prev => ({ 
                    ...prev, 
                    type: e.target.value as 'article' | 'page' | 'blog' | 'announcement'
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="article">Article</option>
                  <option value="blog">Blog Post</option>
                  <option value="page">Page</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>
              
              {contentData.status === 'scheduled' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    value={contentData.publishedAt || ''}
                    onChange={(e) => setContentData(prev => ({ ...prev, publishedAt: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Categories and Tags */}
          <Card className="p-4">
            <h3 className="font-medium text-gray-900 mb-4">Organization</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={contentData.category}
                  onChange={(e) => setContentData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select category...</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Add tag..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Button onClick={handleAddTag} size="sm">
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {contentData.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* SEO Settings */}
          <Card className="p-4">
            <h3 className="font-medium text-gray-900 mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={contentData.seoTitle || ''}
                  onChange={(e) => setContentData(prev => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="SEO optimized title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={contentData.seoDescription || ''}
                  onChange={(e) => setContentData(prev => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="SEO meta description..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </Card>

          {/* Featured Image */}
          <Card className="p-4">
            <h3 className="font-medium text-gray-900 mb-4">Featured Image</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload featured image</p>
              <Button variant="outline" size="sm">
                Choose File
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}