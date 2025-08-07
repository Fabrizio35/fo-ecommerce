import type { Product } from '@/types/product'
import Rating from '../Rating'
import { discountedPrice } from '@/utils'
import AddCartButton from '../AddCartButton'

interface MainInfoProps {
  product: Product
}

export default function MainInfo({ product }: MainInfoProps) {
  return (
    <div className="flex flex-col justify-between w-1/2 h-full">
      <div>
        <span className="text-neutral-700 text-sm font-semibold">
          {product?.brand}
        </span>

        <h3 className="text-neutral-900 font-bold text-lg">{product.title}</h3>

        <Rating rating={product.rating} className="mt-2" />

        <div className="mt-2">
          <span className="text-neutral-500 line-through">
            ${product.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 text-2xl">
              ${discountedPrice(product.price, product.discountPercentage)}
            </span>

            <span className="font-semibold text-blue-500 text-lg">
              {product.discountPercentage}% OFF
            </span>
          </div>
        </div>
      </div>

      <AddCartButton product={product} />
    </div>
  )
}
