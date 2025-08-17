import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons'
import ZoomImage from './ZoomImage'

interface ImageCarouselProps {
  images: string[]
  alt: string
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-1/2 flex items-center justify-center">
      <ZoomImage
        src={images[currentIndex]}
        alt={`${alt} ${currentIndex + 1}`}
      />

      {images.length > 1 && (
        <button
          type="button"
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-neutral-200 cursor-pointer hover:bg-neutral-100 rounded-full p-1 shadow"
        >
          <ChevronLeftIcon className="size-5" />
        </button>
      )}

      {images.length > 1 && (
        <button
          type="button"
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-neutral-200 cursor-pointer hover:bg-neutral-100 rounded-full p-1 shadow"
        >
          <ChevronRightIcon className="size-5" />
        </button>
      )}
    </div>
  )
}
