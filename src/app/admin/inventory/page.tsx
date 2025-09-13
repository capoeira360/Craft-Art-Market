'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


interface InventoryItem {
  id: string
  name: string
  category: string
  artisan: string
  price: number
  stock: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  lastUpdated: string
  image: string
  sku: string
}

const mockInventoryData: InventoryItem[] = [
  {
    id: '1',
    name: 'Tingatinga Elephant Painting',
    category: 'Paintings',
    artisan: 'Amara Tingatinga',
    price: 85000,
    stock: 12,
    status: 'in-stock',
    lastUpdated: '2024-01-15',
    image: '/products/tingatinga-elephant.jpg',
    sku: 'TNG-ELE-001'
  },
  {
    id: '2',
    name: 'Kitenge Fabric Handbag',
    category: 'Fashion',
    artisan: 'Jengo Makonde',
    price: 45000,
    stock: 3,
    status: 'low-stock',
    lastUpdated: '2024-01-14',
    image: '/products/kitenge-handbag.jpg',
    sku: 'KTG-BAG-002'
  },
  {
    id: '3',
    name: 'Makonde Ebony Sculpture',
    category: 'Sculptures',
    artisan: 'Neema Makonde',
    price: 150000,
    stock: 0,
    status: 'out-of-stock',
    lastUpdated: '2024-01-13',
    image: '/products/makonde-sculpture.jpg',
    sku: 'MKD-SCL-003'
  },
  {
    id: '4',
    name: 'Beaded Maasai Jewelry Set',
    category: 'Jewelry',
    artisan: 'Kesi Maasai',
    price: 25000,
    stock: 8,
    status: 'in-stock',
    lastUpdated: '2024-01-16',
    image: '/products/maasai-jewelry.jpg',
    sku: 'MSI-JWL-004'
  },
  {
    id: '5',
    name: 'Woven Basket Collection',
    category: 'Home Decor',
    artisan: 'Fatuma Weaver',
    price: 35000,
    stock: 15,
    status: 'in-stock',
    lastUpdated: '2024-01-17',
    image: '/products/woven-baskets.jpg',
    sku: 'WVN-BSK-005'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in-stock':
      return 'bg-persian-green-100 text-persian-green-800 border-persian-green-200'
    case 'low-stock':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'out-of-stock':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}



export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const filteredInventory = useMemo(() => {
    return mockInventoryData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.artisan.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, categoryFilter, statusFilter])

  const sortedInventory = useMemo(() => {
    return [...filteredInventory].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name)
        case 'stock': return b.stock - a.stock
        case 'price': return b.price - a.price
        case 'updated': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        default: return 0
      }
    })
  }, [filteredInventory, sortBy])

  const stats = useMemo(() => {
    const totalItems = mockInventoryData.length
    const totalValue = mockInventoryData.reduce((sum, item) => sum + (item.price * item.stock), 0)
    const lowStockItems = mockInventoryData.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length
    const inStockItems = mockInventoryData.filter(item => item.status === 'in-stock').length
    
    return { totalItems, totalValue, lowStockItems, inStockItems }
  }, [])



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-graphite">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track and manage artisan products</p>
        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-copper-patina/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-graphite">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-graphite">{stats.totalItems}</div>
            <p className="text-xs text-gray-600">Active products</p>
          </CardContent>
        </Card>
        <Card className="border-copper-patina/20">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium text-graphite">Total Value</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-graphite">TSh {stats.totalValue.toLocaleString()}</div>
             <p className="text-xs text-gray-600">Inventory value</p>
           </CardContent>
         </Card>
         <Card className="border-copper-patina/20">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium text-graphite">In Stock</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-persian-green-600">{stats.inStockItems}</div>
             <p className="text-xs text-gray-600">Available items</p>
           </CardContent>
         </Card>
         <Card className="border-copper-patina/20">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium text-graphite">Low Stock</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-red-600">{stats.lowStockItems}</div>
             <p className="text-xs text-gray-600">Need attention</p>
           </CardContent>
         </Card>
      </div>

      {/* Filters and Search */}
       <Card className="border-copper-patina/20">
         <CardContent className="pt-6">
           <div className="flex flex-col md:flex-row gap-4">
             <div className="flex-1">
               <div className="relative">
                 <Input
                   placeholder="Search products, SKU, or artisan..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="border-copper-patina/20 focus:border-copper-patina"
                 />
               </div>
             </div>
             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
               <SelectTrigger className="w-full md:w-48 border-copper-patina/20">
                 <SelectValue placeholder="Category" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Categories</SelectItem>
                 <SelectItem value="Paintings">Paintings</SelectItem>
                 <SelectItem value="Fashion">Fashion</SelectItem>
                 <SelectItem value="Sculptures">Sculptures</SelectItem>
                 <SelectItem value="Jewelry">Jewelry</SelectItem>
                 <SelectItem value="Home Decor">Home Decor</SelectItem>
               </SelectContent>
             </Select>
             <Select value={statusFilter} onValueChange={setStatusFilter}>
               <SelectTrigger className="w-full md:w-48 border-copper-patina/20">
                 <SelectValue placeholder="Status" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Status</SelectItem>
                 <SelectItem value="in-stock">In Stock</SelectItem>
                 <SelectItem value="low-stock">Low Stock</SelectItem>
                 <SelectItem value="out-of-stock">Out of Stock</SelectItem>
               </SelectContent>
             </Select>
             <Select value={sortBy} onValueChange={setSortBy}>
               <SelectTrigger className="w-full md:w-48 border-copper-patina/20">
                 <SelectValue placeholder="Sort by" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="name">Name</SelectItem>
                 <SelectItem value="stock">Stock Level</SelectItem>
                 <SelectItem value="price">Price</SelectItem>
                 <SelectItem value="updated">Last Updated</SelectItem>
               </SelectContent>
             </Select>
           </div>
         </CardContent>
       </Card>

      {/* Products Grid */}
       <Card className="border-copper-patina/20">
         <CardHeader>
           <CardTitle className="text-graphite">Products ({sortedInventory.length})</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {sortedInventory.map((item) => (
               <Card key={item.id} className="border-copper-patina/10 hover:border-copper-patina/30 transition-colors">
                 <CardContent className="p-4">
                   <div className="flex items-start justify-between mb-3">
                     <div className="flex-1">
                       <h3 className="font-semibold text-graphite mb-1">{item.name}</h3>
                       <p className="text-sm text-gray-600 mb-2">by {item.artisan}</p>
                       <Badge variant="outline" className="text-xs border-copper-patina/30">{item.category}</Badge>
                     </div>
                     <Badge className={getStatusColor(item.status)}>
                       <span className="capitalize text-xs">{item.status.replace('-', ' ')}</span>
                     </Badge>
                   </div>
                   
                   <div className="space-y-2 mb-4">
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-600">SKU:</span>
                       <span className="font-mono">{item.sku}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-600">Stock:</span>
                       <span className="font-medium">{item.stock} units</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-600">Price:</span>
                       <span className="font-medium">TSh {item.price.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-600">Value:</span>
                       <span className="font-medium">TSh {(item.price * item.stock).toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-600">Updated:</span>
                       <span>{new Date(item.lastUpdated).toLocaleDateString('en-US')}</span>
                     </div>
                   </div>
                   

                 </CardContent>
               </Card>
             ))}
           </div>
           
           {sortedInventory.length === 0 && (
             <div className="text-center py-12">
               <p className="text-gray-600">No products found matching your criteria.</p>
             </div>
           )}
         </CardContent>
       </Card>
    </div>
  )
}