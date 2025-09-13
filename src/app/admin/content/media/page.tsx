'use client'

import { useState } from 'react'
import { 
  Upload, 
  Image, 
  Video, 
  FileText, 
  Download, 
  Trash2, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Copy, 
  Edit, 
  MoreHorizontal,
  ArrowLeft,
  FolderPlus,
  Folder,
  File
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

interface MediaItem {
  id: string
  name: string
  type: 'image' | 'video' | 'document'
  url: string
  thumbnail?: string
  size: number
  dimensions?: { width: number; height: number }
  uploadedAt: string
  uploadedBy: string
  folder: string
  alt?: string
  description?: string
}

const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    name: 'persian-carpet-hero.jpg',
    type: 'image',
    url: '/images/persian-carpet-hero.jpg',
    thumbnail: '/images/persian-carpet-hero-thumb.jpg',
    size: 2048576, // 2MB
    dimensions: { width: 1920, height: 1080 },
    uploadedAt: '2024-01-15T10:30:00Z',
    uploadedBy: 'Admin User',
    folder: 'hero-images',
    alt: 'Beautiful Persian carpet with intricate patterns',
    description: 'Hero image for homepage featuring a traditional Persian carpet'
  },
  {
    id: '2',
    name: 'artisan-workshop.mp4',
    type: 'video',
    url: '/videos/artisan-workshop.mp4',
    thumbnail: '/images/artisan-workshop-thumb.jpg',
    size: 15728640, // 15MB
    dimensions: { width: 1280, height: 720 },
    uploadedAt: '2024-01-14T14:20:00Z',
    uploadedBy: 'Content Manager',
    folder: 'videos',
    description: 'Behind-the-scenes video of artisan creating handmade pottery'
  },
  {
    id: '3',
    name: 'product-catalog.pdf',
    type: 'document',
    url: '/documents/product-catalog.pdf',
    size: 5242880, // 5MB
    uploadedAt: '2024-01-13T09:15:00Z',
    uploadedBy: 'Admin User',
    folder: 'documents',
    description: 'Complete product catalog for Q1 2024'
  },
  {
    id: '4',
    name: 'ceramic-collection.jpg',
    type: 'image',
    url: '/images/ceramic-collection.jpg',
    thumbnail: '/images/ceramic-collection-thumb.jpg',
    size: 1536000, // 1.5MB
    dimensions: { width: 1600, height: 900 },
    uploadedAt: '2024-01-12T16:45:00Z',
    uploadedBy: 'Content Manager',
    folder: 'product-images',
    alt: 'Collection of handmade ceramic pieces',
    description: 'Featured ceramic collection for winter showcase'
  },
  {
    id: '5',
    name: 'textile-patterns.jpg',
    type: 'image',
    url: '/images/textile-patterns.jpg',
    thumbnail: '/images/textile-patterns-thumb.jpg',
    size: 1024000, // 1MB
    dimensions: { width: 1200, height: 800 },
    uploadedAt: '2024-01-11T11:30:00Z',
    uploadedBy: 'Admin User',
    folder: 'blog-images',
    alt: 'Traditional Persian textile patterns',
    description: 'Various traditional textile patterns for blog article'
  }
]

const folders = [
  { name: 'hero-images', count: 5 },
  { name: 'product-images', count: 23 },
  { name: 'blog-images', count: 15 },
  { name: 'videos', count: 8 },
  { name: 'documents', count: 12 }
]

export default function MediaLibrary() {
  const router = useRouter()
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMediaItems)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFolder, setSelectedFolder] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5" />
      case 'video':
        return <Video className="h-5 w-5" />
      case 'document':
        return <FileText className="h-5 w-5" />
      default:
        return <File className="h-5 w-5" />
    }
  }

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder
    const matchesType = selectedType === 'all' || item.type === selectedType
    
    return matchesSearch && matchesFolder && matchesType
  })

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleDeleteSelected = () => {
    if (confirm(`Are you sure you want to delete ${selectedItems.length} item(s)?`)) {
      setMediaItems(prev => prev.filter(item => !selectedItems.includes(item.id)))
      setSelectedItems([])
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    // In a real app, show a toast notification
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
            <p className="text-gray-600 mt-1">Manage images, videos, and documents</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button 
            onClick={() => setShowUploadModal(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-gray-900">{mediaItems.length}</p>
            </div>
            <File className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Images</p>
              <p className="text-2xl font-bold text-green-600">
                {mediaItems.filter(item => item.type === 'image').length}
              </p>
            </div>
            <Image className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Videos</p>
              <p className="text-2xl font-bold text-purple-600">
                {mediaItems.filter(item => item.type === 'video').length}
              </p>
            </div>
            <Video className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatFileSize(mediaItems.reduce((sum, item) => sum + item.size, 0))}
              </p>
            </div>
            <FileText className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            {/* Folder Filter */}
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Folders</option>
              {folders.map(folder => (
                <option key={folder.name} value={folder.name}>
                  {folder.name} ({folder.count})
                </option>
              ))}
            </select>
            
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            {selectedItems.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedItems.length} selected
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDeleteSelected}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedItems.includes(item.id) ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => handleSelectItem(item.id)}
            >
              <div className="aspect-square bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                {item.type === 'image' && item.thumbnail ? (
                  <img 
                    src={item.thumbnail} 
                    alt={item.alt || item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">
                    {getFileIcon(item.type)}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900 truncate" title={item.name}>
                  {item.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <Badge variant="secondary" className="text-xs">
                    {item.type}
                  </Badge>
                  <span>{formatFileSize(item.size)}</span>
                </div>
                {item.dimensions && (
                  <p className="text-xs text-gray-500">
                    {item.dimensions.width} × {item.dimensions.height}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCopyUrl(item.url)
                  }}
                  title="Copy URL"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditingItem(item)
                  }}
                  title="Edit"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(item.url, '_blank')
                  }}
                  title="View"
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(filteredItems.map(item => item.id))
                        } else {
                          setSelectedItems([])
                        }
                      }}
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Folder
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {item.type === 'image' && item.thumbnail ? (
                            <img 
                              src={item.thumbnail} 
                              alt={item.alt || item.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                              {getFileIcon(item.type)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="text-sm text-gray-500 truncate">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatFileSize(item.size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Folder className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{item.folder}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(item.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCopyUrl(item.url)}
                          title="Copy URL"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setEditingItem(item)}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(item.url, '_blank')}
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Card className="p-12 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || selectedFolder !== 'all' || selectedType !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Upload your first media files to get started'
            }
          </p>
          <Button 
            onClick={() => setShowUploadModal(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </Card>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Files</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">Drop files here</p>
              <p className="text-gray-500 mb-4">or click to browse</p>
              <Button variant="outline">
                Choose Files
              </Button>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Folder
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
                {folders.map(folder => (
                  <option key={folder.name} value={folder.name}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Upload
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Media Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Media</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File Name
                </label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              {editingItem.type === 'image' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={editingItem.alt || ''}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, alt: e.target.value } : null)}
                    placeholder="Describe the image for accessibility"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                  placeholder="Optional description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Folder
                </label>
                <select
                  value={editingItem.folder}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, folder: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {folders.map(folder => (
                    <option key={folder.name} value={folder.name}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setMediaItems(prev => prev.map(item => 
                    item.id === editingItem.id ? editingItem : item
                  ))
                  setEditingItem(null)
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}