
import ESTORE_API from "./estoreApi";

export const getProductById = async (id) => {
  try {
    const response = await ESTORE_API.get(`products/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};


export const getAllProducts = async () => {
  try {
    const response = await ESTORE_API.get('products/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};
