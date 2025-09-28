import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", // Replace with your actual API base URL
    headers: {
        "Content-Type": "application/json",
        // Add other default headers here, e.g. Authorization
    },
    timeout: 10000,
});

export default axiosInstance;
