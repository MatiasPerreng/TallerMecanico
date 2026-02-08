import { useDispatch, useSelector } from "react-redux";
import tallerMecanicoApi from "../api/tallerMecanicoApi";
import {
  onLogin,
  onAuthError,
  onLogout,
  onStartLoading,
  onClearErrorMessage,
  onSetErrorMessage,
  onChecking, // Asegúrate de tenerlo importado
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage, isLoadingAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onStartLoading());
    try {
      const { data } = await tallerMecanicoApi.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ 
          uid: data.uid, 
          name: data.name, 
          email: data.email, 
          rol: data.rol 
      }));
    } catch (error) {
      const msg = error.response?.data?.detail || "Credenciales incorrectas";
      dispatch(onAuthError(msg));
      setTimeout(() => dispatch(onClearErrorMessage()), 3000);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onStartLoading());
    try {
      await tallerMecanicoApi.post("/auth/register", { name, email, password });
      dispatch(onSetErrorMessage(null));
    } catch (error) {
      dispatch(onAuthError(error.response?.data?.detail || "Error en registro"));
      setTimeout(() => dispatch(onClearErrorMessage()), 3000);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    
    // Si no hay token, pasamos a not-authenticated para quitar spinner
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await tallerMecanicoApi.get("/auth/usuario");
      dispatch(onLogin(data));
    } catch (error) {
      console.error("Error en checkAuthToken:", error);

      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Token inválido: Limpieza total
        localStorage.clear();
        dispatch(onLogout());
      } else {
        // ERROR DE SERVIDOR/RED (500, 404, etc.)
        // Si ya tenemos un usuario en el estado de Redux, lo mantenemos logueado.
        // Si no, forzamos logout para que no se quede el spinner infinito.
        if (user && user.uid) {
          dispatch(onLogin(user)); 
        } else {
          // Si es el primer arranque y falla el servidor, hay que sacar el spinner:
          dispatch(onLogout("Error de conexión con el servidor"));
        }
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

    //* Métodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};