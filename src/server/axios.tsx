import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";    

const BASE_URL = "https://j.dentora.uz/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});



export default api;