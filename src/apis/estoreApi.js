import axios from 'axios'

const ESTORE_API = axios.create({
  baseURL: 'https://backendmcm.estelatechnologies.com/api/estore/',
  withCredentials: true,
})

ESTORE_API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('access_token') ||
    '2f845a19f899034bba9a49419e58b575e8fb3418'
  // const username = localStorage.getItem('username') || 'admin@example.com';
  //   const password = localStorage.getItem('password') || 'Password';;

  // const token = btoa(`${username}:${password}`);
  // if (token) {
  //   config.headers.Authorization = `token ${token}`
  //   config.headers.user
  // }
  return config
})

export default ESTORE_API
