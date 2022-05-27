import { logout, refresh, LoginConfirmed } from "../action/authAction";

//save token
export function saveTokenInLocalStorage(tokenDetails) {
  tokenDetails.expireDate = new Date(
    new Date().getTime() + 30 * 24 * 60 * 1000
  );
  localStorage.setItem("user", JSON.stringify(tokenDetails));
}

//log out timer
export function runLogoutTimer(dispatch, timer) {
  setTimeout(() => {
    dispatch(logout());
  }, timer);
}

//check login
export function checkAutoLogin(dispatch) {
  const tokenDetailsString = localStorage.getItem("user");
  let tokenDetails = "";
  if (!tokenDetailsString) {
    // dispatch(logout());
    return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);
  let expireDate = new Date(tokenDetails.expireDate);
  let todaysDate = new Date();

  if (todaysDate > expireDate) {
    dispatch(refresh());
    dispatch(logout());
    return;
  }
  dispatch(LoginConfirmed(tokenDetails));

  const timer = expireDate.getTime() - todaysDate.getTime();

  runLogoutTimer(dispatch, timer);
}
