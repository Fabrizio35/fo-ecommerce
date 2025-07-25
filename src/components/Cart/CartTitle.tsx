import { ShoppingCartIcon, ShoppingCartOff } from '@/icons'
import { useCartStore } from '@/store/cartStore'

export default function CartTitle() {
  const { cart } = useCartStore((state) => state)

  return (
    <div className="flex items-center justify-center gap-1 text-neutral-900 font-bold">
      <h2 className="text-xl">
        {cart.length > 0 ? 'Carrito de compras' : 'Carrito de compras vacío'}
      </h2>

      {cart.length > 0 ? (
        <ShoppingCartIcon className="size-7" />
      ) : (
        <ShoppingCartOff className="size-7" />
      )}
    </div>
  )
}
