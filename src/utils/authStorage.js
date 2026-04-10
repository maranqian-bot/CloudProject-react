const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const LOGIN_USER_KEY = "loginUser";

export const getAccessToken = () => {
    return (
        localStorage.getItem(ACCESS_TOKEN_KEY) ||
        sessionStorage.getItem(ACCESS_TOKEN_KEY)
    );
};

export const setAccessToken = (token, rememberMe = true) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(ACCESS_TOKEN_KEY, token);
};

export const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
    return (
        localStorage.getItem(REFRESH_TOKEN_KEY) ||
        sessionStorage.getItem(REFRESH_TOKEN_KEY)
    );
};

export const setRefreshToken = (token, rememberMe = true) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(REFRESH_TOKEN_KEY, token);
};

export const removeRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getLoginUser = () => {
    const raw =
        localStorage.getItem(LOGIN_USER_KEY) ||
        sessionStorage.getItem(LOGIN_USER_KEY);

    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export const clearAuthStorage = () => {
    removeAccessToken();
    removeRefreshToken();
    localStorage.removeItem(LOGIN_USER_KEY);
    sessionStorage.removeItem(LOGIN_USER_KEY);
};