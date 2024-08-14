async function requester(method, url, data) {    
    const options = {};
    
    if (method !== 'GET') {
        options.method = method;
    }
    if (data) {
        options.headers = {
            'Content-Type': 'application/json'
        };
        options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    const result = response.json();

    return result;
    }
    
    export const get = requester.bind(null, 'GET');
    export const post = requester.bind(null, 'POST');
    export const PUT = requester.bind(null, 'PUT');
    export const patch = requester.bind(null, 'PATCH');
    export const del = requester.bind(null, 'DELETE');