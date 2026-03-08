import api from "./axios";

export async function getMe() {
    let res = await api.get("auth/me");
    return res.data
}