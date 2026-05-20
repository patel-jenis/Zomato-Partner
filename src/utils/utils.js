import axios from "axios";

const api = axios.create({
    baseURL: "https://zomato-clone-api-5e4m.onrender.com/api",
});

api.interceptors.request.use((config) => {

    const auth = JSON.parse(
        JSON.parse(localStorage.getItem("persist:root"))?.auth || "{}"
    );

    const token = auth.user?.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;