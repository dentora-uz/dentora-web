import axios from "axios";
import Cookies from "js-cookie"

const BASE_URL = "https://j.dentora.uz/api/v1";

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