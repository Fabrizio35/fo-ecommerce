import {
  DepthIcon,
  DimensionsIcon,
  FileDescriptionIcon,
  HeightIcon,
  WeightIcon,
  WidthIcon,
  XIcon,
} from '@/icons'
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
        className={`bg-neutral-200 flex flex-col gap-4 max-w-2xl w-full rounded-md p-4 shadow-xl relative transform transition-all duration-300 ${
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
            <div>
              <span className="text-neutral-700 text-sm font-semibold">
                {product?.brand}
              </span>

              <h3 className="text-neutral-900 font-bold text-lg">
                {product.title}
              </h3>

              <Rating rating={product.rating} className="mt-2" />

              <div className="mt-2">
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

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1 text-neutral-900">
            <FileDescriptionIcon className="size-7" />

            <h4 className="font-semibold text-lg">Descripción</h4>
          </div>

          <p className="text-neutral-800">{product.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1 text-neutral-900">
            <DimensionsIcon className="size-7" />

            <h4 className="font-semibold text-lg">Dimensiones</h4>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <WidthIcon className="size-7 p-1 rounded-full text-neutral-800 bg-neutral-300" />

              <span className="text-neutral-800">Ancho:</span>

              <span className="text-neutral-800 font-semibold">
                {product.dimensions.width}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <HeightIcon className="size-7 p-1 rounded-full text-neutral-800 bg-neutral-300" />

              <span className="text-neutral-800">Alto:</span>

              <span className="text-neutral-800 font-semibold">
                {product.dimensions.height}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <DepthIcon className="size-7 p-1 rounded-full text-neutral-800 bg-neutral-300" />

              <span className="text-neutral-800">Profundidad:</span>

              <span className="text-neutral-800 font-semibold">
                {product.dimensions.depth}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <WeightIcon className="size-7 p-1 rounded-full text-neutral-800 bg-neutral-300" />

              <span className="text-neutral-800">Peso:</span>

              <span className="text-neutral-800 font-semibold">
                {product.weight}g
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
