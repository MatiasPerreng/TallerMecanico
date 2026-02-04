import { Navigate, Route, Routes } from "react-router-dom";
import { AppJefe } from "../pages/jefe/AppJefe";
import { AppMecanico } from "../pages/mecanico/AppMecanico";
import { AppCliente } from "../pages/cliente/AppCliente";
import { PrivateRoute } from "./PrivateRoute";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";

export const AppRouter = () => {
  const { checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <>
      <Routes>
        {/* Rutas para CLIENTES */}
        <Route path="/*" element={<AppCliente />} />

        {/* Cualquier otra URL redirige al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

        {/* Rutas para JEFES */}
        <Route element={<PrivateRoute allowedRoles={["jefe"]} />}>
          <Route path="/jefe/*" element={<AppJefe />} />
        </Route>

        {/* Rutas para MECÁNICOS */}
        <Route element={<PrivateRoute allowedRoles={["mecanico"]} />}>
          <Route path="/mecanico/*" element={<AppMecanico />} />
        </Route>
      </Routes>
    </>
  );
};
