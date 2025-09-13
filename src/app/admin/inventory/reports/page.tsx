'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Download, TrendingUp, TrendingDown, Package, AlertTriangle, Calendar, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
// Removed react-day-picker import

interface StockMovement {
  id: string
  productName: string
  sku: string
  type: 'in' | 'out' | 'adjustment'
  quantity: number
  reason: string
  date: string
  user: string
}

interface LowStockAlert {
  id: string
  productName: string
  sku: string
  currentStock: number
  minStock: number
  category: string
  daysUntilStockout: number
}

interface InventoryValue {
  category: string
  totalItems: number
  totalValue: number
  averageValue: number
}

const mockStockMovements: StockMovement[] = [
  {
    id: '1',
    productName: 'Persian Saffron Premium',
    sku: 'SAF-001',
    type: 'out',
    quantity: 5,
    reason: 'Sale',
    date: '2024-01-21',
    user: 'John Doe'
  },
  {
    id: '2',
    productName: 'Handwoven Carpet Small',
    sku: 'CAR-002',
    type: 'in',
    quantity: 10,
    reason: 'Purchase',
    date: '2024-01-20',
    user: 'Admin'
  },
  {
    id: '3',
    productName: 'Rose Water Organic',
    sku: 'ROS-004',
    type: 'adjustment',
    quantity: -2,
    reason: 'Damaged goods',
    date: '2024-01-19',
    user: 'Jane Smith'
  }
]

const mockLowStockAlerts: LowStockAlert[] = [
  {
    id: '1',
    productName: 'Handwoven Carpet Small',
    sku: 'CAR-002',
    currentStock: 8,
    minStock: 15,
    category: 'Textiles',
    daysUntilStockout: 12
  },
  {
    id: '2',
    productName: 'Copper Tea Set',
    sku: 'TEA-003',
    currentStock: 0,
    minStock: 10,
    category: 'Kitchenware',
    daysUntilStockout: 0
  }
]

const mockInventoryValue: InventoryValue[] = [
  {
    category: 'Spices',
    totalItems: 15,
    totalValue: 2450.75,
    averageValue: 163.38
  },
  {
    category: 'Textiles',
    totalItems: 8,
    totalValue: 4200.00,
    averageValue: 525.00
  },
  {
    category: 'Kitchenware',
    totalItems: 12,
    totalValue: 1890.50,
    averageValue: 157.54
  },
  {
    category: 'Beauty',
    totalItems: 25,
    totalValue: 1250.75,
    averageValue: 50.03
  }
]

const getMovementTypeColor = (type: string) => {
  switch (type) {
    case 'in': return 'bg-green-100 text-green-800'
    case 'out': return 'bg-blue-100 text-blue-800'
    case 'adjustment': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getMovementTypeIcon = (type: string) => {
  switch (type) {
    case 'in': return <TrendingUp className="w-4 h-4" />
    case 'out': return <TrendingDown className="w-4 h-4" />
    case 'adjustment': return <Package className="w-4 h-4" />
    default: return <Package className="w-4 h-4" />
  }
}

export default function InventoryReports() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [reportType, setReportType] = useState('overview')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const totalInventoryValue = mockInventoryValue.reduce((sum, item) => sum + item.totalValue, 0)
  const totalItems = mockInventoryValue.reduce((sum, item) => sum + item.totalItems, 0)
  const criticalStockItems = mockLowStockAlerts.filter(item => item.currentStock === 0).length
  const lowStockItems = mockLowStockAlerts.filter(item => item.currentStock > 0 && item.currentStock < item.minStock).length

  const exportReport = () => {
    // Simulate report export
    const reportData = {
      type: reportType,
      dateRange,
      generatedAt: new Date().toISOString(),
      data: {
        stockMovements: mockStockMovements,
        lowStockAlerts: mockLowStockAlerts,
        inventoryValue: mockInventoryValue
      }
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inventory-report-${reportType}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Inventory Reports</h1>
            <p className="text-gray-600 mt-1">Analytics and insights for your inventory</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={exportReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview Report</SelectItem>
                  <SelectItem value="stock-movements">Stock Movements</SelectItem>
                  <SelectItem value="low-stock">Low Stock Alert</SelectItem>
                  <SelectItem value="value-analysis">Value Analysis</SelectItem>
                  <SelectItem value="category-breakdown">Category Breakdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <DatePickerWithRange />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInventoryValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalStockItems}</div>
            <p className="text-xs text-muted-foreground">Items out of stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Items below minimum</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Stock Movements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Stock Movements</CardTitle>
            <CardDescription>Latest inventory transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStockMovements.map((movement) => (
                <div key={movement.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getMovementTypeColor(movement.type)}`}>
                      {getMovementTypeIcon(movement.type)}
                    </div>
                    <div>
                      <div className="font-medium">{movement.productName}</div>
                      <div className="text-sm text-gray-500">{movement.sku} • {movement.reason}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      movement.type === 'in' ? 'text-green-600' : 
                      movement.type === 'out' ? 'text-blue-600' : 'text-yellow-600'
                    }`}>
                      {movement.type === 'in' ? '+' : movement.type === 'out' ? '-' : ''}{Math.abs(movement.quantity)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {isClient ? new Date(movement.date).toLocaleDateString() : 'Loading...'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLowStockAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      alert.currentStock === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">{alert.productName}</div>
                      <div className="text-sm text-gray-500">{alert.sku} • {alert.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      alert.currentStock === 0 ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {alert.currentStock}/{alert.minStock}
                    </div>
                    <div className="text-sm text-gray-500">
                      {alert.daysUntilStockout === 0 ? 'Out of stock' : `${alert.daysUntilStockout} days left`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Value by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Value by Category</CardTitle>
          <CardDescription>Breakdown of inventory value across product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Total Items</th>
                  <th className="text-left py-3 px-4 font-medium">Total Value</th>
                  <th className="text-left py-3 px-4 font-medium">Average Value</th>
                  <th className="text-left py-3 px-4 font-medium">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {mockInventoryValue.map((category) => {
                  const percentage = ((category.totalValue / totalInventoryValue) * 100).toFixed(1)
                  return (
                    <tr key={category.category} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <Badge variant="outline">{category.category}</Badge>
                      </td>
                      <td className="py-3 px-4 font-medium">{category.totalItems}</td>
                      <td className="py-3 px-4 font-medium">${category.totalValue.toLocaleString()}</td>
                      <td className="py-3 px-4">${category.averageValue.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-persian-green-500 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}