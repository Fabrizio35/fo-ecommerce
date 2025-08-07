import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from '@/icons'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'

interface AddCartButtonProps {
  product: Product
}

export default function AddCartButton({ product }: AddCartButtonProps) {
  const { removeFromCart, addToCart, cart } = useCartStore((state) => state)

  const currentItem = cart.find((item) => item.id === product.id)
  const isInCart = !!currentItem
  const [quantity, setQuantity] = useState<number>(currentItem?.quantity || 1)

  const increase = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  useEffect(() => {
    if (currentItem?.quantity) {
      setQuantity(currentItem.quantity)
    }
  }, [currentItem])

  return (
    <div className="flex flex-col gap-2">
      {product.stock > 0 ? (
        <>
          <div className="flex items-center gap-2">
            <span className="text-sm">Cantidad:</span>
            <div className="flex items-center border border-neutral-400 rounded-sm overflow-hidden">
              <button
                type="button"
                onClick={decrease}
                className="px-2 text-sm font-bold hover:bg-neutral-300 transition-colors"
              >
                <MinusIcon className="size-4" />
              </button>
              <span className="px-3 text-sm">{quantity}</span>
              <button
                type="button"
                onClick={increase}
                className="px-2 text-sm font-bold hover:bg-neutral-300 transition-colors"
              >
                <PlusIcon className="size-4" />
              </button>
            </div>
            <span className="text-xs text-neutral-600">
              Stock: {product.stock}
            </span>
          </div>

          <button
            onClick={() =>
              isInCart
                ? removeFromCart(product.id)
                : addToCart(product, quantity)
            }
            className={`font-bold py-1 w-full text-sm rounded-sm flex items-center justify-center cursor-pointer gap-1 transition-colors duration-300 ${
              isInCart
                ? 'bg-neutral-700 text-neutral-100 hover:bg-neutral-500'
                : 'bg-blue-500 text-neutral-100 hover:bg-blue-400'
            }`}
          >
            {isInCart ? 'Quitar del carrito' : 'Añadir al carrito'}
            {isInCart ? (
              <TrashIcon className="size-5" />
            ) : (
              <ShoppingCartIcon className="size-5" />
            )}
          </button>
        </>
      ) : (
        <p className="text-red-500 font-semibold text-sm">
          Sin stock disponible
        </p>
      )}
    </div>
  )
}
