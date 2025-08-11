import { ShoppingCartFilledIcon, ShoppingCartIcon } from '@/icons'
import { useCartStore } from '@/store/cartStore'

export default function CartButton() {
  const { cart, setOpenCart } = useCartStore((state) => state)

  return (
    <button
      type="button"
      onClick={() => setOpenCart(true)}
      className="cursor-pointer flex items-center gap-1 px-2 p-0.5 text-neutral-900 font-bold text-lg hover:text-blue-500 transition-colors duration-300"
    >
      <span>Carrito</span>
      {cart.length > 0 ? (
        <ShoppingCartFilledIcon className="size-6 text-blue-500" />
      ) : (
        <ShoppingCartIcon className="size-6" />
      )}
      {cart.length > 0 && (
        <span className="px-1 font-extrabold">{cart.length}</span>
      )}
    </button>
  )
}
