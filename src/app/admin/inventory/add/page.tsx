'use client'

import React, { useState } from 'react'
import { ArrowLeft, Save, Package, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

interface NewInventoryItem {
  name: string
  sku: string
  description: string
  category: string
  supplier: string
  currentStock: number
  minStock: number
  maxStock: number
  unitPrice: number
  costPrice: number
  location: string
  barcode: string
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  tags: string[]
}

const categories = [
  'Ceramic and Glass',
  'Wood Works',
  'Jewellery',
  'Textile and Fiber',
  'Visual Art',
  'Metal Works',
  'Paper Works',
  'Leather Works',
  'Natural Material',
  'Upcycling',
  'Toys and Dolls'
]

const suppliers = [
  'Tehran Spice Co.',
  'Isfahan Weavers',
  'Shiraz Metalworks',
  'Kashan Rose Farm',
  'Tehran Art Supply',
  'Persian Craft Guild',
  'Mashhad Traders',
  'Yazd Textiles'
]

const locations = [
  'Warehouse A-1',
  'Warehouse A-2',
  'Warehouse A-3',
  'Warehouse B-1',
  'Warehouse B-2',
  'Warehouse C-1',
  'Warehouse C-2',
  'Storage Room 1',
  'Storage Room 2'
]

export default function AddInventoryItem() {
  const router = useRouter()
  const [formData, setFormData] = useState<NewInventoryItem>({
    name: '',
    sku: '',
    description: '',
    category: '',
    supplier: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unitPrice: 0,
    costPrice: 0,
    location: '',
    barcode: '',
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    tags: []
  })
  const [newTag, setNewTag] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [images, setImages] = useState<File[]>([])

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof NewInventoryItem] as any),
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prev => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const generateSKU = () => {
    const categoryCode = formData.category.substring(0, 3).toUpperCase()
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    const sku = `${categoryCode}-${randomNum}`
    handleInputChange('sku', sku)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    router.push('/admin/inventory')
  }

  const totalValue = formData.currentStock * formData.unitPrice
  const profitMargin = formData.unitPrice > 0 && formData.costPrice > 0 
    ? ((formData.unitPrice - formData.costPrice) / formData.unitPrice * 100).toFixed(1)
    : '0'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add Inventory Item</h1>
            <p className="text-gray-600 mt-1">Create a new product in your inventory</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Item'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential product details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => handleInputChange('sku', e.target.value)}
                      placeholder="Product SKU"
                    />
                    <Button type="button" variant="outline" onClick={generateSKU}>
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Product description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select value={formData.supplier} onValueChange={(value) => handleInputChange('supplier', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map(supplier => (
                        <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock Information */}
          <Card>
            <CardHeader>
              <CardTitle>Stock Information</CardTitle>
              <CardDescription>Inventory levels and thresholds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentStock">Current Stock *</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => handleInputChange('currentStock', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Minimum Stock</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => handleInputChange('minStock', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStock">Maximum Stock</Label>
                  <Input
                    id="maxStock"
                    type="number"
                    value={formData.maxStock}
                    onChange={(e) => handleInputChange('maxStock', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Storage Location</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
              <CardDescription>Cost and selling price information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="costPrice">Cost Price</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => handleInputChange('costPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Selling Price *</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
              </div>
              {formData.costPrice > 0 && formData.unitPrice > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Profit Margin: <span className="font-medium">{profitMargin}%</span></div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>Physical properties and identification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input
                    id="barcode"
                    value={formData.barcode}
                    onChange={(e) => handleInputChange('barcode', e.target.value)}
                    placeholder="Product barcode"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Dimensions (cm)</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.dimensions.length}
                    onChange={(e) => handleInputChange('dimensions.length', parseFloat(e.target.value) || 0)}
                    placeholder="Length"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.dimensions.width}
                    onChange={(e) => handleInputChange('dimensions.width', parseFloat(e.target.value) || 0)}
                    placeholder="Width"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.dimensions.height}
                    onChange={(e) => handleInputChange('dimensions.height', parseFloat(e.target.value) || 0)}
                    placeholder="Height"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Stock:</span>
                <span className="font-medium">{formData.currentStock}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Unit Price:</span>
                <span className="font-medium">${formData.unitPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-sm text-gray-600">Total Value:</span>
                <span className="font-bold">${totalValue.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Upload product photos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Click to upload images</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span>Choose Files</span>
                  </Button>
                </label>
              </div>
              {images.length > 0 && (
                <div className="space-y-2">
                  {images.map((image, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm truncate">{image.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}