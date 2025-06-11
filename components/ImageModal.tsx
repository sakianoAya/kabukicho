"use client"

import { useEffect, useCallback, memo } from "react"
import { X, ArrowLeft, ArrowRight, MapPin } from "lucide-react"
import { LazyImage } from "@/components/LazyImage"

interface ImageModalProps {
  selectedImage: number | null
  images: Array<{
    id: number
    src: string
    title: string
    description: string
    location: string
  }>
  closeModal: () => void
  navigateImage: (direction: "prev" | "next") => void
}

export const ImageModal = memo(function ImageModal({
  selectedImage,
  images,
  closeModal,
  navigateImage,
}: ImageModalProps) {
  const selectedImageData = selectedImage ? images.find((img) => img.id === selectedImage) : null

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev")
      } else if (e.key === "ArrowRight") {
        navigateImage("next")
      }
    },
    [closeModal, navigateImage],
  )

  useEffect(() => {
    // Add keyboard event listeners when modal is open
    if (selectedImage !== null) {
      document.addEventListener("keydown", handleKeyDown)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    // Clean up event listeners and restore scrolling
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [selectedImage, handleKeyDown])

  if (!selectedImage || !selectedImageData) return null

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-[70] flex items-center justify-center p-4"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={closeModal}
          className="absolute -top-12 right-0 md:top-4 md:right-4 z-10 bg-black/60 hover:bg-red-600/70 text-white p-2.5 rounded-full transition-all duration-300 neon-glow-intense"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>

        <div className="md:flex md:space-x-6 items-center h-full">
          <div className="relative flex-shrink-0 w-full md:w-2/3 h-1/2 md:h-auto max-h-[90vh]">
            <LazyImage
              src={selectedImageData.src}
              alt={selectedImageData.title}
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("prev")
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-purple-600/60 text-white p-3 rounded-full transition-all duration-300 neon-glow opacity-70 hover:opacity-100"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("next")
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-purple-600/60 text-white p-3 rounded-full transition-all duration-300 neon-glow opacity-70 hover:opacity-100"
              aria-label="Next image"
            >
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="p-6 bg-black/70 backdrop-blur-sm rounded-b-lg md:rounded-lg md:w-1/3 max-h-[90vh] overflow-y-auto mt-4 md:mt-0">
            <h3 id="modal-title" className="text-2xl lg:text-3xl font-bold text-white mb-3 neon-text tracking-tight">
              {selectedImageData.title}
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm lg:text-base">{selectedImageData.description}</p>
            <div className="flex items-center text-sm text-purple-300">
              <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
              {selectedImageData.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
