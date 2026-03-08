import { AuthState } from "@/types/auth-state";
import { create } from "zustand";
import { persist } from "zustand/middleware";



export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            refreshToken: null,
            storeId: null,
            userInfo: {
                name: null,
                email: null,
                username: null
            },
            role: null,
            setUserInfo: (userInfo) => set({ userInfo }),
            isAuthenticated: false,
            setToken: (token) => set({ token }),
            setRefreshToken: (refreshToken) => set({ refreshToken }),
            setRole: (role) => set({ role }),
            changeAuthinticated: (isAuth) => set({ isAuthenticated: isAuth }),
            logout: () => {
                set({
                    token: null,
                    refreshToken: null,
                    userInfo: {
                        email: null,
                        username: null
                    },
                    role: null,
                    isAuthenticated: false
                });
            },

        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                refreshToken: state.refreshToken,
                roleId: state.role,
                userInfo: state.userInfo,
            }),
        }
    )
);
