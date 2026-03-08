import { LoginFormData } from "@/pages/auth";
import api from "./axios";

export async function auth(payload: LoginFormData) {
    let res = await api.post("auth/login", payload);
    return res.data;
}