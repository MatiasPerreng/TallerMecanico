import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const tallerMecanicoApi = axios.create({

  baseURL: VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

tallerMecanicoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  
  return config;
});


tallerMecanicoApi.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {
      console.warn("Sesión expirada. Limpiando almacenamiento...");
      localStorage.removeItem("token");
      localStorage.removeItem("token-init-date");

      if (!window.location.pathname.includes('/auth')) {
          window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

export default tallerMecanicoApi;