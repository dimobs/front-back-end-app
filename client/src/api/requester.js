
import { getAccessToken } from "../util/authUtils";

async function requester(method, url, data) {
  
    const options = {};
    const accessToken = getAccessToken();

    if (accessToken) {
        options.headers = {
            ...options.headers,
        'X-Authorization': accessToken,
        };
    }

    if (method !== 'GET') {
        options.method = method;
    }
    if (data) {
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json'
        };
        options.body = JSON.stringify(data);
    }
        try {
        const response = await fetch(url, options);                

        if (response.status === 204){
            return null;
        }

        
       const contentType = response.headers.get('Content-Type') || '';
    const isJSON = contentType.includes('application/json');

    // If the response is not JSON, handle it as plain text
    const result = isJSON ? await response.json() : await response.text();
    if (!response.ok) {
        throw new Error(result);
      }
  
      return result;
    } catch (error) {
      // Log the error for debugging, with specific handling for SQLite errors
      if (error.message.includes('SQLITE_ERR')) {
        console.error('Database error:', error.message);
      } else {
        console.error('API request error:', error.message || error);
      }
      throw error; // Rethrow for the calling code to handle
    }
  }
  

export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const patch = requester.bind(null, 'PATCH');
export const remove = requester.bind(null, 'DELETE');