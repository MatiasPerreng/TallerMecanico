import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const tallerMecanicoApi = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
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
      console.warn("Token expirado o inválido. Limpiando sesión...");
      localStorage.clear();
  
    }


    return Promise.reject(error);
  }
);

export default tallerMecanicoApi;