import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:3001/api/v0/`,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token.accessToken)
      request.headers["Authorization"] = "Bearer " + token;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
