
import ESTORE_API from "./estoreApi";
import ORDERS_API from "./estoreOrder";

export const getProductById = async (id) => {
  try {
    const response = await ESTORE_API.get(`products/${id}/`);
    console.log(response,"response-")
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};



// export const getAllCategories = async (page = 1) => {
//   try {
//     const response = await ESTORE_API.get(`categories/?page=${page}`);
//     // alert("data")
//     console.log("Fetched categories:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching categories:', error.response?.data || error.message);
//     throw new Error('Failed to fetch categories');
//   }
// };


export const getCategoriesAllData = async ()=>{
  try{
    const response = await ESTORE_API.get(`categories/?all_data=true`)
    return response.data
  }
  catch(error) {
    throw new Error ("Fetch to fetch ALl Categories")
  }
}



export const getBrandAllData = async()=>{
  try{
    const response = await ESTORE_API.get("brands/?all_data=true")
    return response.data
  }catch(error){
    throw new Error("failed to fetch the brands")
  }
}

// apis/products.js
// export const getAllProducts = async (page = 1, search = '') => {
//   try {
//     const response = await ESTORE_API.get(`products/`, {
//       params: {
//         page,
//         search,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error('Failed to fetch products');
//   }
// };


export const getAllProducts = async (
  page = 1,
  search = '',
  brand = '',
  category = '',
  status = ''
) => {
  try {
    const response = await ESTORE_API.get(`products/`, {
      params: {
        page,
        search,
        brand,
        category,
        status, // ✅ Add status here
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw new Error('Failed to fetch products');
  }
};




export const getAllCategories = async (page = 1, search = '') => {
  try {
    const response = await ESTORE_API.get(`categories/`, {
      params: { page, search },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error.response?.data || error.message);
    throw new Error('Failed to fetch categories');
  }
};



export const getAllBrands = async (page = 1, search = '') => {
  try {
    const response = await ESTORE_API.get('brands/', {
      params: { page, search },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error.response?.data || error.message);
    throw new Error('Failed to fetch brands');
  }
};



export const getAllOrders = async (page =1) => {
  try {
    const response = await ORDERS_API.get(`orders/?page=${page}`);
    console.log(response,"response data----")
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};




export const createCategory = async (categoryData) => {
  try {
    const response = await ESTORE_API.post('categories/', categoryData);
    console.log("Category created:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error.response?.data || error.message);
    throw new Error('Failed to create category');
  }
};


export const createProducts = async (productData) =>{
  try{
    const response = await ESTORE_API.post('products/' , productData );
    console.log(response)
    return response.data

  } catch (error) {
    console.error('Error creating products:', error.response?.data || error.message);
    throw new Error('Failed to create category');

  }
}


export const createBrands = async (brandData) =>{
  try{
    const response = await ESTORE_API.post('brands/' , brandData );
    console.log(response)
    return response.data

  } catch (error) {
    console.error('Error creating products:', error.response?.data || error.message);
    throw new Error('Failed to create category');

  }
}


export const deleteBrand = async (brandId) => {
  try {
    const response = await ESTORE_API.delete(`brands/${brandId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting brand:', error.response?.data || error.message);
    throw new Error('Failed to delete brand');
  }
};


export const deletecategory = async (categoriesId) => {
  try {
    const response = await ESTORE_API.delete(`categories/${categoriesId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting brand:', error.response?.data || error.message);
    throw new Error('Failed to delete brand');
  }
};



export const deleteProduct = async (productId) => {
  try {
    const response = await ESTORE_API.delete(`products/${productId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting brand:', error.response?.data || error.message);
    throw new Error('Failed to delete brand');
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await ORDERS_API.delete(`orders/${orderId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting brand:', error.response?.data || error.message);
    throw new Error('Failed to delete brand');
  }
};


export const createOrder = async (orderPayload) => {
  try {
    const response = await ORDERS_API.post('orders/', orderPayload);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw new Error('Failed to create order');
  }
};




export const getBrandById = async (id) => {
  const response = await ESTORE_API.get(`brands/${id}/`);
  return response.data;
};

export const updateBrand = async (id, data) => {
  const response = await ESTORE_API.put(`brands/${id}/`, data);
  return response.data;
};


export const getcategoriesById = async(id) =>{
  const response = await ESTORE_API.get(`categories/${id}`);
  return response.data
}

export const updateCategories = async (id ,data ) =>{
  const response = await ESTORE_API.put(`categories/${id}/`,data);
  return response.data
}


export const getProductsById = async(id) =>{
  const response = await ESTORE_API.get(`products/${id}`);
  return response.data
}

export const updateProducts = async (id ,data ) =>{
  const response = await ESTORE_API.put(`products/${id}/`,data);
  return response.data
}



// export const createProduct = async () => {
//     const dummyProduct = {
//       name: "Test Product",
//       SKU: "TEST-SKU-001",
//       price: "223",
//       stock: 4294967295,
//       image: "https://via.placeholder.com/150",
//       category: 1 
//     };
  
//     try {
//       const response = await ESTORE_API.post('products/', dummyProduct);
//       console.log('Product created:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating product:', error.response?.data || error.message);
//       throw new Error('Failed to create product');
//     }
//   };
  


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
  
