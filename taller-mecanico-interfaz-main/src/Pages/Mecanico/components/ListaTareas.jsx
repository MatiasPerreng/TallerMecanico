import { Button, Form, Stack, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTareaAsignadaStore } from "../hooks/useTareaAsignadaStore";
import { useEffect } from "react";
import { SpinnerComponent } from "../../../components/SpinnerComponent";
import { useSearch } from "../../../hooks/useSearch";

export const ListaTareas = () => {
  const navigate = useNavigate();

  const {
    isLoadingTareasAsignadas,
    tareasAsignadas,
    startLoadingTareasAsignadas,
  } = useTareaAsignadaStore();

  const { filteredData, searchTerm, handleSearchChange } = useSearch(
    tareasAsignadas,
    ["orden.cliente.nombre"]
  );

  useEffect(() => {
    startLoadingTareasAsignadas();
  }, []);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "pendiente":
        return "danger";
      case "en_proceso":
        return "secondary";
      case "pendiente_por_pagar":
        return "warning";
      case "completado":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container-fluid px-4 py-3 animate__animated animate__fadeIn">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h2 mb-1 fw-bold text-primary">Gestión de Tareas</h1>
          <p className="text-muted mb-0">Seguimiento de trabajos en taller</p>
        </div>
      </div>
      {/* Buscador */}
      <div className="mb-4">
        <div className="input-group input-group-lg shadow-sm">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <Form.Control
            type="search"
            placeholder="Buscar tareas..."
            className="border-start-0"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {/* Tabla Responsive */}
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="table-responsive rounded-3">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-danger text-white">
              <tr>
                <th scope="col">ID</th>
                <th scope="col" className="ps-4">
                  Orden ID
                </th>
                <th scope="col">Mecánico ID</th>
                <th scope="col">Estado</th>
                <th scope="col">Detalle de la tarea</th>
                <th scope="col" className="text-end pe-4">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoadingTareasAsignadas ? (
                <SpinnerComponent />
              ) : (
                filteredData.map((tarea) => (
                  <tr key={tarea?.id} className="transition-all">
                    <td className="ps-4 fw-semibold"># {tarea?.id}</td>
                    <td className="ps-4 fw-semibold">
                      # {tarea?.orden_id} - {tarea?.orden.cliente.nombre}
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-person-workspace"></i>
                        <span className="font-monospace">
                          {tarea?.mecanico_id} - {tarea?.mecanico.name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <Badge bg={getEstadoColor(tarea?.estado_de_trabajo)}>
                        {tarea?.estado_de_trabajo}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-2">
                        <div>
                          <span
                            className="d-inline-block text-truncate"
                            style={{ maxWidth: "250px" }}
                          >
                            <i className="bi bi-calendar-check me-2"></i>
                            {tarea?.notificacion_al_cliente}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="pe-4">
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="justify-content-end"
                      >
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="d-flex align-items-center gap-2"
                          onClick={() =>
                            navigate(`/mecanico/tareas/${tarea?.id}`, {
                              state: { tarea },
                            })
                          }
                        >
                          <i className="bi bi-eye"></i>
                          <span className="d-none d-lg-inline">Detalles</span>
                        </Button>
                      </Stack>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
