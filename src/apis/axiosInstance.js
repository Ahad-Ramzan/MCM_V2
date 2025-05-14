import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://backendmcm.estelatechnologies.com/api/",
  withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default axiosInstance;
