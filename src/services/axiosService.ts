import { BASE_URL } from '@env';
import { log } from '@utils/console';
import axios from 'axios';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// instance.defaults.headers.common.Authorization = '';

instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    // Edit response config

    return response;
  },
  (error) => {
    log({ error });
    return Promise.reject(error.response);
  },
);
export default instance;
