import type { Product as ProductType } from '@/types/product'
import AddCartButton from './AddCartButton'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  return (
    <article className="p-2 rounded-lg shadow-md flex flex-col gap-2 bg-neutral-100">
      <img
        src={product.images[0]}
        alt={`${product.title} image`}
        loading="lazy"
        className="w-full rounded-sm h-48 object-cover"
      />

      <h2 className="text-sm font-bold text-neutral-900">{product.title}</h2>

      <p className="text-xs text-neutral-800">{product.category}</p>

      <span className="text-neutral-900 font-extrabold text-sm">
        ${product.price}
      </span>

      <AddCartButton product={product} />
    </article>
  )
}
