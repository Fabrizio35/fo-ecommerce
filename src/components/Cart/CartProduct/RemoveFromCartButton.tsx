import { TrashIcon } from '@/icons'
import { useCartStore } from '@/store/cartStore'
import type { CartProduct } from '@/types/product'

interface RemoveFromCartButtonProps {
  product: CartProduct
}

export default function RemoveFromCartButton({
  product,
}: RemoveFromCartButtonProps) {
  const { removeFromCart } = useCartStore((state) => state)

  return (
    <button
      type="button"
      onClick={() => removeFromCart(product.id)}
      className="cursor-pointer"
    >
      <TrashIcon className="text-neutral-800 absolute size-5 top-1 right-1 hover:text-blue-500 transition-colors duration-300" />
    </button>
  )
}
