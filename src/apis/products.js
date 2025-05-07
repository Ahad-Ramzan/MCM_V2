
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



export const getAllCategories = async () => {
  try {
    const response = await ESTORE_API.get('categories/');
    // alert("data")
    console.log("Fetched categories:", response.data);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching categories:', error.response?.data || error.message);
    throw new Error('Failed to fetch categories');
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



export const createProduct = async () => {
    const dummyProduct = {
      name: "Test Product",
      SKU: "TEST-SKU-001",
      price: "223",
      stock: 4294967295,
      image: "https://via.placeholder.com/150",
      category: 1 
    };
  
    try {
      const response = await ESTORE_API.post('products/', dummyProduct);
      console.log('Product created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error.response?.data || error.message);
      throw new Error('Failed to create product');
    }
  };
  


// export const createProduct = async (productData) => {
//     try {
//       const response = await ESTORE_API.post('products/', productData);
//       console.log('Product created:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating product:', error.response?.data || error.message);
//       throw new Error('Failed to create product');
//     }
//   };
  
