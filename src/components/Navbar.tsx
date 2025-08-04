import { ShoppingCartFilledIcon } from '@/icons'
import CartButton from './Cart/CartButton'
import Searchbar from './Searchbar/Searchbar'

export default function Navbar() {
  return (
    <header className="w-full py-3 px-5 flex items-center justify-between shadow-md fixed bg-neutral-200 max-h-14 h-full z-50">
      <div className="flex items-center gap-1 text-neutral-900">
        <h1 className="text-xl font-extrabold">FO Ecommerce</h1>

        <ShoppingCartFilledIcon className="size-6" />
      </div>

      <Searchbar />

      <CartButton />
    </header>
  )
}
