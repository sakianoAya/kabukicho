"use client"
import { cn } from "@/lib/utils"

interface NeonTextProps {
  text: string
  colorVariant?: "pink" | "blue" | "purple" | "green" | "orange"
  fontFamily?: "cursive" | "gothic" | "modern" | "script"
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
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
}

const fontFamilies = {
  cursive: '"Kaushan Script", "Dancing Script", cursive',
  script: '"Monoton", "Orbitron", monospace',
  gothic: '"Zen Kaku Gothic Antique", "Noto Sans JP", sans-serif',
  modern: '"Inter", "Helvetica Neue", Arial, sans-serif',
}

const sizeClasses = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl lg:text-5xl",
  lg: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
  xl: "text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
  "2xl": "text-6xl md:text-7xl lg:text-8xl xl:text-9xl",
}

export function NeonText({
  text,
  colorVariant = "pink",
  fontFamily = "cursive",
  className,
  size = "lg",
  animationType = "breathing",
  intensity = "medium",
}: NeonTextProps) {
  const colors = colorVariants[colorVariant]
  const fontFamilyStyle = fontFamilies[fontFamily]

  // Generate text shadow based on intensity
  const getTextShadow = (intensity: string, colors: typeof colorVariants.pink) => {
    const shadows = {
      subtle: `
        0 0 2px ${colors.primary},
        0 0 4px ${colors.primary},
        0 0 6px ${colors.primary},
        0 0 8px ${colors.secondary}
      `,
      medium: `
        0 0 2px ${colors.primary},
        0 0 4px ${colors.primary},
        0 0 6px ${colors.primary},
        0 0 8px ${colors.primary},
        0 0 12px ${colors.secondary},
        0 0 16px ${colors.secondary}
      `,
      strong: `
        0 0 2px ${colors.primary},
        0 0 4px ${colors.primary},
        0 0 6px ${colors.primary},
        0 0 8px ${colors.primary},
        0 0 12px ${colors.primary},
        0 0 16px ${colors.secondary},
        0 0 20px ${colors.secondary},
        0 0 24px ${colors.tertiary}
      `,
    }
    return shadows[intensity as keyof typeof shadows]
  }

  // Generate halo shadow for pseudo-element
  const getHaloShadow = (intensity: string, colors: typeof colorVariants.pink) => {
    const haloIntensity = {
      subtle: "0.06",
      medium: "0.12",
      strong: "0.20",
    }

    const alpha = haloIntensity[intensity as keyof typeof haloIntensity]
    return `radial-gradient(ellipse at center, ${colors.primary}${Math.round(Number.parseFloat(alpha) * 255)
      .toString(16)
      .padStart(2, "0")} 0%, ${colors.secondary}${Math.round(Number.parseFloat(alpha) * 0.5 * 255)
      .toString(16)
      .padStart(2, "0")} 40%, transparent 70%)`
  }

  const animationClass = {
    breathing: "animate-neon-breathing",
    flicker: "animate-neon-flicker",
    pulse: "animate-neon-pulse",
    static: "",
  }

  return (
    <>
      <style jsx>{`
        @keyframes neon-breathing {
          0%, 100% {
            text-shadow: ${getTextShadow(intensity, colors)};
            filter: brightness(1);
          }
          50% {
            text-shadow: ${getTextShadow(intensity === "subtle" ? "medium" : intensity === "medium" ? "strong" : "strong", colors)};
            filter: brightness(1.1);
          }
        }

        @keyframes neon-flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            text-shadow: ${getTextShadow(intensity, colors)};
            opacity: 1;
          }
          20%, 24%, 55% {
            text-shadow: ${getTextShadow("subtle", colors)};
            opacity: 0.8;
          }
        }

        @keyframes neon-pulse {
          0%, 100% {
            text-shadow: ${getTextShadow(intensity, colors)};
            transform: scale(1);
          }
          50% {
            text-shadow: ${getTextShadow(intensity === "subtle" ? "medium" : "strong", colors)};
            transform: scale(1.02);
          }
        }

        @keyframes halo-glow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        .animate-neon-breathing {
          animation: neon-breathing 3s ease-in-out infinite;
        }

        .animate-neon-flicker {
          animation: neon-flicker 2s infinite;
        }

        .animate-neon-pulse {
          animation: neon-pulse 2.5s ease-in-out infinite;
        }

        .neon-text-${colorVariant}::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: ${getHaloShadow(intensity, colors)};
          border-radius: 50px;
          z-index: -1;
          animation: halo-glow 4s ease-in-out infinite;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-neon-breathing,
          .animate-neon-flicker,
          .animate-neon-pulse,
          .neon-text-${colorVariant}::before {
            animation: none !important;
          }
        }
      `}</style>

      <span
        className={cn(
          "relative inline-block font-bold tracking-wide select-none",
          `neon-text-${colorVariant}`,
          sizeClasses[size],
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
        }}
        role="heading"
        aria-label={text}
      >
        {text}
      </span>
    </>
  )
}

// Preset components for common use cases
export function NeonTextHero({ children, ...props }: { children: string } & Omit<NeonTextProps, "text">) {
  return <NeonText text={children} size="xl" intensity="medium" animationType="breathing" {...props} />
}

export function NeonTextSubtitle({ children, ...props }: { children: string } & Omit<NeonTextProps, "text">) {
  return <NeonText text={children} size="md" intensity="subtle" animationType="static" {...props} />
}

export function NeonTextAccent({ children, ...props }: { children: string } & Omit<NeonTextProps, "text">) {
  return <NeonText text={children} size="sm" intensity="medium" animationType="pulse" {...props} />
}
