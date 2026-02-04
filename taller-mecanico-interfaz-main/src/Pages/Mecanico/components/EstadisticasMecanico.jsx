import { useEffect } from "react";
import { useTareaAsignadaStore } from "../hooks/useTareaAsignadaStore";

export const EstadisticasMecanico = () => {
  const { tareasAsignadas, startLoadingTareasAsignadas } =
    useTareaAsignadaStore();

  useEffect(() => {
    startLoadingTareasAsignadas();
  }, []);

  const stats = [
    {
      title: "Tareas en la lista",
      value: tareasAsignadas.length,
      icon: "clipboard-data",
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
