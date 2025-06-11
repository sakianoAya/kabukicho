"use client"

import { useScrollProgress } from "@/hooks/useParallax"

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-black/50 z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-100 ease-out neon-glow"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
