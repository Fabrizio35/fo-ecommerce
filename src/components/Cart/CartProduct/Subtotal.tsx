import type { CartProduct } from '@/types/product'

interface SubtotalProps {
  product: CartProduct
}

export default function Subtotal({ product }: SubtotalProps) {
  return (
    <span className="text-neutral-800 text-sm font-medium">
      Subtotal:{' '}
      <span className="font-semibold">
        ${(product.price * product.quantity).toFixed(2)}
      </span>
    </span>
  )
}
