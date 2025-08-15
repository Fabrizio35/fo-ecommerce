import { MessageIcon } from '@/icons'
import DetailTitle from '../DetailTitle'
import type { Product } from '@/types/product'
import ReviewList from './ReviewList'

interface ReviewsSectionProps {
  reviews: Product['reviews']
}

export default function ReviewSection({ reviews }: ReviewsSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <DetailTitle title="Reseñas" icon={<MessageIcon className="size-6" />} />

      <ReviewList reviews={reviews} />
    </div>
  )
}
