import API_URL from './apiConfig';
import * as request from './requester';

export const getAll = async () => {return await request.get(`${API_URL}/api/items`)};
export const getOne = async (itemId) => {return await request.get(`${API_URL}/api/items/${itemId}`)};
export const create = async (data) => {return await request.post(`${API_URL}/api/items`, data)};
export const update = async (itemId, itemData) => { return request.put(`${API_URL}/api/items/${itemId}`, itemData)};
export const remove = async (itemId) => {return await request.remove(`${API_URL}/api/items/${itemId}`)};

const itemsAPI = {
  getAll,
  getOne,
  create,
  update,
  remove,
};

export default itemsAPI;