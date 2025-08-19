import { useLocation } from 'react-router'
import ProductList from '@/components/Product/ProductList'
import Cart from '@/components/Cart/Cart'
import CategoryFilterBar from '@/components/CategoryFilterBar'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function Home() {
  const query = useQuery().get('search')
  const category = useQuery().get('category')

  return (
    <div className="bg-neutral-100 min-h-screen">
      <CategoryFilterBar />

      <ProductList search={query} category={category} />

      <Cart />
    </div>
  )
}
