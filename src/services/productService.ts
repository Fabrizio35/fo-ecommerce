import { apiClient } from '@/apiClient'
import type { Product } from '@/types/product'

interface ResponseType {
  products: Product[]
  limit: number
  skip: number
  total: number
}

// Function to fetch all products from the API
// Returns a promise that resolves to an array of products
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

// Function to fetch products by category
// Returns a promise that resolves to an array of products
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

// Function to fetch a single product by ID
// Returns a promise that resolves to a product object
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
