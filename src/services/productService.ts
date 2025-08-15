import { apiClient } from '@/apiClient'
import type { ProductCategoryResponse } from '@/types/category'
import type { Product } from '@/types/product'

interface ResponseType {
  products: Product[]
  limit: number
  skip: number
  total: number
}

export const getAllProducts = async () => {
  try {
    const response = await apiClient('https://dummyjson.com/products?limit=0')

    if (!response.ok) throw new Error('Error al solicitar los productos')

    const data = await response.json()

    return data as ResponseType
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const searchProducts = async (query: string) => {
  try {
    const response = await apiClient(
      `https://dummyjson.com/products/search?q=${query}`
    )

    if (!response.ok) throw new Error('Error al buscar los productos')

    const data = await response.json()

    return data as ResponseType
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getProductById = async (productId: string) => {
  try {
    const response = await apiClient(
      `https://dummyjson.com/products/${productId}`
    )

    if (!response.ok) throw new Error('Error al solicitar el producto')

    const product: Product = await response.json()

    return product
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getAllProductsCategories = async () => {
  try {
    const response = await apiClient(
      'https://dummyjson.com/products/categories'
    )

    if (!response.ok)
      throw new Error('Error al solicitar las categorías de los productos')

    const productsCategories: ProductCategoryResponse = await response.json()

    return productsCategories
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
