import { ShoppingCartFilledIcon } from '@/icons'

export default function Logo() {
  return (
    <div className="flex items-center gap-1 text-neutral-900 select-none">
      <h1 className="text-xl font-extrabold">FO Ecommerce</h1>

      <ShoppingCartFilledIcon className="size-6 text-blue-500" />
    </div>
  )
}
