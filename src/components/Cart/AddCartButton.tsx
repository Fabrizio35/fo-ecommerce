import { ShoppingCartIcon, TrashIcon } from '@/icons'
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

  useEffect(() => {
    if (currentItem?.quantity) {
      setQuantity(currentItem.quantity)
    }
  }, [currentItem])

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(evt.target.value), product.stock)
    setQuantity(value > 0 ? value : 1)
  }

  return (
    <div className="flex flex-col gap-2">
      {product.stock > 0 ? (
        <>
          <div className="flex items-center gap-2">
            <label htmlFor={`quantity-${product.id}`} className="text-sm">
              Cantidad:
            </label>
            <input
              id={`quantity-${product.id}`}
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={handleChange}
              className="w-16 text-center border border-neutral-400 rounded-sm text-sm px-1 py-0.5"
            />
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
