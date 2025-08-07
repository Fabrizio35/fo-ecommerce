import type { CartProduct } from '@/types/product'
import QuantityButtons from './QuantityButtons'
import Subtotal from './Subtotal'
import RemoveFromCartButton from './RemoveFromCartButton'

interface CartProductProps {
  product: CartProduct
}

export default function CartProduct({ product }: CartProductProps) {
  return (
    <article
      key={product.id}
      className="flex items-center gap-2 w-full px-2 py-1 shadow-md rounded-lg bg-neutral-100 relative"
    >
      <RemoveFromCartButton product={product} />

      <img
        src={product.thumbnail}
        alt={`${product.title} image`}
        loading="lazy"
        className="size-20 object-cover rounded-sm"
      />

      <div className="flex flex-col gap-2">
        <div className='flex flex-col gap-0.5'>
          <span className="text-neutral-700 text-xs font-semibold">
            {product.brand}
          </span>

          <h3 className="text-neutral-900 font-bold">{product.title}</h3>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-neutral-900 text-xs">Cantidad:</span>
            <QuantityButtons product={product} />
            <span className="text-neutral-500 text-xs">
              Stock: {product.stock}
            </span>
          </div>

          <Subtotal product={product} />
        </div>
      </div>
    </article>
  )
}
