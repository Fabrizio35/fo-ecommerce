import { XIcon } from '@/icons'
import { useCartStore } from '@/store/cartStore'

export default function CloseButton() {
  const { setOpenCart } = useCartStore((state) => state)

  return (
    <button
      type="button"
      className="absolute top-1 right-2 cursor-pointer text-neutral-900"
      onClick={() => setOpenCart(false)}
    >
      <XIcon className="size-7" />
    </button>
  )
}
