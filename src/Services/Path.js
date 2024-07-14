import axios from 'axios';

const Path = axios.create({
    // baseURL: 'https://up-status.onrender.com', // Replace with your backend URL
    baseURL: 'http://localhost:10000', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export default Path;
