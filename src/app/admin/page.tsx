'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Smartphone, 
  Globe, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MessageSquare,
  Star,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  Legend
} from 'recharts'

// Mock data for demonstration
const revenueData = [
  { month: 'Jan', web: 12000, mobile: 18000, total: 30000 },
  { month: 'Feb', web: 15000, mobile: 22000, total: 37000 },
  { month: 'Mar', web: 18000, mobile: 28000, total: 46000 },
  { month: 'Apr', web: 22000, mobile: 35000, total: 57000 },
  { month: 'May', web: 25000, mobile: 42000, total: 67000 },
  { month: 'Jun', web: 28000, mobile: 48000, total: 76000 },
]

const platformData = [
  { name: 'Mobile App', value: 65, color: '#2A9D8F' },
  { name: 'Web Platform', value: 25, color: '#9D7A6D' },
  { name: 'Social Media', value: 10, color: '#F4A261' }
]

const artisanActivity = [
  { day: 'Mon', active: 45, new: 8 },
  { day: 'Tue', active: 52, new: 12 },
  { day: 'Wed', active: 48, new: 6 },
  { day: 'Thu', active: 61, new: 15 },
  { day: 'Fri', active: 55, new: 9 },
  { day: 'Sat', active: 67, new: 18 },
  { day: 'Sun', active: 43, new: 5 }
]

const recentAlerts = [
  { id: 1, message: 'New artisan verification pending', severity: 'medium', time: '2 hours ago' },
  { id: 2, message: 'Payment processing delay detected', severity: 'high', time: '4 hours ago' },
  { id: 3, message: 'Product review flagged for quality', severity: 'medium', time: '6 hours ago' },
  { id: 4, message: 'System backup completed successfully', severity: 'low', time: '8 hours ago' }
]

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Handler functions for dashboard actions
  const handleViewAllAlerts = () => {
    router.push('/admin/settings')
  }

  const handleVerifyArtisan = () => {
    router.push('/admin/artisans')
  }

  const handleReviewProducts = () => {
    router.push('/admin/products')
  }

  const handleProcessPayouts = () => {
    router.push('/admin/financial')
  }

  const handleMonitorChats = () => {
    router.push('/admin/support')
  }

  const handleRefreshData = async () => {
    try {
      console.log('Refreshing dashboard data...')
      // Simulate API call to refresh dashboard data
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Dashboard data refreshed successfully')
      // In a real app, you would fetch fresh data here
    } catch (error) {
      console.error('Failed to refresh dashboard data:', error)
    }
  }

  // Stat card navigation handlers
  const handleTotalArtisansClick = () => {
    router.push('/admin/artisans')
  }

  const handleActiveProductsClick = () => {
    router.push('/admin/products')
  }

  const handleMonthlyRevenueClick = () => {
    router.push('/admin/financial')
  }

  const handlePlatformGrowthClick = () => {
    router.push('/admin/analytics')
  }

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-graphite flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const StatCard = ({ title, value, change, icon: Icon, color, onClick }: any) => (
    <Card 
      className="bg-gray-800 border-gray-700 text-white cursor-pointer hover:bg-gray-750 transition-colors" 
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? '+' : ''}{change}% from last month
            </p>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-graphite p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Craft&Art Marketplace Admin Dashboard</h1>
            <p className="text-gray-400">Craft Art Marketplace - Administrative Control</p>
          </div>
          <Button 
            onClick={handleRefreshData}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Artisans"
            value="1,247"
            change={12}
            icon={Users}
            color="bg-persian-green-500"
            onClick={handleTotalArtisansClick}
          />
          <StatCard
            title="Active Products"
            value="3,891"
            change={8}
            icon={Package}
            color="bg-copper-patina"
            onClick={handleActiveProductsClick}
          />
          <StatCard
            title="Monthly Revenue"
            value="$76,000"
            change={15}
            icon={DollarSign}
            color="bg-zanzibar-twilight"
            onClick={handleMonthlyRevenueClick}
          />
          <StatCard
            title="Platform Growth"
            value="23%"
            change={5}
            icon={TrendingUp}
            color="bg-gray-600"
            onClick={handlePlatformGrowthClick}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-persian-green-500" />
                Revenue Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stackId="1" 
                    stroke="#2A9D8F" 
                    fill="#2A9D8F" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mobile" 
                    stackId="2" 
                    stroke="#9D7A6D" 
                    fill="#9D7A6D" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Platform Distribution */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-persian-green-500" />
                Platform Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Activity and Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Artisan Activity */}
          <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-persian-green-500" />
                Artisan Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={artisanActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="active" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="new" fill="#9D7A6D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === 'high' ? 'bg-red-500' :
                      alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{alert.message}</p>
                      <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={handleViewAllAlerts}
              >
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                className="h-20 flex flex-col items-center justify-center gap-2 bg-persian-green-500 hover:bg-persian-green-600"
                onClick={handleVerifyArtisan}
              >
                <Users className="w-6 h-6" />
                <span className="text-sm">Verify Artisan</span>
              </Button>
              <Button 
                className="h-20 flex flex-col items-center justify-center gap-2 bg-copper-patina hover:bg-copper-patina/80"
                onClick={handleReviewProducts}
              >
                <Package className="w-6 h-6" />
                <span className="text-sm">Review Products</span>
              </Button>
              <Button 
                className="h-20 flex flex-col items-center justify-center gap-2 bg-zanzibar-twilight hover:bg-zanzibar-twilight/80"
                onClick={handleProcessPayouts}
              >
                <DollarSign className="w-6 h-6" />
                <span className="text-sm">Process Payouts</span>
              </Button>
              <Button 
                className="h-20 flex flex-col items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600"
                onClick={handleMonitorChats}
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm">Monitor Chats</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}