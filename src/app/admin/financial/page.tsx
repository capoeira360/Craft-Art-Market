'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Smartphone, Download, Filter, Search, Calendar, AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts'

interface Transaction {
  id: string
  type: 'sale' | 'commission' | 'payout' | 'refund'
  amount: number
  commission: number
  artisanId: string
  artisanName: string
  productId: string
  productName: string
  customerId: string
  customerName: string
  paymentMethod: 'mpesa' | 'card' | 'bank'
  mpesaReference?: string
  status: 'completed' | 'pending' | 'failed' | 'reconciled'
  createdAt: string
  reconciledAt?: string
  notes?: string
}

interface PayoutBatch {
  id: string
  batchNumber: string
  totalAmount: number
  totalTransactions: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: string
  processedAt?: string
  artisans: {
    id: string
    name: string
    amount: number
    phone: string
  }[]
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'sale',
    amount: 85000,
    commission: 12750,
    artisanId: '1',
    artisanName: 'Amara Tingatinga',
    productId: 'p1',
    productName: 'Tingatinga Elephant Painting',
    customerId: 'c1',
    customerName: 'John Mwalimu',
    paymentMethod: 'mpesa',
    mpesaReference: 'QA12B34C5D',
    status: 'completed',
    createdAt: '2024-01-20T10:30:00Z',
    reconciledAt: '2024-01-20T11:00:00Z'
  },
  {
    id: '2',
    type: 'sale',
    amount: 45000,
    commission: 6750,
    artisanId: '2',
    artisanName: 'Jengo Makonde',
    productId: 'p2',
    productName: 'Kitenge Handbag',
    customerId: 'c2',
    customerName: 'Sarah Kimani',
    paymentMethod: 'mpesa',
    mpesaReference: 'QA23C45D6E',
    status: 'pending',
    createdAt: '2024-01-20T14:15:00Z'
  },
  {
    id: '3',
    type: 'payout',
    amount: 72250,
    commission: 0,
    artisanId: '1',
    artisanName: 'Amara Tingatinga',
    productId: '',
    productName: '',
    customerId: '',
    customerName: '',
    paymentMethod: 'mpesa',
    mpesaReference: 'QA34D56E7F',
    status: 'completed',
    createdAt: '2024-01-19T16:45:00Z',
    reconciledAt: '2024-01-19T17:00:00Z'
  },
  {
    id: '4',
    type: 'sale',
    amount: 150000,
    commission: 22500,
    artisanId: '3',
    artisanName: 'Neema Makonde',
    productId: 'p3',
    productName: 'Makonde Sculpture',
    customerId: 'c3',
    customerName: 'David Mwanza',
    paymentMethod: 'card',
    status: 'completed',
    createdAt: '2024-01-19T09:20:00Z',
    reconciledAt: '2024-01-19T09:25:00Z'
  },
  {
    id: '5',
    type: 'sale',
    amount: 25000,
    commission: 3750,
    artisanId: '4',
    artisanName: 'Baraka Maasai',
    productId: 'p4',
    productName: 'Maasai Necklace',
    customerId: 'c4',
    customerName: 'Grace Mollel',
    paymentMethod: 'mpesa',
    mpesaReference: 'QA45E67F8G',
    status: 'failed',
    createdAt: '2024-01-18T13:10:00Z',
    notes: 'Insufficient funds'
  }
]

const payoutBatches: PayoutBatch[] = [
  {
    id: '1',
    batchNumber: 'BATCH-2024-001',
    totalAmount: 245000,
    totalTransactions: 8,
    status: 'completed',
    createdAt: '2024-01-19T08:00:00Z',
    processedAt: '2024-01-19T10:30:00Z',
    artisans: [
      { id: '1', name: 'Amara Tingatinga', amount: 85000, phone: '+255712345678' },
      { id: '2', name: 'Jengo Makonde', amount: 67000, phone: '+255713456789' },
      { id: '4', name: 'Baraka Maasai', amount: 93000, phone: '+255715678901' }
    ]
  },
  {
    id: '2',
    batchNumber: 'BATCH-2024-002',
    totalAmount: 156000,
    totalTransactions: 5,
    status: 'processing',
    createdAt: '2024-01-20T08:00:00Z',
    artisans: [
      { id: '3', name: 'Neema Makonde', amount: 78000, phone: '+255714567890' },
      { id: '5', name: 'Fatuma Zanzibari', amount: 78000, phone: '+255716789012' }
    ]
  }
]

const revenueData = [
  { month: 'Sep', revenue: 1200000, commission: 180000, payouts: 1020000 },
  { month: 'Oct', revenue: 1800000, commission: 270000, payouts: 1530000 },
  { month: 'Nov', revenue: 2400000, commission: 360000, payouts: 2040000 },
  { month: 'Dec', revenue: 3200000, commission: 480000, payouts: 2720000 },
  { month: 'Jan', revenue: 4100000, commission: 615000, payouts: 3485000 }
]

const paymentMethodData = [
  { name: 'M-Pesa', value: 75, color: '#2A9D8F' },
  { name: 'Credit Card', value: 20, color: '#9D7A6D' },
  { name: 'Bank Transfer', value: 5, color: '#1E5F8B' }
]

const commissionTrendData = [
  { date: '2024-01-15', commission: 45000 },
  { date: '2024-01-16', commission: 67000 },
  { date: '2024-01-17', commission: 52000 },
  { date: '2024-01-18', commission: 78000 },
  { date: '2024-01-19', commission: 89000 },
  { date: '2024-01-20', commission: 95000 }
]

export default function FinancialControlPage() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateRange, setDateRange] = useState('7d')
  const [isReconciling, setIsReconciling] = useState(false)
  const [isProcessingBatch, setIsProcessingBatch] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'e':
            event.preventDefault()
            handleExportData()
            break
          case 'r':
            event.preventDefault()
            if (!isReconciling) {
              handleReconcileMpesa()
            }
            break
          case 'f':
             event.preventDefault()
             const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
             searchInput?.focus()
             break
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isReconciling])
  
  const handleClearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setDateRange('7d')
    setRefreshKey(prev => prev + 1)
  }
  
  const getFilterCount = () => {
    let count = 0
    if (searchTerm !== '') count++
    if (statusFilter !== 'all') count++
    if (dateRange !== '7d') count++
    return count
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchTerm === '' || 
                         transaction.artisanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (transaction.mpesaReference && transaction.mpesaReference.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    
    // Date range filtering
    const transactionDate = new Date(transaction.createdAt)
    const now = new Date()
    const daysDiff = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24))
    
    let matchesDateRange = true
    switch (dateRange) {
      case '7d':
        matchesDateRange = daysDiff <= 7
        break
      case '30d':
        matchesDateRange = daysDiff <= 30
        break
      case '90d':
        matchesDateRange = daysDiff <= 90
        break
      default:
        matchesDateRange = true
    }
    
    return matchesSearch && matchesStatus && matchesDateRange
  })

  const totalRevenue = transactions.filter(t => t.type === 'sale' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)
  const totalCommission = transactions.filter(t => t.type === 'sale' && t.status === 'completed').reduce((sum, t) => sum + t.commission, 0)
  const pendingPayouts = transactions.filter(t => t.type === 'sale' && t.status === 'completed').reduce((sum, t) => sum + (t.amount - t.commission), 0)
  const mpesaTransactions = transactions.filter(t => t.paymentMethod === 'mpesa')
  const unreconciledMpesa = mpesaTransactions.filter(t => t.status !== 'reconciled' && t.status !== 'failed').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'reconciled': return 'text-green-600 bg-green-100'
      case 'pending': case 'processing': return 'text-yellow-600 bg-yellow-100'
      case 'failed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'mpesa': return <Smartphone className="w-4 h-4" />
      case 'card': return <CreditCard className="w-4 h-4" />
      default: return <DollarSign className="w-4 h-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return `TSh ${amount.toLocaleString()}`
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

  const handleReconcileMpesa = async () => {
    try {
      setIsReconciling(true)
      console.log('Starting M-Pesa reconciliation...')
      
      // Simulate API call for M-Pesa reconciliation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // In a real app, you would:
      // const result = await reconcileMpesaTransactions()
      
      alert('M-Pesa reconciliation completed successfully!')
      setIsReconciling(false)
    } catch (error) {
      console.error('M-Pesa reconciliation failed:', error)
      alert('M-Pesa reconciliation failed. Please try again.')
      setIsReconciling(false)
    }
  }

  const handleProcessPayout = async (batchId: string) => {
    const batch = payoutBatches.find(b => b.id === batchId)
    if (!batch) {
      alert('Payout batch not found.')
      return
    }
    
    const confirmMessage = `Are you sure you want to process payout batch ${batch.batchNumber}?\n\nDetails:\n- Total Amount: ${formatCurrency(batch.totalAmount)}\n- Artisans: ${batch.totalTransactions}\n- Status: ${batch.status}\n\nThis action cannot be undone.`
    
    if (confirm(confirmMessage)) {
      try {
        setIsProcessingBatch(batchId)
        console.log('Processing payout batch:', batchId)
        
        // Simulate processing time
        const processingAlert = setTimeout(() => {
          alert('Processing payout batch... This may take a few minutes.')
        }, 1000)
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 3000))
        clearTimeout(processingAlert)
        
        // Update batch status (in real app, this would come from API response)
        batch.status = 'processing'
        batch.processedAt = new Date().toISOString()
        
        alert(`Payout batch ${batch.batchNumber} processed successfully!\n\nM-Pesa transactions initiated for ${batch.artisans.length} artisans.\nTotal amount: ${formatCurrency(batch.totalAmount)}`)
        
        // Force re-render
        setRefreshKey(prev => prev + 1)
        
        // In a real app, you would make an API call here
        // await processPayoutBatch(batchId)
      } catch (error) {
        console.error('Failed to process payout batch:', error)
        alert('Failed to process payout batch. Please try again.')
      } finally {
        setIsProcessingBatch(null)
      }
    }
  }
  
  const handleReconcileTransaction = async (transactionId: string) => {
    const transaction = transactions.find(t => t.id === transactionId)
    if (!transaction) {
      alert('Transaction not found.')
      return
    }
    
    try {
      console.log('Reconciling transaction:', transactionId)
      
      // Simulate reconciliation process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update transaction status (in real app, this would come from API response)
      transaction.status = 'reconciled'
      transaction.reconciledAt = new Date().toISOString()
      
      alert(`Transaction ${transaction.mpesaReference} reconciled successfully!\n\nAmount: ${formatCurrency(transaction.amount)}\nArtisan: ${transaction.artisanName}`)
      
      // Force re-render by updating refresh key
       setRefreshKey(prev => prev + 1)
      
    } catch (error) {
      console.error('Failed to reconcile transaction:', error)
      alert('Failed to reconcile transaction. Please try again.')
    }
  }

  const handleExportData = () => {
    try {
      console.log('Exporting financial data')
      
      // Generate comprehensive export data
      const exportData = {
        summary: {
          totalTransactions: transactions.length,
          totalRevenue: totalRevenue,
          totalCommissions: totalCommission,
          pendingPayouts: pendingPayouts,
          mpesaTransactions: mpesaTransactions.length,
          unreconciledMpesa: unreconciledMpesa,
          exportDate: new Date().toISOString(),
          dateRange: dateRange
        },
        transactions: filteredTransactions,
        payoutBatches: payoutBatches,
        revenueData: revenueData,
        paymentMethodData: paymentMethodData
      }
      
      // Create and download CSV file
      const csvContent = generateCSVContent(exportData)
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `financial-report-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      alert('Financial data exported successfully! Check your downloads folder.')
    } catch (error) {
      console.error('Failed to export financial data:', error)
      alert('Failed to export financial data. Please try again.')
    }
  }
  
  const generateCSVContent = (data: any) => {
    const headers = ['Transaction ID', 'Type', 'Amount', 'Commission', 'Artisan', 'Product', 'Customer', 'Payment Method', 'Status', 'Date']
    const rows = data.transactions.map((t: Transaction) => [
      t.id,
      t.type,
      t.amount,
      t.commission,
      t.artisanName,
      t.productName,
      t.customerName,
      t.paymentMethod,
      t.status,
      new Date(t.createdAt).toLocaleDateString()
    ])
    
    return [headers, ...rows].map(row => row.join(',')).join('\n')
  }

  const handleCreateNewBatch = () => {
    try {
      console.log('Creating new payout batch...')
      // In a real app, you would navigate to create new payout batch page
      // For now, we'll simulate the creation process
      const pendingTransactions = transactions.filter(t => 
        t.type === 'sale' && 
        t.status === 'completed' && 
        !payoutBatches.some(batch => 
          batch.artisans.some(artisan => artisan.id === t.artisanId)
        )
      )
      
      if (pendingTransactions.length === 0) {
        alert('No pending transactions available for payout batch creation.')
        return
      }
      
      const batchNumber = `BATCH-${new Date().getFullYear()}-${String(payoutBatches.length + 1).padStart(3, '0')}`
      alert(`Creating new payout batch: ${batchNumber} with ${pendingTransactions.length} transactions`)
      
      // router.push('/admin/financial/payouts/create')
    } catch (error) {
      console.error('Failed to create new batch:', error)
      alert('Failed to create new payout batch. Please try again.')
    }
  }

  const handleManualUpload = () => {
    try {
      // Open file upload dialog for manual M-Pesa statement upload
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.csv,.xlsx,.xls'
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          console.log('Uploading M-Pesa statement:', file.name)
          
          // Validate file size (max 10MB)
          if (file.size > 10 * 1024 * 1024) {
            alert('File size too large. Please upload a file smaller than 10MB.')
            return
          }
          
          // Validate file type
          const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
          if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Please upload a CSV or Excel file.')
            return
          }
          
          alert(`Uploading ${file.name} for manual reconciliation...\nFile size: ${(file.size / 1024 / 1024).toFixed(2)} MB`)
          
          // Simulate upload progress
          setTimeout(() => {
            alert('File uploaded successfully! Processing reconciliation data...')
          }, 2000)
          
          // In a real app, you would upload and process the file
          // uploadMpesaStatement(file)
        }
      }
      input.click()
    } catch (error) {
      console.error('Failed to upload M-Pesa statement:', error)
      alert('Failed to upload M-Pesa statement. Please try again.')
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Financial Control</h1>
          <p className="text-gray-300">Monitor revenue, commissions, and manage payouts with M-Pesa reconciliation</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleReconcileMpesa}
            disabled={isReconciling}
            className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
            title="Reconcile M-Pesa transactions (Ctrl+R)"
          >
            {isReconciling ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Smartphone className="w-4 h-4 mr-2" />
            )}
            {isReconciling ? 'Reconciling...' : 'Reconcile M-Pesa'}
          </Button>
          <Button 
            onClick={handleExportData}
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            title="Export financial data (Ctrl+E)"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <div className="hidden lg:flex items-center text-xs text-gray-400 ml-2">
            <span>Shortcuts: Ctrl+E (Export), Ctrl+R (Reconcile), Ctrl+F (Search)</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
                <p className="text-green-400 text-sm flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.5% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-persian-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-persian-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Commission Earned</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalCommission)}</p>
                <p className="text-green-400 text-sm flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8.3% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-copper-patina/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-copper-patina" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Payouts</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(pendingPayouts)}</p>
                <p className="text-yellow-400 text-sm">{payoutBatches.filter(b => b.status === 'pending').length} batches pending</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-graphite border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">M-Pesa Status</p>
                <p className="text-2xl font-bold text-white">{mpesaTransactions.length}</p>
                <p className={`text-sm flex items-center gap-1 ${unreconciledMpesa > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {unreconciledMpesa > 0 ? (
                    <AlertCircle className="w-3 h-3" />
                  ) : (
                    <CheckCircle className="w-3 h-3" />
                  )}
                  {unreconciledMpesa} unreconciled
                </p>
              </div>
              <div className="w-12 h-12 bg-zanzibar-twilight/20 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-zanzibar-twilight" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'transactions', label: 'Transactions' },
          { id: 'payouts', label: 'Payouts' },
          { id: 'reconciliation', label: 'M-Pesa Reconciliation' }
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
                <CardTitle className="text-white">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#2A9D8F" 
                      fill="#2A9D8F"
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="commission" 
                      stroke="#9D7A6D" 
                      fill="#9D7A6D"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-graphite border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Commission Trend */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Daily Commission Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={commissionTrendData}>
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
                  <Line 
                    type="monotone" 
                    dataKey="commission" 
                    stroke="#2A9D8F" 
                    strokeWidth={3}
                    dot={{ fill: '#2A9D8F', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'transactions' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card className="bg-graphite border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search transactions by artisan, product, customer, or M-Pesa reference..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="reconciled">Reconciled</option>
                  </select>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </select>
                  {getFilterCount() > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearFilters}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 px-3"
                    >
                      Clear ({getFilterCount()})
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Transactions ({filteredTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Transaction</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Commission</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Payment</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-white font-medium">
                              {transaction.type === 'sale' ? transaction.productName : `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}`}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {transaction.type === 'sale' ? `by ${transaction.artisanName}` : transaction.artisanName}
                            </p>
                            {transaction.type === 'sale' && (
                              <p className="text-gray-500 text-xs">Customer: {transaction.customerName}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-white font-medium">{formatCurrency(transaction.amount)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-copper-patina font-medium">
                            {transaction.commission > 0 ? formatCurrency(transaction.commission) : '-'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {getPaymentMethodIcon(transaction.paymentMethod)}
                            <div>
                              <p className="text-white text-sm capitalize">{transaction.paymentMethod}</p>
                              {transaction.mpesaReference && (
                                <p className="text-gray-400 text-xs font-mono">{transaction.mpesaReference}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <p className="text-white">{formatDate(transaction.createdAt)}</p>
                            {transaction.reconciledAt && (
                              <p className="text-gray-400 text-xs">Reconciled: {formatDate(transaction.reconciledAt)}</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'payouts' && (
        <div className="space-y-6">
          {/* Payout Batches */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Payout Batches</CardTitle>
                <Button 
                  className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
                  onClick={handleCreateNewBatch}
                >
                  Create New Batch
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutBatches.map((batch) => (
                  <div key={batch.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white font-medium">{batch.batchNumber}</h3>
                        <p className="text-gray-400 text-sm">{formatDate(batch.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-white font-medium">{formatCurrency(batch.totalAmount)}</p>
                          <p className="text-gray-400 text-sm">{batch.totalTransactions} transactions</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(batch.status)}`}>
                          {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                        </span>
                        {batch.status === 'pending' && (
                          <Button 
                            size="sm"
                            onClick={() => handleProcessPayout(batch.id)}
                            disabled={isProcessingBatch === batch.id}
                            className="bg-persian-green-500 hover:bg-persian-green-600 text-white disabled:opacity-50"
                          >
                            {isProcessingBatch === batch.id ? (
                              <>
                                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              'Process'
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {batch.artisans.map((artisan) => (
                        <div key={artisan.id} className="bg-gray-900 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-medium">{artisan.name}</p>
                              <p className="text-gray-400 text-sm">{artisan.phone}</p>
                            </div>
                            <p className="text-persian-green-400 font-medium">{formatCurrency(artisan.amount)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'reconciliation' && (
        <div className="space-y-6">
          {/* M-Pesa Reconciliation */}
          <Card className="bg-graphite border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">M-Pesa Reconciliation</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleReconcileMpesa}
                    disabled={isReconciling}
                    className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
                  >
                    {isReconciling ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    {isReconciling ? 'Reconciling...' : 'Auto Reconcile'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={handleManualUpload}
                  >
                    Manual Upload
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{mpesaTransactions.filter(t => t.status === 'reconciled').length}</p>
                      <p className="text-gray-400 text-sm">Reconciled</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{unreconciledMpesa}</p>
                      <p className="text-gray-400 text-sm">Pending</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{mpesaTransactions.filter(t => t.status === 'failed').length}</p>
                      <p className="text-gray-400 text-sm">Failed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">M-Pesa Reference</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Transaction</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mpesaTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                        <td className="py-4 px-4">
                          <span className="text-white font-mono">{transaction.mpesaReference}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-white font-medium">{transaction.productName || transaction.type}</p>
                            <p className="text-gray-400 text-sm">{transaction.artisanName}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-white font-medium">{formatCurrency(transaction.amount)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-white text-sm">{formatDate(transaction.createdAt)}</span>
                        </td>
                        <td className="py-4 px-4">
                          {transaction.status === 'pending' && (
                            <Button 
                              size="sm" 
                              className="bg-persian-green-500 hover:bg-persian-green-600 text-white"
                              onClick={() => handleReconcileTransaction(transaction.id)}
                            >
                              Reconcile
                            </Button>
                          )}
                          {transaction.status === 'failed' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                              onClick={() => handleReconcileTransaction(transaction.id)}
                            >
                              Retry
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}