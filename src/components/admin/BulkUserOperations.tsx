'use client'

import React, { useState } from 'react'
import { Users, Download, Upload, Mail, Shield, Trash2, UserX, CheckSquare, Square, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  joinDate: string
}

interface BulkUserOperationsProps {
  users: User[]
  selectedUsers: string[]
  onSelectionChange: (userIds: string[]) => void
  onBulkOperation: (operation: string, userIds: string[], data?: any) => void
}

interface BulkOperation {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  requiresConfirmation: boolean
  destructive?: boolean
  requiresData?: boolean
}

const bulkOperations: BulkOperation[] = [
  {
    id: 'export',
    name: 'Export Users',
    description: 'Export selected users to CSV',
    icon: <Download className="h-4 w-4" />,
    requiresConfirmation: false
  },
  {
    id: 'send_email',
    name: 'Send Email',
    description: 'Send bulk email to selected users',
    icon: <Mail className="h-4 w-4" />,
    requiresConfirmation: true,
    requiresData: true
  },
  {
    id: 'change_role',
    name: 'Change Role',
    description: 'Assign new role to selected users',
    icon: <Shield className="h-4 w-4" />,
    requiresConfirmation: true,
    requiresData: true
  },
  {
    id: 'activate',
    name: 'Activate Users',
    description: 'Activate selected inactive users',
    icon: <Users className="h-4 w-4" />,
    requiresConfirmation: true
  },
  {
    id: 'suspend',
    name: 'Suspend Users',
    description: 'Suspend selected users',
    icon: <UserX className="h-4 w-4" />,
    requiresConfirmation: true,
    destructive: true
  },
  {
    id: 'delete',
    name: 'Delete Users',
    description: 'Permanently delete selected users',
    icon: <Trash2 className="h-4 w-4" />,
    requiresConfirmation: true,
    destructive: true
  }
]

const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'editor', label: 'Editor' },
  { value: 'support', label: 'Support Agent' },
  { value: 'analyst', label: 'Data Analyst' },
  { value: 'user', label: 'Regular User' }
]

export default function BulkUserOperations({ users, selectedUsers, onSelectionChange, onBulkOperation }: BulkUserOperationsProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState<BulkOperation | null>(null)
  const [operationData, setOperationData] = useState<any>({})
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [importFile, setImportFile] = useState<File | null>(null)

  const selectedUserData = users.filter(user => selectedUsers.includes(user.id))
  const allSelected = users.length > 0 && selectedUsers.length === users.length
  const someSelected = selectedUsers.length > 0 && selectedUsers.length < users.length

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange([])
    } else {
      onSelectionChange(users.map(user => user.id))
    }
  }

  const handleOperationClick = (operation: BulkOperation) => {
    if (selectedUsers.length === 0) {
      alert('Please select at least one user')
      return
    }

    setSelectedOperation(operation)
    setOperationData({})

    if (operation.requiresConfirmation || operation.requiresData) {
      setShowConfirmDialog(true)
    } else {
      executeOperation(operation, {})
    }
  }

  const executeOperation = (operation: BulkOperation, data: any) => {
    onBulkOperation(operation.id, selectedUsers, data)
    setShowConfirmDialog(false)
    setSelectedOperation(null)
    setOperationData({})
  }

  const handleImport = () => {
    if (!importFile) {
      alert('Please select a file to import')
      return
    }

    // Implementation for CSV import
    console.log('Importing users from file:', importFile.name)
    setShowImportDialog(false)
    setImportFile(null)
  }

  const getOperationPreview = () => {
    if (!selectedOperation) return null

    switch (selectedOperation.id) {
      case 'send_email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Subject
              </label>
              <input
                type="text"
                value={operationData.subject || ''}
                onChange={(e) => setOperationData({ ...operationData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
                placeholder="Enter email subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Message
              </label>
              <textarea
                value={operationData.message || ''}
                onChange={(e) => setOperationData({ ...operationData, message: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
                placeholder="Enter email message"
              />
            </div>
          </div>
        )
      case 'change_role':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Role
            </label>
            <select
              value={operationData.role || ''}
              onChange={(e) => setOperationData({ ...operationData, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
            >
              <option value="">Select a role</option>
              {roleOptions.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Selection Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                {allSelected ? (
                  <CheckSquare className="h-4 w-4 text-persian-green-600" />
                ) : someSelected ? (
                  <div className="h-4 w-4 bg-persian-green-600 rounded border-2 border-persian-green-600 flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-sm" />
                  </div>
                ) : (
                  <Square className="h-4 w-4" />
                )}
                {allSelected ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            {selectedUsers.length > 0 && (
              <Badge className="bg-persian-green-100 text-persian-green-800 border-persian-green-200">
                {selectedUsers.length} selected
              </Badge>
            )}
          </div>
          <Button
            onClick={() => setShowImportDialog(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Import Users
          </Button>
        </div>
      </Card>

      {/* Bulk Operations */}
      {selectedUsers.length > 0 && (
        <Card className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Bulk Operations ({selectedUsers.length} users selected)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {bulkOperations.map((operation) => (
              <Button
                key={operation.id}
                onClick={() => handleOperationClick(operation)}
                variant={operation.destructive ? "outline" : "outline"}
                className={`flex flex-col items-center gap-2 h-auto py-3 ${
                  operation.destructive
                    ? 'text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300'
                    : 'hover:bg-persian-green-50 hover:border-persian-green-300'
                }`}
              >
                {operation.icon}
                <span className="text-xs text-center">{operation.name}</span>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Selected Users Preview */}
      {selectedUsers.length > 0 && (
        <Card className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Users</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedUserData.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{user.role}</Badge>
                  <Badge
                    className={
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : user.status === 'suspended'
                        ? 'bg-red-100 text-red-800 border-red-200'
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && selectedOperation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              {selectedOperation.destructive && (
                <AlertTriangle className="h-6 w-6 text-red-500" />
              )}
              <h3 className="text-lg font-medium text-gray-900">
                Confirm {selectedOperation.name}
              </h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              {selectedOperation.description} for {selectedUsers.length} selected user(s).
            </p>

            {selectedOperation.destructive && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> This action cannot be undone.
                </p>
              </div>
            )}

            {getOperationPreview()}

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => {
                  setShowConfirmDialog(false)
                  setSelectedOperation(null)
                  setOperationData({})
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={() => executeOperation(selectedOperation, operationData)}
                className={selectedOperation.destructive ? 'bg-red-600 hover:bg-red-700' : ''}
                disabled={
                  selectedOperation.requiresData &&
                  (selectedOperation.id === 'send_email' && (!operationData.subject || !operationData.message)) ||
                  (selectedOperation.id === 'change_role' && !operationData.role)
                }
              >
                {selectedOperation.destructive ? 'Confirm' : 'Execute'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Import Dialog */}
      {showImportDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Import Users</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>CSV Format:</strong> name, email, role, status
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => {
                  setShowImportDialog(false)
                  setImportFile(null)
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={handleImport} disabled={!importFile}>
                Import
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}