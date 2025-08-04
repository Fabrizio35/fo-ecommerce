import { ShoppingCartIcon, TrashIcon } from '@/icons'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types/product'

interface AddCartButtonProps {
  product: Product
}

export default function AddCartButton({ product }: AddCartButtonProps) {
  const { removeFromCart, addToCart, cart } = useCartStore((state) => state)

  const isInCart = cart.some((item) => item.id === product.id)

  const buttonHandler = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isInCart) removeFromCart(product.id)
    else addToCart(product)

    evt.stopPropagation()
  }

  return (
    <button
      onClick={buttonHandler}
      className={`font-bold py-0.5 w-full mt-auto text-sm rounded-sm flex items-center justify-center cursor-pointer gap-1 transition-colors duration-300 ${
        isInCart
          ? 'bg-neutral-800 text-neutral-100 hover:bg-neutral-600'
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
  )
}
