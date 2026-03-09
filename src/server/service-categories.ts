import { ServiceCategoryType } from "@/types/service-categories";
import api from "./axios";

export async function getServiceCategories() {
    const res = await api.get("service-categories");
    return res.data.data
}

export async function postServiceCategories(payload: ServiceCategoryType) {
    const res = await api.post("service-categories", payload)
    return res.data
}