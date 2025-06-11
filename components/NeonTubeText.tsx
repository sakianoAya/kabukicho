"use client"

import type React from "react"
import { cn } from "@/lib/utils"

// Enhanced NeonTubeTextLight component with customizable colors and improved effects
interface NeonTubeTextProps {
  children: React.ReactNode
  className?: string
  color?: "pink" | "blue" | "purple" | "green" | "orange" | "cyan"
  fontFamily?: "monoton" | "kaushan" | "gothic" | "noto"
  animationType?: "breathing" | "flicker" | "pulse" | "static"
  intensity?: "subtle" | "medium" | "strong"
}

const colorVariants = {
  pink: {
    primary: "#ff1493",
    secondary: "#ff69b4",
    tertiary: "#ff20a0",
  },
  blue: {
    primary: "#00bfff",
    secondary: "#1e90ff",
    tertiary: "#4169e1",
  },
  purple: {
    primary: "#a855f7",
    secondary: "#9333ea",
    tertiary: "#7c3aed",
  },
  green: {
    primary: "#00ff7f",
    secondary: "#32cd32",
    tertiary: "#00fa9a",
  },
  orange: {
    primary: "#ff6347",
    secondary: "#ff4500",
    tertiary: "#ff8c00",
  },
  cyan: {
    primary: "#00ffff",
    secondary: "#00e6e6",
    tertiary: "#00cccc",
  },
}

const fontFamilies = {
  monoton: '"Monoton", "Orbitron", monospace',
  kaushan: '"Kaushan Script", "Dancing Script", cursive',
  gothic: '"Zen Kaku Gothic Antique", "Noto Sans JP", sans-serif',
  noto: '"Noto Sans JP", "Zen Kaku Gothic New", sans-serif',
}

export function NeonTubeTextLight({
  children,
  className,
  color = "pink",
  fontFamily = "monoton",
  animationType = "breathing",
  intensity = "medium",
}: NeonTubeTextProps) {
  const colors = colorVariants[color]
  const fontFamilyStyle = fontFamilies[fontFamily]

  // Generate text shadow based on intensity for sharp tube-like effect
  const getTextShadow = (intensity: string, colors: typeof colorVariants.pink) => {
    const shadows = {
      subtle: `
        0 0 2px ${colors.primary},
        0 0 4px ${colors.primary},
        0 0 6px ${colors.primary},
        0 0 8px ${colors.secondary}
      `,
      medium: `
        0 0 1px ${colors.primary},
        0 0 3px ${colors.primary},
        0 0 5px ${colors.primary},
        0 0 8px ${colors.primary},
        0 0 12px ${colors.secondary},
        0 0 16px ${colors.secondary}
      `,
      strong: `
        0 0 1px ${colors.primary},
        0 0 2px ${colors.primary},
        0 0 4px ${colors.primary},
        0 0 6px ${colors.primary},
        0 0 10px ${colors.primary},
        0 0 14px ${colors.secondary},
        0 0 18px ${colors.secondary},
        0 0 22px ${colors.tertiary}
      `,
    }
    return shadows[intensity as keyof typeof shadows]
  }

  // Generate halo background for pseudo-element
  const getHaloBackground = (intensity: string, colors: typeof colorVariants.pink) => {
    const haloIntensity = {
      subtle: "0.08",
      medium: "0.15",
      strong: "0.25",
    }

    const alpha = haloIntensity[intensity as keyof typeof haloIntensity]
    return `radial-gradient(ellipse at center, ${colors.primary}${Math.round(Number.parseFloat(alpha) * 255)
      .toString(16)
      .padStart(2, "0")} 0%, ${colors.secondary}${Math.round(Number.parseFloat(alpha) * 0.6 * 255)
      .toString(16)
      .padStart(2, "0")} 30%, transparent 70%)`
  }

  const animationClass = {
    breathing: "animate-neon-breathing-enhanced",
    flicker: "animate-neon-flicker-enhanced",
    pulse: "animate-neon-pulse-enhanced",
    static: "",
  }

  return (
    <>
      <style jsx>{`
        @keyframes neon-breathing-enhanced {
          0%, 100% {
            text-shadow: ${getTextShadow(intensity, colors)};
            filter: brightness(1) contrast(1.1);
          }
          50% {
            text-shadow: ${getTextShadow(intensity === "subtle" ? "medium" : intensity === "medium" ? "strong" : "strong", colors)};
            filter: brightness(1.15) contrast(1.15);
          }
        }

        @keyframes neon-flicker-enhanced {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            text-shadow: ${getTextShadow(intensity, colors)};
            opacity: 1;
            filter: brightness(1) contrast(1.1);
          }
          20%, 24%, 55% {
            text-shadow: ${getTextShadow("subtle", colors)};
            opacity: 0.85;
            filter: brightness(0.9) contrast(1);
          }
        }

        @keyframes neon-pulse-enhanced {
          0%, 100% {
            text-shadow: ${getTextShadow(intensity, colors)};
            transform: scale(1);
            filter: brightness(1) contrast(1.1);
          }
          50% {
            text-shadow: ${getTextShadow(intensity === "subtle" ? "medium" : "strong", colors)};
            transform: scale(1.02);
            filter: brightness(1.2) contrast(1.2);
          }
        }

        @keyframes halo-glow-enhanced {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .animate-neon-breathing-enhanced {
          animation: neon-breathing-enhanced 3s ease-in-out infinite;
        }

        .animate-neon-flicker-enhanced {
          animation: neon-flicker-enhanced 2.2s infinite;
        }

        .animate-neon-pulse-enhanced {
          animation: neon-pulse-enhanced 2.8s ease-in-out infinite;
        }

        .neon-tube-enhanced-${color}::before {
          content: '';
          position: absolute;
          top: -12px;
          left: -12px;
          right: -12px;
          bottom: -12px;
          background: ${getHaloBackground(intensity, colors)};
          border-radius: 50px;
          z-index: -1;
          animation: halo-glow-enhanced 4s ease-in-out infinite;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-neon-breathing-enhanced,
          .animate-neon-flicker-enhanced,
          .animate-neon-pulse-enhanced,
          .neon-tube-enhanced-${color}::before {
            animation: none !important;
          }
        }

        @media (max-width: 768px) {
          .neon-tube-enhanced-${color} {
            font-size: clamp(1.5rem, 8vw, 4rem);
          }
        }
      `}</style>

      <span
        className={cn(
          "relative inline-block font-bold tracking-wide select-none",
          `neon-tube-enhanced-${color}`,
          animationClass[animationType],
          className,
        )}
        style={{
          fontFamily: fontFamilyStyle,
          color: "#ffffff",
          textShadow: getTextShadow(intensity, colors),
          filter: "brightness(1) contrast(1.1)",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
        }}
        role="heading"
        aria-label={typeof children === "string" ? children : "Neon text"}
      >
        {children}
      </span>
    </>
  )
}

// Enhanced blue version with same capabilities
export function NeonTubeTextLightBlue({
  children,
  className,
  fontFamily = "gothic",
  animationType = "breathing",
  intensity = "medium",
  ...props
}: Omit<NeonTubeTextProps, "color">) {
  return (
    <NeonTubeTextLight
      color="blue"
      fontFamily={fontFamily}
      animationType={animationType}
      intensity={intensity}
      className={className}
      {...props}
    >
      {children}
    </NeonTubeTextLight>
  )
}

// Additional preset variants for common use cases
export function NeonTubeTextPurple({ children, className, ...props }: Omit<NeonTubeTextProps, "color">) {
  return (
    <NeonTubeTextLight color="purple" className={className} {...props}>
      {children}
    </NeonTubeTextLight>
  )
}

export function NeonTubeTextGreen({ children, className, ...props }: Omit<NeonTubeTextProps, "color">) {
  return (
    <NeonTubeTextLight color="green" className={className} {...props}>
      {children}
    </NeonTubeTextLight>
  )
}

export function NeonTubeTextCyan({ children, className, ...props }: Omit<NeonTubeTextProps, "color">) {
  return (
    <NeonTubeTextLight color="cyan" className={className} {...props}>
      {children}
    </NeonTubeTextLight>
  )
}
