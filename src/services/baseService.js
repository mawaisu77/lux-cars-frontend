import axios from 'axios';
import { getToken } from '../utils/storageUtils';

const API_BASE_URL = 'http://localhost:8000/api/v1/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken(); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const baseService = {
  get: async (url, config = {}) => {
    return axiosInstance.get(url, config);
  },
  post: async (url, data, config = {}) => {
    return axiosInstance.post(url, data, config);
  },
  put: async (url, data, config = {}) => {
    return axiosInstance.put(url, data, config);
  },
  delete: async (url, config = {}) => {
    return axiosInstance.delete(url, config);
  },
};


export default baseService;
