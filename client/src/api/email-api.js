import * as request from './requester';

const BASE_URL = 'http://localhost:3030/api/email'
// const BASE_URL = 'http://84.54.187.245:2081/api/email'

export const sendEmail = async (data) => request.post(`${BASE_URL}`, {data});
