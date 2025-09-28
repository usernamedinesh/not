import axiosInstance from "./axios.js";

export const getPost = async () => {
    try {
        const response = await axiosInstance.get("/post/get_post"); //  URL: https://your-api-url.com/api/team
        return response.data;
    } catch (error) {
        console.error("Failed to fetch team data:", error);
        throw error;
    }
};

export const getPostById = async (id) => {
    try {
        const response = await axiosInstance.get(`/post/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }
};
