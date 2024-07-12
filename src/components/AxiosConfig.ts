import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    auth: {
      username: 'admin',  
      password: 'admin'
    }
  });
  
  export default axiosInstance;