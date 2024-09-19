import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true, // Include credentials with all requests
});

export default axiosInstance;