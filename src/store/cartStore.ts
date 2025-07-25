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

const encode = (value: string) => {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(value)
  return btoa(String.fromCharCode(...bytes))
}

const decode = (value: string) => {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  const decoder = new TextDecoder()
  return decoder.decode(bytes)
}

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
              images: product.images,
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
