import { create } from 'zustand'

const useSearchStore = create((set) => ({
  searchTerm: '',
  searchResults: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchResults: (results) => set({ searchResults: results }),
}))

export default useSearchStore
