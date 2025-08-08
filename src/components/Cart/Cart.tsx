import { useCartStore } from '@/store/cartStore'
import { useState, useEffect, useCallback } from 'react'
import TotalPrice from './TotalPrice'
import PayButton from './PayButton'
import CartTitle from './CartTitle'
import CartList from './CartList'
import CloseButton from './CloseButton'
import ClearCart from './ClearCart'

export default function Cart() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [shouldRender, setShouldRender] = useState<boolean>(false)

  const { openCart, cart, setOpenCart } = useCartStore((state) => state)

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      setShouldRender(false)
      setOpenCart(false)
    }, 300)
  }, [setOpenCart])

  useEffect(() => {
    if (openCart) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else {
      handleClose()
    }
  }, [openCart, handleClose])

  useEffect(() => {
    if (!shouldRender) return
    const onKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [shouldRender, handleClose])

  if (!shouldRender) return null

  return (
    <div
      onClick={handleClose}
      className={`bg-black/30 fixed z-50 inset-0 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100 bg-black/30' : 'opacity-0 bg-black/0'
      }`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className={`bg-neutral-200 top-0 bottom-0 right-0 h-full p-4 pt-8 absolute max-w-md w-full transform transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <CloseButton onClose={handleClose} />

        <CartTitle />

        <ClearCart />

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
