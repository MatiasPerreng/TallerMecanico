export const OrdenesRecientes = () => {
  const orders = [
    {
      vehicle: "Toyota Corolla",
      client: "Juan Pérez",
      status: "En Progreso",
      progress: 65,
      date: "2024-03-20",
    },
    {
      vehicle: "Honda Civic",
      client: "María López",
      status: "Pendiente",
      progress: 20,
      date: "2024-03-19",
    },
  ];

  return (
    <div className="recent-orders">
      <h2 className="section-title">Órdenes Recientes</h2>
      <div className="orders-list">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-header">
              <h5>{order.vehicle}</h5>
              <span className={`status-badge ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div className="order-body">
              <div className="client-info">
                <i className="bi bi-person"></i>
                <p>{order.client}</p>
              </div>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${order.progress}%` }}
                >
                  <span>{order.progress}%</span>
                </div>
              </div>
              <div className="order-meta">
                <span className="date">
                  <i className="bi bi-calendar"></i>
                  {order.date}
                </span>
                <button className="btn btn-details">
                  Ver Detalles <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
