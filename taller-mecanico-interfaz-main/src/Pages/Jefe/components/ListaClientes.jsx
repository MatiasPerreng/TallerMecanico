import { useEffect, useState } from "react";
import { Button, Form, Stack, Badge } from "react-bootstrap";
import { ModalCrearCliente } from "./ModalCrearCliente";
import { ModalEliminarCliente } from "./ModalEliminarCliente";
import { ModalActualizarCliente } from "./ModalActualizarCliente";
import { useClienteStore } from "../hooks/useClienteStore";
import { SpinnerComponent } from "../../../components/SpinnerComponent";
import { useSearch } from "../../../hooks/useSearch";

export const ListaClientes = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const { clientes, startLoadingClientes, isLoadingClientes } =
    useClienteStore();

  const { filteredData, searchTerm, handleSearchChange } = useSearch(clientes, [
    "nombre", "rut"
  ]);

  const handleUpdate = (updatedData) => {
    console.log("Datos actualizados:", updatedData);
  };

  const handleDelete = () => {
    console.log("Cliente eliminado");
    setShowDeleteModal(false);
  };

  useEffect(() => {
    startLoadingClientes();
  }, []);

  return (
    <div className="container-fluid px-4 py-3 animate__animated animate__fadeIn">
      {/* Encabezado */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h2 mb-1 fw-bold text-primary">Clientes</h1>
          <p className="text-muted mb-0">Gestión de clientes registrados</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="d-flex align-items-center gap-2"
        >
          <i className="bi bi-plus-lg"></i>
          Nuevo Cliente
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
            placeholder="Buscar clientes..."
            className="border-start-0"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Tabla de clientes */}
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="table-responsive rounded-3">
          <table className="table table-hover align-middle mb-0 table-striped">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col" className="p-3 d-none">ID</th>
                <th scope="col" className="p-3">
                  Cliente
                </th>
                <th scope="col" className="p-3">
                  RUT
                </th>
                <th scope="col" className="p-3">
                  Contacto
                </th>
                <th scope="col" className="text-end p-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoadingClientes ? (
                <SpinnerComponent colSpan={5} />
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-muted">
                    No se encontraron clientes
                  </td>
                </tr>
              ) : (
                filteredData.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className={`transition-all ${
                      !cliente.disponible ? "table-secondary" : ""
                    }`}
                  >
                    {/* ID */}
                    <td className="p-3 fw-semibold text-muted d-none">#{cliente.id}</td>

                    {/* Información del Cliente */}
                    <td className="p-3">
                      <div className="d-flex flex-column gap-2">
                        <Badge
                          pill
                          bg={cliente.disponible ? "success" : "danger"}
                          className="align-self-start"
                        >
                          {cliente.disponible ? "Disponible" : "No disponible"}
                        </Badge>
                        <h6 className="mb-0 fw-semibold">{cliente.nombre}</h6>
                        <div className="d-flex flex-column gap-1">
                          <div className="bg-light p-2 rounded small">
                            <i className="bi bi-envelope me-2"></i>
                            {cliente.email}
                          </div>
                          <div className="bg-light p-2 rounded small">
                            <i className="bi bi-geo-alt me-2"></i>
                            {cliente.domicilio}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* RUT */}
                    <td className="p-3">
                      <Badge pill bg="primary" className="font-monospace">
                        {cliente.rut}
                      </Badge>
                    </td>

                    {/* Contacto */}
                    <td className="p-3">
                      <div className="d-flex flex-column gap-2">
                        <a
                          href={`tel:${cliente.telefono}`}
                          className="text-decoration-none text-primary d-flex align-items-center gap-2"
                        >
                          <i className="bi bi-telephone"></i>
                          {cliente.telefono}
                        </a>
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
                            setSelectedCliente(cliente);
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
                            setSelectedCliente(cliente);
                            setShowDeleteModal(true);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                          <span className="d-none d-md-inline">Borrar</span>
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
      <ModalCrearCliente
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />
      <ModalEliminarCliente
        showModal={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
        clienteData={selectedCliente}
      />
      <ModalActualizarCliente
        showModal={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        handleUpdate={handleUpdate}
        clienteData={selectedCliente}
      />
    </div>
  );
};
