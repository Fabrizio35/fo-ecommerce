import { useLocation } from 'react-router'
import ProductList from '@/components/Product/ProductList'
import Cart from '@/components/Cart/Cart'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function Home() {
  const query = useQuery().get('search')

  return (
    <div className='bg-neutral-100'>
      <ProductList search={query} />

      <Cart />
    </div>
  )
}
