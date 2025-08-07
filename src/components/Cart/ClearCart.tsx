import { ShoppingCartOffIcon } from '@/icons'
import { useCartStore } from '@/store/cartStore'

export default function ClearCart() {
  const { clearCart, cart } = useCartStore((state) => state)

  return (
    <>
      {cart.length > 0 ? (
        <button
          type="button"
          onClick={() => clearCart()}
          className="text-neutral-800 py-1 w-full font-semibold flex items-center justify-center gap-2 rounded-sm cursor-pointer mt-3 hover:text-blue-500 transition-colors duration-300"
        >
          <ShoppingCartOffIcon className="size-5" />
          Vaciar carrito
        </button>
      ) : null}
    </>
  )
}
