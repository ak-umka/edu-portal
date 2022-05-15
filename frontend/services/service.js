import axios from 'axios';
import {store} from '@/redux/store';

const axiosInstance = axios.create({
    baseURL: `http://localhost:5000/api/v0/`,
});

axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.auth.accessToken;
    config.params = config.params || {};
    config.params['auth'] = token;

    return config;
});

export default axiosInstance;