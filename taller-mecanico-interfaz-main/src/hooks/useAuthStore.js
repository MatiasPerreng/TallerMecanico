import { useDispatch, useSelector } from "react-redux";
import tallerMecanicoApi from "../api/tallerMecanicoApi";
import {
  onLogin,
  onAuthError,
  onLogout,
  onStartLoading,
  onClearErrorMessage,
} from "../store/auth/authSlice";
import { onAddNewMecanico } from "../store/jefe/usuarios/mecanicoSlice"; // <--- Importante

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
    try {
      // 1. Realizar el post al backend
      const { data } = await tallerMecanicoApi.post("/auth/register", { name, email, password });
      
      // 2. Si la respuesta es exitosa, agregamos al usuario al estado de mecánicos
      // Usamos el ID devuelto por el backend (data.id)
      dispatch(onAddNewMecanico({
        id: data.id,
        name: data.name,
        email: data.email,
        rol: data.rol,
        disponible: data.disponible ?? true
      }));

      return { ok: true };
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || "Error en registro";
      return { ok: false, msg };
    }
  };

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