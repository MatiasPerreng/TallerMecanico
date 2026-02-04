import { useEffect, useState } from "react";
import {
  Button,
  Badge,
  Table,
  Stack,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { ModalActualizarTarea } from "./ModalActualizarTarea";
import { ModalActualizarTrenDelantero } from "./ModalActualizarTrenDelantero";
import { ModalActualizarTrenTrasero } from "./ModalActualizarTrenTrasero";
import { ModalActualizarFrenos } from "./ModalActualizarFrenos";
import { ModalActualizarNeumaticos } from "./ModalActualizarNeumaticos";
import { ModalActualizarProductos } from "./ModalActualizarProductos";
import { ModalCrearProducto } from "./ModalCrearProducto";
import { ModalEliminarProducto } from "./ModalEliminarProducto";
import { Layout } from "./common/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useTareaAsignadaStore } from "../hooks/useTareaAsignadaStore";
import { SpinnerComponent } from "../../../components/SpinnerComponent";
import { useTrenDelanteroStore } from "../hooks/useTrenDelanteroStore";
import { useTrenTraseroStore } from "../hooks/useTrenTraseroStore";
import { useFrenoStore } from "../hooks/useFrenoStore";
import { useNeumaticoStore } from "../hooks/useNeumaticoStore";
import { useProductoUsadoStore } from "../hooks/useProductoUsadoStore";

export const DetalleTareas = () => {
  const [activeTab, setActiveTab] = useState("delantero");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showTrenDelanteroModal, setShowTrenDelanteroModal] = useState(false);
  const [showTrenTraseroModal, setShowTrenTraseroModal] = useState(false);
  const [showFrenosModal, setShowFrenosModal] = useState(false);
  const [showNeumaticosModal, setShowNeumaticosModal] = useState(false);
  const [showProductosModal, setShowProductosModal] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    tareasAsignadas,
    startLoadingTareasAsignadas,
    isLoadingTareasAsignadas,
  } = useTareaAsignadaStore();

  const { trenDelantero, startLoadingTrenDelantero, isLoadingTrenDelantero } =
    useTrenDelanteroStore();

  const { trenTrasero, startLoadingTrenTrasero, isLoadingTrenTrasero } =
    useTrenTraseroStore();

  const { frenos, startLoadingFrenos, isLoadingFrenos } = useFrenoStore();

  const { neumaticos, startLoadingNeumaticos, isLoadingNeumaticos } =
    useNeumaticoStore();

  const { productos, startLoadingProducto, isLoadingProducto } =
    useProductoUsadoStore();

  const navigate = useNavigate();
  const { state } = useLocation();
  const tarea = state?.tarea;

  const handleUpdate = (updatedData) => {
    console.log("Datos actualizados:", updatedData);
    // Lógica para actualizar la API
  };

  const handleDelete = () => {
    console.log("Cliente eliminado");
    setShowDeleteModal(false);
    // Lógica para eliminar en la API
  };

  const onBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    startLoadingTareasAsignadas();
  }, []);

  useEffect(() => {
    startLoadingTrenDelantero(tarea.id);
  }, []);

  useEffect(() => {
    startLoadingTrenTrasero(tarea.id);
  }, []);

  useEffect(() => {
    startLoadingFrenos(tarea.id);
  }, []);

  useEffect(() => {
    startLoadingNeumaticos(tarea.id);
  }, []);

  useEffect(() => {
    startLoadingProducto(tarea.id);
  }, []);

  const renderStatusIcon = (status) => (
    <span className={`fs-5 ${status ? "text-success" : "text-danger"}`}>
      {status ? (
        <i className="bi bi-check-circle-fill" />
      ) : (
        <i className="bi bi-x-circle-fill" />
      )}
    </span>
  );

  const TabButton = ({ id, title, icon }) => (
    <Button
      variant={activeTab === id ? "primary" : "outline-primary"}
      onClick={() => setActiveTab(id)}
      className="d-flex align-items-center gap-2"
    >
      <i className={`bi bi-${icon}`}></i>
      {title}
    </Button>
  );

  return (
    <>
      <Layout>
        {isLoadingTareasAsignadas ? (
          <div
            className="d-flex justify-content-center align-items-center vh-100 vw-100"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 1050,
            }}
          >
            <div className="text-center">
              <Spinner
                animation="border"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              />
              <p className="mt-3 text-muted">Cargando, por favor espere...</p>
            </div>
          </div>
        ) : (
          <div className="container-fluid px-4 py-3 animate__animated animate__fadeIn">
            <Button
              variant="outline-primary"
              size="sm"
              className="mb-4 d-flex align-items-center gap-2"
              onClick={onBack}
            >
              <i className="bi bi-arrow-left"></i>
              <span className="d-none d-md-inline">Regresar</span>
            </Button>
            <div>
              <div className="container-fluid px-4 py-3">
                {/* Encabezado principal actualizado */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                  {/* Título principal */}
                  <div>
                    <h1 className="h2 fw-bold text-primary mb-1">
                      <i className="bi bi-clipboard-check me-2"></i>
                      Detalles de la Tarea #{tarea?.id}
                    </h1>
                    <p className="text-muted mb-0">
                      Estado:{" "}
                      <Badge
                        bg={
                          tarea?.estado_de_trabajo === "pendiente"
                            ? "warning"
                            : "success"
                        }
                      >
                        {tarea?.estado_de_trabajo}
                      </Badge>
                    </p>
                  </div>
                  {/* Información del cliente */}
                  <div className="bg-light p-3 rounded shadow-sm">
                    <h6 className="fw-bold mb-2">
                      <i className="bi bi-person me-2"></i>
                      Cliente
                    </h6>
                    <p className="mb-1">
                      <strong>Nombre:</strong> {tarea?.orden.cliente.nombre}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${tarea?.orden.cliente.email}`}>
                        {tarea?.orden.cliente.email}
                      </a>
                    </p>
                    <p className="mb-1">
                      <strong>Teléfono:</strong> {tarea?.orden.cliente.telefono}
                    </p>
                    <p className="mb-0">
                      <strong>Domicilio:</strong>{" "}
                      {tarea?.orden.cliente.domicilio}
                    </p>
                  </div>

                  {/* Información del vehículo */}
                  <div className="bg-light p-3 rounded shadow-sm">
                    <h6 className="fw-bold mb-2">
                      <i className="bi bi-car-front me-2"></i>
                      Vehículo
                    </h6>
                    <p className="mb-1">
                      <strong>Marca/Modelo:</strong>{" "}
                      {tarea?.orden.vehiculo.marca}{" "}
                      {tarea?.orden.vehiculo.modelo}
                    </p>
                    <p className="mb-1">
                      <strong>Matrícula:</strong>{" "}
                      {tarea?.orden.vehiculo.matricula}
                    </p>
                    <p className="mb-1">
                      <strong>Kilometraje:</strong>{" "}
                      {tarea?.orden.vehiculo.kilometraje} km
                    </p>
                    <p className="mb-1">
                      <strong>Color:</strong> {tarea?.orden.vehiculo.color}
                    </p>
                    <p className="mb-1">
                      <strong>Nro Serie:</strong>{" "}
                      {tarea?.orden.vehiculo.numero_de_serie}
                    </p>
                    <p className="mb-0">
                      <strong>Nro Motor:</strong>{" "}
                      {tarea?.orden.vehiculo.numero_de_motor}
                    </p>
                  </div>
                </div>

                {/* Sección de información principal actualizada */}
                <div className="card shadow-sm mb-4">
                  <div className="card-body" key={tarea?.id}>
                    <Row>
                      <Col md={6}>
                        <p className="mb-2">
                          <strong>Detalles de trabajos a realizar: </strong>
                          {tarea?.orden.detalle_de_trabajos_a_realizar}
                        </p>
                        <p className="mb-2">
                          <strong>Detalles de entrada del vehículo: </strong>
                          {tarea?.orden.detalles_de_entrada_del_vehiculo}
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="mb-2">
                          <strong>Recepción:</strong> {tarea?.orden.recepcion}
                        </p>
                        <p className="mb-2">
                          <strong>Fecha prometida: </strong>
                          {tarea?.orden.prometido || "Sin fecha definida"}
                        </p>
                        <p className="mb-2">
                          <strong>Cambio de aceite: </strong>
                          {tarea?.orden.cambio_de_aceite ? "Sí" : "No"}
                        </p>
                        <p className="mb-2">
                          <strong>Cambio de filtro: </strong>
                          {tarea?.orden.cambio_de_filtro ? "Sí" : "No"}
                        </p>
                      </Col>
                    </Row>

                    {/* Notificación al cliente */}
                    {tarea?.notificacion_al_cliente && (
                      <div className="mt-3 p-3 bg-light rounded">
                        <h6 className="text-primary mb-2">
                          <i className="bi bi-chat-left-text me-2"></i>
                          Detalle de tarea
                        </h6>
                        <p className="mb-0">{tarea?.notificacion_al_cliente}</p>
                      </div>
                    )}

                    {/* Botón Editar */}
                    <div className="text-end mt-3">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setSelectedTarea(tarea);
                          setShowUpdateModal(true);
                        }}
                      >
                        <i className="bi bi-pencil-square me-2"></i>
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sección de estado general */}
                <div className="mt-4 p-4 bg-light rounded-3 shadow-sm">
                  <Row className="align-items-center">
                    <Col md={8}>
                      <h5 className="mb-3 d-flex align-items-center gap-2">
                        <i className="bi bi-info-circle text-primary"></i>
                        Estado General de la Tarea
                      </h5>
                      <p className="mb-2">
                        <strong>Última actualización: </strong>
                        {new Date(tarea?.updated_at).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                      <p className="mb-0">
                        <strong>Responsable: </strong> ID #{tarea?.mecanico_id}{" "}
                        - {tarea?.mecanico.name}
                      </p>
                    </Col>
                  </Row>
                </div>

                {/* Botones de navegación */}
                <div className="mb-4 mt-5">
                  <Stack direction="horizontal" gap={3} className="flex-wrap">
                    <TabButton
                      id="delantero"
                      title="Tren Delantero"
                      icon="gear-wide-connected"
                    />
                    <TabButton id="trasero" title="Tren Trasero" icon="gear" />
                    <TabButton id="frenos" title="Frenos" icon="brake-front" />
                    <TabButton id="neumaticos" title="Neumáticos" icon="tire" />
                    <TabButton
                      id="productos"
                      title="Productos"
                      icon="box-seam"
                    />
                  </Stack>
                </div>
              </div>
            </div>
            {/* Contenido de las pestañas */}
            {activeTab === "delantero" && (
              <>
                {isLoadingTrenDelantero ? (
                  <SpinnerComponent />
                ) : (
                  trenDelantero.map((tren) => (
                    <div key={tren?.id}>
                      <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="shadow-sm"
                      >
                        <thead className="bg-primary text-white">
                          <tr>
                            <th>Componente</th>
                            <th>Conv</th>
                            <th>Comba</th>
                            <th>Avance</th>
                            <th>Rótulas</th>
                            <th>Punteros</th>
                            <th>Bujes</th>
                            <th>Caja Dirección</th>
                            <th>Conv2</th>
                            <th>Comba2</th>
                            <th>Avance2</th>
                            <th>Amort</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Estado</td>
                            <td className="text-center">
                              {tren?.conv || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.comba || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.avance || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.rotulas || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.punteros || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.bujes || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.caja_direccion || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.conv2 || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.comba2 || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.avance2 || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.amort || "N/A"}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="justify-content-end"
                      >
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="d-flex align-items-center gap-2"
                          onClick={() => {
                            setSelectedData(tren);
                            setShowTrenDelanteroModal(true);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                          <span className="d-none d-md-inline">Editar</span>
                        </Button>
                      </Stack>
                    </div>
                  ))
                )}
              </>
            )}
            {activeTab === "trasero" && (
              <>
                {isLoadingTrenTrasero ? (
                  <SpinnerComponent />
                ) : (
                  trenTrasero.map((tren) => (
                    <>
                      <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="shadow-sm"
                      >
                        <thead className="bg-primary text-white">
                          <tr>
                            <th>Componente</th>
                            <th>Conv</th>
                            <th>Comba</th>
                            <th>Brazos Susp</th>
                            <th>Articulaciones</th>
                            <th>Conv2</th>
                            <th>Comba2</th>
                            <th>Amort</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={tren?.id}>
                            <td>Estado</td>
                            <td className="text-center">
                              {tren?.conv || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.comba || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.brazos_susp || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.articulaciones || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.conv2 || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.comba2 || "N/A"}
                            </td>
                            <td className="text-center">
                              {tren?.amort || "N/A"}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="justify-content-end"
                      >
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="d-flex align-items-center gap-2"
                          onClick={() => {
                            setSelectedData(tren);
                            setShowTrenTraseroModal(true);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                          <span className="d-none d-md-inline">Editar</span>
                        </Button>
                      </Stack>
                    </>
                  ))
                )}
              </>
            )}
            {activeTab === "frenos" && (
              <>
                {isLoadingFrenos ? (
                  <SpinnerComponent />
                ) : (
                  frenos.map((freno) => (
                    <>
                      <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="shadow-sm"
                      >
                        <thead className="bg-primary text-white">
                          <tr>
                            <th>Componente</th>
                            <th>Delanteros</th>
                            <th>Traseros</th>
                            <th>Estacionamiento</th>
                            <th>Numero Cricket</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={freno?.id}>
                            <td>Estado</td>
                            <td className="text-center">
                              {freno?.delanteros || "N/A"}
                            </td>
                            <td className="text-center">
                              {freno?.traseros || "N/A"}
                            </td>
                            <td className="text-center">
                              {freno?.estacionamiento || "N/A"}
                            </td>
                            <td className="text-center">
                              {freno?.numero_cricket || "N/A"}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="justify-content-end"
                      >
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="d-flex align-items-center gap-2"
                          onClick={() => {
                            setSelectedData(freno);
                            setShowFrenosModal(true);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                          <span className="d-none d-md-inline">Editar</span>
                        </Button>
                      </Stack>
                    </>
                  ))
                )}
              </>
            )}
            {activeTab === "neumaticos" && (
              <>
                {isLoadingNeumaticos ? (
                  <SpinnerComponent />
                ) : (
                  neumaticos.map((neumatico) => (
                    <>
                      <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="shadow-sm"
                      >
                        <thead className="bg-primary text-white">
                          <tr>
                            <th>Componente</th>
                            <th>Delanteros derechos</th>
                            <th>Delanteros izquierdos</th>
                            <th>Traseros derechos</th>
                            <th>Traseros izquierdos</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={neumatico?.id}>
                            <td>Estado</td>
                            <td className="text-center">
                              {neumatico?.delanteros_derechos || "N/A"}
                            </td>
                            <td className="text-center">
                              {
                                neumatico?.delanteros_izquierdos
                               || "N/A"}
                            </td>
                            <td className="text-center">
                              {neumatico?.traseros_derechos || "N/A"}
                            </td>
                            <td className="text-center">
                              {neumatico?.traseros_izquierdos || "N/A"}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="justify-content-end"
                      >
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="d-flex align-items-center gap-2"
                          onClick={() => {
                            setSelectedData(neumatico);
                            setShowNeumaticosModal(true);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                          <span className="d-none d-md-inline">Editar</span>
                        </Button>
                      </Stack>
                    </>
                  ))
                )}
              </>
            )}
            {activeTab === "productos" && (
              <>
                {isLoadingProducto ? (
                  <SpinnerComponent />
                ) : productos.length === 0 ? (
                  <div className="alert alert-info mb-0">
                    No se registraron productos utilizados
                  </div>
                ) : (
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title mb-4">
                        <i className="bi bi-box-seam me-2"></i>
                        Productos Utilizados
                      </h5>
                      <Table hover className="mb-0">
                        <thead>
                          <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productos.map((producto) => (
                            <tr key={producto?.id}>
                              <td>{producto?.producto?.nombre}</td>
                              <td>{producto?.cantidad}</td>
                              <td className="pe-4">
                                <Stack direction="horizontal" gap={2}>
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="d-flex align-items-center gap-2"
                                    onClick={() => {
                                      setSelectedData(producto);
                                      setShowProductosModal(true);
                                    }}
                                  >
                                    <i className="bi bi-pencil"></i>
                                    <span className="d-none d-md-inline">
                                      Editar
                                    </span>
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="d-flex align-items-center gap-2"
                                    onClick={() => {
                                      setShowDeleteModal(true);
                                      setSelectedData(producto);
                                    }}
                                  >
                                    <i className="bi bi-trash"></i>
                                    <span className="d-none d-md-inline">
                                      Eliminar
                                    </span>
                                  </Button>
                                </Stack>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                )}
                <Button
                  variant="outline-success"
                  size="sm"
                  className="d-flex align-items-center gap-2 mt-2"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <i className="bi bi-pencil"></i>
                  <span className="d-none d-md-inline">Agregar producto</span>
                </Button>
              </>
            )}
            {/* Resto de las pestañas se mantienen igual... */}

            {/* Modal Actualizar Tarea */}
            <ModalActualizarTarea
              showModal={showUpdateModal}
              handleClose={() => setShowUpdateModal(false)}
              handleUpdate={handleUpdate}
              tareaData={selectedTarea}
            />

            <ModalActualizarTrenDelantero
              showModal={showTrenDelanteroModal}
              handleClose={() => setShowTrenDelanteroModal(false)}
              handleUpdate={handleUpdate}
              trenDelanteroData={selectedData}
            />
            <ModalActualizarTrenTrasero
              showModal={showTrenTraseroModal}
              handleClose={() => setShowTrenTraseroModal(false)}
              handleUpdate={handleUpdate}
              trenTraseroData={selectedData}
            />
            <ModalActualizarFrenos
              showModal={showFrenosModal}
              handleClose={() => setShowFrenosModal(false)}
              handleUpdate={handleUpdate}
              frenosData={selectedData}
            />
            <ModalActualizarNeumaticos
              showModal={showNeumaticosModal}
              handleClose={() => setShowNeumaticosModal(false)}
              handleUpdate={handleUpdate}
              neumaticosData={selectedData}
            />
            <ModalActualizarProductos
              showModal={showProductosModal}
              handleClose={() => setShowProductosModal(false)}
              handleUpdate={handleUpdate}
              productosData={selectedData}
            />
            <ModalCrearProducto
              showModal={showModal}
              handleClose={() => setShowModal(false)}
              tareaId={tarea.id}
            />
            <ModalEliminarProducto
              showModal={showDeleteModal}
              handleClose={() => setShowDeleteModal(false)}
              handleDelete={handleDelete}
              productosData={selectedData}
            />
          </div>
        )}
      </Layout>
    </>
  );
};
