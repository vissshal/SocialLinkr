import * as api from "../api/index";
import {
  FETCH_ALL,
  DELETE,
  UPDATE,
  LIKE,
  CREATE,
} from "../constants/actionType";
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const createPost = (posts) => async (dispatch) => {
  try {
    const { data } = await api.createPosts(posts);

    dispatch({
      type: CREATE,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const updatePost = (currentId, posts) => async (dispatch) => {
  try {
    const { data } = await api.updatePosts(currentId, posts);
    dispatch({
      type: UPDATE,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const deletePost = (currentId) => async (dispatch) => {
  try {
    const del = await api.deletePostss(currentId);
    dispatch({
      type: DELETE,
      payload: currentId,
    });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (currentId) => async (dispatch) => {
  try {
    const { data } = await api.likePosts(currentId);
    dispatch({
      type: LIKE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
