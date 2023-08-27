import axios from "axios";
import { BACKEND_URL } from "../BACKEND_URL";
const API = axios.create({ baseURL: BACKEND_URL });

API.interceptors.request.use((req) => {
  console.log(localStorage.getItem("profile"));
  if (localStorage.getItem("profile")) {
    req.headers.token = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const fetchPosts = () => API.get("/posts");
export const createPosts = async (newPost) => {
  console.log("newPost: ", newPost);
  API.post("/posts", newPost);
};
export const updatePosts = (currentId, post) =>
  API.patch(`/posts/${currentId}`, post);
export const deletePostss = async (currentId) => {
  API.delete(`/posts/${currentId}`);
};
export const likePosts = (currentId) =>
  API.patch(`/posts/${currentId}/likeposts`);
export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
