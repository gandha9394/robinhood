import axios from "axios";

export const defaultAxiosInstance = axios.create({baseURL: `${process.env.BACKEND_URL}`})
export const internalAPIAxiosInstance = axios.create({baseURL: "/api/internal"})