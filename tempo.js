import React from 'react';
import useFetcher from './useFetcher'; // Import the custom hook

const DataFetchingComponent = () => {
    const { data, loading, error } = useFetcher('http://localhost:3030/api/data');

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DataFetchingComponent;



// ----------------------- useFetcher

import { useState, useEffect } from 'react';
import { fetchData } from './requester'; // Import the requester function

const useFetcher = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await fetchData(url);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAsync();
    }, [url]);

    return { data, loading, error };
};

export default useFetcher;
//  -------------------------------

// api.js

export const API_BASE_URL = 'http://localhost:3030';

export const endpoints = {
    getData: `${API_BASE_URL}/api/data`,
    // Add more endpoints as needed
};
// ---------------------------------------
// requester.js

import { endpoints } from './api';

export const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-auth-token', // Set your authorization token here
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        // Log the error if needed or rethrow it
        console.error('Error in requester:', error);
        throw error;
    }
};

// You can add more functions for different types of requests (POST, PUT, DELETE, etc.)
// requester.js
// --------------------------------------------------

export const postData = async (url, payload) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-auth-token',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error in requester:', error);
        throw error;
    }
};



Autocomplete = https://codesandbox.io/p/sandbox/react-input-autocomplete-knwn3?file=%2Fsrc%2FInputAuto.js