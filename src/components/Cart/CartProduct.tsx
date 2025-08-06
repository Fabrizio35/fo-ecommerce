import { TrashIcon } from '@/icons'
import { useCartStore } from '@/store/cartStore'
import type { CartProduct } from '@/types/product'

interface CartProductProps {
  product: CartProduct
}

export default function CartProduct({ product }: CartProductProps) {
  const { removeFromCart } = useCartStore((state) => state)

  return (
    <article
      key={product.id}
      className="flex items-center gap-2 w-full px-2 py-1 shadow-md rounded-lg bg-neutral-100 relative"
    >
      <button
        type="button"
        onClick={() => removeFromCart(product.id)}
        className="cursor-pointer"
      >
        <TrashIcon className="text-neutral-900 absolute size-5 top-1 right-1 hover:text-neutral-600 transition-colors duration-200" />
      </button>

      <img
        src={product.thumbnail}
        alt={`${product.title} image`}
        loading="lazy"
        className="size-20 object-cover rounded-sm"
      />

      <div className="flex flex-col gap-1">
        <h3 className="text-neutral-900 text-sm font-bold">{product.title}</h3>

        <p className="text-neutral-700 text-xs">{product.category}</p>

        <span className="text-neutral-900 font-extrabold text-sm">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </article>
  )
}
