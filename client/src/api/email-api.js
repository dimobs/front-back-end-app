import * as request from './requester';
import API_URL from './apiConfig';

export const sendEmail = async (data) => request.post(`${API_URL}/api/email`, {data});
