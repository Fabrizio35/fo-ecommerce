import { apiClient } from '@/apiClient'
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
      console.error(error)
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
      console.error(error)
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
      console.error(error)
      throw new Error(error.message)
    }
  }
}
