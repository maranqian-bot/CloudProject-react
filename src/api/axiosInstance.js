import axios from "axios";
import { reissueApi } from "./authApi";

// 배포 주소
// const API_BASE_URL = 'http://dxx91bct0u6rt.cloudfront.net';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * accessToken 조회
 * 1순위: localStorage
 * 2순위: sessionStorage
 */
const getAccessToken = () => {
  return (
    localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
  );
};

/**
 * refreshToken 조회
 * 1순위: localStorage
 * 2순위: sessionStorage
 */
const getRefreshToken = () => {
  return (
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken")
  );
};

/**
 * 로그인 관련 저장값 전체 삭제
 */
const clearAuthStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("employeeId");
  localStorage.removeItem("loginUser");

  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("employeeId");
  sessionStorage.removeItem("loginUser");
};

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error("refreshToken이 없습니다.");
        }

        const reissueResponse = await reissueApi(refreshToken);

        const tokenData =
          reissueResponse?.data?.data ??
          reissueResponse?.data ??
          reissueResponse;

        const newAccessToken = tokenData?.accessToken;
        const newRefreshToken = tokenData?.refreshToken;

        if (!newAccessToken) {
          throw new Error("재발급된 accessToken이 없습니다.");
        }

        // 원래 어디에 저장되어 있었는지 확인
        const useLocalStorage = !!localStorage.getItem("refreshToken");
        const storage = useLocalStorage ? localStorage : sessionStorage;

        storage.setItem("accessToken", newAccessToken);

        if (newRefreshToken) {
          storage.setItem("refreshToken", newRefreshToken);
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
  },
);

export default axiosInstance;
