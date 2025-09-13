'use client'

import React, { useState, useEffect } from 'react'
import { Search, Plus, Filter, Download, Upload, MoreVertical, Eye, Edit, Trash2, Shield, Clock, Users, UserCheck, UserX, AlertTriangle, Settings, UserCog, Activity, Key, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import UserRoleManager from '@/components/admin/UserRoleManager'
import UserActivityMonitor from '@/components/admin/UserActivityMonitor'
import BulkUserOperations from '@/components/admin/BulkUserOperations'

// User type definition
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'moderator' | 'editor' | 'user'
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  joinDate: string
  avatar: string
  permissions: string[]
  location: string
  phone: string
  loginCount: number
  department: string
}

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Amara Mwalimu',
    email: 'amara.mwalimu@craftandartmarketplace.com',
    role: 'admin' as const,
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    joinDate: '2023-06-15T08:00:00Z',
    avatar: '/avatars/amara.jpg',
    permissions: ['all'],
    location: 'Dar es Salaam',
    phone: '+255 712 345 678',
    loginCount: 245,
    department: 'Administration'
  },
  {
    id: '2',
    name: 'Juma Kikwete',
    email: 'juma.kikwete@craftandartmarketplace.com',
    role: 'moderator' as const,
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z',
    joinDate: '2023-08-20T10:30:00Z',
    avatar: '/avatars/juma.jpg',
    permissions: ['products', 'users', 'content'],
    location: 'Arusha',
    phone: '+255 754 987 321',
    loginCount: 156,
    department: 'Content Management'
  },
  {
    id: '3',
    name: 'Fatima Hassan',
    email: 'fatima.hassan@craftandartmarketplace.com',
    role: 'editor' as const,
    status: 'active',
    lastLogin: '2024-01-14T16:45:00Z',
    joinDate: '2023-09-10T14:20:00Z',
    avatar: '/avatars/fatima.jpg',
    permissions: ['content', 'products'],
    location: 'Zanzibar',
    phone: '+255 777 654 123',
    loginCount: 89,
    department: 'Editorial'
  },
  {
    id: '4',
    name: 'Hassan Mwangi',
    email: 'hassan.mwangi@craftandartmarketplace.com',
    role: 'user' as const,
    status: 'suspended',
    lastLogin: '2024-01-10T14:20:00Z',
    joinDate: '2023-11-05T09:15:00Z',
    avatar: '/avatars/hassan.jpg',
    permissions: ['basic'],
    location: 'Mwanza',
    phone: '+255 765 432 987',
    loginCount: 34,
    department: 'Customer'
  },
  {
    id: '5',
    name: 'Zainab Ali',
    email: 'zainab.ali@craftandartmarketplace.com',
    role: 'moderator',
    status: 'inactive',
    lastLogin: '2024-01-08T11:30:00Z',
    joinDate: '2023-07-12T16:45:00Z',
    avatar: '/avatars/zainab.jpg',
    permissions: ['users', 'content'],
    location: 'Dodoma',
    phone: '+255 713 876 543',
    loginCount: 178,
    department: 'Moderation'
  }
]

const roleColors = {
  admin: 'bg-red-100 text-red-800',
  moderator: 'bg-blue-100 text-blue-800',
  editor: 'bg-green-100 text-green-800',
  user: 'bg-gray-100 text-gray-800'
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-yellow-100 text-yellow-800',
  suspended: 'bg-red-100 text-red-800'
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  const [activeView, setActiveView] = useState<'list' | 'roles' | 'activity'>('list')
  const [selectedUserForDetails, setSelectedUserForDetails] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'users' | 'activity' | 'sessions'>('users')
  const [users, setUsers] = useState<User[]>(mockUsers)

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  // Calculate statistics
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length
  }

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    )
  }

  const handleUserAction = (action: string, userId: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    switch (action) {
      case 'view':
        // View user details - show detailed user information
        setSelectedUserForDetails(userId)
        setActiveView('activity')
        alert(`Viewing details for ${user.name}\n\nEmail: ${user.email}\nRole: ${user.role}\nStatus: ${user.status}\nLast Login: ${user.lastLogin}\nJoined: ${user.joinDate}\nLocation: ${user.location}\nPhone: ${user.phone}`)
        break
        
      case 'edit':
        // Edit user information - open edit modal/form
        const newName = prompt('Edit user name:', user.name)
        const newEmail = prompt('Edit user email:', user.email)
        const newPhone = prompt('Edit user phone:', user.phone)
        const newLocation = prompt('Edit user location:', user.location)
        
        if (newName && newEmail) {
          setUsers(prev => prev.map(u => 
            u.id === userId 
              ? { ...u, name: newName, email: newEmail, phone: newPhone || u.phone, location: newLocation || u.location }
              : u
          ))
          alert('User information updated successfully!')
        }
        break
        
      case 'manage_permissions':
        // Manage user permissions - show permissions management
        const currentPermissions = user.role === 'admin' 
          ? ['read', 'write', 'delete', 'manage_users', 'manage_content']
          : user.role === 'moderator'
          ? ['read', 'write', 'manage_content']
          : user.role === 'editor'
          ? ['read', 'write']
          : ['read']
        
        const permissionsList = ['read', 'write', 'delete', 'manage_users', 'manage_content', 'manage_orders', 'view_analytics']
        const selectedPermissions = permissionsList.filter(perm => 
          confirm(`Grant '${perm}' permission to ${user.name}?`)
        )
        
        handlePermissionChange(userId, selectedPermissions)
        alert(`Permissions updated for ${user.name}:\n${selectedPermissions.join(', ')}`)
        break
        
      case 'send_notification':
        // Send notification to user
        const notificationTitle = prompt('Notification Title:', 'Important Update')
        const notificationMessage = prompt('Notification Message:', 'You have a new message from the admin.')
        
        if (notificationTitle && notificationMessage) {
          // Simulate sending notification
          alert(`Notification sent to ${user.name}:\n\nTitle: ${notificationTitle}\nMessage: ${notificationMessage}\n\nDelivery: Email & In-app notification`)
          console.log('Notification sent:', { userId, title: notificationTitle, message: notificationMessage, timestamp: new Date().toISOString() })
        }
        break
        
      case 'delete':
        // Delete/Remove user with confirmation
        const confirmDelete = confirm(`Are you sure you want to delete user "${user.name}"?\n\nThis action cannot be undone. The user will lose access to their account and all associated data.`)
        
        if (confirmDelete) {
          const finalConfirm = confirm(`FINAL CONFIRMATION\n\nDelete user: ${user.name} (${user.email})?\n\nType 'DELETE' to confirm this action.`)
          
          if (finalConfirm) {
            setUsers(prev => prev.filter(u => u.id !== userId))
            setSelectedUsers(prev => prev.filter(id => id !== userId))
            alert(`User "${user.name}" has been successfully deleted.`)
          }
        }
        break
        
      case 'view_activity':
        setSelectedUserForDetails(userId)
        setActiveView('activity')
        break
        
      case 'manage_roles':
        setSelectedUserForDetails(userId)
        setActiveView('roles')
        break
        
      default:
        console.log(`Unknown action: ${action} for user:`, userId)
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on users:`, selectedUsers)
    // Implement bulk actions here
    setSelectedUsers([])
  }

  const handleBulkOperation = (operation: string, userIds: string[], data?: any) => {
    console.log(`Bulk operation ${operation}:`, userIds, data)
    // Implementation for bulk operations
    switch (operation) {
      case 'export':
        // Export users to CSV
        break
      case 'send_email':
        // Send bulk email
        break
      case 'change_role':
        // Change user roles
        setUsers(prev => prev.map(user => 
          userIds.includes(user.id) ? { ...user, role: data.role } : user
        ))
        break
      case 'activate':
        setUsers(prev => prev.map(user => 
          userIds.includes(user.id) ? { ...user, status: 'active' } : user
        ))
        break
      case 'suspend':
        setUsers(prev => prev.map(user => 
          userIds.includes(user.id) ? { ...user, status: 'suspended' } : user
        ))
        break
      case 'delete':
        setUsers(prev => prev.filter(user => !userIds.includes(user.id)))
        setSelectedUsers([])
        break
    }
  }

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole as 'admin' | 'moderator' | 'editor' | 'user' } : user
    ));
  }

  const handlePermissionChange = (userId: string, permissions: string[]) => {
    console.log(`Updated permissions for user ${userId}:`, permissions)
    // Implementation for custom permissions
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

  const selectedUserData = users.find(user => user.id === selectedUserForDetails)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users, roles, and permissions</p>
        </div>
        <div className="flex gap-2">
          {activeView !== 'list' && (
            <Button
              onClick={() => {
                setActiveView('list')
                setSelectedUserForDetails(null)
              }}
              variant="outline"
            >
              Back to Users
            </Button>
          )}
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      {activeView === 'list' && (
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-persian-green-500 text-persian-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Users ({stats.total})
            </button>
          </nav>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="editor">Editor</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setSelectedRole('all')
                      setSelectedStatus('all')
                      setSearchTerm('')
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Bulk Operations */}
          {selectedUsers.length > 0 && (
            <BulkUserOperations
              users={users}
              selectedUsers={selectedUsers}
              onSelectionChange={setSelectedUsers}
              onBulkOperation={handleBulkOperation}
            />
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-500" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.inactive}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Suspended</p>
                  <p className="text-2xl font-bold text-red-600">{stats.suspended}</p>
                </div>
                <UserX className="h-8 w-8 text-red-500" />
              </div>
            </Card>
          </div>

          {/* Users Table */}
          {activeView === 'list' && (
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-persian-green-600 focus:ring-persian-green-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="rounded border-gray-300 text-persian-green-600 focus:ring-persian-green-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-persian-green-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-persian-green-800">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(user.lastLogin)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction('view', user.id)}
                              title="View user details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction('edit', user.id)}
                              title="Edit user information"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction('manage_permissions', user.id)}
                              title="Manage permissions"
                            >
                              <Key className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction('send_notification', user.id)}
                              title="Send notifications"
                            >
                              <Bell className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction('delete', user.id)}
                              title="Delete/Remove user"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={currentPage * usersPerPage >= filteredUsers.length}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Role Management View */}
      {activeView === 'roles' && selectedUserData && (
        <UserRoleManager
          userId={selectedUserData.id}
          currentRole={selectedUserData.role}
          onRoleChange={handleRoleChange}
          onPermissionChange={handlePermissionChange}
        />
      )}

      {/* Activity Monitoring View */}
      {activeView === 'activity' && selectedUserData && (
        <UserActivityMonitor
          userId={selectedUserData.id}
          userName={selectedUserData.name}
        />
      )}
    </div>
  )
}