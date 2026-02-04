import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Cliente } from "./Cliente";
import { Vehiculo } from "./Vehiculo";
import { Orden } from "./Orden";
import { Inventario } from "./Inventario";
import { Usuarios } from "./Usuarios";
import { Tarea } from "./Tarea";
import { DetallesTarea } from "./components/DetallesTarea";
import { DetallesOrden } from "./components/DetallesOrden";
import { DetallesOrdenImpresion } from "./components/DetallesOrdenImpresion";

export const AppJefe = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/vehiculo" element={<Vehiculo />} />
        <Route path="/orden" element={<Orden />} />
        <Route path="/orden/:id" element={<DetallesOrden />} />
        <Route path="/imprimir-orden" element={<DetallesOrdenImpresion />} />
        <Route path="/tarea" element={<Tarea />} />
        <Route path="/tarea/:id" element={<DetallesTarea />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/*" element={<Navigate to="/jefe/dashboard" />} />
      </Routes>
    </>
  );
};
