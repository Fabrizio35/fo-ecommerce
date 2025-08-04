import { XIcon } from '@/icons'
import type { Product } from '@/types/product'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ onClose, product }: ProductModalProps) {
  return (
    <div className="bg-black/30 fixed z-50 inset-0 flex items-center justify-center">
      <div className="bg-neutral-200 max-w-md w-full rounded-lg p-2 shadow-xl relative">
        <button
          type="button"
          className="absolute top-2 right-2 cursor-pointer text-neutral-900"
          onClick={onClose}
        >
          <XIcon className="size-7" />
        </button>

        <div className="flex items-center">
          <img
            src={product.images[0]}
            alt={`${product.title} image`}
            loading="lazy"
            className="w-1/2 rounded-md h-[200px]"
          />

          <div className="flex flex-col">
            <h3 className="text-neutral-900 font-bold">{product.title}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
