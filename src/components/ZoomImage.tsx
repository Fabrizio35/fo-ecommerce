import { useRef, useState } from 'react'

interface ZoomImageProps {
  src: string
  alt: string
  lensSize?: number
  zoom?: number
}

export default function ZoomImage({
  src,
  alt,
  lensSize = 150,
  zoom = 3,
}: ZoomImageProps) {
  const [showLens, setShowLens] = useState(false)
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 })
  const [backgroundPos, setBackgroundPos] = useState('0% 0%')

  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (evt: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = evt.clientX - rect.left
    const y = evt.clientY - rect.top

    const posX = Math.min(Math.max(x, 0), rect.width)
    const posY = Math.min(Math.max(y, 0), rect.height)

    setLensPosition({ x: posX, y: posY })

    const bgX = (posX / rect.width) * 100
    const bgY = (posY / rect.height) * 100

    setBackgroundPos(`${bgX}% ${bgY}%`)
  }

  const handleMouseEnter = () => setShowLens(true)
  const handleMouseLeave = () => setShowLens(false)

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-1/2 h-full rounded-md cursor-zoom-in overflow-hidden"
      aria-label={alt}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img
        src={src}
        alt={alt}
        className="size-full object-cover rounded-md pointer-events-none"
        draggable={false}
      />

      {showLens && (
        <div
          style={{
            position: 'absolute',
            left: lensPosition.x - lensSize / 2,
            top: lensPosition.y - lensSize / 2,
            width: lensSize,
            height: lensSize,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.8)',
            boxShadow: '0 0 8px rgba(0,0,0,0.5)',
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${zoom * 100}%`,
            backgroundPosition: backgroundPos,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
    </div>
  )
}
