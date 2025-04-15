import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;