import { useEffect, useState } from "react";
import { Button, Form, Spinner, Stack, Badge } from "react-bootstrap";
import { ModalCrearVehiculo } from "./ModalCrearVehiculo";
import { ModalEliminarVehiculo } from "./ModalEliminarVehiculo";
import { ModalActualizarVehiculo } from "./ModalActualizarVehiculo";
import { useVehiculoStore } from "../hooks/useVehiculoStore";
import { SpinnerComponent } from "../../../components/SpinnerComponent";
import { useSearch } from "../../../hooks/useSearch";

export const ListaVehiculos = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);

  const { vehiculos, startLoadingVehiculos, isLoadingVehiculos } =
    useVehiculoStore();

  const { filteredData, searchTerm, handleSearchChange } = useSearch(
    vehiculos,
    ["modelo", "marca", "matricula"]
  );

  const handleUpdate = (updatedData) => {
    console.log("Datos actualizados:", updatedData);
  };

  const handleDelete = () => {
    console.log("Vehiculo eliminado");
    setShowDeleteModal(false);
  };

  useEffect(() => {
    startLoadingVehiculos();
  }, []);

  return (
    <div className="container-fluid px-4 py-3 animate__animated animate__fadeIn">
      {/* Encabezado */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h2 mb-1 fw-bold text-primary">Vehículos</h1>
          <p className="text-muted mb-0">Gestión de vehículos registrados</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="d-flex align-items-center gap-2"
        >
          <i className="bi bi-plus-lg"></i>
          Nuevo Vehículo
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
            placeholder="Buscar vehículos..."
            className="border-start-0"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Tabla de vehículos */}
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="table-responsive rounded-3">
          <table className="table table-hover align-middle mb-0 table-striped">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col" className="p-3 d-none">ID</th>
                <th scope="col" className="p-3">
                  Modelo
                </th>
                <th scope="col" className="p-3">
                  Marca
                </th>
                <th scope="col" className="p-3">
                  Color
                </th>
                <th scope="col" className="p-3">
                  Matrícula
                </th>
                <th scope="col" className="p-3">
                  Kilometraje
                </th>
                <th scope="col" className="p-3">
                  Serie
                </th>
                <th scope="col" className="p-3">
                  Motor
                </th>
                <th scope="col" className="p-3">
                  Compra
                </th>
                <th scope="col" className="text-end p-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoadingVehiculos ? (
                <SpinnerComponent colSpan={10} />
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center p-4 text-muted">
                    No se encontraron vehículos
                  </td>
                </tr>
              ) : (
                filteredData.map((vehiculo) => (
                  <tr
                    key={vehiculo.id}
                    className={`transition-all ${
                      !vehiculo.disponible ? "table-secondary" : ""
                    }`}
                  >
                    {/* ID */}
                    <td className="p-3 fw-semibold text-muted d-none">#{vehiculo.id}</td>

                    {/* Modelo */}
                    <td className="p-3">
                      <div className="d-flex flex-column gap-2">
                        <Badge
                          pill
                          bg={vehiculo.disponible ? "success" : "danger"}
                          className="align-self-start"
                        >
                          {vehiculo.disponible ? "Disponible" : "No disponible"}
                        </Badge>
                        <h6 className="mb-0 fw-semibold">{vehiculo.modelo}</h6>
                      </div>
                    </td>

                    {/* Marca */}
                    <td className="p-3">
                      <Badge pill bg="primary" className="fw-normal">
                        {vehiculo.marca}
                      </Badge>
                    </td>

                    {/* Color */}
                    <td className="p-3">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: vehiculo.rojo,
                            border: "1px solid #dee2e6",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <span className="text-capitalize">
                          {vehiculo.color}
                        </span>
                      </div>
                    </td>

                    {/* Matrícula */}
                    <td className="p-3">
                      <Badge bg="dark" className="font-monospace">
                        {vehiculo.matricula}
                      </Badge>
                    </td>

                    {/* Kilometraje */}
                    <td className="p-3">
                      <div className="bg-light p-2 rounded text-center">
                        {new Intl.NumberFormat().format(vehiculo.kilometraje)}
                        km
                      </div>
                    </td>

                    {/* N° Serie */}
                    <td className="p-3">
                      <div className="bg-light p-2 rounded font-monospace small">
                        {vehiculo.numero_de_serie}
                      </div>
                    </td>

                    {/* N° Motor */}
                    <td className="p-3">
                      <div className="bg-light p-2 rounded font-monospace small">
                        {vehiculo.numero_de_motor}
                      </div>
                    </td>

                    {/* Fecha de compra */}
                    <td className="p-3">
                      <div className="bg-light p-2 rounded">
                        {vehiculo.fecha_de_compra === "1900-01-01"
                          ? "No especificada"
                          : new Date(
                              vehiculo.fecha_de_compra
                            ).toLocaleDateString()}
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
                            setSelectedVehiculo(vehiculo);
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
                            setSelectedVehiculo(vehiculo);
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
      <ModalCrearVehiculo
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />
      <ModalEliminarVehiculo
        showModal={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
        vehiculoData={selectedVehiculo}
      />
      <ModalActualizarVehiculo
        showModal={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        handleUpdate={handleUpdate}
        vehiculoData={selectedVehiculo}
      />
    </div>
  );
};
