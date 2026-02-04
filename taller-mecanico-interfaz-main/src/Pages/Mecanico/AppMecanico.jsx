import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Tareas } from "./Tareas";
import { DetalleTareas } from "./components/DetalleTareas";

export const AppMecanico = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/tareas/:id" element={<DetalleTareas />} />
        <Route path="/*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
};
