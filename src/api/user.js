import request from '../utils/request';

/**
 * 获取用户列表
 * @param {Object} params - { page, pageSize, keyword }
 */
export const getUsers = (params) => {
  return request.get('/api/users', { params });
};

/**
 * 获取单个用户
 * @param {string} id - 用户ID
 */
export const getUser = (id) => {
  return request.get(`/api/users/${id}`);
};

/**
 * 创建用户
 * @param {Object} data - 用户数据
 */
export const createUser = (data) => {
  return request.post('/api/users', data);
};

/**
 * 更新用户
 * @param {string} id - 用户ID
 * @param {Object} data - 更新数据
 */
export const updateUser = (id, data) => {
  return request.put(`/api/users/${id}`, data);
};

/**
 * 删除用户
 * @param {string} id - 用户ID
 */
export const deleteUser = (id) => {
  return request.delete(`/api/users/${id}`);
};

