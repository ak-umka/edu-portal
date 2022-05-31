import axios from "axios";
import axiosInstance from "@/services/service";

//posts types
export const CONFIRMED_CREATE_SUBD = "CONFIRMED_CREATE_SUBD";
export const FAILED_CREATE_SUBD = "FAILED_CREATE_SUBD";
export const CONFIRMED_GET_SUBDS = "CONFIRMED_GET_SUBDS";
export const FAILED_GET_SUBDS = "FAILED_GET_SUBDS";
export const CONFIRMED_EDIT_SUBD = "CONFIRMED_EDIT_SUBD";
export const FAILED_EDIT_SUBD = "FAILED_EDIT_SUBD";
export const CONFIRMED_DELETE_SUBD = "CONFIRMED_DELETE_SUBD";
export const FAILED_DELETE_SUBD = "FAILED_DELETE_SUBD";

//get subds

export function getSubdsAction(page) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/api/v0/getSubds?page=${page}`)
      .then((response) => {
        // let subds = formatPosts(response.data);
        dispatch({
          type: CONFIRMED_GET_SUBDS,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: FAILED_GET_SUBDS,
          payload: e.response,
        });
      });
  };
}

//create subd

export function subdCreate(formData) {
  return (dispatch) => {
    axiosInstance({
      method: "post",
      url: "createSubd",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        dispatch({
          type: CONFIRMED_CREATE_SUBD,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: FAILED_CREATE_SUBD,
          payload: e.response,
        });
      });
  };
}

//delete subd

export function deleteSubd(id) {
  return (dispatch) => {
    axiosInstance
      .delete(`deleteSubd/${id}`)
      .then((response) => {
        dispatch({
          type: CONFIRMED_DELETE_SUBD,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAILED_DELETE_SUBD,
          payload: error.response,
        });
      });
  };
}

//edit subd

export function editSubd(id, formData) {
  return (dispatch) => {
    axiosInstance({
      method: "put",
      url: `editSubd/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        dispatch({
          type: CONFIRMED_EDIT_SUBD,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAILED_EDIT_SUBD,
          payload: error.response,
        });
      });
  };
}
