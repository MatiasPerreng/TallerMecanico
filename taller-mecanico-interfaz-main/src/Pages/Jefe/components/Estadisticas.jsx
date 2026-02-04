import { useEffect } from "react";
import { useOrdenStore } from "../hooks/useOrdenStore";
import { useClienteStore } from "../hooks/useClienteStore";
import { useVehiculoStore } from "../hooks/useVehiculoStore";

export const Estadisticas = () => {
  const { ordenes, startLoadingOrdenes } = useOrdenStore();

  const { clientes, startLoadingClientes } = useClienteStore();

  const { vehiculos, startLoadingVehiculos } = useVehiculoStore();

  useEffect(() => {
    startLoadingOrdenes();
  }, []);

  useEffect(() => {
    startLoadingClientes();
  }, []);

  useEffect(() => {
    startLoadingVehiculos();
  }, []);

  const stats = [
    {
      title: "Órdenes Activas",
      value: ordenes.length,
      icon: "clipboard-check",
      trend: "up",
    },
    {
      title: "Clientes Registrados",
      value: clientes.length,
      icon: "people",
      trend: "up",
    },
    {
      title: "Vehículos en Sistema",
      value: vehiculos.length,
      icon: "car-front",
      trend: "steady",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="card-icon">
            <i className="bi bi-up"></i>
          </div>
          <div className="card-content">
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
          </div>
          <div className="trend up">
            <i className="bi bi-arrow-up"></i>
          </div>
        </div>
      ))}
    </div>
  );
};
