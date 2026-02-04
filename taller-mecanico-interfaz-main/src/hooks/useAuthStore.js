import { useDispatch, useSelector } from "react-redux";
import tallerMecanicoApi from "../api/tallerMecanicoApi"; 
import {
  onChecking,
  onClearErrorMessage,
  onLogin,
  onAuthError,
  onLogout,
  onStartLoading,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage, isLoadingAuth } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();


  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
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
      
      const msg = error.response?.data?.detail || "Error en la autenticación";
      dispatch(onAuthError(msg));
      
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 3000);
    }
  };

 
  const startRegister = async ({ name, email, password }) => {
    try {
      await tallerMecanicoApi.post("/auth/register", { name, email, password });

    } catch (error) {
      dispatch(onAuthError(error.response?.data?.detail || "Error en registro"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 3000);
    }
  };

  //* Persistencia al recargar
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
   
      const { data } = await tallerMecanicoApi.get("/auth/usuario");
      dispatch(onLogin(data));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };


  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,
    isLoadingAuth,
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};