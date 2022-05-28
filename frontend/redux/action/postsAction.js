import axios from "axios";
import { formatPosts } from "@/services/postService";
import axiosInstance from "@/services/service";

//posts types
export const CONFIRMED_CREATE_POST = "CONFIRMED_CREATE_POST";
export const FAILED_CREATE_POST = "FAILED_CREATE_POST";
export const CONFIRMED_GET_POSTS = "CONFIRMED_GET_POSTS";
export const CONFIRMED_EDIT_POST = "CONFIRMED_EDIT_POST";
export const FAILED_EDIT_POST = "FAILED_EDIT_POST";
export const CONFIRMED_DELETE_POST = "CONFIRMED_DELETE_POST";
export const FAILED_DELETE_POST = "FAILED_DELETE_POST";
export const CONFIRMED_GET_POST = "CONFIRMED_GET_POST";
export const COMMENTS = "COMMENTS";
export const COMMENTS_ERROR = "COMMENTS_ERROR";

//get posts

export function getPostsAction() {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/api/v0/getPosts")
      .then((response) => {
        let posts = formatPosts(response.data);
        dispatch({
          type: CONFIRMED_GET_POSTS,
          payload: posts,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

//get post

export function getPost(id) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/api/v0/getPost/${id}`)
      .then((response) => {
        dispatch({
          type: CONFIRMED_GET_POST,
          payload: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

//post comments

export function postComment(id, comment) {
  return (dispatch) => {
    axiosInstance
      .post(`getPost/${id}/comment`, comment)
      .then((response) => {
        dispatch({
          type: COMMENTS,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: COMMENTS_ERROR,
          payload: e.response,
        });
      });
  };
}

//get posts

export function postCreate(formData) {
  return (dispatch) => {
    axiosInstance({
      method: "post",
      url: "createPost",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        dispatch({
          type: CONFIRMED_CREATE_POST,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: FAILED_CREATE_POST,
          payload: e.response,
        });
      });
  };
}

export function deletePost(postId) {
  return (dispatch) => {
    axiosInstance
      .delete(`deletePost/${postId}`)
      .then((response) => {
        dispatch({
          type: CONFIRMED_DELETE_POST,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAILED_DELETE_POST,
          payload: error.response,
        });
      });
  };
}

//edit post

export function edit(id, formData) {
  return (dispatch) => {
    axiosInstance({
      method: "put",
      url: `editPost/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        dispatch({
          type: CONFIRMED_EDIT_POST,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAILED_EDIT_POST,
          payload: error.response,
        });
      });
  };
}
