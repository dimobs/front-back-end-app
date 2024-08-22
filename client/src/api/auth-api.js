import * as requester from './requester.js'

const base_URL = 'http://localhost:3030/users';

export const login = async (email, password) => {
   const authData = await requester.post(`${base_URL}/login`, {email, password});

   return authData;
};