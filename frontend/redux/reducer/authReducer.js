import {
  SIGNUP_CONFIRMED,
  SIGNUP_FAILED,
  LOGIN_CONFIRMED,
  LOGIN_FAILED,
  LOGOUT,
} from "../action/authAction";

const initialState = {
  auth: {
    email: "",
    id: "",
    accessToken: "",
    refreshToken: "",
  },
  errorMessage: "",
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

  return state;
}
