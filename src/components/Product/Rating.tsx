import { StarFilledIcon, StarHalfIcon, StarIcon } from '@/icons'

interface RatingProps {
  rating: number
  showValue?: boolean
  className?: string
  size?: string
}

export default function Rating({
  rating,
  showValue = true,
  className = '',
  size = 'size-4',
}: RatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const full = i <= Math.floor(rating)
        const half = i === Math.ceil(rating) && !Number.isInteger(rating)

        if (full)
          return <StarFilledIcon key={i} className={`text-blue-500 ${size}`} />
        if (half)
          return <StarHalfIcon key={i} className={`text-blue-500 ${size}`} />
        return <StarIcon key={i} className={`text-blue-500 ${size}`} />
      })}

      {showValue && (
        <span className="text-sm text-neutral-700 font-medium ml-1">
          {rating.toFixed(2)}
        </span>
      )}
    </div>
  )
}
