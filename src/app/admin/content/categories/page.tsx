'use client'

import { useState } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Tag, 
  FileText, 
  Eye, 
  MoreHorizontal,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  contentCount: number
  color: string
  createdAt: string
  updatedAt: string
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Culture',
    slug: 'culture',
    description: 'Articles about Persian culture and traditions',
    contentCount: 15,
    color: '#3B82F6',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Care Guide',
    slug: 'care-guide',
    description: 'Guides for maintaining and caring for products',
    contentCount: 8,
    color: '#10B981',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Announcements',
    slug: 'announcements',
    description: 'Company announcements and updates',
    contentCount: 5,
    color: '#F59E0B',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-22'
  },
  {
    id: '4',
    name: 'Collections',
    slug: 'collections',
    description: 'Featured product collections and showcases',
    contentCount: 12,
    color: '#8B5CF6',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18'
  },
  {
    id: '5',
    name: 'Tutorials',
    slug: 'tutorials',
    description: 'How-to guides and educational content',
    contentCount: 6,
    color: '#EF4444',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-21'
  }
]

export default function CategoriesManagement() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  })

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleCreateCategory = () => {
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      slug: generateSlug(newCategory.name),
      description: newCategory.description,
      contentCount: 0,
      color: newCategory.color,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    
    setCategories(prev => [...prev, category])
    setNewCategory({ name: '', description: '', color: '#3B82F6' })
    setShowCreateModal(false)
  }

  const handleUpdateCategory = () => {
    if (!editingCategory) return
    
    setCategories(prev => prev.map(cat => 
      cat.id === editingCategory.id 
        ? { ...editingCategory, updatedAt: new Date().toISOString().split('T')[0] }
        : cat
    ))
    setEditingCategory(null)
  }

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId))
    }
  }

  const colorOptions = [
    '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
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
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-1">Organize your content with categories</p>
          </div>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <Tag className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-2xl font-bold text-green-600">
                {categories.reduce((sum, cat) => sum + cat.contentCount, 0)}
              </p>
            </div>
            <FileText className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Content per Category</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(categories.reduce((sum, cat) => sum + cat.contentCount, 0) / categories.length)}
              </p>
            </div>
            <MoreHorizontal className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
              </div>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setEditingCategory(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm">
              {category.description}
            </p>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary">
                {category.contentCount} content{category.contentCount !== 1 ? 's' : ''}
              </Badge>
              <span className="text-xs text-gray-500">
                Updated {new Date(category.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <Card className="p-12 text-center">
          <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search criteria' : 'Create your first category to get started'}
          </p>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </Card>
      )}

      {/* Create Category Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Category</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Category name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Category description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex space-x-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setNewCategory(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newCategory.color === color ? 'border-gray-900' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateCategory}
                disabled={!newCategory.name.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                Create Category
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Category</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory(prev => prev ? { ...prev, name: e.target.value } : null)}
                  placeholder="Category name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory(prev => prev ? { ...prev, description: e.target.value } : null)}
                  placeholder="Category description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex space-x-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setEditingCategory(prev => prev ? { ...prev, color } : null)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        editingCategory.color === color ? 'border-gray-900' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setEditingCategory(null)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateCategory}
                disabled={!editingCategory.name.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                Update Category
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}