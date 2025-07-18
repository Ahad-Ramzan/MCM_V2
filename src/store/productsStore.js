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
  selectedBrandName: '',
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

  setSelectedBrand: (brandId, brandName) =>
    set({
      selectedBrand: brandId,
      selectedBrandName: brandName || '',
    }),
  setPriceRange: (range) => set({ priceRange: range }),

  // Update the fetch function to include subcategory
  fetchFilteredProducts: async (getAllProducts, page = 1) => {
    const {
      selectedCategory,
      selectedSubcategory,
      selectedBrand,
      priceRange,
    } = useProductsStore.getState()

    try {
      const data = await getAllProducts(
        page,
        '', // search
        selectedBrand || '',
        selectedCategory || '',
        '', // status
        priceRange[0],
        priceRange[1],
        selectedSubcategory || ''
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
