export const getLoginUser = () => {
    const raw =
        localStorage.getItem("loginUser") ||
        sessionStorage.getItem("loginUser");

    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};