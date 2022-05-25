import axios from "axios";
import { saveTokeninLocalStorage } from "../selector/authSelector";
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

export function signup(email, password) {
  return (dispatch) => {
    return axios
      .post(`http://localhost:3001/api/v0/signup`, email, password)
      .then((response) => {
        dispatch(SignupConfirmed(response.data));
        localStorage.setItem("token", response.data.accessToken);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000);
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

export function login(email, password) {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axios
      .post(`http://localhost:3001/api/v0/signin`, email, password, config)
      .then((response) => {
        dispatch(LoginConfirmed(response.data));
        saveTokeninLocalStorage(response.data);
        // runLogoutTimer(dispatch, 30 * 24 * 60 * 60 * 1000);
      })
      .catch((error) => {
        dispatch(LoginFailed(error.response));
      });
  };
}

//refresh function

export function refresh() {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return axios
      .get(`http://localhost:3001/api/v0/refresh`, user?.accessToken)
      .then((response) => {
        dispatch(refreshToken(response.data));
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
