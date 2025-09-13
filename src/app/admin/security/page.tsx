'use client'

import { useState, useEffect } from 'react'
import { Shield, Lock, AlertTriangle, Eye, Ban, Key, Clock, Globe, User, Activity, Settings, Download, RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

interface SecurityEvent {
  id: string
  type: 'login_attempt' | 'failed_login' | 'session_timeout' | 'ip_blocked' | 'suspicious_activity' | 'data_access' | 'permission_change'
  userId?: string
  username?: string
  ipAddress: string
  userAgent: string
  location: string
  timestamp: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'resolved' | 'investigating' | 'blocked' | 'allowed'
  description: string
  details?: any
}

interface ActiveSession {
  id: string
  userId: string
  username: string
  role: string
  ipAddress: string
  location: string
  userAgent: string
  loginTime: string
  lastActivity: string
  expiresAt: string
  status: 'active' | 'idle' | 'expired'
}

interface IPWhitelistEntry {
  id: string
  ipAddress: string
  description: string
  addedBy: string
  addedAt: string
  lastUsed?: string
  status: 'active' | 'inactive'
  accessLevel: 'full' | 'read_only' | 'restricted'
}

interface SecuritySettings {
  sessionTimeout: number // minutes
  maxFailedAttempts: number
  lockoutDuration: number // minutes
  requireMFA: boolean
  ipWhitelistEnabled: boolean
  passwordPolicy: {
    minLength: number
    requireUppercase: boolean
    requireLowercase: boolean
    requireNumbers: boolean
    requireSpecialChars: boolean
    maxAge: number // days
  }
  auditLogRetention: number // days
}

const securityEvents: SecurityEvent[] = [
  {
    id: '1',
    type: 'failed_login',
    username: 'admin@example.com',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    location: 'Dar es Salaam, Tanzania',
    timestamp: '2024-01-20T15:30:00Z',
    severity: 'medium',
    status: 'investigating',
    description: 'Multiple failed login attempts detected'
  },
  {
    id: '2',
    type: 'suspicious_activity',
    userId: 'u1',
    username: 'john.admin',
    ipAddress: '10.0.0.50',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    location: 'Arusha, Tanzania',
    timestamp: '2024-01-20T14:15:00Z',
    severity: 'high',
    status: 'resolved',
    description: 'Unusual data access pattern detected'
  },
  {
    id: '3',
    type: 'ip_blocked',
    ipAddress: '203.0.113.45',
    userAgent: 'curl/7.68.0',
    location: 'Unknown',
    timestamp: '2024-01-20T13:45:00Z',
    severity: 'high',
    status: 'blocked',
    description: 'IP address blocked due to automated attack attempts'
  },
  {
    id: '4',
    type: 'session_timeout',
    userId: 'u2',
    username: 'sarah.manager',
    ipAddress: '192.168.1.25',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    location: 'Dodoma, Tanzania',
    timestamp: '2024-01-20T12:00:00Z',
    severity: 'low',
    status: 'resolved',
    description: 'Session automatically terminated due to inactivity'
  },
  {
    id: '5',
    type: 'login_attempt',
    userId: 'u3',
    username: 'david.analyst',
    ipAddress: '172.16.0.10',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    location: 'Mwanza, Tanzania',
    timestamp: '2024-01-20T11:30:00Z',
    severity: 'low',
    status: 'allowed',
    description: 'Successful login from whitelisted IP'
  }
]

const activeSessions: ActiveSession[] = [
  {
    id: 's1',
    userId: 'u1',
    username: 'john.admin',
    role: 'Super Admin',
    ipAddress: '10.0.0.50',
    location: 'Arusha, Tanzania',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    loginTime: '2024-01-20T09:00:00Z',
    lastActivity: '2024-01-20T15:45:00Z',
    expiresAt: '2024-01-20T17:00:00Z',
    status: 'active'
  },
  {
    id: 's2',
    userId: 'u2',
    username: 'sarah.manager',
    role: 'Manager',
    ipAddress: '192.168.1.25',
    location: 'Dodoma, Tanzania',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    loginTime: '2024-01-20T10:30:00Z',
    lastActivity: '2024-01-20T15:30:00Z',
    expiresAt: '2024-01-20T16:30:00Z',
    status: 'active'
  },
  {
    id: 's3',
    userId: 'u3',
    username: 'david.analyst',
    role: 'Analyst',
    ipAddress: '172.16.0.10',
    location: 'Mwanza, Tanzania',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    loginTime: '2024-01-20T11:30:00Z',
    lastActivity: '2024-01-20T14:00:00Z',
    expiresAt: '2024-01-20T17:30:00Z',
    status: 'idle'
  }
]

const ipWhitelist: IPWhitelistEntry[] = [
  {
    id: 'ip1',
    ipAddress: '10.0.0.0/24',
    description: 'Office Network - Arusha',
    addedBy: 'john.admin',
    addedAt: '2024-01-15T10:00:00Z',
    lastUsed: '2024-01-20T15:45:00Z',
    status: 'active',
    accessLevel: 'full'
  },
  {
    id: 'ip2',
    ipAddress: '192.168.1.0/24',
    description: 'Office Network - Dodoma',
    addedBy: 'sarah.manager',
    addedAt: '2024-01-10T14:30:00Z',
    lastUsed: '2024-01-20T15:30:00Z',
    status: 'active',
    accessLevel: 'full'
  },
  {
    id: 'ip3',
    ipAddress: '172.16.0.0/24',
    description: 'Remote Office - Mwanza',
    addedBy: 'john.admin',
    addedAt: '2024-01-12T09:15:00Z',
    lastUsed: '2024-01-20T14:00:00Z',
    status: 'active',
    accessLevel: 'read_only'
  },
  {
    id: 'ip4',
    ipAddress: '203.0.113.100',
    description: 'VPN Gateway - Backup',
    addedBy: 'john.admin',
    addedAt: '2024-01-08T16:45:00Z',
    status: 'inactive',
    accessLevel: 'restricted'
  }
]

const securitySettings: SecuritySettings = {
  sessionTimeout: 15,
  maxFailedAttempts: 3,
  lockoutDuration: 30,
  requireMFA: true,
  ipWhitelistEnabled: true,
  passwordPolicy: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90
  },
  auditLogRetention: 365
}

const securityTrendData = [
  { date: '2024-01-15', login_attempts: 45, failed_logins: 3, blocked_ips: 1, suspicious_activity: 0 },
  { date: '2024-01-16', login_attempts: 52, failed_logins: 5, blocked_ips: 2, suspicious_activity: 1 },
  { date: '2024-01-17', login_attempts: 38, failed_logins: 8, blocked_ips: 3, suspicious_activity: 2 },
  { date: '2024-01-18', login_attempts: 41, failed_logins: 4, blocked_ips: 1, suspicious_activity: 0 },
  { date: '2024-01-19', login_attempts: 48, failed_logins: 6, blocked_ips: 2, suspicious_activity: 1 },
  { date: '2024-01-20', login_attempts: 43, failed_logins: 7, blocked_ips: 4, suspicious_activity: 3 }
]

const threatTypeData = [
  { name: 'Failed Logins', value: 35, color: '#E76F51' },
  { name: 'Blocked IPs', value: 25, color: '#F4A261' },
  { name: 'Suspicious Activity', value: 20, color: '#E9C46A' },
  { name: 'Session Timeouts', value: 15, color: '#2A9D8F' },
  { name: 'Other', value: 5, color: '#264653' }
]

const accessLevelData = [
  { name: 'Full Access', count: 15 },
  { name: 'Read Only', count: 8 },
  { name: 'Restricted', count: 3 }
]

export default function SecurityPage() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [showAddIPModal, setShowAddIPModal] = useState(false)
  const [newIPAddress, setNewIPAddress] = useState('')
  const [newIPDescription, setNewIPDescription] = useState('')
  const [newIPAccessLevel, setNewIPAccessLevel] = useState('read_only')

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'allowed': case 'resolved': return 'text-green-600 bg-green-100'
      case 'idle': case 'investigating': return 'text-yellow-600 bg-yellow-100'
      case 'blocked': case 'expired': return 'text-red-600 bg-red-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'full': return 'text-green-600 bg-green-100'
      case 'read_only': return 'text-yellow-600 bg-yellow-100'
      case 'restricted': return 'text-red-600 bg-red-100'
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

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  const handleTerminateSession = (sessionId: string) => {
    console.log('Terminating session:', sessionId)
  }

  const handleBlockIP = (ipAddress: string) => {
    console.log('Blocking IP:', ipAddress)
  }

  const handleAddIPToWhitelist = () => {
    if (newIPAddress && newIPDescription) {
      console.log('Adding IP to whitelist:', { 
        ip: newIPAddress, 
        description: newIPDescription, 
        accessLevel: newIPAccessLevel 
      })
      setNewIPAddress('')
      setNewIPDescription('')
      setNewIPAccessLevel('read_only')
      setShowAddIPModal(false)
    }
  }

  const handleRemoveFromWhitelist = (ipId: string) => {
    console.log('Removing IP from whitelist:', ipId)
  }

  const handleExportSecurityLog = () => {
    console.log('Exporting security log')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Security Center</h1>
          <p className="text-gray-300">Monitor access, manage sessions, and configure security policies</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleExportSecurityLog}
            className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Log
          </Button>
          <Button 
            onClick={() => setShowAddIPModal(true)}
            className="bg-zanzibar-twilight hover:bg-zanzibar-twilight/80 text-white"
          >
            <Globe className="w-4 h-4 mr-2" />
            Add IP
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Sessions</p>
                <p className="text-2xl font-bold text-white">
                  {activeSessions.filter(s => s.status === 'active').length}
                </p>
                <p className="text-green-400 text-sm">
                  {activeSessions.filter(s => s.status === 'idle').length} idle
                </p>
              </div>
              <div className="w-12 h-12 bg-persian-green-500/20 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-persian-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Security Events</p>
                <p className="text-2xl font-bold text-white">{securityEvents.length}</p>
                <p className="text-red-400 text-sm">
                  {securityEvents.filter(e => e.severity === 'high' || e.severity === 'critical').length} high priority
                </p>
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
                <p className="text-gray-400 text-sm">Whitelisted IPs</p>
                <p className="text-2xl font-bold text-white">
                  {ipWhitelist.filter(ip => ip.status === 'active').length}
                </p>
                <p className="text-copper-patina text-sm">
                  {ipWhitelist.filter(ip => ip.accessLevel === 'full').length} full access
                </p>
              </div>
              <div className="w-12 h-12 bg-copper-patina/20 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-copper-patina" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Session Timeout</p>
                <p className="text-2xl font-bold text-white">{securitySettings.sessionTimeout}m</p>
                <p className="text-zanzibar-twilight text-sm">Auto logout</p>
              </div>
              <div className="w-12 h-12 bg-zanzibar-twilight/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-zanzibar-twilight" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'events', label: 'Security Events' },
          { id: 'sessions', label: 'Active Sessions' },
          { id: 'whitelist', label: 'IP Whitelist' },
          { id: 'settings', label: 'Security Settings' }
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
                <CardTitle className="text-white">Security Activity Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={securityTrendData}>
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
                    <Line type="monotone" dataKey="login_attempts" stroke="#2A9D8F" strokeWidth={2} name="Login Attempts" />
                    <Line type="monotone" dataKey="failed_logins" stroke="#E76F51" strokeWidth={2} name="Failed Logins" />
                    <Line type="monotone" dataKey="blocked_ips" stroke="#F4A261" strokeWidth={2} name="Blocked IPs" />
                    <Line type="monotone" dataKey="suspicious_activity" stroke="#E9C46A" strokeWidth={2} name="Suspicious Activity" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Threat Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={threatTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {threatTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Access Level Distribution */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">IP Access Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={accessLevelData}>
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

      {selectedTab === 'events' && (
        <div className="space-y-6">
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.map((event) => (
                  <div key={event.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-white font-medium text-lg">
                            {event.type.replace('_', ' ').charAt(0).toUpperCase() + event.type.replace('_', ' ').slice(1)}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(event.severity)}`}>
                            {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-4">{event.description}</p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">IP Address:</p>
                            <p className="text-white font-mono">{event.ipAddress}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Location:</p>
                            <p className="text-white">{event.location}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">User Agent:</p>
                            <p className="text-white truncate" title={event.userAgent}>
                              {event.userAgent.substring(0, 50)}...
                            </p>
                          </div>
                        </div>
                        {event.username && (
                          <div className="mt-2">
                            <p className="text-gray-400 text-sm">User: <span className="text-white">{event.username}</span></p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                        <p className="text-gray-400 text-sm">{formatDate(event.timestamp)}</p>
                      </div>
                    </div>
                    
                    {event.status === 'investigating' && (
                      <div className="flex gap-2 pt-4 border-t border-gray-700">
                        <Button 
                          size="sm"
                          onClick={() => handleBlockIP(event.ipAddress)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Ban className="w-3 h-3 mr-1" />
                          Block IP
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
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

      {selectedTab === 'sessions' && (
        <div className="space-y-6">
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Active User Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-10 h-10 bg-persian-green-500 rounded-full flex items-center justify-center text-white font-medium">
                            {session.username.split('.').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-white font-medium text-lg">{session.username}</h3>
                            <p className="text-gray-400 text-sm">{session.role}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">IP Address:</p>
                            <p className="text-white font-mono">{session.ipAddress}</p>
                            <p className="text-gray-400 text-xs">{session.location}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Login Time:</p>
                            <p className="text-white">{formatDate(session.loginTime)}</p>
                            <p className="text-gray-400 text-xs">Last Activity: {getTimeAgo(session.lastActivity)}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Expires:</p>
                            <p className="text-white">{formatDate(session.expiresAt)}</p>
                            <p className="text-gray-400 text-xs truncate" title={session.userAgent}>
                              {session.userAgent.substring(0, 30)}...
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </span>
                        <Button 
                          size="sm"
                          onClick={() => handleTerminateSession(session.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Terminate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'whitelist' && (
        <div className="space-y-6">
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">IP Whitelist Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ipWhitelist.map((entry) => (
                  <div key={entry.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-white font-medium text-lg font-mono">{entry.ipAddress}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAccessLevelColor(entry.accessLevel)}`}>
                            {entry.accessLevel.replace('_', ' ').charAt(0).toUpperCase() + entry.accessLevel.replace('_', ' ').slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-4">{entry.description}</p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Added By:</p>
                            <p className="text-white">{entry.addedBy}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Added:</p>
                            <p className="text-white">{formatDate(entry.addedAt)}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Last Used:</p>
                            <p className="text-white">
                              {entry.lastUsed ? getTimeAgo(entry.lastUsed) : 'Never'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(entry.status)}`}>
                          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        </span>
                        <Button 
                          size="sm"
                          onClick={() => handleRemoveFromWhitelist(entry.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'settings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Session Settings */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Session Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Max Failed Login Attempts
                  </label>
                  <input
                    type="number"
                    value={securitySettings.maxFailedAttempts}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Account Lockout Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.lockoutDuration}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="requireMFA"
                    checked={securitySettings.requireMFA}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                  <label htmlFor="requireMFA" className="text-gray-300 text-sm">
                    Require Multi-Factor Authentication
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="ipWhitelistEnabled"
                    checked={securitySettings.ipWhitelistEnabled}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                  <label htmlFor="ipWhitelistEnabled" className="text-gray-300 text-sm">
                    Enable IP Whitelisting
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Password Policy */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Password Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Minimum Length
                  </label>
                  <input
                    type="number"
                    value={securitySettings.passwordPolicy.minLength}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.passwordPolicy.maxAge}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="requireUppercase"
                      checked={securitySettings.passwordPolicy.requireUppercase}
                      className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                    />
                    <label htmlFor="requireUppercase" className="text-gray-300 text-sm">
                      Require Uppercase Letters
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="requireLowercase"
                      checked={securitySettings.passwordPolicy.requireLowercase}
                      className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                    />
                    <label htmlFor="requireLowercase" className="text-gray-300 text-sm">
                      Require Lowercase Letters
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="requireNumbers"
                      checked={securitySettings.passwordPolicy.requireNumbers}
                      className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                    />
                    <label htmlFor="requireNumbers" className="text-gray-300 text-sm">
                      Require Numbers
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="requireSpecialChars"
                      checked={securitySettings.passwordPolicy.requireSpecialChars}
                      className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                    />
                    <label htmlFor="requireSpecialChars" className="text-gray-300 text-sm">
                      Require Special Characters
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audit Settings */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Audit & Logging</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Audit Log Retention (days)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.auditLogRetention}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-end">
                  <Button className="bg-persian-green-500 hover:bg-persian-green-600 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add IP Modal */}
      {showAddIPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-graphite border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-white text-lg font-medium mb-4">Add IP to Whitelist</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  IP Address/CIDR
                </label>
                <input
                  type="text"
                  value={newIPAddress}
                  onChange={(e) => setNewIPAddress(e.target.value)}
                  placeholder="192.168.1.0/24 or 10.0.0.1"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={newIPDescription}
                  onChange={(e) => setNewIPDescription(e.target.value)}
                  placeholder="Office Network - Location"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Access Level
                </label>
                <select
                  value={newIPAccessLevel}
                  onChange={(e) => setNewIPAccessLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                >
                  <option value="read_only">Read Only</option>
                  <option value="full">Full Access</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button 
                onClick={handleAddIPToWhitelist}
                className="bg-persian-green-500 hover:bg-persian-green-600 text-white flex-1"
              >
                Add to Whitelist
              </Button>
              <Button 
                onClick={() => setShowAddIPModal(false)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}