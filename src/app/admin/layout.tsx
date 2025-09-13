'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  UserCog,
  Package, 
  DollarSign, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Shield,
  Bell,
  BarChart3,
  FileText,
  Warehouse,
  Headphones
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import NotificationDropdown from '@/components/NotificationDropdown'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    window.location.href = '/admin/login'
  }

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/admin'
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      href: '/admin/analytics'
    },
    {
      icon: UserCog,
      label: 'User Management',
      href: '/admin/users',
      badge: '5'
    },
    {
      icon: Users,
      label: 'Artisan Management',
      href: '/admin/artisans',
      badge: '12'
    },
    {
      icon: Package,
      label: 'Product Oversight',
      href: '/admin/products',
      badge: '45'
    },
    {
      icon: DollarSign,
      label: 'Financial Control',
      href: '/admin/financial'
    },
    {
      icon: FileText,
      label: 'Content Management',
      href: '/admin/content',
      badge: '8'
    },
    {
      icon: Warehouse,
      label: 'Inventory Management',
      href: '/admin/inventory',
      badge: '2'
    },
    {
      icon: Headphones,
      label: 'Customer Support',
      href: '/admin/support',
      badge: '5'
    },

    {
      icon: MessageSquare,
      label: 'Community Monitor',
      href: '/admin/community',
      badge: '3'
    },
    {
      icon: Shield,
      label: 'Security',
      href: '/admin/security'
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/admin/settings'
    }
  ]

  // Function to check if a menu item is active
  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  // Check if we're on the login page
  if (typeof window !== 'undefined' && window.location.pathname.includes('/login')) {
    return children
  }

  return (
    <div className="min-h-screen bg-graphite text-white">
      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out flex flex-col',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Fixed Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-persian-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <nav className="p-3 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 group',
                    active
                      ? 'bg-persian-green-500 text-white shadow-lg transform scale-105' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:transform hover:scale-102'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={cn(
                      "w-5 h-5 transition-colors",
                      active ? "text-white" : "text-gray-400 group-hover:text-white"
                    )} />
                    <span className={cn(
                      "font-medium transition-colors",
                      active ? "text-white font-semibold" : "text-gray-300 group-hover:text-white"
                    )}>
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full font-medium transition-all duration-200",
                        active 
                          ? "bg-white text-persian-green-600" 
                          : "bg-red-500 text-white group-hover:bg-red-400"
                      )}>
                        {item.badge}
                      </span>
                    )}
                    {active && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-3 border-t border-gray-800 bg-gray-900">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-gray-900 border-b border-gray-800 h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Craft&Art Marketplace Admin</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {mounted && <NotificationDropdown />}

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-persian-green-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">A</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-400">admin@persiangreen.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}