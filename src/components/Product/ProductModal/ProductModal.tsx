import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'
import ProductDescription from './ProductDescription'
import ProductDimensions from './ProductDimensions'
import ProductInfo from './ProductInfo'
import CloseModalButton from './CloseModalButton'
import MainInfo from './MainInfo'
import ZoomImage from '@/components/ZoomImage'

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
        <CloseModalButton handleClose={handleClose} />

        <div className="flex items-center gap-2 h-[300px]">
          <ZoomImage src={product.thumbnail} alt={`${product.title} image`} />

          <MainInfo product={product} />
        </div>

        <ProductDescription product={product} />

        <ProductDimensions product={product} />

        <ProductInfo product={product} />
      </section>
    </div>
  )
}
