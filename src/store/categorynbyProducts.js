// stores/productsStore.js
import { create } from 'zustand'

const useCategoryByProducts = create((set) => ({
  products: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchProductsByCategory: async (categoryId, page = 1) => {
    try {
      set({ loading: true, error: null })
      const response = await getAllProducts(page, '', '', categoryId)
      set({ products: response, loading: false })
      return response
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Failed to fetch products by category:', error)
    }
  },
}))

export default useCategoryByProducts
