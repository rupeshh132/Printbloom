"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductCarouselProps {
  images: string[]
  productName: string
}

export function ProductCarousel({ images, productName }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  // Safely fallback to first image if images array is empty or undefined
  const validImages = images && images.length > 0 ? images : ["/placeholder-image.jpg"] // It should at least have main_image_url
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative aspect-[4/5] bg-[#FBF6EE] border border-[#E0D9CF] overflow-hidden group">
        <Image 
          src={validImages[currentIndex]} 
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
        
        {/* Navigation Arrows (only show if more than 1 image) */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-[#221F1C] rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-[#221F1C] rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {validImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {validImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-24 flex-shrink-0 border-2 overflow-hidden transition-all ${
                currentIndex === idx ? "border-[#C1502E] opacity-100" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image 
                src={imgUrl} 
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
