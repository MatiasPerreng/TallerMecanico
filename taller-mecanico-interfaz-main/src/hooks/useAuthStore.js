import { useDispatch, useSelector } from "react-redux";
import tallerMecanicoApi from "../api/tallerMecanicoApi"; 
import {
  onChecking,
  onClearErrorMessage,
  onLogin,
  onAuthError,
  onLogout,
  onStartLoading,
  onSetErrorMessage, // Importamos la acción de error que no cierra sesión
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage, isLoadingAuth } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onStartLoading());
    try {
      const { data } = await tallerMecanicoApi.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ 
          uid: data.uid, 
          name: data.name, 
          email: data.email, 
          rol: data.rol 
      }));

    } catch (error) {
      // Si el login falla, apagamos spinner y mostramos error
      const msg = error.response?.data?.detail || "Error en la autenticación";
      dispatch(onAuthError(msg));
      
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 3000);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onStartLoading());
    try {
      await tallerMecanicoApi.post("/auth/register", { name, email, password });
      // Aquí podrías despachar una acción de éxito o apagar el loading
      dispatch(onSetErrorMessage(null)); 
    } catch (error) {
      dispatch(onAuthError(error.response?.data?.detail || "Error en registro"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 3000);
    }
  };

  //* Persistencia al recargar - CORREGIDO PARA EVITAR SPINNER ETERNO
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    
    // Si no hay token, no hay nada que cargar, salimos inmediatamente
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await tallerMecanicoApi.get("/auth/usuario");
      dispatch(onLogin(data));
    } catch (error) {

      if (error.response?.status === 401) {
          localStorage.clear();
          dispatch(onLogout());
      } else {
   
          dispatch(onSetErrorMessage("Error de conexión con el servidor"));
      }
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    //* Propiedades
    status,
    user,
    errorMessage,
    isLoadingAuth,

    //* Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};