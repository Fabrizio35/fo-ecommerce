import { create } from 'zustand'
import type { Product } from '@/types/product'

interface CartState {
  cart: Product[]
  openCart: boolean
  setOpenCart: (open: boolean) => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: Product['id']) => void
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  openCart: false,
  setOpenCart: (open) => set({ openCart: open }),
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
}))
