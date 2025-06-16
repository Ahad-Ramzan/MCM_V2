import { create } from 'zustand'

const useProductsStore = create((set) => ({
  products: [],
  brands: [],
  categories: [],

  setProducts: (data) => set({ products: data }),
  setBrands: (data) => set({ brands: data }),
  setCategories: (data) => set({ categories: data }),
}))

export default useProductsStore
