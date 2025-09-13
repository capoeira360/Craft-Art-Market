'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Package, Eye, Edit, Plus, Search, Download, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  subcategory: string
  artisanId: string
  artisanName: string
  images: string[]
  status: 'active' | 'pending' | 'rejected' | 'draft' | 'out_of_stock'
  stock: number
  sales: number
  revenue: number
  rating: number
  reviews: number
  createdAt: string
  updatedAt: string
  tags: string[]
  materials: string[]
  dimensions: {
    length: number
    width: number
    height: number
    weight: number
  }
  shippingInfo: {
    domestic: number
    international: number
    freeShippingThreshold: number
  }
  qualityScore: number
  flaggedReasons: string[]
  subscriptionPlan: 'basic' | 'premium' | 'enterprise'
}

interface ProductStats {
  totalProducts: number
  activeProducts: number
  pendingReview: number
  totalRevenue: number
  averageRating: number
  topCategory: string
}

// Subscription plans for artisans
const subscriptionPlans = {
  'basic': { name: 'Basic Plan', price: 15000, features: ['5 Product Listings', 'Basic Analytics', 'Email Support'] },
  'premium': { name: 'Premium Plan', price: 35000, features: ['20 Product Listings', 'Advanced Analytics', 'Priority Support', 'Featured Listings'] },
  'enterprise': { name: 'Enterprise Plan', price: 75000, features: ['Unlimited Listings', 'Full Analytics Suite', '24/7 Support', 'Marketing Tools', 'Custom Branding'] }
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Tingatinga Elephant Painting',
    description: 'Beautiful hand-painted elephant artwork in traditional Tingatinga style',
    price: 85000,
    category: 'Visual Art',
    subcategory: 'Paintings',
    artisanId: '1',
    artisanName: 'Amara Tingatinga',
    images: ['/images/tingatinga-elephant.jpg', '/images/tingatinga-elephant-2.jpg'],
    status: 'active',
    stock: 3,
    sales: 12,
    revenue: 1020000,
    rating: 4.8,
    reviews: 15,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    tags: ['traditional', 'wildlife', 'colorful', 'handmade'],
    materials: ['Canvas', 'Acrylic Paint', 'Natural Pigments'],
    dimensions: { length: 60, width: 45, height: 2, weight: 0.8 },
    shippingInfo: { domestic: 5000, international: 25000, freeShippingThreshold: 100000 },
    qualityScore: 95,
    flaggedReasons: [],
    subscriptionPlan: 'premium'
  },
  {
    id: '2',
    name: 'Kitenge Handbag Collection',
    description: 'Stylish handbag made from authentic Kitenge fabric with leather accents',
    price: 45000,
    category: 'Leather Works',
    subcategory: 'Bags & Purses',
    artisanId: '2',
    artisanName: 'Jengo Makonde',
    images: ['/images/kitenge-handbag.jpg'],
    status: 'active',
    stock: 8,
    sales: 25,
    revenue: 1125000,
    rating: 4.6,
    reviews: 28,
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-19T16:20:00Z',
    tags: ['fashion', 'kitenge', 'leather', 'colorful'],
    materials: ['Kitenge Fabric', 'Genuine Leather', 'Cotton Lining'],
    dimensions: { length: 35, width: 25, height: 15, weight: 0.6 },
    shippingInfo: { domestic: 3000, international: 18000, freeShippingThreshold: 80000 },
    qualityScore: 88,
    flaggedReasons: [],
    subscriptionPlan: 'basic'
  },
  {
    id: '3',
    name: 'Makonde Wood Sculpture',
    description: 'Intricate traditional Makonde carving depicting family unity',
    price: 150000,
    category: 'Wood Works',
    subcategory: 'Sculptures',
    artisanId: '3',
    artisanName: 'Neema Makonde',
    images: ['/images/makonde-sculpture.jpg', '/images/makonde-detail.jpg'],
    status: 'pending',
    stock: 1,
    sales: 3,
    revenue: 450000,
    rating: 5.0,
    reviews: 3,
    createdAt: '2024-01-18T11:30:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
    tags: ['traditional', 'wood', 'sculpture', 'family'],
    materials: ['Ebony Wood', 'Natural Finish'],
    dimensions: { length: 20, width: 15, height: 40, weight: 2.5 },
    shippingInfo: { domestic: 8000, international: 35000, freeShippingThreshold: 150000 },
    qualityScore: 92,
    flaggedReasons: ['Pending quality review'],
    subscriptionPlan: 'enterprise'
  },
  {
    id: '4',
    name: 'Maasai Beaded Necklace',
    description: 'Traditional Maasai beadwork necklace with authentic patterns',
    price: 25000,
    category: 'Jewellery',
    subcategory: 'Necklaces',
    artisanId: '4',
    artisanName: 'Baraka Maasai',
    images: ['/images/maasai-necklace.jpg'],
    status: 'active',
    stock: 15,
    sales: 45,
    revenue: 1125000,
    rating: 4.4,
    reviews: 52,
    createdAt: '2024-01-05T14:45:00Z',
    updatedAt: '2024-01-20T09:30:00Z',
    tags: ['traditional', 'beadwork', 'maasai', 'jewelry'],
    materials: ['Glass Beads', 'Cotton Thread', 'Metal Clasp'],
    dimensions: { length: 45, width: 2, height: 1, weight: 0.1 },
    shippingInfo: { domestic: 2000, international: 12000, freeShippingThreshold: 50000 },
    qualityScore: 85,
    flaggedReasons: [],
    subscriptionPlan: 'basic'
  },
  {
    id: '5',
    name: 'Zanzibar Spice Blend Set',
    description: 'Authentic spice collection from Zanzibar markets',
    price: 35000,
    category: 'Natural Material',
    subcategory: 'Traditional Items',
    artisanId: '5',
    artisanName: 'Fatuma Zanzibari',
    images: ['/images/spice-blend.jpg'],
    status: 'rejected',
    stock: 0,
    sales: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-01-20T15:45:00Z',
    tags: ['spices', 'zanzibar', 'authentic', 'cooking'],
    materials: ['Cardamom', 'Cinnamon', 'Cloves', 'Black Pepper'],
    dimensions: { length: 20, width: 15, height: 8, weight: 0.5 },
    shippingInfo: { domestic: 4000, international: 20000, freeShippingThreshold: 60000 },
    qualityScore: 65,
    flaggedReasons: ['Food safety certification required', 'Packaging standards not met'],
    subscriptionPlan: 'premium'
  }
]



export default function ProductOversightPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = mockProducts.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.artisanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.category.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const stats: ProductStats = {
    totalProducts: mockProducts.length,
    activeProducts: mockProducts.filter(p => p.status === 'active').length,
    pendingReview: mockProducts.filter(p => p.status === 'pending').length,
    totalRevenue: mockProducts.reduce((sum, p) => sum + p.revenue, 0),
    averageRating: mockProducts.reduce((sum, p) => sum + p.rating, 0) / mockProducts.length,
    topCategory: 'Jewellery'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'suspended':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'rejected':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getSubscriptionPlanColor = (plan: string) => {
    switch (plan) {
      case 'basic':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'premium':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'enterprise':
        return 'bg-gold-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'rejected': return <AlertTriangle className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return `TSh ${amount.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }



  const handleProductAction = async (productId: string, action: string) => {
    try {
      const product = mockProducts.find(p => p.id === productId)
      if (!product) {
        alert('Product not found!')
        return
      }

      switch (action) {
        case 'view':
          // Show product details in a modal or alert
          alert(`Product Details:\n\nName: ${product.name}\nArtisan: ${product.artisanName}\nCategory: ${product.category}\nPrice: ${formatCurrency(product.price)}\nStatus: ${product.status}\nStock: ${product.stock}\nSales: ${product.sales}\nRating: ${product.rating}/5 (${product.reviews} reviews)\nQuality Score: ${product.qualityScore}%\nCreated: ${formatDate(product.createdAt)}\nUpdated: ${formatDate(product.updatedAt)}`)
          break
        case 'edit':
          // Simulate edit functionality
          const newName = prompt('Edit Product Name:', product.name)
          const newPrice = prompt('Edit Product Price:', product.price.toString())
          const newStock = prompt('Edit Stock Quantity:', product.stock.toString())
          
          if (newName && newPrice && newStock) {
            // In a real app, this would update the database
            alert(`Product updated successfully!\n\nNew Name: ${newName}\nNew Price: ${formatCurrency(parseInt(newPrice))}\nNew Stock: ${newStock}`)
            console.log('Product update:', { productId, newName, newPrice, newStock })
          }
          break
        case 'approve':
          if (product.status === 'pending') {
            if (confirm(`Are you sure you want to approve "${product.name}"?`)) {
              alert(`Product "${product.name}" has been approved and is now active!`)
              console.log('Product approved:', productId)
            }
          } else {
            alert(`Product "${product.name}" is already ${product.status}.`)
          }
          break
        case 'reject':
          if (confirm(`Are you sure you want to reject "${product.name}"?`)) {
            const reason = prompt('Please provide a reason for rejection:')
            if (reason) {
              alert(`Product "${product.name}" has been rejected.\nReason: ${reason}`)
              console.log('Product rejected:', { productId, reason })
            }
          }
          break
        case 'request_changes':
          const feedback = prompt('Please provide feedback for the requested changes:')
          if (feedback) {
            console.log('Requesting changes for product:', productId, 'Feedback:', feedback)
            alert(`Change request sent to artisan for "${product.name}"!\nFeedback: ${feedback}`)
          }
          break
        case 'suspend':
          if (confirm(`Are you sure you want to suspend "${product.name}"?`)) {
            alert(`Product "${product.name}" has been suspended.`)
            console.log('Product suspended:', productId)
          }
          break
        case 'delete':
          if (confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
            alert(`Product "${product.name}" has been deleted.`)
            console.log('Product deleted:', productId)
          }
          break
        default:
          console.log(`${action} product:`, productId)
      }
    } catch (error) {
      console.error(`Failed to ${action} product:`, error)
      alert(`Failed to ${action} product. Please try again.`)
    }
  }

  const handleExportData = () => {
    try {
      // Simulate data export
      const exportData = {
        totalProducts: stats.totalProducts,
        activeProducts: stats.activeProducts,
        pendingProducts: stats.pendingReview,
        products: filteredProducts.map(product => ({
          id: product.id,
          name: product.name,
          artisan: product.artisanName,
          category: product.category,
          price: product.price,
          status: product.status,
          stock: product.stock,
          sales: product.sales,
          rating: product.rating,
          qualityScore: product.qualityScore,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt
        })),
        exportedAt: new Date().toISOString()
      }
      
      // In a real app, this would generate and download a file
      console.log('Export data:', exportData)
      
      // Simulate file download
      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `products-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      alert(`Successfully exported ${filteredProducts.length} products!`)
    } catch (error) {
      console.error('Failed to export data:', error)
      alert('Failed to export data. Please try again.')
    }
  }

  const handleAddProduct = () => {
    // Simulate add product functionality
    const productName = prompt('Enter product name:')
    const artisanName = prompt('Enter artisan name:')
    const category = prompt('Enter category (Visual Art, Leather Works, Wood Works, Jewellery, Natural Material):')
    const price = prompt('Enter price (TSh):')
    
    if (productName && artisanName && category && price) {
      const newProduct = {
        name: productName,
        artisan: artisanName,
        category: category,
        price: parseFloat(price),
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      
      alert(`New product created successfully!\n\nName: ${newProduct.name}\nArtisan: ${newProduct.artisan}\nCategory: ${newProduct.category}\nPrice: ${formatCurrency(newProduct.price)}\nStatus: ${newProduct.status}`)
      console.log('New product created:', newProduct)
      
      // In a real app, you would navigate to a proper form page
      // router.push('/admin/products/add')
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Product Oversight</h1>
          <p className="text-gray-300">Monitor and manage all products, quality control, and artisan submissions</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleExportData}
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button 
            className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
            onClick={handleAddProduct}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Simplified Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-persian-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Total Products</p>
                <p className="text-xl font-bold text-white">{stats.totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-xl font-bold text-white">{stats.activeProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-xl font-bold text-white">{stats.pendingReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simple Search */}
      <Card className="bg-graphite border-gray-700">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products by name, artisan, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-persian-green-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <Card className="bg-graphite border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{product.name}</h3>
                    <p className="text-sm text-gray-400">by {product.artisanName} • {product.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getSubscriptionPlanColor(product.subscriptionPlan)}>
                        {subscriptionPlans[product.subscriptionPlan].name}
                      </Badge>
                      <span className="text-sm text-persian-green-400">
                        {formatCurrency(subscriptionPlans[product.subscriptionPlan].price)}/month
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(product.status)}>
                    {getStatusIcon(product.status)}
                    <span className="ml-1 capitalize">{product.status.replace('_', ' ')}</span>
                  </Badge>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleProductAction(product.id, 'view')}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleProductAction(product.id, 'edit')}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {product.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleProductAction(product.id, 'approve')}
                          className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleProductAction(product.id, 'reject')}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleProductAction(product.id, 'request_changes')}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                        >
                          Request Changes
                        </button>
                      </>
                    )}
                    {product.status === 'active' && (
                      <button
                        onClick={() => handleProductAction(product.id, 'suspend')}
                        className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
                      >
                        Suspend
                      </button>
                    )}
                    <button
                      onClick={() => handleProductAction(product.id, 'delete')}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>





    </div>
  )
}