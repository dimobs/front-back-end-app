import * as request from './requester';

const BASE_URL = 'http://localhost:3030/api/items'

export const getAll = async () => {
  return await request.get(BASE_URL);
}

export const getOne = (itemId) => { request.get(`${BASE_URL}/${itemId}`)}

const itemsAPI = {
  getAll,
  getOne
};

export default itemsAPI;