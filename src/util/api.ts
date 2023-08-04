import axios from 'axios';

const BASE_URL = `https://www.pre-onboarding-selection-task.shop/`;
const TOKEN: string | null = localStorage.getItem('accessToken');

export const BASE_API = axios.create({
  baseURL: BASE_URL,
});

export const TOKEN_API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
