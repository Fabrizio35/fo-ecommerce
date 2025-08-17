import type { Product } from '@/types/product'
import { useCallback, useEffect, useState } from 'react'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import ProductDescription from './ProductDescription'
import ProductDimensions from './ProductDimensions'
import ProductInfo from './ProductInfo'
import CloseModalButton from './CloseModalButton'
import MainInfo from './MainInfo'
import ReviewSection from './Reviews/ReviewSection'
import ImageCarousel from '@/components/ImageCarousel'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ onClose, product }: ProductModalProps) {
  const [show, setShow] = useState<boolean>(false)

  useDocumentTitle(show ? `${product.title} | FO Ecommerce` : 'FO Ecommerce')

  const handleClose = useCallback(() => {
    setShow(false)
    setTimeout(onClose, 300)
  }, [onClose])

  useEffect(() => {
    setShow(true)

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClose])

  return (
    <div
      onClick={handleClose}
      className={`bg-black/30 fixed z-50 inset-0 flex items-center justify-center transition-opacity duration-300 ${
        show ? 'bg-black/30 opacity-100' : 'bg-black/0 opacity-0'
      }`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className={`bg-white flex flex-col gap-4 max-w-2xl w-full max-h-[95vh] h-full overflow-y-scroll rounded-md p-4 shadow-xl relative my-10 transform transition-all duration-300 ${
          show
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-2'
        }`}
      >
        <CloseModalButton handleClose={handleClose} />

        <div className="flex items-center gap-2">
          <ImageCarousel images={product.images} alt={product.title} />

          <MainInfo product={product} />
        </div>

        <ProductDescription
          description={product.description}
          tags={product.tags}
        />

        <ProductDimensions
          weight={product.weight}
          width={product.dimensions.width}
          height={product.dimensions.height}
          depth={product.dimensions.depth}
        />

        <ProductInfo
          availabilityStatus={product.availabilityStatus}
          shippingInformation={product.shippingInformation}
          warrantyInformation={product.warrantyInformation}
        />

        <ReviewSection reviews={product.reviews} />
      </section>
    </div>
  )
}
