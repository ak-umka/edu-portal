import { SET_TOKENS, SET_LOGGED_IN, SET_USERS } from "../types";

export const signup = async (payload) => async (dispatch) => {
  axios
    .post("http://localhost:5000/api/v0/signup", payload)
    .then((response) => {
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access-token", token);
      dispatch({ type: SET_USERS, payload: user });
      dispatch({ type: SET_LOGGED_IN, payload: true });
    })
    .catch((error) => {
      console.log(error);
    });
};


