import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://58.140.228.150',
    baseURL: 'http://127.0.0.1:9080',
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;