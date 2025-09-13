'use client'

import { useState, useEffect } from 'react'
import { Shield, AlertTriangle, CheckCircle, Eye, Ban, MessageSquare, Flag, Users, TrendingUp, Search, Filter, Clock, Star, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  receiverId: string
  receiverName: string
  message: string
  originalMessage: string
  translatedMessage: string
  language: 'swahili' | 'english'
  riskScore: number
  riskCategory: 'safe' | 'suspicious' | 'high_risk' | 'scam'
  detectedIssues: string[]
  timestamp: string
  status: 'active' | 'flagged' | 'reviewed' | 'resolved'
  reviewedBy?: string
  reviewedAt?: string
  action?: 'none' | 'warning' | 'suspension' | 'ban'
}

interface ProductAudit {
  id: string
  productId: string
  productName: string
  artisanId: string
  artisanName: string
  auditType: 'authenticity' | 'quality' | 'description' | 'pricing'
  status: 'pending' | 'approved' | 'rejected' | 'requires_changes'
  score: number
  issues: string[]
  images: string[]
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  notes?: string
}

interface CommunityReport {
  id: string
  reporterId: string
  reporterName: string
  reportedUserId: string
  reportedUserName: string
  reportType: 'scam' | 'fake_product' | 'inappropriate_content' | 'harassment' | 'other'
  description: string
  evidence: string[]
  status: 'open' | 'investigating' | 'resolved' | 'dismissed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  createdAt: string
  resolvedAt?: string
  assignedTo?: string
}

const chatMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'u1',
    senderName: 'John Mwalimu',
    receiverId: 'a1',
    receiverName: 'Amara Tingatinga',
    message: 'Hujambo, je unaweza kunipa bei ya chini kwa picha hii?',
    originalMessage: 'Hujambo, je unaweza kunipa bei ya chini kwa picha hii?',
    translatedMessage: 'Hello, can you give me a lower price for this picture?',
    language: 'swahili',
    riskScore: 15,
    riskCategory: 'safe',
    detectedIssues: [],
    timestamp: '2024-01-20T14:30:00Z',
    status: 'active'
  },
  {
    id: '2',
    senderId: 'u2',
    senderName: 'Sarah Kimani',
    receiverId: 'a2',
    receiverName: 'Jengo Makonde',
    message: 'Nitakupa pesa zaidi ikiwa utanipa namba yako ya simu na account ya benki',
    originalMessage: 'Nitakupa pesa zaidi ikiwa utanipa namba yako ya simu na account ya benki',
    translatedMessage: 'I will give you more money if you give me your phone number and bank account',
    language: 'swahili',
    riskScore: 85,
    riskCategory: 'high_risk',
    detectedIssues: ['Personal information request', 'Financial information request', 'Suspicious payment offer'],
    timestamp: '2024-01-20T13:15:00Z',
    status: 'flagged'
  },
  {
    id: '3',
    senderId: 'u3',
    senderName: 'David Mwanza',
    receiverId: 'a3',
    receiverName: 'Neema Makonde',
    message: 'Hii ni scam! Usinunue kitu chochote kutoka kwa mtu huyu!',
    originalMessage: 'Hii ni scam! Usinunue kitu chochote kutoka kwa mtu huyu!',
    translatedMessage: 'This is a scam! Do not buy anything from this person!',
    language: 'swahili',
    riskScore: 75,
    riskCategory: 'suspicious',
    detectedIssues: ['Scam accusation', 'Defamatory language'],
    timestamp: '2024-01-20T12:45:00Z',
    status: 'flagged'
  },
  {
    id: '4',
    senderId: 'u4',
    senderName: 'Grace Mollel',
    receiverId: 'a4',
    receiverName: 'Baraka Maasai',
    message: 'Asante sana kwa mkanda mzuri. Nitakuambia marafiki zangu.',
    originalMessage: 'Asante sana kwa mkanda mzuri. Nitakuambia marafiki zangu.',
    translatedMessage: 'Thank you very much for the beautiful necklace. I will tell my friends.',
    language: 'swahili',
    riskScore: 5,
    riskCategory: 'safe',
    detectedIssues: [],
    timestamp: '2024-01-20T11:20:00Z',
    status: 'active'
  },
  {
    id: '5',
    senderId: 'u5',
    senderName: 'Peter Mwangi',
    receiverId: 'a1',
    receiverName: 'Amara Tingatinga',
    message: 'Nipe pesa kwanza ndipo nitakutumia bidhaa. Hii ni njia salama zaidi.',
    originalMessage: 'Nipe pesa kwanza ndipo nitakutumia bidhaa. Hii ni njia salama zaidi.',
    translatedMessage: 'Give me money first then I will send you the goods. This is the safer way.',
    language: 'swahili',
    riskScore: 90,
    riskCategory: 'scam',
    detectedIssues: ['Advance payment request', 'Suspicious payment terms', 'Potential fraud'],
    timestamp: '2024-01-20T10:30:00Z',
    status: 'flagged'
  }
]

const productAudits: ProductAudit[] = [
  {
    id: '1',
    productId: 'p1',
    productName: 'Tingatinga Elephant Painting',
    artisanId: 'a1',
    artisanName: 'Amara Tingatinga',
    auditType: 'authenticity',
    status: 'approved',
    score: 95,
    issues: [],
    images: ['/audits/tingatinga-1.jpg', '/audits/tingatinga-2.jpg'],
    submittedAt: '2024-01-19T09:00:00Z',
    reviewedAt: '2024-01-19T14:30:00Z',
    reviewedBy: 'Admin User',
    notes: 'Authentic Tingatinga style with proper techniques and materials'
  },
  {
    id: '2',
    productId: 'p2',
    productName: 'Fake Makonde Sculpture',
    artisanId: 'a5',
    artisanName: 'Suspicious Seller',
    auditType: 'authenticity',
    status: 'rejected',
    score: 25,
    issues: ['Not authentic Makonde style', 'Machine-made marks detected', 'Incorrect wood type'],
    images: ['/audits/fake-makonde-1.jpg', '/audits/fake-makonde-2.jpg'],
    submittedAt: '2024-01-18T15:20:00Z',
    reviewedAt: '2024-01-19T10:15:00Z',
    reviewedBy: 'Expert Reviewer',
    notes: 'This appears to be a mass-produced item, not authentic Makonde carving'
  },
  {
    id: '3',
    productId: 'p3',
    productName: 'Kitenge Handbag',
    artisanId: 'a2',
    artisanName: 'Jengo Makonde',
    auditType: 'quality',
    status: 'requires_changes',
    score: 70,
    issues: ['Stitching quality needs improvement', 'Color description inaccurate'],
    images: ['/audits/kitenge-bag-1.jpg'],
    submittedAt: '2024-01-20T08:30:00Z',
    reviewedBy: 'Quality Inspector',
    notes: 'Good overall quality but needs minor improvements'
  },
  {
    id: '4',
    productId: 'p4',
    productName: 'Maasai Beaded Jewelry',
    artisanId: 'a4',
    artisanName: 'Baraka Maasai',
    auditType: 'authenticity',
    status: 'pending',
    score: 0,
    issues: [],
    images: ['/audits/maasai-jewelry-1.jpg', '/audits/maasai-jewelry-2.jpg'],
    submittedAt: '2024-01-20T16:00:00Z'
  }
]

const communityReports: CommunityReport[] = [
  {
    id: '1',
    reporterId: 'u1',
    reporterName: 'John Mwalimu',
    reportedUserId: 'a5',
    reportedUserName: 'Suspicious Seller',
    reportType: 'fake_product',
    description: 'This seller is selling fake Makonde sculptures that are clearly machine-made',
    evidence: ['/reports/evidence-1.jpg', '/reports/evidence-2.jpg'],
    status: 'investigating',
    priority: 'high',
    createdAt: '2024-01-19T12:00:00Z',
    assignedTo: 'Admin User'
  },
  {
    id: '2',
    reporterId: 'u2',
    reporterName: 'Sarah Kimani',
    reportedUserId: 'u5',
    reportedUserName: 'Peter Mwangi',
    reportType: 'scam',
    description: 'This user asked for advance payment and never delivered the product',
    evidence: ['/reports/chat-screenshot.jpg'],
    status: 'resolved',
    priority: 'critical',
    createdAt: '2024-01-18T14:30:00Z',
    resolvedAt: '2024-01-19T09:15:00Z',
    assignedTo: 'Security Team'
  },
  {
    id: '3',
    reporterId: 'u3',
    reporterName: 'David Mwanza',
    reportedUserId: 'a6',
    reportedUserName: 'Fake Artisan',
    reportType: 'inappropriate_content',
    description: 'Using inappropriate images and language in product descriptions',
    evidence: ['/reports/inappropriate-content.jpg'],
    status: 'open',
    priority: 'medium',
    createdAt: '2024-01-20T10:45:00Z'
  }
]

const riskTrendData = [
  { date: '2024-01-15', safe: 45, suspicious: 8, high_risk: 3, scam: 1 },
  { date: '2024-01-16', safe: 52, suspicious: 12, high_risk: 5, scam: 2 },
  { date: '2024-01-17', safe: 38, suspicious: 15, high_risk: 7, scam: 3 },
  { date: '2024-01-18', safe: 41, suspicious: 10, high_risk: 4, scam: 1 },
  { date: '2024-01-19', safe: 48, suspicious: 9, high_risk: 6, scam: 2 },
  { date: '2024-01-20', safe: 43, suspicious: 11, high_risk: 5, scam: 1 }
]

const auditStatusData = [
  { name: 'Approved', value: 65, color: '#2A9D8F' },
  { name: 'Pending', value: 20, color: '#F4A261' },
  { name: 'Rejected', value: 10, color: '#E76F51' },
  { name: 'Needs Changes', value: 5, color: '#E9C46A' }
]

const reportTypeData = [
  { name: 'Scam', count: 15 },
  { name: 'Fake Product', count: 12 },
  { name: 'Inappropriate Content', count: 8 },
  { name: 'Harassment', count: 5 },
  { name: 'Other', count: 3 }
]

export default function CommunityMonitorPage() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredMessages = chatMessages.filter(message => {
    const matchesSearch = message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.translatedMessage.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === 'all' || message.riskCategory === riskFilter
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter
    return matchesSearch && matchesRisk && matchesStatus
  })

  const getRiskColor = (category: string) => {
    switch (category) {
      case 'safe': return 'text-green-600 bg-green-100'
      case 'suspicious': return 'text-yellow-600 bg-yellow-100'
      case 'high_risk': return 'text-orange-600 bg-orange-100'
      case 'scam': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'approved': case 'resolved': return 'text-green-600 bg-green-100'
      case 'pending': case 'investigating': case 'open': return 'text-yellow-600 bg-yellow-100'
      case 'flagged': case 'rejected': return 'text-red-600 bg-red-100'
      case 'reviewed': case 'requires_changes': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleReviewMessage = (messageId: string, action: string) => {
    console.log('Reviewing message:', messageId, 'Action:', action)
  }

  const handleReviewAudit = (auditId: string, decision: string) => {
    console.log('Reviewing audit:', auditId, 'Decision:', decision)
  }

  const handleResolveReport = (reportId: string) => {
    console.log('Resolving report:', reportId)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Community Safeguards</h1>
          <p className="text-gray-300">Monitor chat communications, product authenticity, and community reports</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-persian-green-500 hover:bg-persian-green-600 text-white">
            <Shield className="w-4 h-4 mr-2" />
            Security Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Messages Monitored</p>
                <p className="text-2xl font-bold text-white">{chatMessages.length}</p>
                <p className="text-green-400 text-sm flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% this week
                </p>
              </div>
              <div className="w-12 h-12 bg-persian-green-500/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-persian-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">High Risk Detected</p>
                <p className="text-2xl font-bold text-white">
                  {chatMessages.filter(m => m.riskCategory === 'high_risk' || m.riskCategory === 'scam').length}
                </p>
                <p className="text-red-400 text-sm">Requires attention</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Products Audited</p>
                <p className="text-2xl font-bold text-white">{productAudits.length}</p>
                <p className="text-green-400 text-sm">
                  {productAudits.filter(a => a.status === 'approved').length} approved
                </p>
              </div>
              <div className="w-12 h-12 bg-copper-patina/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-copper-patina" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Community Reports</p>
                <p className="text-2xl font-bold text-white">{communityReports.length}</p>
                <p className="text-yellow-400 text-sm">
                  {communityReports.filter(r => r.status === 'open' || r.status === 'investigating').length} active
                </p>
              </div>
              <div className="w-12 h-12 bg-zanzibar-twilight/20 rounded-lg flex items-center justify-center">
                <Flag className="w-6 h-6 text-zanzibar-twilight" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'chat_monitor', label: 'Chat Monitor' },
          { id: 'product_audits', label: 'Product Audits' },
          { id: 'reports', label: 'Community Reports' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === tab.id
                ? 'bg-persian-green-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Risk Detection Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={riskTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Line type="monotone" dataKey="safe" stroke="#2A9D8F" strokeWidth={2} />
                    <Line type="monotone" dataKey="suspicious" stroke="#F4A261" strokeWidth={2} />
                    <Line type="monotone" dataKey="high_risk" stroke="#E76F51" strokeWidth={2} />
                    <Line type="monotone" dataKey="scam" stroke="#DC2626" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Audit Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={auditStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {auditStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Report Types */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Report Types</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={reportTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="count" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'chat_monitor' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card className="bg-graphite border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search messages by sender, receiver, or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="safe">Safe</option>
                    <option value="suspicious">Suspicious</option>
                    <option value="high_risk">High Risk</option>
                    <option value="scam">Scam</option>
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="flagged">Flagged</option>
                    <option value="reviewed">Reviewed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages List */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Chat Messages ({filteredMessages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div key={message.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-persian-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {message.senderName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-white font-medium">{message.senderName}</span>
                          </div>
                          <span className="text-gray-400">→</span>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-copper-patina rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {message.receiverName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-white font-medium">{message.receiverName}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Original (Swahili):</p>
                            <p className="text-white bg-gray-900 p-3 rounded-lg">{message.originalMessage}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Translation (English):</p>
                            <p className="text-white bg-gray-900 p-3 rounded-lg">{message.translatedMessage}</p>
                          </div>
                        </div>
                        {message.detectedIssues.length > 0 && (
                          <div className="mb-4">
                            <p className="text-gray-400 text-sm mb-2">Detected Issues:</p>
                            <div className="flex flex-wrap gap-2">
                              {message.detectedIssues.map((issue, index) => (
                                <span key={index} className="px-2 py-1 bg-red-600/20 text-red-400 rounded-full text-xs">
                                  {issue}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(message.riskCategory)}`}>
                          {message.riskCategory.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(message.status)}`}>
                          {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                        </span>
                        <div className="text-right">
                          <p className="text-white font-medium">Risk: {message.riskScore}%</p>
                          <p className="text-gray-400 text-sm">{formatDate(message.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                    
                    {message.status === 'flagged' && (
                      <div className="flex gap-2 pt-4 border-t border-gray-700">
                        <Button 
                          size="sm"
                          onClick={() => handleReviewMessage(message.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleReviewMessage(message.id, 'warning')}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Warning
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleReviewMessage(message.id, 'ban')}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Ban className="w-3 h-3 mr-1" />
                          Ban User
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'product_audits' && (
        <div className="space-y-6">
          {/* Product Audits */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Product Authenticity Audits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productAudits.map((audit) => (
                  <div key={audit.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-white font-medium text-lg">{audit.productName}</h3>
                          <span className="px-2 py-1 bg-persian-green-500/20 text-persian-green-400 rounded-full text-xs font-medium">
                            {audit.auditType.charAt(0).toUpperCase() + audit.auditType.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-2">by {audit.artisanName}</p>
                        <p className="text-gray-300 text-sm mb-4">Submitted: {formatDate(audit.submittedAt)}</p>
                        
                        {audit.issues.length > 0 && (
                          <div className="mb-4">
                            <p className="text-gray-400 text-sm mb-2">Issues Found:</p>
                            <div className="space-y-1">
                              {audit.issues.map((issue, index) => (
                                <p key={index} className="text-red-400 text-sm flex items-center gap-2">
                                  <AlertTriangle className="w-3 h-3" />
                                  {issue}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {audit.notes && (
                          <div className="mb-4">
                            <p className="text-gray-400 text-sm mb-1">Review Notes:</p>
                            <p className="text-gray-300 text-sm bg-gray-900 p-3 rounded-lg">{audit.notes}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(audit.status)}`}>
                          {audit.status.replace('_', ' ').charAt(0).toUpperCase() + audit.status.replace('_', ' ').slice(1)}
                        </span>
                        {audit.score > 0 && (
                          <div className="text-right">
                            <p className="text-white font-medium">Score: {audit.score}%</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < Math.floor(audit.score / 20) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {audit.reviewedAt && audit.reviewedBy && (
                          <div className="text-right text-xs text-gray-400">
                            <p>Reviewed by {audit.reviewedBy}</p>
                            <p>{formatDate(audit.reviewedAt)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {audit.status === 'pending' && (
                      <div className="flex gap-2 pt-4 border-t border-gray-700">
                        <Button 
                          size="sm"
                          onClick={() => handleReviewAudit(audit.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleReviewAudit(audit.id, 'changes')}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          Request Changes
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleReviewAudit(audit.id, 'reject')}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <ThumbsDown className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Images
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'reports' && (
        <div className="space-y-6">
          {/* Community Reports */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Community Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communityReports.map((report) => (
                  <div key={report.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-white font-medium text-lg">
                            {report.reportType.replace('_', ' ').charAt(0).toUpperCase() + report.reportType.replace('_', ' ').slice(1)} Report
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(report.priority)}`}>
                            {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)} Priority
                          </span>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-gray-400 text-sm">Reporter: <span className="text-white">{report.reporterName}</span></p>
                            <p className="text-gray-400 text-sm">Reported User: <span className="text-white">{report.reportedUserName}</span></p>
                            <p className="text-gray-400 text-sm">Created: <span className="text-white">{formatDate(report.createdAt)}</span></p>
                            {report.assignedTo && (
                              <p className="text-gray-400 text-sm">Assigned to: <span className="text-white">{report.assignedTo}</span></p>
                            )}
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm mb-2">Description:</p>
                            <p className="text-white text-sm bg-gray-900 p-3 rounded-lg">{report.description}</p>
                          </div>
                        </div>
                        {report.evidence.length > 0 && (
                          <div className="mb-4">
                            <p className="text-gray-400 text-sm mb-2">Evidence: {report.evidence.length} file(s)</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                        {report.resolvedAt && (
                          <p className="text-gray-400 text-xs">Resolved: {formatDate(report.resolvedAt)}</p>
                        )}
                      </div>
                    </div>
                    
                    {(report.status === 'open' || report.status === 'investigating') && (
                      <div className="flex gap-2 pt-4 border-t border-gray-700">
                        <Button 
                          size="sm"
                          onClick={() => handleResolveReport(report.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Resolve
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Evidence
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Users className="w-3 h-3 mr-1" />
                          Contact Users
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}