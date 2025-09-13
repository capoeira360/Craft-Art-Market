"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MessageSquare,
  User,
  Mail,
  Calendar
} from 'lucide-react'

interface SupportTicket {
  id: string
  subject: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  assignedTo?: string
  createdAt: string
  lastUpdate: string
  messages: number
}

interface LiveChatSession {
  id: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  status: 'active' | 'waiting' | 'ended'
  startTime: string
  lastMessage: string
  unreadCount: number
}

const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'Unable to complete order payment',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com'
    },
    status: 'open',
    priority: 'high',
    category: 'Payment Issues',
    assignedTo: 'John Doe',
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdate: '2024-01-15T14:20:00Z',
    messages: 3
  },
  {
    id: 'TKT-002',
    subject: 'Product quality concern',
    customer: {
      name: 'Mike Chen',
      email: 'mike.chen@email.com'
    },
    status: 'in-progress',
    priority: 'medium',
    category: 'Product Quality',
    assignedTo: 'Jane Smith',
    createdAt: '2024-01-14T16:45:00Z',
    lastUpdate: '2024-01-15T09:15:00Z',
    messages: 5
  },
  {
    id: 'TKT-003',
    subject: 'Shipping delay inquiry',
    customer: {
      name: 'Emily Davis',
      email: 'emily.d@email.com'
    },
    status: 'resolved',
    priority: 'low',
    category: 'Shipping',
    assignedTo: 'Bob Wilson',
    createdAt: '2024-01-13T11:20:00Z',
    lastUpdate: '2024-01-14T15:30:00Z',
    messages: 2
  }
]

const mockChatSessions: LiveChatSession[] = [
  {
    id: 'CHAT-001',
    customer: {
      name: 'Alex Thompson',
      email: 'alex.t@email.com'
    },
    status: 'active',
    startTime: '2024-01-15T15:30:00Z',
    lastMessage: 'Can you help me with my order?',
    unreadCount: 2
  },
  {
    id: 'CHAT-002',
    customer: {
      name: 'Lisa Wang',
      email: 'lisa.w@email.com'
    },
    status: 'waiting',
    startTime: '2024-01-15T15:45:00Z',
    lastMessage: 'Hello, I need assistance',
    unreadCount: 1
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-red-100 text-red-800'
    case 'in-progress': return 'bg-yellow-100 text-yellow-800'
    case 'resolved': return 'bg-green-100 text-green-800'
    case 'closed': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-red-100 text-red-800'
    case 'high': return 'bg-orange-100 text-orange-800'
    case 'medium': return 'bg-yellow-100 text-yellow-800'
    case 'low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getChatStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800'
    case 'waiting': return 'bg-yellow-100 text-yellow-800'
    case 'ended': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function CustomerSupportPage() {
  const [activeTab, setActiveTab] = useState('tickets')

  const openTickets = mockTickets.filter(t => t.status === 'open').length
  const activeChats = mockChatSessions.filter(c => c.status === 'active').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
        <div className="flex gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{openTickets}</p>
            <p className="text-sm text-gray-600">Open Tickets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{activeChats}</p>
            <p className="text-sm text-gray-600">Active Chats</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
        </TabsList>

        {/* Support Tickets Tab */}
        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTickets.slice(0, 5).map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status.replace('-', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{ticket.customer.name}</span>
                          <span>{formatDate(ticket.createdAt)}</span>
                          <span>{ticket.messages} messages</span>
                        </div>
                      </div>
                      <Link href={`/admin/support/tickets/${ticket.id}`}>
                        <Button size="sm">View</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Chat Tab */}
        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Chat Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockChatSessions.filter(chat => chat.status === 'active' || chat.status === 'waiting').slice(0, 5).map((chat) => (
                  <div key={chat.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{chat.customer.name}</h4>
                          <Badge className={getChatStatusColor(chat.status)}>
                            {chat.status}
                          </Badge>
                          {chat.unreadCount > 0 && (
                            <Badge className="bg-red-100 text-red-800">
                              {chat.unreadCount} new
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{chat.lastMessage}</p>
                        <p className="text-xs text-gray-500">{formatTime(chat.startTime)}</p>
                      </div>
                      <Link href={`/admin/support/chat`}>
                        <Button size="sm">
                          {chat.status === 'waiting' ? 'Accept' : 'Join'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


      </Tabs>
    </div>
  )
}