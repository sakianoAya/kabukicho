"use client"

import { type ReactNode, memo } from "react"
import { cn } from "@/lib/utils"

interface NeonNavItemProps {
  icon: ReactNode
  label: string
  isActive: boolean
  onClick: () => void
  variant?: "default" | "green" | "pink" | "yellow" | "blue"
  className?: string
}

// Memoized component to prevent unnecessary re-renders
export const NeonNavItem = memo(function NeonNavItem({
  icon,
  label,
  isActive,
  onClick,
  variant = "default",
  className,
}: NeonNavItemProps) {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "green":
        return {
          active: "border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]",
          hover: "hover:border-green-500 hover:shadow-[0_0_10px_rgba(34,197,94,0.5)]",
          icon: "text-green-400",
          iconHover: "group-hover:text-green-400",
        }
      case "pink":
        return {
          active: "border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]",
          hover: "hover:border-pink-500 hover:shadow-[0_0_10px_rgba(236,72,153,0.5)]",
          icon: "text-pink-400",
          iconHover: "group-hover:text-pink-400",
        }
      case "yellow":
        return {
          active: "border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]",
          hover: "hover:border-yellow-500 hover:shadow-[0_0_10px_rgba(234,179,8,0.5)]",
          icon: "text-yellow-400",
          iconHover: "group-hover:text-yellow-400",
        }
      case "blue":
        return {
          active: "border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
          hover: "hover:border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]",
          icon: "text-blue-400",
          iconHover: "group-hover:text-blue-400",
        }
      default:
        return {
          active: "border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]",
          hover: "hover:border-purple-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]",
          icon: "text-purple-400",
          iconHover: "group-hover:text-purple-400",
        }
    }
  }

  const styles = getVariantStyles(variant)

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-lg transition-all duration-300 group",
        "flex items-center space-x-3 bg-black border",
        isActive ? `text-white ${styles.active}` : `text-gray-300 border-transparent ${styles.hover}`,
        className,
      )}
    >
      <span
        className={cn("transition-colors duration-300", isActive ? styles.icon : `text-gray-400 ${styles.iconHover}`)}
      >
        {icon}
      </span>
      <span
        className={cn(
          "font-medium tracking-wide text-sm",
          isActive ? "text-white" : "text-gray-300 group-hover:text-white",
        )}
      >
        {label}
      </span>
    </button>
  )
})
