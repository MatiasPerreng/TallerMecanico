import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "./common/Layout";
import { Button, Badge, Stack, Table } from "react-bootstrap";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { useTrenDelanteroStore } from "../../mecanico/hooks/useTrenDelanteroStore";
import { useProductoUsadoStore } from "../../mecanico/hooks/useProductoUsadoStore";
import { useNeumaticoStore } from "../../mecanico/hooks/useNeumaticoStore";
import { useFrenoStore } from "../../mecanico/hooks/useFrenoStore";
import { useTrenTraseroStore } from "../../mecanico/hooks/useTrenTraseroStore";
import { useTareaAsignadaStore } from "../../mecanico/hooks/useTareaAsignadaStore";
import { SpinnerComponent } from "../../../components/SpinnerComponent";
import { ModalActualizarTrenDelantero } from "../../mecanico/components/ModalActualizarTrenDelantero";
import { ModalActualizarTrenTrasero } from "../../mecanico/components/ModalActualizarTrenTrasero";
import { ModalActualizarFrenos } from "../../mecanico/components/ModalActualizarFrenos";
import { ModalActualizarNeumaticos } from "../../mecanico/components/ModalActualizarNeumaticos";
import { ModalActualizarProductos } from "../../mecanico/components/ModalActualizarProductos";
import { ModalEliminarProducto } from "../../mecanico/components/ModalEliminarProducto";
import { ModalCrearProducto } from "../../mecanico/components/ModalCrearProducto";

export const DetallesTarea = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const tarea = state?.tarea;

  const [activeSection, setActiveSection] = useState("delantero");

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

  const handleUpdate = (updatedData) => {
    console.log("Datos actualizados:", updatedData);
    // Lógica para actualizar la API
  };

  const handleDelete = () => {
    console.log("Cliente eliminado");
    setShowDeleteModal(false);
    // Lógica para eliminar en la API
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

  useEffect(() => {
    startLoadingTrenDelantero(tarea.id);
  }, []);

  if (!tarea) {
    return (
      <Layout>
        <div className="container-fluid px-4 py-3">
          <div className="alert alert-primary">
            No se encontró la tarea solicitada
          </div>
          <Button variant="primary">Volver al listado</Button>
        </div>
      </Layout>
    );
  }

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (
      dateString === "1899-12-31" ||
      dateString === "1900-01-01" ||
      isNaN(date.getTime())
    ) {
      return "No especificado";
    }

    // Ajustar la fecha para evitar problemas de zona horaria
    const adjustedDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );
    return format(adjustedDate, "dd MMMM yyyy", { locale: enUS });
  };

  const SectionButton = ({ sectionKey, title, icon }) => (
    <Button
      variant={activeSection === sectionKey ? "primary" : "outline-primary"}
      onClick={() => setActiveSection(sectionKey)}
      className="d-flex align-items-center gap-2"
    >
      <i className={`bi bi-${icon}`}></i>
      {
        <>
          title
          <Stack direction="horizontal" gap={2} className="justify-content-end">
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
        </>
      }
    </Button>
  );

  const renderTechnicalSection = (section, title, sectionKey) => {
    if (!section || activeSection !== sectionKey) return null;

    return (
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="h5 mb-0">
            <i className="bi bi-gear me-2"></i>
            {title}
          </h3>
        </div>
        <div className="card-body">
          <dl className="row mb-0">
            {Object.entries(section).map(([key, value]) => {
              if (key === "id" || key.includes("_at")) return null;
              return (
                <div className="row mb-2" key={key}>
                  <dt className="col-sm-6 text-capitalize">
                    {key.replace(/_/g, " ")}
                  </dt>
                  <dd className="col-sm-6">
                    {typeof value === "boolean" ||
                    value === 1 ||
                    value === 0 ? (
                      value ? (
                        <i className="bi bi-check-circle-fill text-success"></i>
                      ) : (
                        <i className="bi bi-x-circle-fill text-danger"></i>
                      )
                    ) : (
                      value || "N/A"
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container-fluid px-4 py-3 animate__animated animate__fadeIn">
        <Button
          variant="outline-primary"
          size="sm"
          className="mb-4 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left"></i>
          <span className="d-none d-md-inline">Regresar</span>
        </Button>

        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 mb-0">Tarea #{tarea?.id}</h1>
          <Badge
            bg={
              tarea?.estado_de_trabajo === "pendiente" ? "warning" : "success"
            }
            className="fs-6"
          >
            {tarea?.estado_de_trabajo}
          </Badge>
        </div>

        {/* Sección principal */}
        <>
          <div className="row g-4">
            {/* Columna Izquierda - Detalles Tarea */}
            <div className="col-lg-6">
              {/* Tarjeta Detalles Tarea */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                  <h3 className="h5 mb-0">
                    <i className="bi bi-clipboard-check me-2"></i>
                    Detalles de la Tarea
                  </h3>
                </div>
                <div className="card-body">
                  <dl className="row mb-4">
                    <dt className="col-sm-4">Mecánico</dt>
                    <dd className="col-sm-8">
                      ID: <code>{tarea?.mecanico.id}</code> -{" "}
                      {tarea?.mecanico.name}
                    </dd>

                    <dt className="col-sm-4">Email</dt>
                    <dd className="col-sm-8">
                      <a href={`mailto:${tarea?.mecanico.email}`}>
                        {tarea?.mecanico.email}
                      </a>
                    </dd>

                    <dt className="col-sm-4">Creación de tarea</dt>
                    <dd className="col-sm-8">
                      {formatDate(tarea?.created_at)}
                    </dd>

                    <dt className="col-sm-4">Actualización de tarea</dt>
                    <dd className="col-sm-8">
                      {formatDate(tarea?.updated_at)}
                    </dd>
                  </dl>

                  <div>
                    <h4 className="h6 text-muted mb-3">
                      Detalle de tarea
                    </h4>
                    <div className="bg-light p-3 rounded">
                      {tarea?.notificacion_al_cliente || "Sin notificación"}
                    </div>
                  </div>
                </div>
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
                  <TabButton id="productos" title="Productos" icon="box-seam" />
                </Stack>
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
                                {
                                  neumatico?.delanteros_derechos
                                 || "N/A"}
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
                                {
                                  neumatico?.traseros_izquierdos
                                 || "N/A"}
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
                              <th>Precio total</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productos.map((producto) => (
                              <tr key={producto?.id}>
                                <td>{producto?.producto?.nombre}</td>
                                <td>{producto?.cantidad}</td>
                                <td>${producto?.total?.toFixed(2)}</td>
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
                        <ul className="list-group mb-3">
                          {tarea.productos_usados.map((producto) => (
                            <li key={producto.id} className="list-group-item">
                              {producto?.producto.nombre} - Cantidad:{" "}
                              {producto?.cantidad} - Total: ${producto.total}
                            </li>
                          ))}
                        </ul>
                        <div className="alert alert-secondary text-end">
                          <strong>Total acumulado:</strong> $
                          {tarea?.productos_usados
                            .reduce((acc, producto) => acc + producto.total, 0)
                            .toFixed(2)}
                        </div>
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

              {/* Sección de Productos */}
              {activeSection === "productos" && (
                <div className="card shadow-sm mb-4">
                  <div className="card-header bg-primary text-white">
                    <h3 className="h5 mb-0">
                      <i className="bi bi-box-seam me-2"></i>
                      Productos Utilizados222
                    </h3>
                  </div>
                  <div className="card-body">
                    {tarea?.productos_usados?.length > 0 ? (
                      <>
                        <ul className="list-group mb-3">
                          {tarea.productos_usados.map((producto) => (
                            <li key={producto.id} className="list-group-item">
                              {producto?.producto.nombre} - Cantidad:{" "}
                              {producto?.cantidad} - Total: ${producto.total}
                            </li>
                          ))}
                        </ul>
                        <div className="alert alert-secondary text-end">
                          <strong>Total acumulado:</strong> $
                          {tarea?.productos_usados
                            .reduce((acc, producto) => acc + producto.total, 0)
                            .toFixed(2)}
                        </div>
                      </>
                    ) : (
                      <div className="alert alert-info mb-0">
                        No se registraron productos utilizados
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Columna Derecha - Información Técnica */}
            <div className="col-lg-6">
              {/* Orden Relacionada */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                  <h3 className="h5 mb-0">
                    <i className="bi bi-file-text me-2"></i># {tarea?.orden.id}{" "}
                    - Orden Asociada
                  </h3>
                </div>
                <div className="card-body">
                  <dl className="row mb-0">
                    <dt className="col-sm-4">Nombre del cliente</dt>
                    <dd className="col-sm-8">{tarea?.orden.cliente.nombre}</dd>

                    <dt className="col-sm-4">Email del cliente</dt>
                    <dd className="col-sm-8">{tarea?.orden.cliente.email}</dd>

                    <dt className="col-sm-4">RUT del cliente</dt>
                    <dd className="col-sm-8">{tarea?.orden.cliente.rut}</dd>

                    <dt className="col-sm-4">Telefono del cliente</dt>
                    <dd className="col-sm-8">
                      {tarea?.orden.cliente.telefono}
                    </dd>

                    <dt className="col-sm-4">Domicilio del cliente</dt>
                    <dd className="col-sm-8">
                      {tarea?.orden.cliente.domicilio}
                    </dd>

                    <hr />

                    <dt className="col-sm-4">Vehículo</dt>
                    <dd className="col-sm-8">
                      {tarea?.orden.vehiculo.marca}{" "}
                      {tarea?.orden.vehiculo.modelo}
                    </dd>

                    <dt className="col-sm-4">Matrícula del vehiculo</dt>
                    <dd className="col-sm-8">
                      {tarea?.orden.vehiculo.matricula || "N/A"}
                    </dd>

                    <dt className="col-sm-4">Color del vehiculo</dt>
                    <dd className="col-sm-8">
                      {tarea?.orden.vehiculo.color || "N/A"}
                    </dd>

                    <dt className="col-sm-4">Kilometraje del vehiculo</dt>
                    <dd className="col-sm-8">
                      {tarea?.orden.vehiculo.kilometraje || "N/A"}
                    </dd>

                    <dt className="col-sm-4">N° Serie del vehiculo</dt>
                    <dd className="col-sm-8">
                      {tarea?.orden.vehiculo.numero_de_serie || "N/A"}
                    </dd>

                    <dt className="col-sm-4">N° Motor del vehiculo</dt>
                    <dd className="col-sm-8">
                      {tarea?.orden.vehiculo.numero_de_motor || "N/A"}
                    </dd>

                    <dt className="col-sm-4">Fecha de compra del vehiculo</dt>
                    <dd className="col-sm-8">
                      {tarea?.orden.vehiculo.fecha_de_compra
                        ? formatDate(tarea?.orden.vehiculo.fecha_de_compra)
                        : "N/A"}
                    </dd>

                    <dt className="col-sm-4 mt-2 mb-2">Prometido</dt>
                    <dd className="col-sm-8">
                      {formatDate(tarea?.orden.prometido)}
                    </dd>
                    <dt className="col-sm-4 mt-2 mb-2">Recepción</dt>
                    <dd className="col-sm-8">
                      {formatDate(tarea?.orden.recepcion)}
                    </dd>
                    <hr />
                    <dt className="col-sm-4 mt-2">
                      Detalles de entrada del vehiculo
                    </dt>
                    <dd className="col-sm-8">
                      {tarea?.orden.detalles_de_entrada_del_vehiculo || "N/A"}
                    </dd>

                    <dt className="col-sm-4 mt-2">
                      Detalles de trabajos a realizar
                    </dt>
                    <dd className="col-sm-8">
                      {tarea?.orden.detalle_de_trabajos_a_realizar || "N/A"}
                    </dd>
                    <div className="d-flex flex-column gap-2 mt-3">
                      <small
                        className={
                          tarea?.orden.cambio_de_aceite
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {tarea?.orden.cambio_de_aceite ? (
                          <i className="bi bi-check-circle-fill">
                            Cambio de Aceite
                          </i>
                        ) : (
                          <i className="bi bi-x-circle-fill">
                            {" "}
                            Cambio de Aceite
                          </i>
                        )}
                      </small>
                      <small
                        className={
                          tarea?.orden.cambio_de_filtro
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {tarea?.orden.cambio_de_filtro ? (
                          <i className="bi bi-check-circle-fill">
                            Cambio de Filtro
                          </i>
                        ) : (
                          <i className="bi bi-x-circle-fill">
                            {" "}
                            Cambio de Filtro
                          </i>
                        )}
                      </small>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
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
    </Layout>
  );
};
