import { AuthState } from "@/types/auth-state";
import { create } from "zustand";
import { persist } from "zustand/middleware";



export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            role: null,
            setRole: (role) => set({ role }),


        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                role: state.role,
            }),
        }
    )
);
