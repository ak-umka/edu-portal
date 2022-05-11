import { SET_TOKENS, SET_LOGGED_IN, SET_USERS } from "../types";

const initialState = {
  user: null,
  logged: false,
  tokens: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USERS:
      const user = payload ? { ...state.user, ...payload } : null;
      return {
        ...state,
        user,
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        logged: payload,
      };
    case SET_TOKENS:
      return {
        ...state,
        tokens: payload,
      };
    default:
      return state;
  }
}
