import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
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

  const navigate = useNavigate()
  const location = useLocation()

  const handleOpenModal = (product: ProductType) => {
    setSelectedProduct(product)
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('productId', product.id.toString())
    navigate({ search: searchParams.toString() }, { replace: true })
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
    const searchParams = new URLSearchParams(location.search)
    searchParams.delete('productId')
    navigate({ search: searchParams.toString() }, { replace: true })
  }

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const productId = searchParams.get('productId')

    if (productId && products.length > 0) {
      const product = products.find((p) => p.id.toString() === productId)
      if (product && product !== selectedProduct) {
        setSelectedProduct(product)
      }
    } else if (!productId && selectedProduct !== null) {
      setSelectedProduct(null)
    }
  }, [location.search, products, selectedProduct])

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
              onClick={() => handleOpenModal(product)}
            />
          ))}

          {selectedProduct && (
            <ProductModal
              onClose={handleCloseModal}
              product={selectedProduct}
            />
          )}
        </section>
      )}
    </>
  )
}
