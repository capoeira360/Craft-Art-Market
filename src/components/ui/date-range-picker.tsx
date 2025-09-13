"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DateRange {
  from?: Date
  to?: Date
}

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })
  const [isOpen, setIsOpen] = React.useState(false)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value)
    setDate(prev => ({ ...prev, from: newDate }))
  }

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value)
    setDate(prev => ({ ...prev, to: newDate }))
  }

  return (
    <div className={cn("relative", className)}>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-[300px] justify-start text-left font-normal",
          !date && "text-gray-500"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date?.from && date?.to ? (
          <>
            {formatDate(date.from)} - {formatDate(date.to)}
          </>
        ) : (
          <span>Pick a date range</span>
        )}
      </Button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 z-50 mt-1 p-4 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={date?.from ? date.from.toISOString().split('T')[0] : ''}
                  onChange={handleFromChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={date?.to ? date.to.toISOString().split('T')[0] : ''}
                  onChange={handleToChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-persian-green-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}