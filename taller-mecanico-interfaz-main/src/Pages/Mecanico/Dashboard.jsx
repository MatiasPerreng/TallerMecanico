import { EstadisticasMecanico } from "./components/EstadisticasMecanico";
import { TareasAsignadas } from "./components/TareasAsignadas";
import { Layout } from "./components/common/Layout";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <Layout>
      <div className="animate__animated animate__fadeIn">
        <div className="container mt-4">
          <h1 className="text-center mb-4">Panel de tareas</h1>
          <EstadisticasMecanico />
        </div>
      </div>
    </Layout>
  );
};
