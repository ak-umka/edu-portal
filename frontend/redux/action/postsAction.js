import axios from "axios";
import { getPosts, formatPosts } from "@/services/postService";

//posts types
export const CREATE_POST = "CREATE_POST";
export const CONFIRMED_CREATE_POST = "CONFIRMED_CREATE_POST";
export const GET_POSTS = "GET_POSTS";
export const CONFIRMED_GET_POSTS = "CONFIRMED_GET_POSTS";
export const EDIT_POST = "EDIT_POST";
export const CONFIRMED_EDIT_POST = "CONFIRMED_EDIT_POST";
export const CONFIRMED_DELETE_POST = "CONFIRMED_DELETE_POST";

//get posts

export function getPostsAction() {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/api/v0/getPosts")
      .then((response) => {
        dispatch(confirmGetPosts(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

//get posts

export function confirmGetPosts(posts) {
  return {
    type: CONFIRMED_GET_POSTS,
    payload: posts,
  };
}
