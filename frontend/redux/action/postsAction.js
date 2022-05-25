import axios from "axios";
import { formatPosts } from "@/services/postService";
import axiosInstance from "@/services/service";

//posts types
export const CONFIRMED_CREATE_POST = "CONFIRMED_CREATE_POST";
export const CONFIRMED_GET_POSTS = "CONFIRMED_GET_POSTS";
export const CONFIRMED_EDIT_POST = "CONFIRMED_EDIT_POST";
export const CONFIRMED_DELETE_POST = "CONFIRMED_DELETE_POST";
export const CONFIRMED_GET_POST = "CONFIRMED_GET_POST";
export const COMMENTS = "COMMENTS";

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

export function postComment(comment, id) {
  return (dispatch) => {
    axiosInstance
      .post(`http://localhost:3001/api/v0/getPost/${id}/comment`, comment)
      .then((response) => {
        dispatch({
          type: COMMENTS,
          payload: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

//post create

export function postCreate(title, content, photo) {
  return (dispatch) => {
    axiosInstance
      .post("http://localhost:3001/api/v0/createPost", title, content, photo)
      .then((response) => {
        dispatch({
          type: CONFIRMED_CREATE_POST,
          payload: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

//delete post

export function deletePost(id) {
  return (dispatch) => {
    axiosInstance
      .delete(`http://localhost:3001/api/v0/deletePost/${id}`)
      .then((response) => {
        dispatch({
          type: CONFIRMED_DELETE_POST,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

//edit post

export function edit(id) {
  return (dispatch) => {
    axiosInstance
      .put(`http://localhost:3001/api/v0/deletePost/${id}`)
      .then((response) => {
        dispatch({
          type: CONFIRMED_EDIT_POST,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
