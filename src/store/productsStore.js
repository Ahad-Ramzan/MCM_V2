import { create } from 'zustand'

const useProductsStore = create((set) => ({
  products: [],
  brands: [],
  categories: [],
  selectedCategory: null,
  selectedCategoryName: '',
  selectedSubcategory: null, // Add this
  selectedSubcategoryName: '', // Add this
  selectedBrand: null,
  priceRange: [0, 10000],

  setProducts: (data) => set({ products: data }),
  setBrands: (data) => set({ brands: data }),
  setCategories: (data) => set({ categories: data }),
  setSelectedCategory: (categoryId, categoryName) =>
    set({
      selectedCategory: categoryId,
      selectedCategoryName: categoryName || '',
      selectedSubcategory: null, // Reset subcategory when category changes
      selectedSubcategoryName: '', // Reset subcategory name
    }),

  // Add these new actions
  setSelectedSubcategory: (subcategoryId, subcategoryName) =>
    set({
      selectedSubcategory: subcategoryId,
      selectedSubcategoryName: subcategoryName || '',
      selectedCategory: null, // Reset category when subcategory is selected
      selectedCategoryName: '', // Reset category name
    }),

  setSelectedBrand: (brandId) => set({ selectedBrand: brandId }),
  setPriceRange: (range) => set({ priceRange: range }),

  // Update the fetch function to include subcategory
  fetchFilteredProducts: async (getAllProducts) => {
    const { selectedCategory, selectedSubcategory, selectedBrand, priceRange } =
      useProductsStore.getState()

    try {
      const data = await getAllProducts(
        1,
        '', // search
        selectedBrand || '',
        selectedCategory || '',
        '', // status
        priceRange[0],
        priceRange[1],
        selectedSubcategory || '' // Add subcategory filter
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
