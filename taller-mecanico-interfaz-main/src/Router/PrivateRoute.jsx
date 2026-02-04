import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { Spinner } from "react-bootstrap";

export const PrivateRoute = ({ allowedRoles = [] }) => {
  const { status, user } = useAuthStore();

  // Este codigo de aqui, lo que hacia era refrescar la informacion del cliente cuando se cambiaba la URL. Se quita porque no es necesario
  // useEffect(() => {
  //   checkAuthToken();
  // }, [location.pathname]);

  // Mientras comprobamos la sesión mostramos un spinner
  if (status === "checking") {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  // Si no está autenticado, redirige al login
  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no está en la lista de permitidos, redirige a “unauthorized” o al login
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/login" replace />;
  }

  // Si todo está OK, renderiza las rutas hijas
  return <Outlet />;
};
