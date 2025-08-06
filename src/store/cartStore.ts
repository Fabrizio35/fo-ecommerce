import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product, CartProduct } from '@/types/product'

interface CartState {
  cart: CartProduct[]
  openCart: boolean
  setOpenCart: (open: boolean) => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: Product['id']) => void
}

// Utility functions to encode and decode data for "secure" storage
// Using Base64 encoding for simplicity, but consider using a more secure method in production
const encode = (value: string) => {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(value)
  return btoa(String.fromCharCode(...bytes))
}

// Decode function to convert Base64 back to string
// Note: This is a simple implementation and may not be secure for sensitive data
const decode = (value: string) => {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  const decoder = new TextDecoder()
  return decoder.decode(bytes)
}

// Create a secure storage using Base64 encoding for the data
// Note: This is a basic implementation and should be replaced with a more secure method in production
const secureStorage = createJSONStorage(() => ({
  getItem: (name) => {
    const encoded = localStorage.getItem(name)
    return encoded ? JSON.parse(decode(encoded)) : null
  },
  setItem: (name, value) => {
    const stringified = JSON.stringify(value)
    localStorage.setItem(name, encode(stringified))
  },
  removeItem: (name) => {
    localStorage.removeItem(name)
  },
}))

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      openCart: false,
      setOpenCart: (open) => set({ openCart: open }),
      addToCart: (product) =>
        set((state) => ({
          cart: [
            ...state.cart,
            {
              id: product.id,
              thumbnail: product.thumbnail,
              title: product.title,
              category: product.category,
              price: product.price,
            },
          ],
        })),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
    }),
    {
      name: 'cart-storage',
      storage: secureStorage,
      partialize: (state) => ({ cart: state.cart }),
    }
  )
)
