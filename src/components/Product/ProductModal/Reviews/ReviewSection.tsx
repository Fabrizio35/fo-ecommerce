import { MessageIcon, UserCircleIcon } from '@/icons'
import DetailTitle from '../DetailTitle'
import type { Product } from '@/types/product'
import Rating from '../../Rating'
import { formatDateTime } from '@/utils'

interface ReviewsSectionProps {
  reviews: Product['reviews']
}

export default function ReviewSection({ reviews }: ReviewsSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <DetailTitle title="Reseñas" icon={<MessageIcon className="size-7" />} />

      <div className="flex flex-col gap-2 max-h-[200px] overflow-y-scroll">
        {reviews.map((review) => (
          <div
            key={review.reviewerEmail}
            className="flex flex-col gap-2 bg-neutral-100 rounded-sm shadow-md w-full p-2"
          >
            <div className="flex flex-col gap-0.5 text-neutral-900">
              <div className="flex items-center gap-1">
                <UserCircleIcon className="size-5" />
                <span className="text-sm font-semibold">
                  {review.reviewerName}
                </span>
              </div>

              <span className="text-xs text-neutral-600">
                {formatDateTime(review.date)}
              </span>
            </div>

            <Rating rating={review.rating} showValue={false} size="size-3" />

            <p className="text-sm text-neutral-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
