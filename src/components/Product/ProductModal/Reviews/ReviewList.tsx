import type { Product } from '@/types/product'
import Review from './Review'

interface ReviewListProps {
  reviews: Product['reviews']
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="flex flex-col gap-2 p-2 max-h-[200px] overflow-y-scroll">
      {reviews.map((review) => (
        <Review key={review.reviewerEmail} review={review} />
      ))}
    </div>
  )
}
