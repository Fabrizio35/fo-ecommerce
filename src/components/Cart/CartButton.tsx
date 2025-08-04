import { ShoppingCartIcon } from '@/icons'
import { useCartStore } from '@/store/cartStore'

export default function CartButton() {
  const { cart, setOpenCart } = useCartStore((state) => state)

  return (
    <button
      type="button"
      onClick={() => setOpenCart(true)}
      className="group cursor-pointer flex items-center gap-1 px-2 p-0.5 text-neutral-900 font-bold text-lg"
    >
      <span className="group-hover:underline">Carrito</span>
      <ShoppingCartIcon className="size-6" />
      {cart.length > 0 && (
        <span className="px-1 font-extrabold">{cart.length}</span>
      )}
    </button>
  )
}
