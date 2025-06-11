"use client"

import { useState, useEffect, useCallback } from "react"

interface ScrollPosition {
  x: number
  y: number
}

interface UseScrollPositionOptions {
  throttleMs?: number
}

export function useScrollPosition({ throttleMs = 100 }: UseScrollPositionOptions = {}): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 })

  const handleScroll = useCallback(() => {
    setScrollPosition({
      x: window.scrollX,
      y: window.scrollY,
    })
  }, [])

  useEffect(() => {
    // Throttle function to limit execution frequency
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let lastRun = 0

    const throttledHandleScroll = () => {
      const now = Date.now()
      if (now - lastRun >= throttleMs) {
        lastRun = now
        handleScroll()
      } else if (!timeoutId) {
        timeoutId = setTimeout(
          () => {
            lastRun = Date.now()
            handleScroll()
            timeoutId = null
          },
          throttleMs - (now - lastRun),
        )
      }
    }

    window.addEventListener("scroll", throttledHandleScroll, { passive: true })

    // Initial position
    handleScroll()

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [handleScroll, throttleMs])

  return scrollPosition
}
