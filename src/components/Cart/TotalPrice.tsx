import { useCartStore } from '@/store/cartStore'

export default function TotalPrice() {
  const { cart } = useCartStore((state) => state)

  const total = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  )

  return (
    <span className="text-neutral-900 font-bold text-base">
      Total: ${total.toFixed(2)}
    </span>
  )
}
