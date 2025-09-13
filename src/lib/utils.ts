import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function generateQRCode(text: string): string {
  // Simple QR code generation URL (in production, use a proper QR library)
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`
}

export function detectDevice(): 'ios' | 'android' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  
  const userAgent = window.navigator.userAgent
  
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'ios'
  } else if (/Android/.test(userAgent)) {
    return 'android'
  } else {
    return 'desktop'
  }
}

export function getAppStoreUrl(device: 'ios' | 'android'): string {
  if (device === 'ios') {
    return 'https://apps.apple.com/app/craftartmarketplace/id123456789'
  } else {
    return 'https://play.google.com/store/apps/details?id=com.craftartmarketplace.app'
  }
}

export function generateDeepLink(path: string = ''): string {
  return `persiangreen://open${path ? `/${path}` : ''}`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhoneNumber(phone: string): boolean {
  // Tanzania phone number format: +255XXXXXXXXX
  const phoneRegex = /^\+255[67]\d{8}$/
  return phoneRegex.test(phone)
}

export function formatPhoneNumber(phone: string): string {
  // Format Tanzania phone number
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('255')) {
    return `+${cleaned}`
  } else if (cleaned.startsWith('0')) {
    return `+255${cleaned.slice(1)}`
  } else {
    return `+255${cleaned}`
  }
}

export function generateSMSLink(phone: string, message: string): string {
  const formattedPhone = formatPhoneNumber(phone)
  return `sms:${formattedPhone}?body=${encodeURIComponent(message)}`
}

export function getRandomPersianGreenGradient(): string {
  const gradients = [
    'gradient-persian-1',
    'gradient-persian-2',
    'gradient-persian-3',
    'gradient-persian-4',
    'gradient-persian-5',
    'gradient-persian-6',
    'gradient-persian-7',
    'gradient-persian-8',
  ]
  return gradients[Math.floor(Math.random() * gradients.length)]
}