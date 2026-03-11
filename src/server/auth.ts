import { LoginFormData } from "@/pages/auth";
import api from "./axios";

export async function auth(payload: LoginFormData) {
    const res = await api.post("auth/login", payload);
    console.log("res init")
    return res.data;
}
export async function logout() {
    const res = await api.post("auth/logout");
    return res.data;
}
export async function getMe() {
    const res = await api.get("auth/me");
    return res.data
}