import type React from "react"
import { cn } from "@/lib/utils"
import { memo } from "react"

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "green" | "yellow" | "pink" | "purple" | "blue"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  className?: string
  isActive?: boolean
}

// Memoized component to prevent unnecessary re-renders
export const NeonButton = memo(function NeonButton({
  variant = "default",
  size = "md",
  children,
  className,
  isActive = false,
  ...props
}: NeonButtonProps) {
  const variantClasses = {
    default:
      "border-purple-500 text-purple-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.3)]",
    green: "border-green-400 text-green-400 hover:shadow-[0_0_10px_rgba(74,222,128,0.5),0_0_20px_rgba(74,222,128,0.3)]",
    yellow:
      "border-yellow-400 text-yellow-400 hover:shadow-[0_0_10px_rgba(250,204,21,0.5),0_0_20px_rgba(250,204,21,0.3)]",
    pink: "border-pink-400 text-pink-400 hover:shadow-[0_0_10px_rgba(244,114,182,0.5),0_0_20px_rgba(244,114,182,0.3)]",
    purple:
      "border-violet-400 text-violet-400 hover:shadow-[0_0_10px_rgba(167,139,250,0.5),0_0_20px_rgba(167,139,250,0.3)]",
    blue: "border-blue-400 text-blue-400 hover:shadow-[0_0_10px_rgba(96,165,250,0.5),0_0_20px_rgba(96,165,250,0.3)]",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      className={cn(
        "bg-black rounded-lg transition-all duration-300 font-medium tracking-wider",
        "border border-transparent",
        "hover:border-opacity-100",
        sizeClasses[size],
        isActive
          ? variantClasses[variant].replace("hover:", "")
          : `hover:${variantClasses[variant].split("hover:")[1]}`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})

export const NeonButtonFilled = memo(function NeonButtonFilled({
  variant = "default",
  size = "md",
  children,
  className,
  ...props
}: NeonButtonProps) {
  const variantClasses = {
    default: "bg-purple-500 text-white hover:shadow-[0_0_10px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.3)]",
    green: "bg-green-400 text-black hover:shadow-[0_0_10px_rgba(74,222,128,0.5),0_0_20px_rgba(74,222,128,0.3)]",
    yellow: "bg-yellow-400 text-black hover:shadow-[0_0_10px_rgba(250,204,21,0.5),0_0_20px_rgba(250,204,21,0.3)]",
    pink: "bg-pink-400 text-white hover:shadow-[0_0_10px_rgba(244,114,182,0.5),0_0_20px_rgba(244,114,182,0.3)]",
    purple: "bg-violet-400 text-white hover:shadow-[0_0_10px_rgba(167,139,250,0.5),0_0_20px_rgba(167,139,250,0.3)]",
    blue: "bg-blue-400 text-white hover:shadow-[0_0_10px_rgba(96,165,250,0.5),0_0_20px_rgba(96,165,250,0.3)]",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      className={cn(
        "rounded-lg transition-all duration-300 font-medium tracking-wider",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})
