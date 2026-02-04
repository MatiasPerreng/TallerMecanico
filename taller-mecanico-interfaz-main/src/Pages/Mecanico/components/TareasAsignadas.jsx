import { NavLink } from "react-router-dom";

export const TareasAsignadas = () => {
  const tasks = [
    {
      id: 1,
      orden_id: 456,
      vehiculo: "Toyota Corolla",
      cliente: "Juan Pérez",
      estado: "En Progreso",
      progreso: 65,
      fecha_limite: "2024-03-25",
      prioridad: "Alta",
    },
    {
      id: 2,
      orden_id: 789,
      vehiculo: "Honda Civic",
      cliente: "María López",
      estado: "Pendiente",
      progreso: 0,
      fecha_limite: "2024-03-28",
      prioridad: "Media",
    },
  ];

  return (
    <div className="recent-orders">
      <h2 className="section-title">Tareas Asignadas</h2>
      <div className="orders-list">
        {tasks.map((task, index) => (
          <div key={index} className="order-card">
            <div className="order-header">
              <div>
                <h5>Orden #{task.orden_id}</h5>
                <p className="mb-0 text-muted">{task.vehiculo}</p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span
                  className={`status-badge ${task.estado
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {task.estado}
                </span>
              </div>
            </div>
            <div className="order-body">
              <div className="client-info">
                <i className="bi bi-person"></i>
                <p>{task.cliente}</p>
                <i className="bi bi-calendar ms-3"></i>
                <p className="mb-0">Entrega: {task.fecha_limite}</p>
              </div>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${task.progreso}%` }}
                >
                  <span>{task.progreso}%</span>
                </div>
              </div>
              <div className="order-meta">
                <button className="btn btn-details me-2">
                  <NavLink to="/mecanico/tareas">
                    <i className="bi bi-card-checklist"></i> Detalles
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
