'use client'

import { useState, useEffect } from 'react'
import { Settings, User, Bell, Palette, Database, Mail, Shield, Globe, Save, RefreshCw, Download, Upload, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SystemSettings {
  siteName: string
  siteDescription: string
  adminEmail: string
  supportEmail: string
  maintenanceMode: boolean
  registrationEnabled: boolean
  emailVerificationRequired: boolean
  autoApproveArtisans: boolean
  defaultCommissionRate: number
  maxFileUploadSize: number // MB
  allowedFileTypes: string[]
  timezone: string
  language: string
  currency: string
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  newArtisanRegistration: boolean
  newProductSubmission: boolean
  paymentReceived: boolean
  securityAlerts: boolean
  systemMaintenance: boolean
  weeklyReports: boolean
  monthlyReports: boolean
}

interface ThemeSettings {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  darkMode: boolean
  customLogo: string
  favicon: string
  customCSS: string
}

interface DatabaseSettings {
  backupFrequency: 'daily' | 'weekly' | 'monthly'
  backupRetention: number // days
  autoBackup: boolean
  lastBackup: string
  databaseSize: string
  totalRecords: number
}

interface EmailSettings {
  smtpHost: string
  smtpPort: number
  smtpUsername: string
  smtpPassword: string
  smtpEncryption: 'none' | 'tls' | 'ssl'
  fromEmail: string
  fromName: string
  testEmailSent: boolean
}

interface APISettings {
  rateLimitEnabled: boolean
  rateLimitRequests: number
  rateLimitWindow: number // minutes
  apiKeyRequired: boolean
  corsEnabled: boolean
  allowedOrigins: string[]
  webhookUrl: string
  webhookSecret: string
}

const systemSettings: SystemSettings = {
  siteName: 'Craft&Art Marketplace - Craft Art Marketplace',
  siteDescription: 'Authentic Tanzanian artisan marketplace connecting creators with global customers',
  adminEmail: 'admin@craftandartmarketplace.com',
  supportEmail: 'support@craftandartmarketplace.com',
  maintenanceMode: false,
  registrationEnabled: true,
  emailVerificationRequired: true,
  autoApproveArtisans: false,
  defaultCommissionRate: 15,
  maxFileUploadSize: 10,
  allowedFileTypes: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov'],
  timezone: 'Africa/Dar_es_Salaam',
  language: 'en',
  currency: 'TZS'
}

const notificationSettings: NotificationSettings = {
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  newArtisanRegistration: true,
  newProductSubmission: true,
  paymentReceived: true,
  securityAlerts: true,
  systemMaintenance: true,
  weeklyReports: true,
  monthlyReports: true
}

const themeSettings: ThemeSettings = {
  primaryColor: '#2A9D8F',
  secondaryColor: '#F8F8F5',
  accentColor: '#9D7A6D',
  darkMode: true,
  customLogo: '/logo-persian-green.svg',
  favicon: '/favicon-persian-green.ico',
  customCSS: ''
}

const databaseSettings: DatabaseSettings = {
  backupFrequency: 'daily',
  backupRetention: 30,
  autoBackup: true,
  lastBackup: '2024-01-20T02:00:00Z',
  databaseSize: '2.4 GB',
  totalRecords: 15420
}

const emailSettings: EmailSettings = {
  smtpHost: 'smtp.gmail.com',
  smtpPort: 587,
  smtpUsername: 'noreply@craftandartmarketplace.com',
  smtpPassword: '••••••••••••',
  smtpEncryption: 'tls',
  fromEmail: 'noreply@craftandartmarketplace.com',
  fromName: 'Craft&Art Marketplace - Craft Art Marketplace',
  testEmailSent: false
}

const apiSettings: APISettings = {
  rateLimitEnabled: true,
  rateLimitRequests: 100,
  rateLimitWindow: 15,
  apiKeyRequired: true,
  corsEnabled: true,
  allowedOrigins: ['https://craftandartmarketplace.com', 'https://app.craftandartmarketplace.com'],
  webhookUrl: 'https://api.craftandartmarketplace.com/webhooks',
  webhookSecret: '••••••••••••••••••••'
}

export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState('general')
  const [showPassword, setShowPassword] = useState(false)
  const [showWebhookSecret, setShowWebhookSecret] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [testEmailSent, setTestEmailSent] = useState(false)
  
  // State for all settings
  const [currentSystemSettings, setCurrentSystemSettings] = useState<SystemSettings>(systemSettings)
  const [currentNotificationSettings, setCurrentNotificationSettings] = useState<NotificationSettings>(notificationSettings)
  const [currentThemeSettings, setCurrentThemeSettings] = useState<ThemeSettings>(themeSettings)
  const [currentDatabaseSettings, setCurrentDatabaseSettings] = useState<DatabaseSettings>(databaseSettings)
  const [currentEmailSettings, setCurrentEmailSettings] = useState<EmailSettings>(emailSettings)
  const [currentApiSettings, setCurrentApiSettings] = useState<APISettings>(apiSettings)
  const [newFileType, setNewFileType] = useState('')
  const [newOrigin, setNewOrigin] = useState('')

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would typically make API calls to save each settings object
      console.log('Saving all settings:', {
        system: currentSystemSettings,
        notifications: currentNotificationSettings,
        theme: currentThemeSettings,
        database: currentDatabaseSettings,
        email: currentEmailSettings,
        api: currentApiSettings
      })
      
      setLastSaved(new Date().toLocaleTimeString())
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveSystemSettings = async () => {
    try {
      console.log('Saving system settings:', currentSystemSettings)
      await new Promise(resolve => setTimeout(resolve, 500))
      alert('System settings saved successfully!')
    } catch (error) {
      console.error('Failed to save system settings:', error)
      alert('Failed to save system settings')
    }
  }

  const handleSaveNotificationSettings = async () => {
    try {
      console.log('Saving notification settings:', currentNotificationSettings)
      await new Promise(resolve => setTimeout(resolve, 500))
      alert('Notification settings saved successfully!')
    } catch (error) {
      console.error('Failed to save notification settings:', error)
      alert('Failed to save notification settings')
    }
  }

  const handleSaveThemeSettings = async () => {
    try {
      console.log('Saving theme settings:', currentThemeSettings)
      await new Promise(resolve => setTimeout(resolve, 500))
      alert('Theme settings saved successfully!')
    } catch (error) {
      console.error('Failed to save theme settings:', error)
      alert('Failed to save theme settings')
    }
  }

  const handleSaveDatabaseSettings = async () => {
    try {
      console.log('Saving database settings:', currentDatabaseSettings)
      await new Promise(resolve => setTimeout(resolve, 500))
      alert('Database settings saved successfully!')
    } catch (error) {
      console.error('Failed to save database settings:', error)
      alert('Failed to save database settings')
    }
  }

  const handleSaveEmailSettings = async () => {
    try {
      console.log('Saving email settings:', currentEmailSettings)
      await new Promise(resolve => setTimeout(resolve, 500))
      alert('Email settings saved successfully!')
    } catch (error) {
      console.error('Failed to save email settings:', error)
      alert('Failed to save email settings')
    }
  }

  const handleSaveApiSettings = async () => {
    try {
      console.log('Saving API settings:', currentApiSettings)
      await new Promise(resolve => setTimeout(resolve, 500))
      alert('API settings saved successfully!')
    } catch (error) {
      console.error('Failed to save API settings:', error)
      alert('Failed to save API settings')
    }
  }

  const handleTestEmail = async () => {
    try {
      console.log('Testing email configuration...')
      // Simulate email test
      await new Promise(resolve => setTimeout(resolve, 2000))
      setTestEmailSent(true)
      console.log('Test email sent successfully')
      
      // Reset the test email status after 5 seconds
      setTimeout(() => {
        setTestEmailSent(false)
      }, 5000)
    } catch (error) {
      console.error('Failed to send test email:', error)
    }
  }

  const handleBackupDatabase = async () => {
    try {
      console.log('Creating database backup...')
      // Simulate backup creation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Update last backup time
      const now = new Date().toISOString()
      setCurrentDatabaseSettings(prev => ({ ...prev, lastBackup: now }))
      console.log('Database backup created successfully')
    } catch (error) {
      console.error('Failed to create backup:', error)
    }
  }

  const handleRestoreDatabase = () => {
    if (confirm('Are you sure you want to restore the database? This action cannot be undone.')) {
      console.log('Restoring database from backup...')
      // Implement restore logic
    }
  }

  const handleAddFileType = () => {
    if (newFileType.trim() && !currentSystemSettings.allowedFileTypes.includes(newFileType.trim())) {
      setCurrentSystemSettings(prev => ({
        ...prev,
        allowedFileTypes: [...prev.allowedFileTypes, newFileType.trim()]
      }))
      setNewFileType('')
    }
  }

  const handleRemoveFileType = (typeToRemove: string) => {
    setCurrentSystemSettings(prev => ({
      ...prev,
      allowedFileTypes: prev.allowedFileTypes.filter(type => type !== typeToRemove)
    }))
  }

  const handleAddOrigin = () => {
    if (newOrigin.trim() && !currentApiSettings.allowedOrigins.includes(newOrigin.trim())) {
      setCurrentApiSettings(prev => ({
        ...prev,
        allowedOrigins: [...prev.allowedOrigins, newOrigin.trim()]
      }))
      setNewOrigin('')
    }
  }

  const handleRemoveOrigin = (indexToRemove: number) => {
    setCurrentApiSettings(prev => ({
      ...prev,
      allowedOrigins: prev.allowedOrigins.filter((_, index) => index !== indexToRemove)
    }))
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
          <p className="text-gray-300">Configure system preferences, notifications, and integrations</p>
        </div>
        <div className="flex gap-2">
          {lastSaved && (
            <span className="text-green-400 text-sm flex items-center gap-1">
              <Save className="w-3 h-3" />
              Last saved: {lastSaved}
            </span>
          )}
          <Button 
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg overflow-x-auto">
        {[
          { id: 'general', label: 'General', icon: Settings },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'theme', label: 'Theme', icon: Palette },
          { id: 'database', label: 'Database', icon: Database },
          { id: 'email', label: 'Email', icon: Mail },
          { id: 'api', label: 'API', icon: Globe }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                selectedTab === tab.id
                  ? 'bg-persian-green-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {selectedTab === 'general' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Site Information */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Site Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={currentSystemSettings.siteName}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, siteName: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={currentSystemSettings.siteDescription}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    value={currentSystemSettings.adminEmail}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, adminEmail: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={currentSystemSettings.supportEmail}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* System Configuration */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">System Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Maintenance Mode</p>
                    <p className="text-gray-400 text-sm">Temporarily disable public access</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentSystemSettings.maintenanceMode}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Registration Enabled</p>
                    <p className="text-gray-400 text-sm">Allow new user registrations</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentSystemSettings.registrationEnabled}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, registrationEnabled: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Email Verification Required</p>
                    <p className="text-gray-400 text-sm">Require email verification for new accounts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentSystemSettings.emailVerificationRequired}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, emailVerificationRequired: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Auto-approve Artisans</p>
                    <p className="text-gray-400 text-sm">Automatically approve artisan applications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentSystemSettings.autoApproveArtisans}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, autoApproveArtisans: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Default Commission Rate (%)
                  </label>
                  <input
                    type="number"
                    value={currentSystemSettings.defaultCommissionRate}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, defaultCommissionRate: parseFloat(e.target.value) || 0 }))}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Upload Settings */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">File Upload Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Max File Upload Size (MB)
                  </label>
                  <input
                    type="number"
                    value={currentSystemSettings.maxFileUploadSize}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, maxFileUploadSize: parseInt(e.target.value) || 1 }))}
                    min="1"
                    max="100"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Allowed File Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {currentSystemSettings.allowedFileTypes.map((type, index) => (
                      <span key={index} className="px-2 py-1 bg-persian-green-500/20 text-persian-green-400 rounded-full text-xs flex items-center gap-1">
                        .{type}
                        <button
                          onClick={() => handleRemoveFileType(type)}
                          className="text-red-400 hover:text-red-300 ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={newFileType}
                      onChange={(e) => setNewFileType(e.target.value)}
                      placeholder="Add file type (e.g., pdf)"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddFileType()}
                    />
                    <button
                      onClick={handleAddFileType}
                      className="px-4 py-2 bg-persian-green-500 text-white rounded-lg hover:bg-persian-green-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Localization */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Localization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Timezone
                  </label>
                  <select
                    value={currentSystemSettings.timezone}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  >
                    <option value="Africa/Dar_es_Salaam">Africa/Dar es Salaam (EAT)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Default Language
                  </label>
                  <select
                    value={currentSystemSettings.language}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  >
                    <option value="en">English</option>
                    <option value="sw">Swahili</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Default Currency
                  </label>
                  <select
                    value={currentSystemSettings.currency}
                    onChange={(e) => setCurrentSystemSettings(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  >
                    <option value="TZS">Tanzanian Shilling (TZS)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="KES">Kenyan Shilling (KES)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Save General Settings Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveSystemSettings}
              className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save General Settings
            </Button>
          </div>
        </div>
      )}

      {selectedTab === 'notifications' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notification Channels */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Notification Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Email Notifications</p>
                    <p className="text-gray-400 text-sm">Send notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentNotificationSettings.emailNotifications}
                    onChange={(e) => setCurrentNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">SMS Notifications</p>
                    <p className="text-gray-400 text-sm">Send notifications via SMS</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentNotificationSettings.smsNotifications}
                    onChange={(e) => setCurrentNotificationSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Push Notifications</p>
                    <p className="text-gray-400 text-sm">Send push notifications to mobile apps</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentNotificationSettings.pushNotifications}
                    onChange={(e) => setCurrentNotificationSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Notifications */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Event Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">New Artisan Registration</p>
                    <p className="text-gray-400 text-sm">When a new artisan registers</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentNotificationSettings.newArtisanRegistration}
                    onChange={(e) => setCurrentNotificationSettings(prev => ({ ...prev, newArtisanRegistration: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">New Product Submission</p>
                    <p className="text-gray-400 text-sm">When a product is submitted for review</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentNotificationSettings.newProductSubmission}
                    onChange={(e) => setCurrentNotificationSettings(prev => ({ ...prev, newProductSubmission: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Payment Received</p>
                    <p className="text-gray-400 text-sm">When a payment is processed</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentNotificationSettings.paymentReceived}
                    onChange={(e) => setCurrentNotificationSettings(prev => ({ ...prev, paymentReceived: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Security Alerts</p>
                    <p className="text-gray-400 text-sm">Security-related notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentNotificationSettings.securityAlerts}
                    onChange={(e) => setCurrentNotificationSettings(prev => ({ ...prev, securityAlerts: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">System Maintenance</p>
                    <p className="text-gray-400 text-sm">Maintenance and downtime alerts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentNotificationSettings.systemMaintenance}
                    onChange={(e) => setCurrentNotificationSettings(prev => ({ ...prev, systemMaintenance: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report Notifications */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Report Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Weekly Reports</p>
                    <p className="text-gray-400 text-sm">Weekly summary reports</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentNotificationSettings.weeklyReports}
                    onChange={(e) => setCurrentNotificationSettings(prev => ({ ...prev, weeklyReports: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Monthly Reports</p>
                    <p className="text-gray-400 text-sm">Monthly analytics reports</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentNotificationSettings.monthlyReports}
                    onChange={(e) => setCurrentNotificationSettings(prev => ({ ...prev, monthlyReports: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Save Notification Settings Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveNotificationSettings}
              className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Notification Settings
            </Button>
          </div>
        </div>
      )}

      {selectedTab === 'theme' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Color Scheme */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Color Scheme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Primary Color (Persian Green)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={currentThemeSettings.primaryColor}
                      onChange={(e) => setCurrentThemeSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-12 h-10 rounded border border-gray-600 bg-gray-800"
                    />
                    <input
                      type="text"
                      value={currentThemeSettings.primaryColor}
                      onChange={(e) => setCurrentThemeSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Secondary Color (Ivory)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={currentThemeSettings.secondaryColor}
                      onChange={(e) => setCurrentThemeSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-12 h-10 rounded border border-gray-600 bg-gray-800"
                    />
                    <input
                      type="text"
                      value={currentThemeSettings.secondaryColor}
                      onChange={(e) => setCurrentThemeSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Accent Color (Copper Patina)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={currentThemeSettings.accentColor}
                      onChange={(e) => setCurrentThemeSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-12 h-10 rounded border border-gray-600 bg-gray-800"
                    />
                    <input
                      type="text"
                      value={currentThemeSettings.accentColor}
                      onChange={(e) => setCurrentThemeSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Dark Mode</p>
                    <p className="text-gray-400 text-sm">Use dark theme for admin panel</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentThemeSettings.darkMode}
                    onChange={(e) => setCurrentThemeSettings(prev => ({ ...prev, darkMode: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Branding */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Branding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Custom Logo URL
                  </label>
                  <input
                    type="text"
                    value={currentThemeSettings.customLogo}
                    onChange={(e) => setCurrentThemeSettings(prev => ({ ...prev, customLogo: e.target.value }))}
                    placeholder="/logo-custom.svg"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="text"
                    value={currentThemeSettings.favicon}
                    onChange={(e) => setCurrentThemeSettings(prev => ({ ...prev, favicon: e.target.value }))}
                    placeholder="/favicon.ico"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Upload Logo
                  </label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    <span className="text-gray-400 text-sm">SVG, PNG, or JPG (max 2MB)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Custom CSS */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Custom CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Additional CSS Styles
                </label>
                <textarea
                  value={currentThemeSettings.customCSS}
                  onChange={(e) => setCurrentThemeSettings(prev => ({ ...prev, customCSS: e.target.value }))}
                  placeholder="/* Add your custom CSS here */"
                  rows={10}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                />
                <p className="text-gray-400 text-xs mt-2">
                  Custom CSS will be applied to the public-facing website. Use with caution.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Save Theme Settings Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveThemeSettings}
              className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Theme Settings
            </Button>
          </div>
        </div>
      )}

      {selectedTab === 'database' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Database Status */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Database Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Database Size</span>
                  <span className="text-white font-medium">{currentDatabaseSettings.databaseSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Records</span>
                  <span className="text-white font-medium">{currentDatabaseSettings.totalRecords.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Last Backup</span>
                  <span className="text-white font-medium">{formatDate(currentDatabaseSettings.lastBackup)}</span>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleBackupDatabase}
                    className="bg-persian-green-500 hover:bg-persian-green-600 text-white flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                  <Button 
                    onClick={handleRestoreDatabase}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Restore
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Backup Settings */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Backup Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Backup Frequency
                  </label>
                  <select
                    value={currentDatabaseSettings.backupFrequency}
                    onChange={(e) => setCurrentDatabaseSettings(prev => ({ ...prev, backupFrequency: e.target.value as 'daily' | 'weekly' | 'monthly' }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Backup Retention (days)
                  </label>
                  <input
                    type="number"
                    value={currentDatabaseSettings.backupRetention}
                    onChange={(e) => setCurrentDatabaseSettings(prev => ({ ...prev, backupRetention: parseInt(e.target.value) || 1 }))}
                    min="1"
                    max="365"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Automatic Backup</p>
                    <p className="text-gray-400 text-sm">Enable scheduled backups</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentDatabaseSettings.autoBackup}
                    onChange={(e) => setCurrentDatabaseSettings(prev => ({ ...prev, autoBackup: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Save Database Settings Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveDatabaseSettings}
              className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Database Settings
            </Button>
          </div>
        </div>
      )}

      {selectedTab === 'email' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SMTP Configuration */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">SMTP Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={currentEmailSettings.smtpHost}
                    onChange={(e) => setCurrentEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    value={currentEmailSettings.smtpPort}
                    onChange={(e) => setCurrentEmailSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) || 587 }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={currentEmailSettings.smtpUsername}
                    onChange={(e) => setCurrentEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={currentEmailSettings.smtpPassword}
                      onChange={(e) => setCurrentEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                      className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Encryption
                  </label>
                  <select
                    value={currentEmailSettings.smtpEncryption}
                    onChange={(e) => setCurrentEmailSettings(prev => ({ ...prev, smtpEncryption: e.target.value as 'none' | 'tls' | 'ssl' }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  >
                    <option value="none">None</option>
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Email Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    From Email
                  </label>
                  <input
                    type="email"
                    value={currentEmailSettings.fromEmail}
                    onChange={(e) => setCurrentEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    From Name
                  </label>
                  <input
                    type="text"
                    value={currentEmailSettings.fromName}
                    onChange={(e) => setCurrentEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div className="pt-4">
                  <Button 
                    onClick={handleTestEmail}
                    className="bg-persian-green-500 hover:bg-persian-green-600 text-white w-full"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Test Email
                  </Button>
                  {testEmailSent && (
                    <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Test email sent successfully
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Save Email Settings Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveEmailSettings}
              className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Email Settings
            </Button>
          </div>
        </div>
      )}

      {selectedTab === 'api' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Security */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">API Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">Rate Limiting</p>
                    <p className="text-gray-400 text-sm">Enable API rate limiting</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentApiSettings.rateLimitEnabled}
                    onChange={(e) => setCurrentApiSettings(prev => ({ ...prev, rateLimitEnabled: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Requests per Window
                  </label>
                  <input
                    type="number"
                    value={currentApiSettings.rateLimitRequests}
                    onChange={(e) => setCurrentApiSettings(prev => ({ ...prev, rateLimitRequests: parseInt(e.target.value) || 100 }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Window Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={currentApiSettings.rateLimitWindow}
                    onChange={(e) => setCurrentApiSettings(prev => ({ ...prev, rateLimitWindow: parseInt(e.target.value) || 15 }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">API Key Required</p>
                    <p className="text-gray-400 text-sm">Require API key for access</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentApiSettings.apiKeyRequired}
                    onChange={(e) => setCurrentApiSettings(prev => ({ ...prev, apiKeyRequired: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* CORS Settings */}
            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">CORS Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 font-medium">CORS Enabled</p>
                    <p className="text-gray-400 text-sm">Enable Cross-Origin Resource Sharing</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentApiSettings.corsEnabled}
                    onChange={(e) => setCurrentApiSettings(prev => ({ ...prev, corsEnabled: e.target.checked }))}
                    className="w-4 h-4 text-persian-green-500 bg-gray-800 border-gray-600 rounded focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Allowed Origins
                  </label>
                  <div className="space-y-2">
                    {currentApiSettings.allowedOrigins.map((origin, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={origin}
                          onChange={(e) => {
                            const newOrigins = [...currentApiSettings.allowedOrigins];
                            newOrigins[index] = e.target.value;
                            setCurrentApiSettings(prev => ({ ...prev, allowedOrigins: newOrigins }));
                          }}
                          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                        />
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          onClick={() => handleRemoveOrigin(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button 
                      size="sm" 
                      className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
                      onClick={handleAddOrigin}
                    >
                      Add Origin
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Webhook Settings */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Webhook Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    value={currentApiSettings.webhookUrl}
                    onChange={(e) => setCurrentApiSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Webhook Secret
                  </label>
                  <div className="relative">
                    <input
                      type={showWebhookSecret ? 'text' : 'password'}
                      value={currentApiSettings.webhookSecret}
                      onChange={(e) => setCurrentApiSettings(prev => ({ ...prev, webhookSecret: e.target.value }))}
                      className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showWebhookSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Save API Settings Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveApiSettings}
              className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save API Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}