import { create } from 'zustand';

const useProductStore = create((set) => ({
  product: {
    name: '',
    reference: '',
    summary: '',
    regularPrice: '',
    salePrice: '',
    quantity: '',
    soldItems: '',
    description: '',
    thumbnail: '',
    gallery: [],
    video: '',
    sku: '',
    status: '',
    brand: '',
    tags: '',
  },
  updateProduct: (field, value) =>
    set((state) => ({
      product: {
        ...state.product,
        [field]: value,
      },
    })),
  resetProduct: () =>
    set({
      product: {
        name: '',
        reference: '',
        summary: '',
        regularPrice: '',
        salePrice: '',
        quantity: '',
        soldItems: '',
        description: '',
        thumbnail: '',
        gallery: [],
        video: '',
        sku: '',
        status: '',
        brand: '',
        tags: '',
      },
    }),
}));
export default useProductStore;
