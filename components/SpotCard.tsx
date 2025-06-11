"use client"

import { memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LazyImage } from "@/components/LazyImage"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

interface SpotCardProps {
  spot: {
    title: string
    description: string
    image: string
    category: string
  }
  index: number
}

export const SpotCard = memo(function SpotCard({ spot, index }: SpotCardProps) {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2, once: true })

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        hasIntersected ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="card-neon group overflow-hidden floating">
        <div className="relative h-56">
          <LazyImage
            src={spot.image}
            alt={spot.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3">
            <span className="bg-purple-600/80 text-white px-2.5 py-1 rounded-full text-xs font-medium neon-glow tracking-wider">
              {spot.category}
            </span>
          </div>
        </div>
        <CardHeader className="pb-3 pt-4">
          <CardTitle className="text-xl font-semibold text-white group-hover:text-pink-300 transition-colors text-glow tracking-tight">
            {spot.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-400 text-sm leading-relaxed">{spot.description}</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
})
