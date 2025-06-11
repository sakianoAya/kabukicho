"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ImageFallbackProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fallbackSrc?: string
}

export function ImageFallback({
  src,
  alt,
  className,
  width,
  height,
  fallbackSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuaXoOazleaYvuekuuWbvueJhzwvdGV4dD48L3N2Zz4=",
}: ImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="w-6 h-6 border-2 border-purple-500/30 rounded-full"></div>
              <div className="absolute inset-0 w-6 h-6 border-2 border-transparent border-t-purple-500 rounded-full animate-spin neon-glow"></div>
            </div>
            <div className="text-xs text-purple-300">読み込み中...</div>
          </div>
        </div>
      )}

      <img
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100", className)}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />

      {hasError && (
        <div className="absolute top-2 left-2 bg-red-900/80 text-red-300 px-2 py-1 rounded text-xs">画像エラー</div>
      )}
    </div>
  )
}
