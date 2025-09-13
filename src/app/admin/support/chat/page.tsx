"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MessageSquare,
  Send,
  User,
  Clock,
  Phone,
  Video,
  Paperclip,
  Smile,
  MoreVertical,
  Search,
  Filter,
  UserPlus,
  Settings,
  Circle,
  CheckCircle2,
  AlertCircle,
  Minimize2,
  Maximize2,
  X
} from 'lucide-react'

interface ChatMessage {
  id: string
  sender: {
    name: string
    type: 'customer' | 'agent'
    avatar?: string
  }
  content: string
  timestamp: string
  status?: 'sent' | 'delivered' | 'read'
}

interface ChatSession {
  id: string
  customer: {
    name: string
    email: string
    avatar?: string
    status: 'online' | 'away' | 'offline'
  }
  agent?: {
    name: string
    email: string
    avatar?: string
  }
  status: 'active' | 'waiting' | 'closed'
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: ChatMessage[]
  startedAt: string
  category: string
}

const mockChatSessions: ChatSession[] = [
  {
    id: 'chat-1',
    customer: {
      name: 'Alice Cooper',
      email: 'alice@email.com',
      status: 'online'
    },
    agent: {
      name: 'John Doe',
      email: 'john@company.com'
    },
    status: 'active',
    lastMessage: 'Thank you for your help!',
    lastMessageTime: '2024-01-15T15:30:00Z',
    unreadCount: 0,
    startedAt: '2024-01-15T15:00:00Z',
    category: 'Product Support',
    messages: [
      {
        id: 'msg-1',
        sender: { name: 'Alice Cooper', type: 'customer' },
        content: 'Hi, I need help with my recent order',
        timestamp: '2024-01-15T15:00:00Z',
        status: 'read'
      },
      {
        id: 'msg-2',
        sender: { name: 'John Doe', type: 'agent' },
        content: 'Hello Alice! I\'d be happy to help you with your order. Could you please provide your order number?',
        timestamp: '2024-01-15T15:02:00Z',
        status: 'read'
      },
      {
        id: 'msg-3',
        sender: { name: 'Alice Cooper', type: 'customer' },
        content: 'Sure, it\'s #ORD-12345',
        timestamp: '2024-01-15T15:05:00Z',
        status: 'read'
      },
      {
        id: 'msg-4',
        sender: { name: 'John Doe', type: 'agent' },
        content: 'Perfect! I can see your order here. It looks like it\'s currently being processed and should ship within 24 hours. You\'ll receive a tracking number via email once it ships.',
        timestamp: '2024-01-15T15:08:00Z',
        status: 'read'
      },
      {
        id: 'msg-5',
        sender: { name: 'Alice Cooper', type: 'customer' },
        content: 'Thank you for your help!',
        timestamp: '2024-01-15T15:30:00Z',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat-2',
    customer: {
      name: 'Bob Smith',
      email: 'bob@email.com',
      status: 'online'
    },
    status: 'waiting',
    lastMessage: 'Is anyone available to help?',
    lastMessageTime: '2024-01-15T15:45:00Z',
    unreadCount: 2,
    startedAt: '2024-01-15T15:40:00Z',
    category: 'Technical Support',
    messages: [
      {
        id: 'msg-1',
        sender: { name: 'Bob Smith', type: 'customer' },
        content: 'Hello, I\'m having trouble logging into my account',
        timestamp: '2024-01-15T15:40:00Z',
        status: 'delivered'
      },
      {
        id: 'msg-2',
        sender: { name: 'Bob Smith', type: 'customer' },
        content: 'Is anyone available to help?',
        timestamp: '2024-01-15T15:45:00Z',
        status: 'delivered'
      }
    ]
  },
  {
    id: 'chat-3',
    customer: {
      name: 'Carol Johnson',
      email: 'carol@email.com',
      status: 'away'
    },
    agent: {
      name: 'Jane Smith',
      email: 'jane@company.com'
    },
    status: 'active',
    lastMessage: 'Let me check that for you',
    lastMessageTime: '2024-01-15T14:20:00Z',
    unreadCount: 1,
    startedAt: '2024-01-15T14:00:00Z',
    category: 'Billing',
    messages: [
      {
        id: 'msg-1',
        sender: { name: 'Carol Johnson', type: 'customer' },
        content: 'I have a question about my billing',
        timestamp: '2024-01-15T14:00:00Z',
        status: 'read'
      },
      {
        id: 'msg-2',
        sender: { name: 'Jane Smith', type: 'agent' },
        content: 'Let me check that for you',
        timestamp: '2024-01-15T14:20:00Z',
        status: 'sent'
      }
    ]
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-500'
    case 'away': return 'bg-yellow-500'
    case 'offline': return 'bg-gray-400'
    default: return 'bg-gray-400'
  }
}

const getChatStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800'
    case 'waiting': return 'bg-red-100 text-red-800'
    case 'closed': return 'bg-gray-100 text-gray-800'
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

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  
  if (diffInHours < 24) {
    return formatTime(dateString)
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}

export default function LiveChatPage() {
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(mockChatSessions[0])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [chatFilter, setChatFilter] = useState('all')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedChat?.messages])

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: { name: 'Current Agent', type: 'agent' },
        content: newMessage,
        timestamp: new Date().toISOString(),
        status: 'sent'
      }
      
      // Update the selected chat with the new message
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, message],
        lastMessage: newMessage,
        lastMessageTime: new Date().toISOString()
      }
      
      setSelectedChat(updatedChat)
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredChats = mockChatSessions.filter(chat => {
    const matchesSearch = chat.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = chatFilter === 'all' || chat.status === chatFilter
    return matchesSearch && matchesFilter
  })

  const waitingChats = mockChatSessions.filter(chat => chat.status === 'waiting')
  const activeChats = mockChatSessions.filter(chat => chat.status === 'active')

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Chat Support</h1>
          <p className="text-gray-600">
            {waitingChats.length} waiting • {activeChats.length} active conversations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Agent
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r bg-gray-50 flex flex-col">
          {/* Search and Filter */}
          <div className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={chatFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChatFilter('all')}
              >
                All
              </Button>
              <Button
                variant={chatFilter === 'waiting' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChatFilter('waiting')}
                className="relative"
              >
                Waiting
                {waitingChats.length > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                    {waitingChats.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant={chatFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChatFilter('active')}
              >
                Active
              </Button>
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b cursor-pointer hover:bg-white transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-white border-l-4 border-l-persian-green-500' : ''
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-persian-green-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-persian-green-600" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      getStatusColor(chat.customer.status)
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {chat.customer.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {chat.unreadCount > 0 && (
                          <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                            {chat.unreadCount}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatDateTime(chat.lastMessageTime)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-2">
                      {chat.lastMessage}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className={getChatStatusColor(chat.status)}>
                        {chat.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{chat.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-persian-green-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-persian-green-600" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      getStatusColor(selectedChat.customer.status)
                    }`}></div>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedChat.customer.name}</h2>
                    <p className="text-sm text-gray-600">{selectedChat.customer.email}</p>
                  </div>
                  <Badge className={getChatStatusColor(selectedChat.status)}>
                    {selectedChat.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${
                  message.sender.type === 'agent' ? 'flex-row-reverse' : ''
                }`}>
                  <div className="w-8 h-8 bg-persian-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-persian-green-600" />
                  </div>
                  <div className={`flex-1 max-w-xs lg:max-w-md ${
                    message.sender.type === 'agent' ? 'text-right' : ''
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      message.sender.type === 'agent'
                        ? 'bg-persian-green-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender.type === 'agent' && message.status && (
                        <div className="flex items-center gap-1">
                          {message.status === 'sent' && <Circle className="w-3 h-3" />}
                          {message.status === 'delivered' && <CheckCircle2 className="w-3 h-3" />}
                          {message.status === 'read' && <CheckCircle2 className="w-3 h-3 text-blue-500" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
              <p className="text-gray-600">Choose a conversation from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}