import axios from 'axios';
import { urlLink } from 'helper/route';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: urlLink.api.serverUrl,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (parems) => queryString.stringify(parems),
});

axiosClient.interceptors.request.use(async (config) => {
  // set token in headers
  // const token = 'abc';
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
