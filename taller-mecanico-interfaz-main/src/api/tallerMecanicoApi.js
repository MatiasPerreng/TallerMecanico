import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const tallerMecanicoApi = axios.create({
  baseURL: VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Petición
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

// Interceptor de Respuesta: YA NO DESLOGUEA
tallerMecanicoApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Solo informamos el error por consola para depuración
    console.error("Error en la API:", {
      status: error.response?.status,
      data: error.response?.data,
      path: error.config?.url
    });

    return Promise.reject(error);
  }
);

export default tallerMecanicoApi;