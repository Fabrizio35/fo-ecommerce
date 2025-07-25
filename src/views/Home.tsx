import { useLocation } from 'react-router'
import Sidebar from '@/components/Sidebar'
import ProductsList from '@/components/Product/ProductsList'
import Cart from '@/components/Cart/Cart'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function Home() {
  const query = useQuery().get('search')

  return (
    <div className="flex">
      <Sidebar />

      <ProductsList search={query} />

      <Cart />
    </div>
  )
}
