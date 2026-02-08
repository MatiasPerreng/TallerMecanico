import { Navigate, Route, Routes } from "react-router-dom";
import { AppJefe } from "../pages/jefe/AppJefe";
import { AppMecanico } from "../pages/mecanico/AppMecanico";
import { AppCliente } from "../pages/cliente/AppCliente";
import { PrivateRoute } from "./PrivateRoute";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";
import { SpinnerComponent } from "../components/SpinnerComponent";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  // Bloqueamos la navegación hasta que sepamos si el usuario es válido
  if (status === 'checking') {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <SpinnerComponent />
      </div>
    );
  }

  return (
    <Routes>
      {/* Rutas Privadas para JEFES */}
      <Route element={<PrivateRoute allowedRoles={["jefe"]} />}>
        <Route path="/jefe/*" element={<AppJefe />} />
      </Route>

      {/* Rutas Privadas para MECÁNICOS */}
      <Route element={<PrivateRoute allowedRoles={["mecanico"]} />}>
        <Route path="/mecanico/*" element={<AppMecanico />} />
      </Route>

      {/* Rutas Públicas / Cliente */}
      <Route path="/*" element={<AppCliente />} />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};