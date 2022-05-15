import {
  SIGNUP_CONFIRMED,
  SIGNUP_FAILED,
  LOGIN_CONFIRMED,
  LOGIN_FAILED,
  LOGOUT,
  REFRESH_TOKEN,
  GET_USERS
} from "../action/authAction";

const initialState = {
  auth: {
    email: "",
    id: "",
    accessToken: "",
    refreshToken: "",
  },
  errorMessage: "",
  users:[],
};

export function authReducer(state = initialState, action) {
  if (action.type === SIGNUP_CONFIRMED) {
    return {
      ...state,
      auth: action.payload,
    };
  }
  if (action.type === LOGIN_CONFIRMED) {
    return {
      ...state,
      auth: action.payload,
      errorMessage: "Login Successfully Completed",
    };
  }
  if (action.type === LOGIN_FAILED) {
    return {
      ...state,
      errorMessage: "Login Failed",
    };
  }
  if (action.type === LOGOUT) {
    return {
      ...state,
      auth: {
        email: "",
        id: "",
        accessToken: "",
        refreshToken: "",
      },
    };
  }
  if (action.type === SIGNUP_FAILED) {
    return {
      ...state,
      errorMessage: action.payload,
    };
  }
  if (action.type === REFRESH_TOKEN) {
    return{
      ...state,
      auth: action.payload,
      errorMessage: "Token is refreshed",
    }
  }
  if (action.type === SIGNUP_FAILED) {
    return{
      ...state,
      users: action.payload,
    }
  }
  return state;
}
