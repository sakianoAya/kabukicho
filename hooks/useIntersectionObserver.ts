"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  root?: Element | null
  once?: boolean
}

export function useIntersectionObserver<T extends Element>({
  threshold = 0.1,
  rootMargin = "0px",
  root = null,
  once = false,
}: UseIntersectionObserverOptions = {}): {
  ref: RefObject<T>
  isIntersecting: boolean
  hasIntersected: boolean
} {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        setIsIntersecting(isElementIntersecting)

        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true)
          if (once) {
            observer.unobserve(element)
          }
        }
      },
      { threshold, rootMargin, root },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, root, hasIntersected, once])

  return { ref, isIntersecting, hasIntersected }
}
