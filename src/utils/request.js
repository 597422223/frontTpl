import axios from 'axios';
import { showToast } from './toast';

// Create axios instance
const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
request.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - clear token and redirect
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          showToast('登录已过期，请重新登录', 'warning');
          window.location.href = '/login';
          break;
        case 403:
          showToast('没有权限访问', 'error');
          break;
        case 404:
          showToast('请求的资源不存在', 'error');
          break;
        case 500:
          showToast('服务器错误，请稍后重试', 'error');
          break;
        default:
          showToast(response.data?.message || '请求失败', 'error');
      }
    } else {
      showToast('网络错误，请检查网络连接', 'error');
    }
    
    return Promise.reject(error);
  }
);

export default request;

