// src/apis/publicApi.js
import axios from 'axios'

const PUBLIC_API = axios.create({
  baseURL: 'https://backendmcm.estelatechnologies.com/api/orders/', 
  withCredentials: true,
})


export default PUBLIC_API
