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
      className={`card-neon group cursor-pointer overflow-hidden aspect-square transition-all duration-700 ${
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
      <div className="relative w-full h-full">
        <LazyImage
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <h3 className="text-white font-bold text-base mb-2 neon-text transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {image.title}
          </h3>
          <p className="text-gray-300 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            📍 {image.location}
          </p>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100">
          <ZoomIn className="w-7 h-7 text-white neon-glow" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
})
