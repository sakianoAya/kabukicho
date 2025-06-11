"use client"

import { useState, useEffect } from "react"

export function useImagePreloader(imageUrls: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = imageUrls.map((url) => {
        return new Promise<string>((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve(url)
          img.onerror = () => reject(url)
          img.src = url
        })
      })

      try {
        const results = await Promise.allSettled(imagePromises)
        const loaded = new Set<string>()

        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            loaded.add(imageUrls[index])
          }
        })

        setLoadedImages(loaded)
      } catch (error) {
        console.error("Error preloading images:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (imageUrls.length > 0) {
      preloadImages()
    }
  }, [imageUrls])

  return { loadedImages, isLoading }
}
