import axios from "axios";
import axiosInstance from "@/services/service";
import {
  saveTokenInLocalStorage,
  runLogoutTimer,
} from "../selector/authSelector";

//signup
export const SIGNUP_CONFIRMED = "SIGNUP_CONFIRMED";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

//login
export const LOGIN_CONFIRMED = "LOGIN_CONFIRMED";
export const LOGIN_FAILED = "LOGIN_FAILED";

//logout
export const LOGOUT = "LOGOUT";

//refresh
export const REFRESH_TOKEN = "REFRESH_TOKEN";

//
export const GET_USERS = "GET_USERS";

//signup finction

export function signup(email, password, role, firstName, lastName) {
  return (dispatch) => {
    return axios
      .post(`http://localhost:3001/api/v0/signup`, email, password, role)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        localStorage.setItem("token", response.data.accessToken);
        dispatch(SignupConfirmed(response.data));
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = function () {
          switch (error.response.data.error.message) {
            case "User already exists":
              return "User already exists";
            default:
              return "";
          }
        };
        dispatch(SignupFailed(errorMessage));
      });
  };
}

//login function

export function login(email, password, role) {
  return (dispatch) => {
    return axiosInstance
      .post(`http://localhost:3001/api/v0/signin`, email, password, role)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        localStorage.setItem("token", response.data.accessToken);
        dispatch(LoginConfirmed(response.data));
        if (!user.accessToken) return dispatch(refresh());
      })
      .catch((error) => {
        dispatch(LoginFailed(error.response));
      });
  };
}

//refresh function

export function refresh() {
  return (dispatch) => {
    return axiosInstance
      .get(`http://localhost:3001/api/v0/refresh`)
      .then((response) => {
        dispatch(refreshToken(response.data));
        saveTokenInLocalStorage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

//get users

export function getUsersData() {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3001/api/v0/users`)
      .then((response) => {
        dispatch(getUsers(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

//signup

export function SignupConfirmed(payload) {
  return {
    type: SIGNUP_CONFIRMED,
    payload,
  };
}

export function SignupFailed(message) {
  return {
    type: SIGNUP_FAILED,
    payload: message,
  };
}

//login

export function LoginConfirmed(data) {
  return {
    type: LOGIN_CONFIRMED,
    payload: data,
  };
}

export function LoginFailed(data) {
  return {
    type: LOGIN_FAILED,
    payload: data,
  };
}

//logout

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    type: LOGOUT,
  };
}

//refresh

export function refreshToken(data) {
  return {
    type: REFRESH_TOKEN,
    payload: data,
  };
}

// get users
export function getUsers(data) {
  return {
    type: GET_USERS,
    payload: data,
  };
}
