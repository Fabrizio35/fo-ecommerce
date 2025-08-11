import { secureStorage } from '@/utils'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SearchState {
  recentSearches: string[]
  addSearch: (query: string) => void
  clearSearches: () => void
  removeSearch: (query: string) => void
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      recentSearches: [],
      addSearch: (query) =>
        set((state) => {
          const trimmed = query.trim()
          if (!trimmed) return state

          if (state.recentSearches[0]?.toLowerCase() === trimmed.toLowerCase())
            return state

          const updated = [
            trimmed,
            ...state.recentSearches.filter(
              (s) => s.toLocaleLowerCase() !== trimmed.toLocaleLowerCase()
            ),
          ].slice(0, 10)

          return { recentSearches: updated }
        }),
      clearSearches: () => set({ recentSearches: [] }),
      removeSearch: (query) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter(
            (s) => s.toLowerCase() !== query.toLowerCase()
          ),
        })),
    }),
    {
      name: 'search-storage',
      storage: secureStorage,
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
)
