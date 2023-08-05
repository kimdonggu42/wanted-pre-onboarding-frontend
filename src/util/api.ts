import axios from 'axios';

const BASE_URL = `https://www.pre-onboarding-selection-task.shop/`;

export const TODO_API = axios.create({
  baseURL: BASE_URL,
});

TODO_API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    console.error(err);
    return Promise.reject(err);
  },
);
