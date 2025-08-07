import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from '@/icons'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types/product'

interface AddCartButtonProps {
  product: Product
}

export default function AddCartButton({ product }: AddCartButtonProps) {
  const { removeFromCart, addToCart, cart, updateQuantity } = useCartStore(
    (state) => state
  )

  const currentItem = cart.find((item) => item.id === product.id)
  const quantity = currentItem?.quantity || 0
  const isInCart = quantity > 0

  const increase = () => {
    if (currentItem && quantity < product.stock) {
      updateQuantity(product.id, quantity + 1)
    }
  }

  const decrease = () => {
    if (currentItem) {
      if (quantity === 1) {
        removeFromCart(product.id)
      } else {
        updateQuantity(product.id, quantity - 1)
      }
    }
  }

  const handleAdd = () => {
    if (product.stock > 0) {
      addToCart(product, 1)
    }
  }

  if (product.stock === 0) {
    return (
      <p className="text-red-500 font-semibold text-sm">Sin stock disponible</p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {isInCart ? (
        <>
          <div className="flex items-center gap-2">
            <span className="text-sm">Cantidad:</span>
            <div className="flex items-center border border-neutral-400 rounded-sm overflow-hidden">
              <button
                type="button"
                onClick={decrease}
                disabled={quantity === 0}
                className="px-2 text-sm font-bold cursor-pointer enabled:hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                <MinusIcon className="size-3" />
              </button>
              <span className="px-1 text-sm">{quantity}</span>
              <button
                type="button"
                onClick={increase}
                disabled={quantity === product.stock}
                className="px-2 text-sm font-bold cursor-pointer enabled:hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                <PlusIcon className="size-3" />
              </button>
            </div>
            <span className="text-xs text-neutral-600">
              Stock: {product.stock}
            </span>
          </div>

          <button
            onClick={() => removeFromCart(product.id)}
            className="bg-neutral-700 text-neutral-100 hover:bg-neutral-500 font-bold py-1 w-full text-sm rounded-sm flex items-center justify-center cursor-pointer gap-1 transition-colors duration-300"
          >
            Quitar del carrito
            <TrashIcon className="size-5" />
          </button>
        </>
      ) : (
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-neutral-100 hover:bg-blue-400 font-bold py-1 w-full text-sm rounded-sm flex items-center justify-center cursor-pointer gap-1 transition-colors duration-300"
        >
          Añadir al carrito
          <ShoppingCartIcon className="size-5" />
        </button>
      )}
    </div>
  )
}
