import { useEffect, useState } from 'react'
import { getAllProducts, searchProducts } from '@/services/productService'
import type { Product as ProductType } from '@/types/product'
import Product from './Product'
import Spinner from '../Spinner'
import ProductModal from './ProductModal/ProductModal'

interface ProductsListProps {
  search?: string | null
}

export default function ProductList({ search }: ProductsListProps) {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [_error, setError] = useState<string>('')
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  )

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
      ) : products.length === 0 ? (
        <div className="mt-32 text-center text-gray-500 text-lg">
          No se encontraron productos.
        </div>
      ) : (
        <section className="grid grid-cols-5 gap-5 p-5 mt-14 h-fit w-[1200px] mx-auto">
          {products?.map((product) => (
            <Product
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}

          {selectedProduct && (
            <ProductModal
              onClose={() => setSelectedProduct(null)}
              product={selectedProduct}
            />
          )}
        </section>
      )}
    </>
  )
}
