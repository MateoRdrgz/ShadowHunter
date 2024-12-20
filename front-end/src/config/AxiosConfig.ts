import { useUserConnecteService } from '@/composables/user/userConnecteService';
import axios, { type InternalAxiosRequestConfig } from 'axios';

const { userConnecte } = useUserConnecteService();
const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers['Authorization'] = `Bearer ${userConnecte.value.token}`;
  return config;
});

export default axiosInstance;