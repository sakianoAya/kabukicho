"use client"

import { useState, useEffect, useRef } from "react"

interface UseLazyLoadingOptions {
  threshold?: number
  rootMargin?: string
}

export function useLazyLoading(options: UseLazyLoadingOptions = {}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const { threshold = 0.1, rootMargin = "50px" } = options

  useEffect(() => {
    const imgElement = imgRef.current
    if (!imgElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(imgElement)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(imgElement)

    return () => {
      if (imgElement) {
        observer.unobserve(imgElement)
      }
    }
  }, [threshold, rootMargin])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError("画像の読み込みに失敗しました")
    setIsLoaded(true)
  }

  return {
    imgRef,
    isLoaded,
    isInView,
    error,
    handleLoad,
    handleError,
  }
}
