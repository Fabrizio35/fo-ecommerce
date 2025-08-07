import { MinusIcon, PlusIcon } from '@/icons'
import { useCartStore } from '@/store/cartStore'
import type { CartProduct } from '@/types/product'

interface QuantityButtonsProps {
  product: CartProduct
}

export default function QuantityButtons({ product }: QuantityButtonsProps) {
  const { updateQuantity } = useCartStore((state) => state)

  const increase = () => {
    if (product.quantity < product.stock) {
      updateQuantity(product.id, product.quantity + 1)
    }
  }

  const decrease = () => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1)
    }
  }

  return (
    <div className="flex items-center border border-neutral-400 rounded-sm overflow-hidden">
      <button
        onClick={decrease}
        className="px-2 text-sm font-bold cursor-pointer enabled:hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        disabled={product.quantity === 1}
      >
        <MinusIcon className="size-3" />
      </button>
      <span className="px-1 text-sm">{product.quantity}</span>
      <button
        onClick={increase}
        className="px-2 text-sm font-bold cursor-pointer enabled:hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        disabled={product.quantity === product.stock}
      >
        <PlusIcon className="size-3" />
      </button>
    </div>
  )
}
