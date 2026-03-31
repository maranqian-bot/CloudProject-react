import axiosInstance from "./axiosInstance"


export const loginApi = async (loginData) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", loginData);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const reissueApi = async (refreshToken) => {
    const response = await axios.post("http://localhost:8080/api/auth/reissue", {
        refreshToken,
    });

    return response.data;
}