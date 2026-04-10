import axios from "axios";
import { reissueApi } from "./authApi";
import {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
    clearAuthStorage,
} from "../utils/authStorage";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        console.log("현재 access Token:", accessToken);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        console.log("최종 요청 헤더:", config.headers);
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        console.log("응답 에러 상태코드:", error.response?.status);
        console.log("응답 에러 데이터:", error.response?.data);

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshToken();

                if (!refreshToken) {
                    throw new Error("refreshToken이 없습니다.");
                }

                const reissueResponse = await reissueApi(refreshToken);
                const tokenData = reissueResponse?.data || reissueResponse;

                const newAccessToken = tokenData?.accessToken;
                const newRefreshToken = tokenData?.refreshToken;

                if (newAccessToken) {
                    setAccessToken(newAccessToken);
                }

                if (newRefreshToken) {
                    setRefreshToken(newRefreshToken);
                }

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (reissueError) {
                clearAuthStorage();
                window.location.href = "/login";
                return Promise.reject(reissueError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;