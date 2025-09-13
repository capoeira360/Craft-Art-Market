'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface PersianGreenLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'bead' | 'spinner' | 'pulse' | 'wave'
  className?: string
  text?: string
}

export function PersianGreenLoader({ 
  size = 'md', 
  variant = 'bead', 
  className,
  text 
}: PersianGreenLoaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 1) % 100)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  if (variant === 'bead') {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
        <div className="relative">
          {/* Main Bead */}
          <div className={cn(
            'bead-loader',
            sizeClasses[size]
          )} />
          
          {/* Orbiting Beads */}
          <div className={cn(
            'absolute inset-0 animate-spin',
            sizeClasses[size]
          )}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 bg-copper-patina rounded-full transform -translate-x-1/2" />
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-zanzibar-twilight rounded-full transform -translate-y-1/2" />
            <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-ivory rounded-full transform -translate-x-1/2" />
            <div className="absolute top-1/2 -left-1 w-2 h-2 bg-persian-green-300 rounded-full transform -translate-y-1/2" />
          </div>
        </div>
        
        {text && (
          <p className={cn(
            'text-persian-green-600 font-medium animate-pulse',
            textSizeClasses[size]
          )}>
            {text}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'spinner') {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
        <div className={cn(
          'animate-spin rounded-full border-4 border-persian-green-200',
          'border-t-persian-green-500',
          sizeClasses[size]
        )} />
        
        {text && (
          <p className={cn(
            'text-persian-green-600 font-medium',
            textSizeClasses[size]
          )}>
            {text}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
        <div className="relative">
          <div className={cn(
            'bg-persian-green-500 rounded-full animate-pulse',
            sizeClasses[size]
          )} />
          <div className={cn(
            'absolute inset-0 bg-persian-green-500 rounded-full animate-ping opacity-75',
            sizeClasses[size]
          )} />
        </div>
        
        {text && (
          <p className={cn(
            'text-persian-green-600 font-medium animate-pulse',
            textSizeClasses[size]
          )}>
            {text}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'wave') {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
        <div className="flex space-x-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                'bg-persian-green-500 rounded-full animate-bounce',
                size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'
              )}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.6s'
              }}
            />
          ))}
        </div>
        
        {text && (
          <p className={cn(
            'text-persian-green-600 font-medium',
            textSizeClasses[size]
          )}>
            {text}
          </p>
        )}
      </div>
    )
  }

  return null
}

// Full-screen loader component
export function FullScreenLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-ivory/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <PersianGreenLoader size="xl" variant="bead" text={text} />
        
        {/* Cultural Pattern Background */}
        <div className="absolute inset-0 kitenge-overlay opacity-5 pointer-events-none" />
        
        {/* Progress Bar */}
        <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-persian-green-500 transition-all duration-300 ease-out"
            style={{ width: `${Math.random() * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// Page transition loader
export function PageTransitionLoader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-persian-green-500 animate-pulse" />
      <div className="h-1 bg-gradient-to-r from-persian-green-500 via-copper-patina to-zanzibar-twilight animate-pulse" />
    </div>
  )
}

// Button loader
export function ButtonLoader({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <PersianGreenLoader 
      size={size} 
      variant="spinner" 
      className="inline-flex"
    />
}