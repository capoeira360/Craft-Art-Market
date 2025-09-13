'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Bell, 
  Check, 
  X, 
  Settings, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle,
  User,
  Package,
  DollarSign,
  Shield,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  category: 'system' | 'user' | 'order' | 'product' | 'security' | 'payment'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Order Received',
    message: 'Order #ORD-2024-001 has been placed by customer John Doe',
    type: 'success',
    category: 'order',
    priority: 'high',
    isRead: false,
    createdAt: '2024-01-22T10:30:00Z',
    actionUrl: '/admin/orders/ORD-2024-001'
  },
  {
    id: '2',
    title: 'Low Stock Alert',
    message: 'Persian Carpet "Royal Blue" has only 2 items remaining',
    type: 'warning',
    category: 'product',
    priority: 'medium',
    isRead: false,
    createdAt: '2024-01-22T09:15:00Z',
    actionUrl: '/admin/products/royal-blue-carpet'
  },
  {
    id: '3',
    title: 'Security Alert',
    message: 'Multiple failed login attempts detected',
    type: 'error',
    category: 'security',
    priority: 'urgent',
    isRead: false,
    createdAt: '2024-01-22T06:10:00Z',
    actionUrl: '/admin/security/logs'
  },
  {
    id: '4',
    title: 'New User Registration',
    message: 'Sarah Wilson has registered as a new customer',
    type: 'info',
    category: 'user',
    priority: 'low',
    isRead: true,
    createdAt: '2024-01-22T07:20:00Z',
    actionUrl: '/admin/users/sarah-wilson'
  },
  {
    id: '5',
    title: 'Payment Failed',
    message: 'Payment for order #ORD-2024-002 failed',
    type: 'error',
    category: 'payment',
    priority: 'high',
    isRead: true,
    createdAt: '2024-01-22T08:45:00Z',
    actionUrl: '/admin/orders/ORD-2024-002'
  }
]

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const unreadNotifications = notifications.filter(n => !n.isRead)
  const recentNotifications = notifications.slice(0, 5)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user':
        return <User className="h-3 w-3" />
      case 'order':
        return <Package className="h-3 w-3" />
      case 'payment':
        return <DollarSign className="h-3 w-3" />
      case 'product':
        return <Package className="h-3 w-3" />
      case 'security':
        return <Shield className="h-3 w-3" />
      default:
        return <Bell className="h-3 w-3" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const formatTimeAgo = (dateString: string) => {
    if (!isClient) return 'Loading...'
    
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white"
      >
        <Bell className="h-5 w-5" />
        {unreadNotifications.length > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
          </Badge>
        )}
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                {unreadNotifications.length > 0 && (
                  <Badge className="bg-red-100 text-red-800">
                    {unreadNotifications.length} new
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {unreadNotifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-green-600 hover:text-green-700"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Link href="/admin/notifications/settings">
                  <Button variant="ghost" size="sm" className="p-1">
                    <Settings className="h-4 w-4 text-gray-600" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                  className="p-1"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {recentNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                      onClick={() => {
                        if (!notification.isRead) {
                          markAsRead(notification.id)
                        }
                        if (notification.actionUrl) {
                          window.location.href = notification.actionUrl
                        }
                        setIsOpen(false)
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className={`text-sm font-medium truncate ${
                              !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1 text-gray-400">
                                {getCategoryIcon(notification.category)}
                                <span className="text-xs capitalize">{notification.category}</span>
                              </div>
                              
                              <Badge 
                                className={`text-xs ${
                                  notification.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                  notification.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                  notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {notification.priority}
                              </Badge>
                            </div>
                            
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(notification.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200">
              <Link href="/admin/settings">
                <Button 
                  variant="ghost" 
                  className="w-full text-sm text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => setIsOpen(false)}
                >
                  View All Notifications
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}