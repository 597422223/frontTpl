import request from '../utils/request';

/**
 * 用户登录
 * @param {Object} data - { username, password }
 */
export const login = (data) => {
  return request.post('/api/auth/login', data);
};

/**
 * 用户登出
 */
export const logout = () => {
  return request.post('/api/auth/logout');
};

/**
 * 获取当前用户信息
 */
export const getCurrentUser = () => {
  return request.get('/api/auth/me');
};

/**
 * 刷新 Token
 */
export const refreshToken = () => {
  return request.post('/api/auth/refresh');
};

