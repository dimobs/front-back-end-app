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
      'Content-Type': 'application/json',
    };
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON, got ${contentType}`);
    }

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    console.error('API request error:', error.message || error);
    throw error;
  }
}

export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const patch = requester.bind(null, 'PATCH');
export const remove = requester.bind(null, 'DELETE');
