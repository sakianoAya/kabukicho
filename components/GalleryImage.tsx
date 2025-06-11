"use client"

import { memo } from "react"
import { ZoomIn } from "lucide-react"
import { LazyImage } from "@/components/LazyImage"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

interface GalleryImageProps {
  image: {
    id: number
    src: string
    title: string
    location: string
  }
  index: number
  openImageModal: (id: number) => void
}

export const GalleryImage = memo(function GalleryImage({ image, index, openImageModal }: GalleryImageProps) {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1, once: true })

  return (
    <div
      ref={ref}
      className={`group cursor-pointer overflow-hidden rounded-lg transition-all duration-700 ${
        hasIntersected ? "opacity-100 transform translate-y-0 scale-100" : "opacity-0 transform translate-y-8 scale-95"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
      onClick={() => openImageModal(image.id)}
      role="button"
      aria-label={`View ${image.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          openImageModal(image.id)
        }
      }}
    >
      {/* 響應式容器 - 不同螢幕尺寸使用不同的縱橫比 */}
      <div className="relative w-full h-0 pb-[75%] sm:pb-[80%] md:pb-[85%] lg:pb-[90%] xl:pb-[100%] overflow-hidden rounded-lg bg-black border border-purple-500/20 hover:border-pink-500/60 transition-all duration-300">
        <div className="absolute inset-0">
          <LazyImage
            src={image.src}
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* 漸層遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* 內容區域 */}
          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 neon-text leading-tight">
                {image.title}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm flex items-center">
                <span className="mr-1">📍</span>
                {image.location}
              </p>
            </div>
          </div>

          {/* 放大鏡圖標 */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
            <div className="bg-black/60 backdrop-blur-sm rounded-full p-2 sm:p-2.5">
              <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white neon-glow" aria-hidden="true" />
            </div>
          </div>

          {/* 霓虹邊框效果 */}
          <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-pink-500/50 group-hover:shadow-[0_0_20px_rgba(244,114,182,0.3)] transition-all duration-300 pointer-events-none" />
        </div>
      </div>
    </div>
  )
})
