import axios from "axios";

const axiosInstance = axios.create({
    
    baseURL : "http://localhost:8080",
    // baseURL: "http://localhost:3001",
    withCredentials: true,
});

export default axiosInstance;