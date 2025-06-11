import { useLazyLoading } from "@/hooks/useLazyLoading"
import { cn } from "@/lib/utils"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  width?: number
  height?: number
  onLoad?: () => void
  onError?: () => void
}

export function LazyImage({
  src,
  alt,
  className,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+",
  width,
  height,
  onLoad,
  onError,
}: LazyImageProps) {
  const { imgRef, isLoaded, isInView, error, handleLoad, handleError } = useLazyLoading()

  const handleImageLoad = () => {
    handleLoad()
    onLoad?.()
  }

  const handleImageError = () => {
    handleError()
    onError?.()
    // 設置一個備用圖片
    if (imgRef.current) {
      imgRef.current.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4="
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Placeholder/Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-3">
            {/* Neon Loading Spinner */}
            <div className="relative">
              <div className="w-8 h-8 border-2 border-purple-500/30 rounded-full"></div>
              <div className="absolute inset-0 w-8 h-8 border-2 border-transparent border-t-purple-500 rounded-full animate-spin neon-glow"></div>
            </div>
            {/* Loading Text */}
            <div className="text-xs text-purple-300 shimmer">読み込み中...</div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-red-400 text-sm mb-2">⚠️</div>
            <div className="text-xs text-red-300">{error}</div>
          </div>
        </div>
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={isInView ? src : placeholder}
        alt={alt}
        width={width}
        height={height}
        className={cn("transition-all duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />

      {/* Loading Overlay with Neon Effect */}
      {isInView && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-transparent shimmer"></div>
        </div>
      )}
    </div>
  )
}
