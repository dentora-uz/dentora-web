import axios from "axios";
import Cookies from "js-cookie"

const BASE_URL = "/api/v1"; // shu yerni o'zgartir

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials:true
});

api.interceptors.request.use((config) => {
    const token = Cookies.get("access_token")

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});



export default api;