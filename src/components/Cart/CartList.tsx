import { useCartStore } from '@/store/cartStore'
import CartProduct from './CartProduct/CartProduct'

export default function CartList() {
  const { cart } = useCartStore((state) => state)

  return (
    <div className="flex flex-col gap-4 mt-5">
      {cart.length > 0
        ? cart.map((product) => (
            <CartProduct key={product.id} product={product} />
          ))
        : null}
    </div>
  )
}
