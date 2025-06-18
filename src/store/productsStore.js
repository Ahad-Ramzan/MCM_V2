import { create } from 'zustand'

const useProductsStore = create((set) => ({
  products: [],
  brands: [],
  categories: [],
  selectedCategory: null,
  selectedBrand: null,
  priceRange: [0, 10000],

  setProducts: (data) => set({ products: data }),
  setBrands: (data) => set({ brands: data }),
  setCategories: (data) => set({ categories: data }),
  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
  setSelectedBrand: (brandId) => set({ selectedBrand: brandId }),
  setPriceRange: (range) => set({ priceRange: range }),

  // Function to fetch products with the current filters
  fetchFilteredProducts: async (getAllProducts) => {
    const { selectedCategory, selectedBrand, priceRange } =
      useProductsStore.getState()

    try {
      const data = await getAllProducts(
        1,
        '', // search
        selectedBrand || '',
        selectedCategory || '',
        '', // status
        priceRange[0],
        priceRange[1]
      )

      set({ products: data.results || [] })
      return data
    } catch (error) {
      console.error('Error fetching products:', error)
      return { results: [] }
    }
  },
}))

export default useProductsStore
