import api from "./axios";

export async function getServiceCategories() {
    const res = await api.get("service-categories");
    return res.data
}