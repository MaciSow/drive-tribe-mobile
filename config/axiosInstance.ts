import axios from 'axios';

const API_URL = 'http://localhost:4000/';
const REQ_TIMEOUT = 20000;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: REQ_TIMEOUT,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
  },
});

export default axiosInstance;
