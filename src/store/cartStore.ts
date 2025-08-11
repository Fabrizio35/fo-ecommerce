import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartProduct } from '@/types/product'
import { secureStorage } from '@/utils'

interface CartState {
  cart: CartProduct[]
  openCart: boolean
  setOpenCart: (open: boolean) => void
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: Product['id']) => void
  updateQuantity: (productId: Product['id'], quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      openCart: false,
      setOpenCart: (open) => set({ openCart: open }),
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id)
          const finalQuantity = Math.min(quantity, product.stock)

          if (existing) {
            const newQuantity = Math.min(
              existing.quantity + finalQuantity,
              product.stock
            )
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            }
          }

          return {
            cart: [
              ...state.cart,
              {
                id: product.id,
                thumbnail: product.thumbnail,
                title: product.title,
                brand: product.brand,
                price: product.price,
                stock: product.stock,
                discountPercentage: product.discountPercentage,
                quantity,
              },
            ],
          }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
      storage: secureStorage,
      partialize: (state) => ({ cart: state.cart }),
    }
  )
)
