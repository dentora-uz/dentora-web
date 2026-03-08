import { LoginFormData } from "@/pages/auth";
import api from "./axios";

export async function auth(payload: LoginFormData) {
    let res = await api.post("auth/login", payload);
    return res.data;
}
export async function logout() {
    let res = await api.post("auth/logout");
    return res.data;
}
export async function getMe() {
    let res = await api.get("auth/me");
    return res.data
}