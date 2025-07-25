import { useCartStore } from '@/store/cartStore'

export default function TotalPrice() {
  const { cart } = useCartStore((state) => state)

  return (
    <span className="text-neutral-900 font-bold text-base">
      Total: $
      {cart.reduce((total, product) => total + product.price, 0).toFixed(2)}
    </span>
  )
}
