import axios from 'axios';
import { getToken, removeToken, removeUser } from '../utils/storageUtils';
import { isTokenExpired } from '../utils/isTokenExpired';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken(); 
    if (isTokenExpired(token)) {
      console.log("token expired condition")
      removeToken();
      removeUser()
      // window.location.href = '/login'; 
      return Promise.reject(new Error('Token expired'));
    } else {
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
