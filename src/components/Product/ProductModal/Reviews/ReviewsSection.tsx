import { MessageIcon } from '@/icons'
import DetailTitle from '../DetailTitle'
import type { Product } from '@/types/product'

interface ReviewsSectionProps {
  reviews: Product['reviews']
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <DetailTitle title="Reseñas" icon={<MessageIcon className="size-7" />} />

      <div className="flex flex-col gap-2">
        {reviews.map((review) => (
          <div key={review.reviewerEmail} className="flex flex-col gap-1"></div>
        ))}
      </div>
    </div>
  )
}
