import type { Product as ProductType } from '@/types/product'
import { discountedPrice } from '@/utils'

interface ProductProps {
  product: ProductType
  onClick: () => void
}

export default function Product({ product, onClick }: ProductProps) {
  return (
    <article
      onClick={onClick}
      className="p-2 rounded-lg shadow-md flex flex-col justify-between gap-2 bg-neutral-100 hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <img
        src={product.thumbnail}
        alt={`${product.title} image`}
        loading="lazy"
        className="w-full rounded-sm h-48 object-cover"
      />

      <span className="text-neutral-600 text-sm font-semibold">
        {product?.brand}
      </span>

      <h2 className="font-bold text-neutral-900">{product.title}</h2>

      <div>
        <span className="text-neutral-500 line-through">
          ${product.price.toFixed(2)}
        </span>

        <div className="flex items-center gap-2">
          <span className="font-bold text-neutral-900 text-xl">
            $
            {discountedPrice(product.price, product.discountPercentage).toFixed(
              2
            )}
          </span>

          <span className="font-semibold text-blue-500">
            {product.discountPercentage}% OFF
          </span>
        </div>
      </div>
    </article>
  )
}
