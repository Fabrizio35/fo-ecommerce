import { FileDescriptionIcon } from '@/icons'
import type { Product } from '@/types/product'
import DetailTitle from './DetailTitle'

interface ProductDescriptionProps {
  product: Product
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  return (
    <div className="flex flex-col gap-2">
      <DetailTitle
        icon={<FileDescriptionIcon className="size-7" />}
        title="Descripción"
      />

      <div className="flex flex-col gap-1">
        <p className="text-neutral-800">{product.description}</p>

        <div className="flex items-center gap-1">
          {product.tags.map((tag) => (
            <span key={tag} className="text-neutral-600">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
