import axios from "axios";

// 배포 주소
// const API_BASE_URL = 'http://dxx91bct0u6rt.cloudfront.net';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
});

export default axiosInstance;