import axios from 'axios';
import { setLogout } from '../features/auth/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const setupInterceptors = (store) => {
  api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        store.dispatch(setLogout());
        // Optionally, you can redirect the user to the login page here
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

export const verifyPassword = (shortUrl, password) => {
  return api.post(`/url/${shortUrl}/verify`, { password });
};

export default api;
