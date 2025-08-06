import { XIcon } from '@/icons'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'
import { discountedPrice } from '@/utils'
import Rating from './Rating'
import AddCartButton from '../Cart/AddCartButton'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ onClose, product }: ProductModalProps) {
  const [show, setShow] = useState<boolean>(false)

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 300)
  }

  useEffect(() => {
    setShow(true)

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      onClick={handleClose}
      className={`bg-black/30 fixed z-50 inset-0 flex items-center justify-center transition-opacity duration-300 ${
        show ? 'bg-black/30 opacity-100' : 'bg-black/0 opacity-0'
      }`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className={`bg-neutral-200 max-w-2xl w-full rounded-md p-4 shadow-xl relative transform transition-all duration-300 ${
          show
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-2'
        }`}
      >
        <button
          type="button"
          className="absolute top-1 right-1 cursor-pointer text-neutral-900"
          onClick={handleClose}
        >
          <XIcon className="size-6" />
        </button>

        <div className="flex items-center gap-2 h-[300px]">
          <img
            src={product.thumbnail}
            alt={`${product.title} image`}
            loading="lazy"
            className="w-1/2 rounded-md"
          />

          <div className="flex flex-col justify-between w-1/2 h-full">
            <div className="flex flex-col gap-1">
              <span className="text-neutral-700 text-sm font-semibold">
                {product?.brand}
              </span>

              <h3 className="text-neutral-900 font-bold">{product.title}</h3>

              <Rating rating={product.rating} />

              <div className="flex flex-col gap-1 mt-5">
                <span className="text-neutral-500 line-through">
                  ${product.price.toFixed(2)}
                </span>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-neutral-900 text-2xl">
                    $
                    {discountedPrice(product.price, product.discountPercentage)}
                  </span>

                  <span className="font-semibold text-blue-500 text-lg">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
              </div>
            </div>

            <AddCartButton product={product} />
          </div>
        </div>

        <p className="text-neutral-700 text-sm mt-4">{product.description}</p>
      </section>
    </div>
  )
}
