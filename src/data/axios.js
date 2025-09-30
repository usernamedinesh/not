import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://notes-bakend-5edl.onrender.com/api", // Replace with your actual API base URL
  // baseURL: "http://localhost:8080/api", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
    // Add other default headers here, e.g. Authorization
  },
});

export default axiosInstance;
