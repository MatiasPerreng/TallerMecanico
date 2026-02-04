import { useEffect, useState } from "react";
import { Button, Form, Stack, Badge } from "react-bootstrap";
import { ModalCrearOrden } from "./ModalCrearOrden";
import { ModalEliminarOrden } from "./ModalEliminarOrden";
import { ModalActualizarOrden } from "./ModalActualizarOrden";
import { useNavigate } from "react-router-dom";
import { useOrdenStore } from "../hooks/useOrdenStore";
import { SpinnerComponent } from "../../../components/SpinnerComponent";
import { useSearch } from "../../../hooks/useSearch";

export const ListaOrdenes = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrden, setSelectedOrden] = useState(null);

  const navigate = useNavigate();

  const { ordenes, startLoadingOrdenes, isLoadingOrdenes } = useOrdenStore();

  const { filteredData, searchTerm, handleSearchChange } = useSearch(ordenes, [
    "recepcion",
    "cliente.nombre",
    "vehiculo.modelo",
    "vehiculo.matricula",
  ]);

  const handleUpdate = (updatedData) => {
    console.log("Datos actualizados:", updatedData);
    // Lógica para actualizar la orden
  };

  const handleDelete = () => {
    console.log("Orden eliminada");
    setShowDeleteModal(false);
    // Lógica para eliminar la orden
  };

  useEffect(() => {
    startLoadingOrdenes();
  }, []);

  return (
    <div className="container-fluid px-4 py-3 animate__animated animate__fadeIn">
      {/* Encabezado */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h2 mb-1 fw-bold text-primary">Órdenes de Trabajo</h1>
          <p className="text-muted mb-0">Gestión de órdenes activas</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="d-flex align-items-center gap-2"
        >
          <i className="bi bi-file-earmark-plus"></i>
          Nueva Orden
        </Button>
      </div>

      {/* Buscador */}
      <div className="mb-4">
        <div className="input-group input-group-lg shadow-sm">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <Form.Control
            type="search"
            placeholder="Buscar órdenes..."
            className="border-start-0"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Tabla de órdenes */}
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="table-responsive rounded-3">
          <table className="table table-hover align-middle mb-0 table-striped">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col" className="p-3">Orden</th>
                <th scope="col" className="p-3">
                  Cliente
                </th>
                <th scope="col" className="p-3">
                  Vehículo
                </th>
                <th scope="col" className="p-3">
                  Trabajos
                </th>
                <th scope="col" className="p-3">
                  Fechas
                </th>
                <th scope="col" className="p-3">
                  Mantenimiento
                </th>
                <th scope="col" className="p-3">
                  Entrada
                </th>
                <th scope="col" className="text-end p-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoadingOrdenes ? (
                <SpinnerComponent colSpan={8} />
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-4 text-muted">
                    No se encontraron órdenes
                  </td>
                </tr>
              ) : (
                filteredData.map((orden, index) => (
                  <tr
                    key={index}
                    className={`transition-all ${
                      !orden?.disponible ? "table-secondary" : ""
                    }`}
                  >
                    {/* ID */}
                    <td className="p-3 fw-semibold font-monospace"><Badge bg="dark">ORD-{orden?.id}</Badge></td>

                    {/* Cliente */}
                    <td className="p-3">
                      <div className="d-flex flex-column gap-2">
                        <Badge
                          pill
                          bg={orden?.disponible ? "success" : "danger"}
                          className="align-self-start"
                        >
                          {orden?.disponible ? "Disponible" : "No disponible"}
                        </Badge>
                        <div>
                          <h6 className="mb-1 fw-semibold">
                            {orden?.cliente?.nombre}
                          </h6>
                          <small className="text-muted">
                            ID: {orden?.cliente?.id}
                          </small>
                        </div>
                      </div>
                    </td>

                    {/* Vehículo */}
                    <td className="p-3">
                      <div className="d-flex align-items-center gap-3">
                        <i className="bi bi-car-front fs-4 text-muted"></i>
                        <div>
                          <h6 className="mb-1 fw-semibold">
                            {orden?.vehiculo?.marca} {orden?.vehiculo?.modelo}
                          </h6>
                          <div className="text-muted small">
                            <div>ID: {orden?.vehiculo?.id}</div>
                            <div>Matrícula: {orden?.vehiculo?.matricula}</div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Trabajos */}
                    <td className="p-3">
                      <div className="bg-light p-2 rounded">
                        <small className="text-muted d-block mb-1">
                          Descripción:
                        </small>
                        <span
                          className="d-block text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {orden?.detalle_de_trabajos_a_realizar ||
                            "Sin detalles"}
                        </span>
                      </div>
                    </td>

                    {/* Fechas */}
                    <td className="p-3">
                      <div className="d-flex flex-column gap-2">
                        <div className="bg-light p-2 rounded">
                          <small className="text-muted d-block">
                            Recepción:
                          </small>
                          <span className="text-nowrap d-block">
                            {orden?.recepcion === "1900-01-01"
                              ? "No especificada"
                              : orden?.recepcion || "N/A"}
                          </span>
                        </div>
                        <div className="bg-light p-2 rounded">
                          <small className="text-muted d-block">
                            Prometida:
                          </small>
                          <span className="text-nowrap d-block">
                            {orden?.prometido === "1900-01-01"
                              ? "No especificada"
                              : orden?.prometido || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Mantenimiento */}
                    <td className="p-3">
                      <Stack gap={2}>
                        <div className="d-flex align-items-center gap-2">
                          <i
                            className={`bi ${
                              orden?.cambio_de_aceite
                                ? "bi-check-circle-fill text-success"
                                : "bi-x-circle-fill text-danger"
                            }`}
                          ></i>
                          <span className="small">Cambio de aceite</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <i
                            className={`bi ${
                              orden?.cambio_de_filtro
                                ? "bi-check-circle-fill text-success"
                                : "bi-x-circle-fill text-danger"
                            }`}
                          ></i>
                          <span className="small">Cambio de filtro</span>
                        </div>
                      </Stack>
                    </td>

                    {/* Entrada */}
                    <td className="p-3">
                      <div className="bg-light p-2 rounded">
                        <small className="text-muted d-block mb-1">
                          Detalles:
                        </small>
                        <span
                          className="d-block text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {orden?.detalles_de_entrada_del_vehiculo ||
                            "Sin detalles"}
                        </span>
                      </div>
                    </td>

                    {/* Acciones */}
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
                            setSelectedOrden(orden);
                            setShowUpdateModal(true);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                          <span className="d-none d-lg-inline">Editar</span>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="d-flex align-items-center gap-1"
                          onClick={() => {
                            setSelectedOrden(orden);
                            setShowDeleteModal(true);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                          <span className="d-none d-lg-inline">Borrar</span>
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="d-flex align-items-center gap-1"
                          onClick={() =>
                            navigate(`/jefe/orden/${orden?.id}`, {
                              state: { orden },
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

      {/* Modals */}
      <ModalCrearOrden
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />
      <ModalEliminarOrden
        showModal={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
        ordenData={selectedOrden}
      />
      <ModalActualizarOrden
        showModal={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        handleUpdate={handleUpdate}
        ordenData={selectedOrden}
      />
    </div>
  );
};
