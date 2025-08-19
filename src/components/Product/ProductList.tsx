import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import {
  searchProducts,
  getCategories,
  getProductsByCategory,
} from '@/services/productService'
import type { Product as ProductType } from '@/types/product'
import Product from './Product'
import Spinner from '../Spinner'
import ProductModal from './ProductModal/ProductModal'

interface ProductsListProps {
  search?: string | null
  category?: string | null
}

export default function ProductList({ search, category }: ProductsListProps) {
  const [products, setProducts] = useState<ProductType[]>([])
  const [categoryProducts, setCategoryProducts] = useState<
    Record<string, { name: string; items: ProductType[] }>
  >({})
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
        if (search) {
          const data = await searchProducts(search)
          setProducts(data?.products ?? [])
        } else if (category) {
          const data = await getProductsByCategory(category, 12)
          setProducts(data?.products ?? [])
        } else {
          const cats = await getCategories()
          if (!cats) return
          const results = await Promise.all(
            cats.map((c) => getProductsByCategory(c.slug, 5))
          )
          const mapped: Record<string, { name: string; items: ProductType[] }> =
            {}
          cats.forEach((c, i) => {
            mapped[c.slug] = { name: c.name, items: results[i]?.products ?? [] }
          })
          setCategoryProducts(mapped)
        }
      } catch (error) {
        setError('No se pudieron cargar los productos')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [search, category])

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
        <div className="pt-32 w-full">
          <Spinner />
        </div>
      ) : search || category ? (
        products.length === 0 ? (
          <div className="mt-32 text-center text-gray-500 text-lg">
            No se encontraron productos.
          </div>
        ) : (
          <section className="grid grid-cols-5 gap-5 p-5 mt-14 max-w-6xl mx-auto">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                onClick={() => handleOpenModal(product)}
              />
            ))}
          </section>
        )
      ) : (
        // vista de destacados por categoría
        <div className="mt-16 space-y-10">
          {Object.entries(categoryProducts).map(([slug, data]) =>
            data.items.length > 0 ? (
              <div key={slug} className="px-5 max-w-6xl mx-auto">
                <h2 className="text-xl font-bold mb-4">{data.name}</h2>
                <div className="grid grid-cols-5 gap-5">
                  {data.items.map((p) => (
                    <Product
                      key={p.id}
                      product={p}
                      onClick={() => handleOpenModal(p)}
                    />
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}

      {selectedProduct && (
        <ProductModal onClose={handleCloseModal} product={selectedProduct} />
      )}
    </>
  )
}
