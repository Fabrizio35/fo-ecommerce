import type { CartProduct } from '@/types/product'
import { discountedPrice } from '@/utils'

interface SubtotalProps {
  product: CartProduct
}

export default function Subtotal({ product }: SubtotalProps) {
  const { price, discountPercentage, quantity } = product

  const finalPrice = discountedPrice(price, discountPercentage)
  const subtotal = finalPrice * quantity

  return (
    <div>
      <div className="flex items-center gap-2 text-sm">
        <span className="line-through text-neutral-500">
          ${price.toFixed(2)}
        </span>
        <span className="font-semibold text-neutral-800">
          ${finalPrice.toFixed(2)}
        </span>
        <span className="text-blue-500 font-semibold">
          {product.discountPercentage}% OFF
        </span>
      </div>

      <span className="text-neutral-900 font-medium">
        Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span>
      </span>
    </div>
  )
}
