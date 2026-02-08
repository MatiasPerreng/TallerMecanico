import { Button, Form, Stack, Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTareaAsignadaStore } from "../hooks/useTareaAsignadaStore";
import { useEffect, useMemo } from "react";
import { SpinnerComponent } from "../../../components/SpinnerComponent";
import { useSearch } from "../../../hooks/useSearch";

export const ListaTareas = () => {
  const navigate = useNavigate();
  const { isLoadingTareasAsignadas, tareasAsignadas, startLoadingTareasAsignadas } = useTareaAsignadaStore();

  // Aseguramos que tareasAsignadas sea siempre un array para useSearch
  const safeTareas = useMemo(() => tareasAsignadas || [], [tareasAsignadas]);

  const { filteredData, searchTerm, handleSearchChange } = useSearch(
    safeTareas,
    ["orden.cliente.nombre", "mecanico.name", "estado_de_trabajo"]
  );

  useEffect(() => {
    startLoadingTareasAsignadas();
  }, []);

  const getEstadoColor = (estado) => {
    const config = {
      pendiente: "danger",
      en_proceso: "primary",
      pendiente_por_pagar: "warning",
      completado: "success",
    };
    return config[estado] || "secondary";
  };

  return (
    <div className="container-fluid px-4 py-4 animate__animated animate__fadeIn">
      <div className="mb-4">
        <h1 className="h3 mb-1 fw-bold text-dark">Gestión de Tareas</h1>
        <p className="text-muted">Seguimiento de trabajos en taller</p>
      </div>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-3">
          <div className="input-group">
            <span className="input-group-text bg-transparent border-end-0"><i className="bi bi-search"></i></span>
            <Form.Control
              type="search"
              placeholder="Buscar tareas..."
              className="border-start-0 py-2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>ORDEN / CLIENTE</th>
                <th>MECÁNICO</th>
                <th>ESTADO</th>
                <th className="text-end pe-4">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingTareasAsignadas ? (
                <tr><td colSpan="5" className="text-center py-5"><SpinnerComponent /></td></tr>
              ) : (
                filteredData.map((tarea) => (
                  <tr key={tarea?.id}>
                    <td className="ps-4"><span className="badge bg-light text-dark border">#{tarea?.id}</span></td>
                    <td>
                      <div className="fw-bold">Orden #{tarea?.orden_id}</div>
                      <div className="small text-muted">{tarea?.orden?.cliente?.nombre || "N/A"}</div>
                    </td>
                    <td>
                      <span className="small fw-medium"><i className="bi bi-person me-1"></i>{tarea?.mecanico?.name || "Sin asignar"}</span>
                    </td>
                    <td>
                      <Badge bg={getEstadoColor(tarea?.estado_de_trabajo)}>
                        {tarea?.estado_de_trabajo?.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="pe-4 text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate(`/mecanico/tareas/${tarea?.id}`, { state: { tarea } })}
                      >
                        Ver Detalles
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};