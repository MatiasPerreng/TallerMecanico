import { Estadisticas } from "./components/Estadisticas";
import { OrdenesRecientes } from "./components/OrdenesRecientes";
import "./Dashboard.css";
import { Layout } from "./components/common/Layout";

export const Dashboard = () => {
  return (
    <>
      <Layout>
        <div className="animate__animated animate__fadeIn">
          <div className="container mt-4">
            <h1 className="text-center mb-4">
              Panel de control administrativo
            </h1>
            <Estadisticas />
          </div>
        </div>
      </Layout>
    </>
  );
};
