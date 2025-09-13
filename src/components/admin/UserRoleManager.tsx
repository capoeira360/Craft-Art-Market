'use client'

import React, { useState } from 'react'
import { Shield, Check, X, Save, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  isSystem: boolean
}

interface UserRoleManagerProps {
  userId?: string
  currentRole?: string
  onRoleChange?: (userId: string, newRole: string) => void
  onPermissionChange?: (userId: string, permissions: string[]) => void
}

const mockPermissions: Permission[] = [
  // Dashboard Permissions
  { id: 'dashboard.view', name: 'View Dashboard', description: 'Access to main dashboard', category: 'Dashboard' },
  { id: 'dashboard.analytics', name: 'View Analytics', description: 'Access to analytics and reports', category: 'Dashboard' },
  
  // User Management Permissions
  { id: 'users.view', name: 'View Users', description: 'View user list and profiles', category: 'User Management' },
  { id: 'users.create', name: 'Create Users', description: 'Add new users to the system', category: 'User Management' },
  { id: 'users.edit', name: 'Edit Users', description: 'Modify user information', category: 'User Management' },
  { id: 'users.delete', name: 'Delete Users', description: 'Remove users from the system', category: 'User Management' },
  { id: 'users.roles', name: 'Manage Roles', description: 'Assign and modify user roles', category: 'User Management' },
  
  // Product Management Permissions
  { id: 'products.view', name: 'View Products', description: 'View product listings', category: 'Product Management' },
  { id: 'products.create', name: 'Create Products', description: 'Add new products', category: 'Product Management' },
  { id: 'products.edit', name: 'Edit Products', description: 'Modify product information', category: 'Product Management' },
  { id: 'products.delete', name: 'Delete Products', description: 'Remove products', category: 'Product Management' },
  { id: 'products.approve', name: 'Approve Products', description: 'Approve pending products', category: 'Product Management' },
  
  // Financial Permissions
  { id: 'finance.view', name: 'View Financial Data', description: 'Access financial reports', category: 'Financial' },
  { id: 'finance.transactions', name: 'Manage Transactions', description: 'Process and manage transactions', category: 'Financial' },
  { id: 'finance.payouts', name: 'Manage Payouts', description: 'Process artisan payouts', category: 'Financial' },
  { id: 'finance.reports', name: 'Generate Reports', description: 'Create financial reports', category: 'Financial' },
  
  // Content Management Permissions
  { id: 'content.view', name: 'View Content', description: 'View stories and articles', category: 'Content Management' },
  { id: 'content.create', name: 'Create Content', description: 'Write new stories and articles', category: 'Content Management' },
  { id: 'content.edit', name: 'Edit Content', description: 'Modify existing content', category: 'Content Management' },
  { id: 'content.publish', name: 'Publish Content', description: 'Publish content to the site', category: 'Content Management' },
  
  // System Permissions
  { id: 'system.settings', name: 'System Settings', description: 'Modify system configuration', category: 'System' },
  { id: 'system.security', name: 'Security Settings', description: 'Manage security configurations', category: 'System' },
  { id: 'system.backup', name: 'System Backup', description: 'Create and restore backups', category: 'System' },
  { id: 'system.logs', name: 'View System Logs', description: 'Access system activity logs', category: 'System' }
]

const mockRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    permissions: mockPermissions.map(p => p.id),
    userCount: 2,
    isSystem: true
  },
  {
    id: 'moderator',
    name: 'Moderator',
    description: 'Content and user management with limited system access',
    permissions: [
      'dashboard.view', 'dashboard.analytics',
      'users.view', 'users.edit', 'users.roles',
      'products.view', 'products.edit', 'products.approve',
      'content.view', 'content.create', 'content.edit', 'content.publish'
    ],
    userCount: 3,
    isSystem: true
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Content creation and product management',
    permissions: [
      'dashboard.view',
      'products.view', 'products.create', 'products.edit',
      'content.view', 'content.create', 'content.edit', 'content.publish'
    ],
    userCount: 5,
    isSystem: false
  },
  {
    id: 'support',
    name: 'Support Agent',
    description: 'Customer support and basic user management',
    permissions: [
      'dashboard.view',
      'users.view', 'users.edit',
      'products.view',
      'content.view'
    ],
    userCount: 4,
    isSystem: false
  },
  {
    id: 'analyst',
    name: 'Data Analyst',
    description: 'Analytics and reporting access',
    permissions: [
      'dashboard.view', 'dashboard.analytics',
      'finance.view', 'finance.reports',
      'products.view',
      'content.view'
    ],
    userCount: 2,
    isSystem: false
  }
]

export default function UserRoleManager({ userId, currentRole, onRoleChange, onPermissionChange }: UserRoleManagerProps) {
  const [selectedRole, setSelectedRole] = useState(currentRole || '')
  const [customPermissions, setCustomPermissions] = useState<string[]>([])
  const [showCustomPermissions, setShowCustomPermissions] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const selectedRoleData = mockRoles.find(role => role.id === selectedRole)
  const permissionsByCategory = mockPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, Permission[]>)

  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId)
    setHasChanges(true)
    setShowCustomPermissions(false)
    setCustomPermissions([])
  }

  const handleCustomPermissionToggle = (permissionId: string) => {
    setCustomPermissions(prev => {
      const newPermissions = prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
      setHasChanges(true)
      return newPermissions
    })
  }

  const handleSave = () => {
    if (userId && onRoleChange && selectedRole !== currentRole) {
      onRoleChange(userId, selectedRole)
    }
    if (userId && onPermissionChange && showCustomPermissions) {
      onPermissionChange(userId, customPermissions)
    }
    setHasChanges(false)
  }

  const getEffectivePermissions = () => {
    if (showCustomPermissions) {
      return customPermissions
    }
    return selectedRoleData?.permissions || []
  }

  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-persian-green-500" />
          <h3 className="text-lg font-medium text-gray-900">Role Assignment</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRoles.map((role) => (
            <div
              key={role.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedRole === role.id
                  ? 'border-persian-green-500 bg-persian-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleRoleChange(role.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{role.name}</h4>
                {role.isSystem && (
                  <Badge variant="secondary" className="text-xs">
                    System
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{role.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{role.permissions.length} permissions</span>
                <span>{role.userCount} users</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showCustomPermissions}
              onChange={(e) => {
                setShowCustomPermissions(e.target.checked)
                setHasChanges(true)
                if (e.target.checked && selectedRoleData) {
                  setCustomPermissions([...selectedRoleData.permissions])
                }
              }}
              className="rounded border-gray-300 text-persian-green-600 focus:ring-persian-green-500"
            />
            <span className="text-sm text-gray-700">Custom permissions (override role defaults)</span>
          </label>
        </div>
      </Card>

      {/* Permission Details */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {showCustomPermissions ? 'Custom Permissions' : 'Role Permissions'}
        </h3>
        
        {showCustomPermissions && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                Custom permissions will override the selected role's default permissions.
              </span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {Object.entries(permissionsByCategory).map(([category, permissions]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {permissions.map((permission) => {
                  const isGranted = getEffectivePermissions().includes(permission.id)
                  return (
                    <div
                      key={permission.id}
                      className={`p-3 border rounded-lg ${
                        showCustomPermissions
                          ? 'cursor-pointer hover:bg-gray-50'
                          : ''
                      } ${
                        isGranted
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200'
                      }`}
                      onClick={() => {
                        if (showCustomPermissions) {
                          handleCustomPermissionToggle(permission.id)
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">
                              {permission.name}
                            </span>
                            {isGranted ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {permission.description}
                          </p>
                        </div>
                        {showCustomPermissions && (
                          <input
                            type="checkbox"
                            checked={isGranted}
                            onChange={() => handleCustomPermissionToggle(permission.id)}
                            className="rounded border-gray-300 text-persian-green-600 focus:ring-persian-green-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Save Changes */}
      {hasChanges && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              You have unsaved changes
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedRole(currentRole || '')
                  setCustomPermissions([])
                  setShowCustomPermissions(false)
                  setHasChanges(false)
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}