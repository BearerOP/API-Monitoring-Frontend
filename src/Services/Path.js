import axios from 'axios';

const Path = axios.create({
    baseURL: 'https://up-status.onrender.com', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export default Path;
