import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null, 
    isLogin: false,

    setUser: (user) => set({ user, isLogin: true }),
    clearUser: () => set({ user: null, isLogin: false }),
}));

export default useAuthStore;