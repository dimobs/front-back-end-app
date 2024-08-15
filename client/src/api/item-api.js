import * as request from './requester';

const BASE_URL = 'http://localhost:3030/api/items'

export const getAll = async () => {return await request.get(BASE_URL);}
export const getOne = async (itemId) => {return await request.get(`${BASE_URL}/${itemId}`)}
export const remove = async (itemId) => {return await request.remove(`${BASE_URL}/${itemId}`)}


const itemsAPI = {
  getAll,
  getOne,
  remove,
};

export default itemsAPI;