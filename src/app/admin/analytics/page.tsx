'use client'

import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  DollarSign, 
  ShoppingCart, 
  Eye, 
  Clock, 
  Globe, 
  Smartphone, 
  Monitor, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Scatter,
  ScatterChart
} from 'recharts'

// Mock data for comprehensive analytics
const salesData = [
  { month: 'Jan', sales: 45000, orders: 320, customers: 280, avgOrder: 140.63 },
  { month: 'Feb', sales: 52000, orders: 380, customers: 340, avgOrder: 136.84 },
  { month: 'Mar', sales: 48000, orders: 350, customers: 310, avgOrder: 137.14 },
  { month: 'Apr', sales: 61000, orders: 420, customers: 390, avgOrder: 145.24 },
  { month: 'May', sales: 67000, orders: 480, customers: 450, avgOrder: 139.58 },
  { month: 'Jun', sales: 73000, orders: 520, customers: 480, avgOrder: 140.38 },
  { month: 'Jul', sales: 78000, orders: 560, customers: 520, avgOrder: 139.29 },
  { month: 'Aug', sales: 82000, orders: 590, customers: 550, avgOrder: 138.98 },
  { month: 'Sep', sales: 76000, orders: 540, customers: 500, avgOrder: 140.74 },
  { month: 'Oct', sales: 85000, orders: 610, customers: 580, avgOrder: 139.34 },
  { month: 'Nov', sales: 92000, orders: 670, customers: 620, avgOrder: 137.31 },
  { month: 'Dec', sales: 98000, orders: 720, customers: 680, avgOrder: 136.11 }
]

const categoryData = [
  { name: 'Textile and Fiber', value: 35, sales: 34500, color: '#2A9D8F' },
  { name: 'Wood Crafts', value: 25, sales: 24750, color: '#9D7A6D' },
  { name: 'Jewellery', value: 20, sales: 19800, color: '#F4A261' },
  { name: 'Ceramic and Glass', value: 12, sales: 11880, color: '#E76F51' },
  { name: 'Metal Works', value: 8, sales: 7920, color: '#264653' }
]

const trafficData = [
  { source: 'Organic Search', visitors: 12500, conversions: 875, rate: 7.0 },
  { source: 'Social Media', visitors: 8200, conversions: 492, rate: 6.0 },
  { source: 'Direct Traffic', visitors: 6800, conversions: 544, rate: 8.0 },
  { source: 'Email Marketing', visitors: 4200, conversions: 378, rate: 9.0 },
  { source: 'Paid Ads', visitors: 3500, conversions: 245, rate: 7.0 },
  { source: 'Referrals', visitors: 2100, conversions: 147, rate: 7.0 }
]

const deviceData = [
  { device: 'Mobile', sessions: 15420, percentage: 62 },
  { device: 'Desktop', sessions: 7890, percentage: 32 },
  { device: 'Tablet', sessions: 1490, percentage: 6 }
]

const topProducts = [
  { id: 1, name: 'Handwoven Kanga Fabric', sales: 245, revenue: 12250, trend: 'up' },
  { id: 2, name: 'Makonde Wood Sculpture', sales: 189, revenue: 18900, trend: 'up' },
  { id: 3, name: 'Maasai Beaded Jewelry', sales: 156, revenue: 7800, trend: 'down' },
  { id: 4, name: 'Ceramic Water Pot', sales: 134, revenue: 6700, trend: 'up' },
  { id: 5, name: 'Copper Bracelet Set', sales: 98, revenue: 4900, trend: 'up' }
]

const timeRanges = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'Last 6 months', value: '6m' },
  { label: 'Last year', value: '1y' }
]

export default function AnalyticsDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')
  const [activeChart, setActiveChart] = useState('sales')
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Initialize lastUpdated on client side to avoid hydration mismatch
  useEffect(() => {
    setLastUpdated(new Date())
  }, [])

  const refreshData = () => {
    setIsLoading(true)
    // Simulate API call with real-time data update
    setTimeout(() => {
      setIsLoading(false)
      // Update last refreshed timestamp
      const now = new Date()
      console.log('Data refreshed at:', now.toLocaleTimeString())
    }, 1500)
  }

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor data fluctuations
      const randomUpdate = Math.random() * 0.1 - 0.05 // ±5% variation
      console.log('Real-time update:', randomUpdate)
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const exportData = (format: 'csv' | 'pdf' | 'excel') => {
    console.log(`Exporting data in ${format} format...`)
    // Simulate export functionality
    const exportData = {
      salesData,
      categoryData,
      trafficData,
      deviceData,
      topProducts,
      timestamp: new Date().toISOString()
    }
    
    // In a real app, this would trigger actual file download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${format}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const MetricCard = ({ title, value, change, icon: Icon, color, subtitle }: any) => (
    <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            <div className="flex items-center mt-2">
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
              <span className="text-gray-500 text-sm ml-1">vs last period</span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
          <p className="text-sm text-gray-500 mt-1">Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Loading...'}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
             <select
               value={selectedTimeRange}
               onChange={(e) => setSelectedTimeRange(e.target.value)}
               className="px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent bg-white appearance-none"
             >
               <option value="24h">Last 24h</option>
               <option value="7d">Last 7 days</option>
               <option value="30d">Last 30 days</option>
               <option value="90d">Last 90 days</option>
             </select>
             <Calendar className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
           </div>
          <Button 
            onClick={() => {
              setIsRefreshing(true)
              refreshData()
              setLastUpdated(new Date())
              setTimeout(() => setIsRefreshing(false), 1500)
            }} 
            disabled={isRefreshing}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => exportData('csv')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$98,000"
          change={15.3}
          icon={DollarSign}
          color="bg-persian-green-500"
          subtitle="This month"
        />
        <MetricCard
          title="Total Orders"
          value="720"
          change={8.7}
          icon={ShoppingCart}
          color="bg-blue-500"
          subtitle="This month"
        />
        <MetricCard
          title="Active Customers"
          value="680"
          change={12.4}
          icon={Users}
          color="bg-purple-500"
          subtitle="This month"
        />
        <MetricCard
          title="Avg Order Value"
          value="$136.11"
          change={-2.1}
          icon={TrendingUp}
          color="bg-orange-500"
          subtitle="This month"
        />
      </div>

      {/* Chart Selection Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'sales', label: 'Sales Analytics', icon: LineChartIcon },
            { id: 'categories', label: 'Category Performance', icon: PieChartIcon },
            { id: 'traffic', label: 'Traffic Sources', icon: BarChart3 },
            { id: 'devices', label: 'Device Analytics', icon: Monitor }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeChart === tab.id
                  ? 'border-persian-green-500 text-persian-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          {activeChart === 'sales' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5 text-persian-green-500" />
                  Sales Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis yAxisId="left" stroke="#666" />
                    <YAxis yAxisId="right" orientation="right" stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="sales" 
                      fill="#2A9D8F" 
                      fillOpacity={0.3}
                      stroke="#2A9D8F"
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#F4A261" 
                      strokeWidth={2}
                      dot={{ fill: '#F4A261', strokeWidth: 2, r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {activeChart === 'categories' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-persian-green-500" />
                  Sales by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={160}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, 'Market Share']}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {activeChart === 'traffic' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-persian-green-500" />
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={trafficData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" stroke="#666" />
                    <YAxis dataKey="source" type="category" stroke="#666" width={120} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="visitors" fill="#2A9D8F" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {activeChart === 'devices' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-persian-green-500" />
                  Device Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {deviceData.map((device, index) => (
                    <div key={device.device} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {device.device === 'Mobile' && <Smartphone className="w-4 h-4" />}
                          {device.device === 'Desktop' && <Monitor className="w-4 h-4" />}
                          {device.device === 'Tablet' && <Monitor className="w-4 h-4" />}
                          <span className="font-medium">{device.device}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{device.sessions.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{device.percentage}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-persian-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${device.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-persian-green-500" />
                Top Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">
                          {product.sales} sales
                        </span>
                        <span className="text-xs font-medium text-persian-green-600">
                          ${product.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {product.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversion Rates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-persian-green-500" />
                Conversion Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficData.slice(0, 4).map((source) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {source.source}
                      </span>
                      <Badge variant="secondary">
                        {source.rate}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-persian-green-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(source.rate / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-persian-green-500" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Page Views</span>
                  <span className="font-semibold">47,392</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Unique Visitors</span>
                  <span className="font-semibold">24,800</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bounce Rate</span>
                  <span className="font-semibold">34.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Session</span>
                  <span className="font-semibold">4m 32s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Return Visitors</span>
                  <span className="font-semibold">68.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Advanced Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-persian-green-600" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { stage: 'Visitors', count: 10000, percentage: 100, color: 'bg-blue-500' },
                { stage: 'Product Views', count: 7500, percentage: 75, color: 'bg-green-500' },
                { stage: 'Add to Cart', count: 3000, percentage: 30, color: 'bg-yellow-500' },
                { stage: 'Checkout', count: 1500, percentage: 15, color: 'bg-orange-500' },
                { stage: 'Purchase', count: 1200, percentage: 12, color: 'bg-persian-green-500' }
              ].map((stage, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-gray-700">{stage.stage}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div 
                      className={`${stage.color} h-6 rounded-full flex items-center justify-end pr-2`}
                      style={{ width: `${stage.percentage}%` }}
                    >
                      <span className="text-white text-xs font-medium">{stage.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-20 text-sm font-medium text-gray-900 text-right">
                    {stage.count.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-persian-green-600" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">Strong Performance</span>
                </div>
                <p className="text-sm text-green-700">
                  Mobile traffic increased by 23% this week. Consider optimizing mobile checkout flow.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Attention Needed</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Cart abandonment rate is 68%. Implement exit-intent popups or email reminders.
                </p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Opportunity</span>
                </div>
                <p className="text-sm text-blue-700">
                  Pottery category shows 45% growth. Consider expanding product range.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}