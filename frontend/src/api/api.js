import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

console.log("API_URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {

    const newToken = response.headers["x-new-token"];

    if (newToken) {
      localStorage.setItem("token", newToken);
    }

    return response;
  },
  (error) => {

    if (error.response && error.response.status === 401) {

      console.log("Sesión expirada");

      localStorage.removeItem("token");

      window.location.href = "/"; 
    }

    return Promise.reject(error);
  }
);;

export default api;
