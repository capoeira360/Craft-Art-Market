import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-500 hover:border-gray-400 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }