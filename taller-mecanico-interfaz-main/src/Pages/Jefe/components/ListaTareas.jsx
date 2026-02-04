import { useEffect, useState } from "react";
import { Button, Form, Stack, Badge } from "react-bootstrap";
import { ModalCrearTarea } from "./ModalCrearTarea";
import { ModalEliminarTarea } from "./ModalEliminarTarea";
import { ModalActualizarTarea } from "./ModalActualizarTarea";
import { useNavigate } from "react-router-dom";
import { useTareaStore } from "../hooks/useTareaStore";
import { SpinnerComponent } from "../../../components/SpinnerComponent";
import { useSearch } from "../../../hooks/useSearch";

export const ListaTareas = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState(null);

  const { tareas, startLoadingTareas, isLoadingTareas } = useTareaStore();
  const { filteredData, searchTerm, handleSearchChange } = useSearch(tareas, [
    "orden_id"
  ]);
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log("Tarea eliminada");
    setShowDeleteModal(false);
  };

  const handleUpdate = (updatedData) => {
    console.log("Datos actualizados:", updatedData);
  };

  useEffect(() => {
    startLoadingTareas();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      startLoadingTareas();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "pendiente":
        return "danger";
      case "en_proceso":
        return "warning";
      case "pendiente_de_facturacion":
        return "info";
      case "completado":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container-fluid px-4 py-3 animate__animated animate__fadeIn">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h2 mb-1 fw-bold text-primary">Gestión de Tareas</h1>
          <p className="text-muted mb-0">Seguimiento de trabajos en taller</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="d-flex align-items-center gap-2"
        >
          <i className="bi bi-clipboard-plus"></i>
          Nueva Tarea
        </Button>
      </div>

      <div className="mb-4">
        <div className="input-group input-group-lg shadow-sm">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <Form.Control
            type="search"
            placeholder="Buscar tareas por número de orden..."
            className="border-start-0"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="table-responsive rounded-3">
          <table className="table table-hover align-middle mb-0 table-striped">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 d-none">ID</th>
                <th className="p-3">Orden</th>
                <th className="p-3">Mecánico</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Detalle de tarea</th>
                <th className="text-end p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingTareas ? (
                <SpinnerComponent colSpan={6} />
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-muted">
                    No se encontraron tareas
                  </td>
                </tr>
              ) : (
                filteredData.map((tarea, index) => (
                  <tr key={index}>
                    <td className="p-3 fw-semibold text-muted d-none">#{tarea?.id}</td>
                    <td className="p-3">
                      <Badge bg="dark" className="font-monospace">
                        ORD-{tarea?.orden_id}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-light rounded-circle p-2">
                          <i className="bi bi-person-gear fs-5 text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 fw-semibold">
                            {tarea?.mecanico?.name || "Sin asignar"}
                          </h6>
                          <small className="text-muted font-monospace">
                            <span className="d-none">ID: {tarea?.mecanico_id}</span>
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        pill
                        bg={getEstadoColor(tarea?.estado_de_trabajo)}
                        className="text-uppercase"
                      >
                        {tarea?.estado_de_trabajo}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="bg-light p-2 rounded">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-journal-text fs-5 text-primary"></i>
                          <span className="text-truncate" style={{ maxWidth: "200px" }}>
                            {tarea?.notificacion_al_cliente || "Sin notificación"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Stack
                        gap={2}
                        className="justify-content-end flex-md-row flex-column"
                      >
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="d-flex align-items-center gap-1"
                          onClick={() => {
                            setSelectedTarea(tarea);
                            setShowUpdateModal(true);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                          <span className="d-none d-md-inline">Editar</span>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="d-flex align-items-center gap-1"
                          onClick={() => {
                            setSelectedTarea(tarea);
                            setShowDeleteModal(true);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                          <span className="d-none d-md-inline">Eliminar</span>
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="d-flex align-items-center gap-1"
                          onClick={() =>
                            navigate(`/jefe/tarea/${tarea?.id}`, {
                              state: { tarea },
                            })
                          }
                        >
                          <i className="bi bi-eye"></i>
                          <span className="d-none d-md-inline">Detalles</span>
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

      <ModalCrearTarea showModal={showModal} handleClose={() => setShowModal(false)} />
      <ModalEliminarTarea showModal={showDeleteModal} handleClose={() => setShowDeleteModal(false)} handleDelete={handleDelete} tareaData={selectedTarea} />
      <ModalActualizarTarea showModal={showUpdateModal} handleClose={() => setShowUpdateModal(false)} handleUpdate={handleUpdate} tareaData={selectedTarea} />
    </div>
  );
};
