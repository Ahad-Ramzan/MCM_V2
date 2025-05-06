
import ESTORE_API from "./estoreApi";

export const getProductById = async (id) => {
  try {
    const response = await ESTORE_API.get(`products/${id}/`);
    console.log(response,"response-")
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};


export const getAllProducts = async () => {
  try {
    const response = await ESTORE_API.get('products/');
    console.log(response,"response data----")
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};
