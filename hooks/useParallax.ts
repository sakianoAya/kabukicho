"use client"

import { useEffect, useRef, useState } from "react"

interface ParallaxOptions {
  speed?: number
  offset?: number
  disabled?: boolean
}

export function useParallax({ speed = 0.5, offset = 0, disabled = false }: ParallaxOptions = {}) {
  const elementRef = useRef<HTMLElement>(null)
  const [transform, setTransform] = useState("")

  useEffect(() => {
    if (disabled) return

    const element = elementRef.current
    if (!element) return

    let ticking = false

    const updateTransform = () => {
      const rect = element.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const rate = scrolled * -speed
      const yPos = Math.round(rate + offset)

      setTransform(`translate3d(0, ${yPos}px, 0)`)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateTransform)
        ticking = true
      }
    }

    // Initial calculation
    updateTransform()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateTransform, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateTransform)
    }
  }, [speed, offset, disabled])

  return { elementRef, transform }
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      setProgress(Math.min(Math.max(scrollPercent, 0), 1))
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return progress
}

export function useElementInView(threshold = 0.1) {
  const elementRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { elementRef, isInView }
}
