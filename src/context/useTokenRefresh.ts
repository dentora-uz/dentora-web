// import { useEffect, useRef } from "react";
// import { useAuthStore } from "@/store/useAuthStore"; 

// export function useTokenRefresh() {
//     const { refreshToken, setToken, logout } = useAuthStore();
//     const initialized = useRef(false);

//     useEffect(() => {
//         if (!refreshToken) return;

//         // ❌ reload bo‘lganda darhol refresh qilmaslik uchun
//         if (!initialized.current) {
//             initialized.current = true;
//             return;
//         }

//         const interval = setInterval(async () => {
//             try {
//                 const res = await refreshTokenApi(refreshToken);
//                 setToken(res.data.data.accessToken);
//             } catch (e) {
//                 logout();
//             }
//         }, 90000);

//         return () => clearInterval(interval);
//     }, [refreshToken]);
// }
