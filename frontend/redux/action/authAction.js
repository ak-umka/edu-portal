import axios from "axios";

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

//signup finction

export function signup(email, password) {
  return (dispatch) => {
    return axios
      .post(`http://localhost:5000/api/v0/signup`, email, password)
      .then((response) => {
        dispatch(SignupConfirmed(response.data));
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error.response.data.message);
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

export function login(email, password, token) {
  return (dispatch) => {
    token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axios
      .post(`http://localhost:5000/api/v0/signin`, email, password, config)
      .then((response) => {
        dispatch(LoginConfirmed(response.data));
        const accessToken = response.data.accessToken
        accessToken.expireDate = new Date(
          new Date().getTime() + accessToken.expiresIn * 1000,
      );
        localStorage.setItem(
          "token",
          JSON.stringify(accessToken)
        );
        localStorage.setItem("user", JSON.stringify(response.data));
        let expireDate = new Date(accessToken.expireDate);
        let todaysDate = new Date();
        if (todaysDate > expireDate) {
          dispatch(refresh());
          return;
      }
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
      .get(`http://localhost:5000/api/v0/refresh`, user?.accessToken)
      .then((response) => {
        dispatch(refreshToken(response.data));
      })
      .catch((error) => {
        console.log(error);
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
