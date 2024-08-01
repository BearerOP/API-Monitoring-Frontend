import axios from 'axios';
import { getToken } from '@/Services/AuthService'; // Create a utility to get the token

const Path = axios.create({
    // baseURL: 'http://localhost:10000', // Replace with your backend URL
    baseURL: 'https://up-status.onrender.com', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to include the token in the headers
Path.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default Path;