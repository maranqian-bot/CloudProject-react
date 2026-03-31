import axios from "axios";
import { reissueApi } from "./authApi";

// 배포 주소
// const API_BASE_URL = 'http://dxx91bct0u6rt.cloudfront.net';

const axiosInstance = axios.create({
<<<<<<< HEAD
    
    baseURL : "http://localhost:8080",
    // baseURL: "http://localhost:3001",
    withCredentials: true,
=======
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
>>>>>>> 50bac1af7476c01f3368d339c913e17558f2e271
});


axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    throw new Error("refreshToken이 없습니다.");
                }

                const reissueResponse = await reissueApi(refreshToken);

                const tokenData = reissueResponse?.data || reissueResponse;

                const newAccessToken = tokenData?.accessToken;
                const newRefreshToken = tokenData?.refreshToken;

                if (newAccessToken) {
                    localStorage.setItem("accessToken", newAccessToken);
                }

                if (newRefreshToken) {
                    localStorage.setItem("refreshToken", newRefreshToken);
                }

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (reissueError) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("loginUser");

                window.location.href = "/login";

                return Promise.reject(reissueError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;