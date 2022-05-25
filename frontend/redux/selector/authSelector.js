import { logout, refresh } from "../action/authAction";
import { LoginConfirmed } from "../action/authAction";

//isAuthenticated
export const isAuthenticated = (state) => {
  if (state.auth.auth.accessToken) return true;
  return false;
};

//save token in local storage

export function saveTokeninLocalStorage(token) {
  token.expireDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
  localStorage.setItem("user", JSON.stringify(token));
}

//log out timer

export function runLogoutTimer(dispatch, timer) {
  setTimeout(() => {
    dispatch(logout());
    // localStorage.removeItem("user");
  }, timer);
}

//check auto login when browser refreshed

export function checkAutoLogin(dispatch) {
  const tokenString = localStorage.getItem("user");
  const accessToken = localStorage.getItem("token");
  let token = "";
  if (!tokenString) {
    dispatch(logout());
    localStorage.removeItem("user");
    return;
  }
  token = JSON.parse(tokenString);

  let expireDate = new Date(expireDate);
  let today = new Date();

  if (today > expireDate) {
    dispatch(refresh());
    return;
  }
  dispatch(LoginConfirmed(tokenString));

  const timer = expireDate.getTime() - today.getTime();
  runLogoutTimer(dispatch, timer);
}
