import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";
//
// Obtengo las variables de entorno
const { VITE_API_URL } = getEnvVariables();

// Creo instancia base de Axios
const tallerMecanicoApi = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

// Interceptores para inyectar un TOKEN en cada peticion
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

export default tallerMecanicoApi;
