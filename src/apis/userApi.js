import axiosInstance from "./axiosInstance";

// Register user
// export const registerUser = async ({ email, password, full_name, role }) => {
//   try {
//     const response = await axiosInstance.post("user/create/", {
//       email,
//       password,
//       full_name,
//       role,
//     });
//     return response.data;
//   } catch (e) {
//     throw new Error("Register Failed");
//   }
// };



// userApi.js
export const registerUser = async ({
  email,
  password,
  full_name,
  address,
  bio,
  display_name,
}) => {
  try {
    const response = await axiosInstance.post("user/create/", {
      email,
      password,
      full_name,
      address,
      bio,
      display_name,
    });
    return response.data;
  } catch (e) {
    throw new Error("Register Failed");
  }
};



export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("user/token/", {
      email,
      password,
    });
    return response.data;
  } catch (e) {
    throw new Error("Login Failed");
  }
};


export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("user/me/");
    console.log(response,"respose user data---------")
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};


export const UpdateUser = async (data) => {
  try {
    const response = await axiosInstance.patch("user/me/",data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`user/users/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response?.data || error.message);
    throw new Error('Failed to delete user');
  }
};


export const getUserdata = async(page=1)=>{
  const response =await axiosInstance.get(`user/users/?page=${page}`)
  return response.data
} 


export const getDashboardAnalytics = async () => {
  try {
    const response = await axiosInstance.get('analytics/dashboard/analytics/');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error.response?.data || error.message);
    throw new Error('Failed to fetch dashboard analytics');
  }
};