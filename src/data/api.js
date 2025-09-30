import axiosInstance from "./axios.js";
import axios from "axios";

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

export const createPost = async (formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/post/create-post`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};

export const userVerify = async (token) => {
  try {
    const response = await axiosInstance.post(`/user/${token}`);
    return response.data;
  } catch (error) {
    console.error("Failed to verify user:", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axiosInstance.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw error;
  }
};

export const deleteImages = async (postId, imageId) => {
  try {
    const response = await axiosInstance.put(
      `/post/${postId}/images/${imageId}`,
      {
        deleteImage: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete image:", error);
    throw error;
  }
};

export const uploadImage = async (formData, postId) => {
  try {
    const response = await axios.put(
      `https://notes-bakend-5edl.onrender.com/api/post/${postId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};
