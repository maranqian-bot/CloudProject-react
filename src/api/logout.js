import useAuthStore from "../store/authStore"


export const logout = () => {
    const { clearUser } = useAuthStore.getState();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("loginUser");

    clearUser();
}