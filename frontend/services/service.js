import axios from "axios";
import { store } from "@/redux/store";

const axiosInstance = axios.create({
  baseURL: `http://localhost:5000/api/v0/`,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("user");
    if (token.accessToken)
      request.headers["Authorization"] = "Bearer " + token.accessToken;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
