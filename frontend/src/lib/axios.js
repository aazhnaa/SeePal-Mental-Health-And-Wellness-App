//for api
import axios from "axios";
export const axiosInstance = axios.create({
    //baseURL:import.meta.env.MODE === "development"? "http://localhost:8000/api":"/api",
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true
})