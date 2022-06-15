import {
  SIGNUP_CONFIRMED,
  SIGNUP_FAILED,
  LOGIN_CONFIRMED,
  LOGIN_FAILED,
  LOGOUT,
  REFRESH_TOKEN,
  GET_USERS,
  STATUS
} from "../action/authAction";

const initialState = {
  loggedIn: false,
  auth: {
    email: "",
    id: "",
    accessToken: "",
    refreshToken: "",
  },
  errorMessage: "",
  users: [
    {
      role: "",
      id: "",
      email: "",
      password: "",
    },
  ],
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_CONFIRMED:
      return {
        ...state,
        auth: action.payload,
        errorMessage: "User successfully created",
      };
    case LOGIN_CONFIRMED:
      return {
        ...state,
        auth: action.payload,
        loggedIn: true,
        errorMessage: "Login Successfully Completed",
      };
    case LOGIN_FAILED:
      return {
        ...state,
        errorMessage: "Login Failed",
      };
    case LOGOUT:
      return {
        ...state,
        auth: {
          email: "",
          id: "",
          accessToken: "",
          refreshToken: "",
        },
        loggedIn: false,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        auth: action.payload,
        errorMessage: "Token is refreshed",
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default: {
      return state;
    }
  }
}
