import { type ReactNode, memo } from "react"
import { cn } from "@/lib/utils"

interface NeonCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "green" | "yellow" | "pink" | "purple" | "blue"
  hoverEffect?: boolean
}

export const NeonCard = memo(function NeonCard({
  children,
  className,
  variant = "default",
  hoverEffect = true,
}: NeonCardProps) {
  const variantClasses = {
    default: {
      border: "border-purple-500/40",
      hoverBorder: "hover:border-purple-500/70",
      shadow: "shadow-[0_0_35px_rgba(168,85,247,0.4),0_0_65px_rgba(244,114,182,0.3)]",
    },
    green: {
      border: "border-green-500/40",
      hoverBorder: "hover:border-green-500/70",
      shadow: "shadow-[0_0_35px_rgba(74,222,128,0.4),0_0_65px_rgba(74,222,128,0.3)]",
    },
    yellow: {
      border: "border-yellow-500/40",
      hoverBorder: "hover:border-yellow-500/70",
      shadow: "shadow-[0_0_35px_rgba(250,204,21,0.4),0_0_65px_rgba(250,204,21,0.3)]",
    },
    pink: {
      border: "border-pink-500/40",
      hoverBorder: "hover:border-pink-500/70",
      shadow: "shadow-[0_0_35px_rgba(244,114,182,0.4),0_0_65px_rgba(244,114,182,0.3)]",
    },
    purple: {
      border: "border-violet-500/40",
      hoverBorder: "hover:border-violet-500/70",
      shadow: "shadow-[0_0_35px_rgba(167,139,250,0.4),0_0_65px_rgba(167,139,250,0.3)]",
    },
    blue: {
      border: "border-blue-500/40",
      hoverBorder: "hover:border-blue-500/70",
      shadow: "shadow-[0_0_35px_rgba(96,165,250,0.4),0_0_65px_rgba(96,165,250,0.3)]",
    },
  }

  const styles = variantClasses[variant]

  return (
    <div
      className={cn(
        "relative bg-black border transition-all duration-400 will-change-transform",
        styles.border,
        hoverEffect && [
          styles.hoverBorder,
          "hover:transform hover:translateY(-10px) hover:rotateX(3deg) hover:rotateY(-2deg) hover:scale-102",
          `hover:${styles.shadow}`,
        ],
        className,
      )}
    >
      {children}
    </div>
  )
})
