import { useEffect, useState } from 'react'
import { getAllProducts, searchProducts } from '@/services/productService'
import type { Product as ProductType } from '@/types/product'
import Product from './Product'
import Spinner from '../Spinner'

interface ProductsListProps {
  search?: string | null
}

export default function ProductsList({ search }: ProductsListProps) {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [_error, setError] = useState<string>('')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      try {
        const data = search
          ? await searchProducts(search)
          : await getAllProducts()

        setProducts(data?.products ?? [])
        setLoading(false)
      } catch (error) {
        setError('No se pudieron cargar los productos')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [search])

  return (
    <>
      {loading ? (
        <div className="mt-32 w-full">
          <Spinner />
        </div>
      ) : (
        <section className="grid grid-cols-4 gap-4 w-full p-5 mt-14 h-fit">
          {products?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </section>
      )}
    </>
  )
}
