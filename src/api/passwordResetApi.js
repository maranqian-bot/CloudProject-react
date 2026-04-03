import axios from "axios";

const passwordResetApi = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});
export const sendVerificationCodeApi = async (email) => {
    const response = await passwordResetApi.post("/api/auth/email/send-code", {
        email,
    });
    return response.data;
};

export const verifyCodeApi = async (email, code) => {
    const response = await passwordResetApi.post("/api/auth/email/verify-code", {
        email,
        code,
    });
    return response.data;
};

export const resetPasswordApi = async (email, newPassword) => {
    const response = await passwordResetApi.post("/api/auth/email/password-reset/confirm", {
        email,
        newPassword,
    });
    return response.data;
};
