import Logo from './Logo'
import Searchbar from '../Searchbar/Searchbar'
import CartButton from '../Cart/CartButton'

export default function Navbar() {
  return (
    <header className="w-full px-5 flex items-center justify-between shadow-md fixed top-0 right-0 left-0 bg-neutral-200 max-h-14 h-full z-50">
      <Logo />

      <Searchbar />

      <CartButton />
    </header>
  )
}
