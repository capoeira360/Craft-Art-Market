"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "block text-sm font-semibold text-gray-700 mb-2 leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
)
Label.displayName = "Label"

export { Label }