import axios from "axios";

//signup
export const SIGNUP_CONFIRMED = "SIGNUP_CONFIRMED";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

//login
export const LOGIN_CONFIRMED = "LOGIN_CONFIRMED";
export const LOGIN_FAILED = "LOGIN_FAILED";

//logout
export const LOGOUT = "LOGOUT";

//signup finction
export function signup(email, password) {
  return (dispatch) => {
    return axios
      .post(`http://localhost:5000/api/v0/signup`, email, password)
      .then((response) => {
        dispatch(SignupConfirmed(response.data));
        localStorage.setItem('token', JSON.stringify(response.data.accessToken))
        localStorage.setItem('user', JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error.response.data.message)
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

//login function

export function login(email, password, token){
  return(dispatch)=>{
    token=localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    return axios
      .post(`http://localhost:5000/api/v0/signin`, email, password, config)
      .then((response)=>{
        dispatch(LoginConfirmed(response.data))
        localStorage.setItem('token', JSON.stringify(response.data.accessToken))
        localStorage.setItem('user', JSON.stringify(response.data))
      })
      .catch((error)=>{
        dispatch(LoginFailed(error.response.data))
      })
  }
}

export function LoginConfirmed(data){
  return{
    type: LOGIN_CONFIRMED,
    payload: data,
  }
}

export function LoginFailed(data){
  return{
    type:LOGIN_FAILED,
    payload:data
  }
}

//logout

export function logout(){
  localStorage.removeItem('user');
  return{
    type:LOGOUT,
  }
}
