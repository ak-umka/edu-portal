import axiosInstance from "@/services/service";
import axios from "axios";

//create schedule
export const CONFIRMED_CREATE_SCHEDULE = "CONFIRMED_CREATE_SCHEDULE";
export const FAILED_CREATE_SCHEDULE = "FAILED_CREATE_SCHEDULE";

//get multiple schedule
export const CONFIRMED_GET_SCHEDULES = "CONFIRMED_GET_SCHEDULES";
export const FAILED_GET_SCHEDULES = "FAILED_GET_SCHEDULES";

//get single schedule
export const CONFIRMED_GET_SCHEDULE = "CONFIRMED_GET_SCHEDULE";
export const FAILED_GET_SCHEDULE = "FAILED_GET_SCHEDULE";

//delete schedule
export const CONFIRMED_DELETE_SCHEDULE = "CONFIRMED_DELETE_SCHEDULE";
export const FAILED_DELETE_SCHEDULE = "FAILED_DELETE_SCHEDULE";

//edit schedule
export const CONFIRMED_EDIT_SCHEDULE = "CONFIRMED_EDIT_SCHEDULE";
export const FAILED_EDIT_SCHEDULE = "FAILED_EDIT_SCHEDULE";

//status
export const STATUS = "STATUS";

export function createSchedule(formData) {
  return (dispatch) => {
    axiosInstance({
      method: "post",
      url: "createSchedule",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        dispatch({
          type: CONFIRMED_CREATE_SCHEDULE,
          payload: response.data,
        });
        dispatch({
          type: STATUS,
          payload: response.status,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAILED_CREATE_SCHEDULE,
          payload: error.response,
        });
        dispatch({
          type: STATUS,
          payload: error.response.status,
        });
      });
  };
}

export function getSchedules(page) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/api/v0/getSchedules?page=${page}`)
      .then((response) => {
        dispatch({
          type: CONFIRMED_GET_SCHEDULES,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAILED_GET_SCHEDULES,
          payload: error.response,
        });
      });
  };
}

export function getSchedule(id) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/api/v0/getSchedule/${id}`)
      .then((response) => {
        dispatch({
          type: CONFIRMED_GET_SCHEDULE,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAILED_GET_SCHEDULE,
          payload: error.response,
        });
      });
  };
}

export function deleteSchedule(id) {
  return (dispatch) => {
    axiosInstance
      .delete(`http://localhost:3001/api/v0/deleteSchedule/${id}`)
      .then((response) => {
        dispatch({
          type: CONFIRMED_DELETE_SCHEDULE,
          payload: response.data,
        });
        dispatch({
          type: STATUS,
          payload: response.status,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAILED_DELETE_SCHEDULE,
          payload: error.response,
        });
        dispatch({
          type: STATUS,
          payload: error.response.status,
        });
      });
  };
}

export function editSchedule(id, formData) {
  return (dispatch) => {
    axiosInstance({
      method: "put",
      url: `editSchedule/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        dispatch({
          type: CONFIRMED_EDIT_SCHEDULE,
          payload: response.data,
        });
        dispatch({
          type: STATUS,
          payload: response.status,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAILED_EDIT_SCHEDULE,
          payload: error.response,
        });
        dispatch({
          type: STATUS,
          payload: error.response.status,
        });
      });
  };
}
