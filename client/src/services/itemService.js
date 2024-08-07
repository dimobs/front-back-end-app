import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/api/items'


export const getAll = async() => {
const request = await fetch(baseUrl)
const response = await (request.json())
return response
};

export const create = async (data) => {
    const newItem = await request.post(baseUrl, {
        data
    });

    return newItem
};

export const remove = async (itemId) => request.remove(`${baseUrl}/${itemId}`);