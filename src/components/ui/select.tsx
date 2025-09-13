"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

interface SelectTriggerProps {
  className?: string
  children: React.ReactNode
}

interface SelectContentProps {
  children: React.ReactNode
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

interface SelectValueProps {
  placeholder?: string
}

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}>({ open: false, setOpen: () => {} })

const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  const [open, setOpen] = React.useState(false)
  
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

const SelectTrigger: React.FC<SelectTriggerProps> = ({ className, children }) => {
  const { open, setOpen } = React.useContext(SelectContext)
  
  return (
    <button
      type="button"
      className={cn(
        "flex h-12 w-full items-center justify-between rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        open && "border-green-500 ring-4 ring-green-100",
        className
      )}
      onClick={() => setOpen(!open)}
    >
      {children}
      <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", open && "rotate-180")} />
    </button>
  )
}

const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const { value } = React.useContext(SelectContext)
  
  return (
    <span className={cn(!value && "text-gray-500")}>
      {value || placeholder}
    </span>
  )
}

const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  const { open, setOpen } = React.useContext(SelectContext)
  
  if (!open) return null
  
  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={() => setOpen(false)}
      />
      <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto animate-in fade-in-0 zoom-in-95">
        {children}
      </div>
    </>
  )
}

const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  const { onValueChange, setOpen, value: selectedValue } = React.useContext(SelectContext)
  
  const handleClick = () => {
    onValueChange?.(value)
    setOpen(false)
  }
  
  const isSelected = selectedValue === value
  
  return (
    <div
      className={cn(
        "px-4 py-3 text-base cursor-pointer transition-colors duration-150 hover:bg-green-50 focus:bg-green-50 focus:outline-none",
        isSelected && "bg-green-100 text-green-900 font-medium"
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

const SelectGroup = ({ children }: { children: React.ReactNode }) => children
const SelectLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="px-3 py-1.5 text-sm font-semibold text-gray-900">{children}</div>
)
const SelectSeparator = () => <div className="h-px bg-gray-200 my-1" />

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}