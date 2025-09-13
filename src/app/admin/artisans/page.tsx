'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Filter, Plus, Eye, Edit, Ban, CheckCircle, AlertTriangle, Users, Star, TrendingUp, MapPin, Phone, Mail, Calendar, Camera, FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

interface Artisan {
  id: string
  name: string
  email: string
  phone: string
  location: string
  joinDate: string
  status: 'active' | 'pending' | 'suspended' | 'verified'
  verificationStatus: 'verified' | 'pending' | 'rejected'
  nidaId: string
  profileImage: string
  specialties: string[]
  rating: number
  totalProducts: number
  totalSales: number
  revenue: number
  lastActive: string
  subscriptionStatus: 'active' | 'expired' | 'trial'
  subscriptionExpiry: string
  documentsSubmitted: boolean
  profileCompleteness: number
}

const artisans: Artisan[] = [
  {
    id: '1',
    name: 'Amara Tingatinga',
    email: 'amara@email.com',
    phone: '+255 712 345 678',
    location: 'Dar es Salaam',
    joinDate: '2024-01-15',
    status: 'active',
    verificationStatus: 'verified',
    nidaId: 'NIDA123456789',
    profileImage: '/artisans/amara.jpg',
    specialties: ['Tingatinga Painting', 'Canvas Art'],
    rating: 4.8,
    totalProducts: 45,
    totalSales: 127,
    revenue: 2850000,
    lastActive: '2024-01-20',
    subscriptionStatus: 'active',
    subscriptionExpiry: '2024-07-15',
    documentsSubmitted: true,
    profileCompleteness: 95
  },
  {
    id: '2',
    name: 'Jengo Makonde',
    email: 'jengo@email.com',
    phone: '+255 713 456 789',
    location: 'Arusha',
    joinDate: '2024-01-10',
    status: 'active',
    verificationStatus: 'verified',
    nidaId: 'NIDA987654321',
    profileImage: '/artisans/jengo.jpg',
    specialties: ['Kitenge Fashion', 'Handbags'],
    rating: 4.9,
    totalProducts: 32,
    totalSales: 89,
    revenue: 1950000,
    lastActive: '2024-01-19',
    subscriptionStatus: 'active',
    subscriptionExpiry: '2024-06-10',
    documentsSubmitted: true,
    profileCompleteness: 88
  },
  {
    id: '3',
    name: 'Neema Makonde',
    email: 'neema@email.com',
    phone: '+255 714 567 890',
    location: 'Mtwara',
    joinDate: '2024-01-08',
    status: 'pending',
    verificationStatus: 'pending',
    nidaId: 'NIDA456789123',
    profileImage: '/artisans/neema.jpg',
    specialties: ['Wood Carving', 'Sculptures'],
    rating: 5.0,
    totalProducts: 18,
    totalSales: 34,
    revenue: 1200000,
    lastActive: '2024-01-18',
    subscriptionStatus: 'trial',
    subscriptionExpiry: '2024-02-08',
    documentsSubmitted: false,
    profileCompleteness: 65
  },
  {
    id: '4',
    name: 'Baraka Maasai',
    email: 'baraka@email.com',
    phone: '+255 715 678 901',
    location: 'Ngorongoro',
    joinDate: '2024-01-05',
    status: 'active',
    verificationStatus: 'verified',
    nidaId: 'NIDA789123456',
    profileImage: '/artisans/baraka.jpg',
    specialties: ['Beadwork', 'Jewelry'],
    rating: 4.7,
    totalProducts: 67,
    totalSales: 156,
    revenue: 980000,
    lastActive: '2024-01-20',
    subscriptionStatus: 'active',
    subscriptionExpiry: '2024-08-05',
    documentsSubmitted: true,
    profileCompleteness: 92
  },
  {
    id: '5',
    name: 'Fatuma Zanzibari',
    email: 'fatuma@email.com',
    phone: '+255 716 789 012',
    location: 'Stone Town',
    joinDate: '2024-01-03',
    status: 'suspended',
    verificationStatus: 'rejected',
    nidaId: 'NIDA321654987',
    profileImage: '/artisans/fatuma.jpg',
    specialties: ['Henna Art', 'Spice Products'],
    rating: 4.6,
    totalProducts: 23,
    totalSales: 78,
    revenue: 650000,
    lastActive: '2024-01-15',
    subscriptionStatus: 'expired',
    subscriptionExpiry: '2024-01-03',
    documentsSubmitted: true,
    profileCompleteness: 78
  }
]

const verificationData = [
  { name: 'Verified', value: 3, color: '#2A9D8F' },
  { name: 'Pending', value: 1, color: '#F4A261' },
  { name: 'Rejected', value: 1, color: '#E76F51' }
]

const subscriptionData = [
  { name: 'Active', value: 3, color: '#2A9D8F' },
  { name: 'Trial', value: 1, color: '#E9C46A' },
  { name: 'Expired', value: 1, color: '#E76F51' }
]

const performanceData = [
  { month: 'Sep', sales: 45, revenue: 1200000 },
  { month: 'Oct', sales: 67, revenue: 1800000 },
  { month: 'Nov', sales: 89, revenue: 2400000 },
  { month: 'Dec', sales: 123, revenue: 3200000 },
  { month: 'Jan', sales: 156, revenue: 4100000 }
]

export default function ArtisanManagementPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filteredArtisans = artisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artisan.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artisan.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || artisan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'suspended': return 'text-red-600 bg-red-100'
      case 'verified': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSubscriptionColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'trial': return 'text-blue-600 bg-blue-100'
      case 'expired': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
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

  const handleViewArtisan = (artisan: Artisan) => {
    setSelectedArtisan(artisan)
    setShowModal(true)
  }

  const handleVerifyArtisan = async (artisanId: string) => {
    try {
      // Update artisan verification status
      const updatedArtisans = artisans.map(artisan => 
        artisan.id === artisanId 
          ? { ...artisan, verificationStatus: 'verified' as const, status: 'active' as const }
          : artisan
      )
      console.log('Artisan verified successfully:', artisanId)
      // In a real app, you would make an API call here
      // await verifyArtisanAPI(artisanId)
      alert('Artisan verified successfully!')
    } catch (error) {
      console.error('Failed to verify artisan:', error)
      alert('Failed to verify artisan. Please try again.')
    }
  }

  const handleSuspendArtisan = async (artisanId: string) => {
    if (confirm('Are you sure you want to suspend this artisan? This action can be reversed later.')) {
      try {
        // Update artisan status to suspended
        const updatedArtisans = artisans.map(artisan => 
          artisan.id === artisanId 
            ? { ...artisan, status: 'suspended' as const }
            : artisan
        )
        console.log('Artisan suspended:', artisanId)
        // In a real app, you would make an API call here
        // await suspendArtisanAPI(artisanId)
        alert('Artisan suspended successfully!')
      } catch (error) {
        console.error('Failed to suspend artisan:', error)
        alert('Failed to suspend artisan. Please try again.')
      }
    }
  }

  const handleEditArtisan = (artisanId: string) => {
    // Navigate to edit artisan page
    router.push(`/admin/artisans/${artisanId}/edit`)
  }

  const handleAddArtisan = () => {
    // Navigate to add new artisan page
    router.push('/admin/artisans/add')
  }

  const handleViewDocuments = (artisanId: string) => {
    // Navigate to artisan documents page
    router.push(`/admin/artisans/${artisanId}/documents`)
  }

  const handleDownloadReport = (artisanId: string) => {
    // Generate and download artisan report
    console.log('Downloading report for artisan:', artisanId)
    // In a real app, you would generate and download a PDF report
    alert('Report download started!')
  }

  const handleMoreFilters = () => {
    // Open advanced filters modal
    console.log('Opening advanced filters')
    alert('Advanced filters feature coming soon!')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Artisan Management</h1>
          <p className="text-gray-300">Monitor and manage artisan profiles, verification status, and performance</p>
        </div>
        <Button 
          className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
          onClick={handleAddArtisan}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Artisan
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Artisans</p>
                <p className="text-2xl font-bold text-white">{artisans.length}</p>
              </div>
              <div className="w-12 h-12 bg-persian-green-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-persian-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Verified Artisans</p>
                <p className="text-2xl font-bold text-white">
                  {artisans.filter(a => a.verificationStatus === 'verified').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Verification</p>
                <p className="text-2xl font-bold text-white">
                  {artisans.filter(a => a.verificationStatus === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(artisans.reduce((sum, a) => sum + a.revenue, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-copper-patina/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-copper-patina" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-graphite border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {verificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Subscription Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#2A9D8F" 
                  strokeWidth={2}
                  dot={{ fill: '#2A9D8F', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-graphite border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search artisans by name, location, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <Button 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={handleMoreFilters}
          >
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Artisans Table */}
      <Card className="bg-graphite border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Artisans ({filteredArtisans.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Artisan</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Verification</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Subscription</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Performance</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArtisans.map((artisan) => (
                  <tr key={artisan.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-persian-green-500 rounded-full flex items-center justify-center text-white font-medium">
                          {artisan.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-white font-medium">{artisan.name}</p>
                          <p className="text-gray-400 text-sm">{artisan.specialties.join(', ')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <p className="text-gray-300 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {artisan.email}
                        </p>
                        <p className="text-gray-400 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {artisan.phone}
                        </p>
                        <p className="text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {artisan.location}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(artisan.status)}`}>
                        {artisan.status.charAt(0).toUpperCase() + artisan.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(artisan.verificationStatus)}`}>
                          {artisan.verificationStatus.charAt(0).toUpperCase() + artisan.verificationStatus.slice(1)}
                        </span>
                        {artisan.nidaId && (
                          <p className="text-xs text-gray-400">NIDA: {artisan.nidaId}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(artisan.subscriptionStatus)}`}>
                          {artisan.subscriptionStatus.charAt(0).toUpperCase() + artisan.subscriptionStatus.slice(1)}
                        </span>
                        <p className="text-xs text-gray-400">
                          Expires: {formatDate(artisan.subscriptionExpiry)}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{artisan.rating}</span>
                        </div>
                        <p className="text-gray-400">{artisan.totalProducts} products</p>
                        <p className="text-gray-400">{artisan.totalSales} sales</p>
                        <p className="text-persian-green-400 font-medium">{formatCurrency(artisan.revenue)}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          onClick={() => handleViewArtisan(artisan)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          onClick={() => handleEditArtisan(artisan.id)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        {artisan.verificationStatus === 'pending' && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleVerifyArtisan(artisan.id)}
                          >
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                        )}
                        {artisan.status === 'active' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                            onClick={() => handleSuspendArtisan(artisan.id)}
                          >
                            <Ban className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Artisan Detail Modal */}
      {showModal && selectedArtisan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-graphite rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Artisan Details</h2>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                ✕
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Section */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-persian-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      {selectedArtisan.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{selectedArtisan.name}</h3>
                    <p className="text-gray-400 mb-4">{selectedArtisan.specialties.join(', ')}</p>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4" />
                        <span>{selectedArtisan.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4" />
                        <span>{selectedArtisan.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedArtisan.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {formatDate(selectedArtisan.joinDate)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{selectedArtisan.rating}</span>
                      </div>
                      <p className="text-gray-400 text-sm">Average Rating</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Details Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-gray-400 text-sm mb-1">Account Status</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedArtisan.status)}`}>
                        {selectedArtisan.status.charAt(0).toUpperCase() + selectedArtisan.status.slice(1)}
                      </span>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-gray-400 text-sm mb-1">Verification</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedArtisan.verificationStatus)}`}>
                        {selectedArtisan.verificationStatus.charAt(0).toUpperCase() + selectedArtisan.verificationStatus.slice(1)}
                      </span>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-gray-400 text-sm mb-1">Subscription</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(selectedArtisan.subscriptionStatus)}`}>
                        {selectedArtisan.subscriptionStatus.charAt(0).toUpperCase() + selectedArtisan.subscriptionStatus.slice(1)}
                      </span>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Performance Metrics */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-persian-green-400">{selectedArtisan.totalProducts}</p>
                        <p className="text-gray-400 text-sm">Products</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-persian-green-400">{selectedArtisan.totalSales}</p>
                        <p className="text-gray-400 text-sm">Sales</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-persian-green-400">{formatCurrency(selectedArtisan.revenue)}</p>
                        <p className="text-gray-400 text-sm">Revenue</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-persian-green-400">{selectedArtisan.profileCompleteness}%</p>
                        <p className="text-gray-400 text-sm">Profile Complete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Verification Details */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Verification Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">NIDA ID</span>
                        <span className="text-white font-mono">{selectedArtisan.nidaId}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Documents Submitted</span>
                        <span className={selectedArtisan.documentsSubmitted ? 'text-green-400' : 'text-red-400'}>
                          {selectedArtisan.documentsSubmitted ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Last Active</span>
                        <span className="text-white">{formatDate(selectedArtisan.lastActive)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-persian-green-500 hover:bg-persian-green-600"
                        onClick={() => handleViewDocuments(selectedArtisan.id)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Documents
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => handleDownloadReport(selectedArtisan.id)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}