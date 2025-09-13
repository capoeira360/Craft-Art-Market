"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  MessageSquare,
  Send,
  Paperclip,
  Star,
  Archive,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Tag
} from 'lucide-react'

interface TicketMessage {
  id: string
  sender: {
    name: string
    email: string
    type: 'customer' | 'agent'
    avatar?: string
  }
  content: string
  timestamp: string
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}

interface TicketDetails {
  id: string
  subject: string
  description: string
  customer: {
    name: string
    email: string
    phone?: string
    avatar?: string
    totalTickets: number
    memberSince: string
  }
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  tags: string[]
  assignedTo?: {
    name: string
    email: string
    avatar?: string
  }
  createdAt: string
  lastUpdate: string
  messages: TicketMessage[]
}

const mockTicket: TicketDetails = {
  id: 'TKT-001',
  subject: 'Unable to complete order payment',
  description: 'Customer is experiencing issues with payment processing during checkout. The payment fails at the final step with an error message.',
  customer: {
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    totalTickets: 3,
    memberSince: '2023-06-15'
  },
  status: 'in-progress',
  priority: 'high',
  category: 'Payment Issues',
  tags: ['payment', 'checkout', 'urgent'],
  assignedTo: {
    name: 'John Doe',
    email: 'john.doe@company.com'
  },
  createdAt: '2024-01-15T10:30:00Z',
  lastUpdate: '2024-01-15T14:20:00Z',
  messages: [
    {
      id: 'msg-1',
      sender: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        type: 'customer'
      },
      content: 'Hi, I\'m trying to place an order but the payment keeps failing. I\'ve tried multiple cards and they all get declined. Can you help?',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 'msg-2',
      sender: {
        name: 'John Doe',
        email: 'john.doe@company.com',
        type: 'agent'
      },
      content: 'Hello Sarah, thank you for contacting us. I\'m sorry to hear about the payment issues. Let me check your account and see what might be causing this problem.',
      timestamp: '2024-01-15T11:15:00Z'
    },
    {
      id: 'msg-3',
      sender: {
        name: 'John Doe',
        email: 'john.doe@company.com',
        type: 'agent'
      },
      content: 'I\'ve reviewed your account and it appears there might be a temporary issue with our payment processor. Could you please try again in about 30 minutes? If the issue persists, please let me know.',
      timestamp: '2024-01-15T11:45:00Z'
    },
    {
      id: 'msg-4',
      sender: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        type: 'customer'
      },
      content: 'I tried again but still having the same issue. The error message says "Payment processing failed - please try again later."',
      timestamp: '2024-01-15T14:20:00Z',
      attachments: [
        {
          name: 'error-screenshot.png',
          url: '#',
          type: 'image'
        }
      ]
    }
  ]
}

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

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [newMessage, setNewMessage] = useState('')
  const [ticketStatus, setTicketStatus] = useState(mockTicket.status)
  const [ticketPriority, setTicketPriority] = useState(mockTicket.priority)
  const [assignedAgent, setAssignedAgent] = useState(mockTicket.assignedTo?.name || '')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  const handleStatusChange = (newStatus: string) => {
    setTicketStatus(newStatus as any)
    // Handle status update
    console.log('Status changed to:', newStatus)
  }

  const handlePriorityChange = (newPriority: string) => {
    setTicketPriority(newPriority as any)
    // Handle priority update
    console.log('Priority changed to:', newPriority)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{mockTicket.subject}</h1>
            <p className="text-gray-600">Ticket #{mockTicket.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(ticketStatus)}>
            {ticketStatus.replace('-', ' ')}
          </Badge>
          <Badge className={getPriorityColor(ticketPriority)}>
            {ticketPriority}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{mockTicket.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {mockTicket.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Conversation ({mockTicket.messages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockTicket.messages.map((message) => (
                  <div key={message.id} className={`flex gap-4 ${
                    message.sender.type === 'agent' ? 'flex-row-reverse' : ''
                  }`}>
                    <div className="w-10 h-10 bg-persian-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-persian-green-600" />
                    </div>
                    <div className={`flex-1 max-w-2xl ${
                      message.sender.type === 'agent' ? 'text-right' : ''
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{message.sender.name}</span>
                        <span className="text-sm text-gray-500">
                          {formatDateTime(message.timestamp)}
                        </span>
                        {message.sender.type === 'agent' && (
                          <Badge variant="outline" className="text-xs">
                            Agent
                          </Badge>
                        )}
                      </div>
                      <div className={`p-4 rounded-lg ${
                        message.sender.type === 'agent'
                          ? 'bg-persian-green-50 border border-persian-green-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <p className="text-gray-700">{message.content}</p>
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <Paperclip className="w-4 h-4 text-gray-400" />
                                <a href={attachment.url} className="text-persian-green-600 hover:underline">
                                  {attachment.name}
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reply Form */}
          <Card>
            <CardHeader>
              <CardTitle>Reply to Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Type your response..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                />
                <div className="flex items-center justify-between">
                  <Button variant="outline">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach File
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setNewMessage('')}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Name</Label>
                <p className="text-gray-900">{mockTicket.customer.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{mockTicket.customer.email}</p>
                </div>
              </div>
              {mockTicket.customer.phone && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Phone</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{mockTicket.customer.phone}</p>
                  </div>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-600">Member Since</Label>
                <p className="text-gray-900">{formatDate(mockTicket.customer.memberSince)}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Total Tickets</Label>
                <p className="text-gray-900">{mockTicket.customer.totalTickets}</p>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Management */}
          <Card>
            <CardHeader>
              <CardTitle>Ticket Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600 mb-2 block">Status</Label>
                <Select value={ticketStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 mb-2 block">Priority</Label>
                <Select value={ticketPriority} onValueChange={handlePriorityChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 mb-2 block">Assigned Agent</Label>
                <Select value={assignedAgent} onValueChange={setAssignedAgent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    <SelectItem value="Bob Wilson">Bob Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Category</Label>
                <p className="text-gray-900">{mockTicket.category}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Star className="w-4 h-4 mr-2" />
                Mark as Important
              </Button>
              <Button variant="outline" className="w-full justify-start text-green-600 hover:text-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Solved
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Archive className="w-4 h-4 mr-2" />
                Archive Ticket
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Edit className="w-4 h-4 mr-2" />
                Edit Ticket
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Ticket
              </Button>
            </CardContent>
          </Card>

          {/* Ticket Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-gray-900">Ticket created</p>
                    <p className="text-gray-500">{formatDateTime(mockTicket.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-gray-900">Assigned to {mockTicket.assignedTo?.name}</p>
                    <p className="text-gray-500">{formatDateTime(mockTicket.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-gray-900">Last updated</p>
                    <p className="text-gray-500">{formatDateTime(mockTicket.lastUpdate)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}