import { useCartStore } from '@/store/cartStore'
import { useState, useEffect } from 'react'
import TotalPrice from './TotalPrice'
import PayButton from './PayButton'
import CartTitle from './CartTitle'
import CartList from './CartList'
import CloseButton from './CloseButton'

export default function Cart() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [shouldRender, setShouldRender] = useState<boolean>(false)

  const { openCart, cart } = useCartStore((state) => state)

  useEffect(() => {
    if (openCart) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else {
      setIsVisible(false)
      const timeout = setTimeout(() => {
        setShouldRender(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [openCart])

  if (!shouldRender) return null

  return (
    <div
      className={`bg-black/30 fixed z-50 inset-0 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100 bg-black/30' : 'opacity-0 bg-black/0'
      }`}
    >
      <section
        className={`bg-neutral-200 top-0 bottom-0 right-0 h-full p-4 pt-8 absolute max-w-md w-full transform transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
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
  )
}
