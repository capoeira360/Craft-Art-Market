'use client'

import React, { useState } from 'react'
import { Activity, Clock, MapPin, Monitor, Smartphone, Tablet, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ActivityLog {
  id: string
  userId: string
  action: string
  description: string
  timestamp: string
  ipAddress: string
  userAgent: string
  location: string
  status: 'success' | 'warning' | 'error'
  metadata?: Record<string, any>
}

interface UserSession {
  id: string
  userId: string
  deviceType: 'desktop' | 'mobile' | 'tablet'
  browser: string
  os: string
  ipAddress: string
  location: string
  loginTime: string
  lastActivity: string
  isActive: boolean
  duration: string
}

interface UserActivityMonitorProps {
  userId: string
  userName: string
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: 'user1',
    action: 'LOGIN',
    description: 'User logged in successfully',
    timestamp: '2024-01-15T10:30:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    location: 'Nairobi, Kenya',
    status: 'success'
  },
  {
    id: '2',
    userId: 'user1',
    action: 'PRODUCT_VIEW',
    description: 'Viewed product: Maasai Beaded Necklace',
    timestamp: '2024-01-15T10:35:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    location: 'Nairobi, Kenya',
    status: 'success',
    metadata: { productId: 'prod_123', productName: 'Maasai Beaded Necklace' }
  },
  {
    id: '3',
    userId: 'user1',
    action: 'PURCHASE_ATTEMPT',
    description: 'Failed payment processing',
    timestamp: '2024-01-15T10:45:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    location: 'Nairobi, Kenya',
    status: 'error',
    metadata: { amount: 2500, currency: 'KES', errorCode: 'PAYMENT_DECLINED' }
  },
  {
    id: '4',
    userId: 'user1',
    action: 'PROFILE_UPDATE',
    description: 'Updated profile information',
    timestamp: '2024-01-15T11:00:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    location: 'Nairobi, Kenya',
    status: 'success',
    metadata: { fields: ['email', 'phone'] }
  },
  {
    id: '5',
    userId: 'user1',
    action: 'SUSPICIOUS_LOGIN',
    description: 'Login attempt from new location',
    timestamp: '2024-01-15T14:20:00Z',
    ipAddress: '41.90.64.15',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
    location: 'Mombasa, Kenya',
    status: 'warning',
    metadata: { riskScore: 75, reason: 'new_location' }
  }
]

const mockUserSessions: UserSession[] = [
  {
    id: 'session_1',
    userId: 'user1',
    deviceType: 'desktop',
    browser: 'Chrome 120.0',
    os: 'macOS 14.2',
    ipAddress: '192.168.1.100',
    location: 'Nairobi, Kenya',
    loginTime: '2024-01-15T10:30:00Z',
    lastActivity: '2024-01-15T11:15:00Z',
    isActive: true,
    duration: '45m'
  },
  {
    id: 'session_2',
    userId: 'user1',
    deviceType: 'mobile',
    browser: 'Safari 17.0',
    os: 'iOS 17.2',
    ipAddress: '41.90.64.15',
    location: 'Mombasa, Kenya',
    loginTime: '2024-01-15T14:20:00Z',
    lastActivity: '2024-01-15T14:35:00Z',
    isActive: false,
    duration: '15m'
  },
  {
    id: 'session_3',
    userId: 'user1',
    deviceType: 'tablet',
    browser: 'Chrome 120.0',
    os: 'Android 14',
    ipAddress: '197.248.15.45',
    location: 'Kisumu, Kenya',
    loginTime: '2024-01-14T16:45:00Z',
    lastActivity: '2024-01-14T18:30:00Z',
    isActive: false,
    duration: '1h 45m'
  }
]

const getDeviceIcon = (deviceType: string) => {
  switch (deviceType) {
    case 'mobile':
      return <Smartphone className="h-4 w-4" />
    case 'tablet':
      return <Tablet className="h-4 w-4" />
    default:
      return <Monitor className="h-4 w-4" />
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <CheckCircle className="h-4 w-4 text-gray-500" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'success':
      return <Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>
    case 'warning':
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
    case 'error':
      return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

const formatTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function UserActivityMonitor({ userId, userName }: UserActivityMonitorProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'sessions'>('activity')
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')

  const userActivities = mockActivityLogs.filter(log => log.userId === userId)
  const userSessions = mockUserSessions.filter(session => session.userId === userId)

  const handleTerminateSession = (sessionId: string) => {
    console.log('Terminating session:', sessionId)
    // Implementation for terminating user session
  }

  const handleExportLogs = () => {
    console.log('Exporting activity logs for user:', userId)
    // Implementation for exporting activity logs
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-persian-green-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Activity Monitor - {userName}
            </h2>
            <p className="text-sm text-gray-600">
              Track user activities and session management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <Button onClick={handleExportLogs} variant="outline" size="sm">
            Export Logs
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('activity')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'activity'
                ? 'border-persian-green-500 text-persian-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Activity Logs ({userActivities.length})
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sessions'
                ? 'border-persian-green-500 text-persian-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Active Sessions ({userSessions.filter(s => s.isActive).length})
          </button>
        </nav>
      </div>

      {/* Activity Logs Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          {userActivities.map((activity) => (
            <Card key={activity.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{activity.action}</h4>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(activity.timestamp)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {activity.location}
                      </div>
                      <span>IP: {activity.ipAddress}</span>
                    </div>
                    {activity.metadata && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                        <strong>Details:</strong>
                        <pre className="mt-1 text-gray-600">
                          {JSON.stringify(activity.metadata, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="space-y-4">
          {userSessions.map((session) => (
            <Card key={session.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getDeviceIcon(session.deviceType)}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">
                        {session.browser} on {session.os}
                      </h4>
                      {session.isActive ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {session.location}
                      </div>
                      <span>IP: {session.ipAddress}</span>
                      <span>Duration: {session.duration}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span>Login: {formatTimestamp(session.loginTime)}</span>
                      <span>Last Activity: {formatTimestamp(session.lastActivity)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {session.isActive && (
                    <Button
                      onClick={() => handleTerminateSession(session.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Terminate
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {((activeTab === 'activity' && userActivities.length === 0) ||
        (activeTab === 'sessions' && userSessions.length === 0)) && (
        <Card className="p-8 text-center">
          <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeTab === 'activity' ? 'Activity' : 'Sessions'} Found
          </h3>
          <p className="text-gray-600">
            {activeTab === 'activity'
              ? 'No activity logs found for the selected time range.'
              : 'No active sessions found for this user.'}
          </p>
        </Card>
      )}
    </div>
  )
}