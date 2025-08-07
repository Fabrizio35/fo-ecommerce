import { useCartStore } from '@/store/cartStore'
import { discountedPrice } from '@/utils'

export default function TotalPrice() {
  const { cart } = useCartStore((state) => state)

  const total = cart.reduce((total, product) => {
    const finalPrice = discountedPrice(
      product.price,
      product.discountPercentage
    )
    return total + finalPrice * product.quantity
  }, 0)

  return (
    <span className="text-neutral-900 font-bold text-lg">
      Total: ${total.toFixed(2)}
    </span>
  )
}
