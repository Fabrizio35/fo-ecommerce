import { StarFilledIcon, StarHalfIcon, StarIcon } from '@/icons'

interface RatingProps {
  rating: number
  className?: string
  showValue?: boolean
}

export default function Rating({
  rating,
  className = '',
  showValue = true,
}: RatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const full = i <= Math.floor(rating)
        const half = i === Math.ceil(rating) && !Number.isInteger(rating)

        if (full)
          return <StarFilledIcon key={i} className="size-4 text-blue-500" />
        if (half)
          return <StarHalfIcon key={i} className="size-4 text-blue-500" />
        return <StarIcon key={i} className="size-4 text-blue-500" />
      })}

      {showValue && (
        <span className="text-sm text-neutral-700 font-medium ml-1">
          {rating.toFixed(2)}
        </span>
      )}
    </div>
  )
}
