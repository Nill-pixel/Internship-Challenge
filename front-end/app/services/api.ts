import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Adjust based on your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;