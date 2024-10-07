import * as requester from './requester.js'
import API_URL from './apiConfig.js';

export const login = (email, password) => requester.post(`${API_URL}/users/login`, {email, password});
export const editUser = (id, userData) => requester.put(`${API_URL}/users/update`, {id, userData});
export const userInfo = (id) => requester.get(`${API_URL}/users/profile?id=${id}`);
export const register = (email, password) => requester.post(`${API_URL}/users/register`, {email, password});
export const logout = () => requester.get(`${API_URL}/users/logout`);
