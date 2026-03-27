import axios from "axios";

const axiosInstance = axios.create({
    
    baseURL : "http://localhost:8081",
    // baseURL: "http://localhost:3001",
    withCredentials: true,
});

export default axiosInstance;