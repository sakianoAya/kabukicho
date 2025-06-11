"use client"

import type React from "react"

import { useParallax } from "@/hooks/useParallax"

export function ParallaxBackground({ children, speed = 0.3 }: { children: React.ReactNode; speed?: number }) {
  const { elementRef, transform } = useParallax({ speed })

  return (
    <div ref={elementRef} className="absolute inset-0 will-change-transform" style={{ transform }}>
      {children}
    </div>
  )
}

export function FloatingNeonOrbs() {
  const { elementRef: orb1Ref, transform: orb1Transform } = useParallax({ speed: 0.2 })
  const { elementRef: orb2Ref, transform: orb2Transform } = useParallax({ speed: 0.4 })
  const { elementRef: orb3Ref, transform: orb3Transform } = useParallax({ speed: 0.6 })

  return (
    <>
      {/* Floating Neon Orb 1 */}
      <div
        ref={orb1Ref}
        className="fixed top-20 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl animate-pulse will-change-transform pointer-events-none z-0"
        style={{ transform: orb1Transform }}
      />

      {/* Floating Neon Orb 2 */}
      <div
        ref={orb2Ref}
        className="fixed top-1/3 left-20 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 blur-lg animate-pulse will-change-transform pointer-events-none z-0"
        style={{ transform: orb2Transform, animationDelay: "1s" }}
      />

      {/* Floating Neon Orb 3 */}
      <div
        ref={orb3Ref}
        className="fixed bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-pink-500/10 to-blue-500/10 blur-md animate-pulse will-change-transform pointer-events-none z-0"
        style={{ transform: orb3Transform, animationDelay: "2s" }}
      />
    </>
  )
}

export function ParallaxSection({
  children,
  speed = 0.1,
  className = "",
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const { elementRef, transform } = useParallax({ speed })

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`} style={{ transform }}>
      {children}
    </div>
  )
}

export function NeonLines() {
  const { elementRef: line1Ref, transform: line1Transform } = useParallax({ speed: 0.15 })
  const { elementRef: line2Ref, transform: line2Transform } = useParallax({ speed: 0.25 })

  return (
    <>
      {/* Diagonal Neon Line 1 */}
      <div
        ref={line1Ref}
        className="fixed top-0 left-0 w-1 h-screen bg-gradient-to-b from-transparent via-purple-500/30 to-transparent transform rotate-12 will-change-transform pointer-events-none z-0"
        style={{ transform: `rotate(12deg) ${line1Transform}` }}
      />

      {/* Diagonal Neon Line 2 */}
      <div
        ref={line2Ref}
        className="fixed top-0 right-0 w-1 h-screen bg-gradient-to-b from-transparent via-pink-500/20 to-transparent transform -rotate-12 will-change-transform pointer-events-none z-0"
        style={{ transform: `rotate(-12deg) ${line2Transform}` }}
      />
    </>
  )
}
