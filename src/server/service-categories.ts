import api from "./axios";

export async function getServiceCategories() {
    let res = await api.get("service-categories");
    return res.data
}