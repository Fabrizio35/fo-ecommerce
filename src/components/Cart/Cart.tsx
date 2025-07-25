import { useCartStore } from '@/store/cartStore'
import TotalPrice from './TotalPrice'
import PayButton from './PayButton'
import CartTitle from './CartTitle'
import CartList from './CartList'
import CloseButton from './CloseButton'

export default function Cart() {
  const { openCart, cart } = useCartStore((state) => state)

  return (
    <>
      {openCart && (
        <div className="w-full h-full bg-black/30 fixed z-50 top-0 left-0 bottom-0 right-0">
          <section className="bg-neutral-200 top-0 bottom-0 right-0 h-full p-4 pt-8 absolute max-w-md w-full">
            <CloseButton />

            <CartTitle />

            <CartList />

            {cart.length > 0 && (
              <div className="flex items-center justify-between mt-3">
                <TotalPrice />
                <PayButton />
              </div>
            )}
          </section>
        </div>
      )}
    </>
  )
}
