import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "./common/Layout";
import { Button, Badge, Stack } from "react-bootstrap";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const DetallesOrden = () => {
  const navigate = useNavigate();
  // const { id } = useParams();
  const location = useLocation();
  const { orden } = location.state || {};

  const onBack = () => {
    navigate(-1);
  };

  if (!orden) {
    return (
      <Layout>
        <div className="container-fluid px-4 py-3">
          <div className="alert alert-primary">
            No se encontró la orden solicitada
          </div>
          <Button onClick={onBack} variant="primary">
            Volver al listado
          </Button>
        </div>
      </Layout>
    );
  }

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

  return (
    <Layout>
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

        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 mb-0">Orden # {orden.id}</h1>
        </div>

        {/* Cartel de disponibilidad */}
        {!orden.disponible && (
          <div className="alert alert-primary text-center fw-bold fs-5">
            Esta orden ya no está disponible
          </div>
        )}

        {/* Sección principal */}
        <div className="row g-4">
          {/* Columna Izquierda - Cliente y Vehículo */}
          <div className="col-lg-6">
            {/* Tarjeta Cliente */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h3 className="h5 mb-0">
                  <i className="bi bi-person-circle me-2"></i> Información del
                  Cliente - ID # {orden.cliente.id}
                </h3>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4">Nombre</dt>
                  <dd className="col-sm-8">{orden.cliente.nombre}</dd>

                  <dt className="col-sm-4">Email</dt>
                  <dd className="col-sm-8">
                    <a href={`mailto:${orden.cliente.email}`}>
                      {orden.cliente.email}
                    </a>
                  </dd>
                  <dt className="col-sm-4">RUT</dt>
                  <dd className="col-sm-8">{orden.cliente.rut}</dd>

                  <dt className="col-sm-4">Teléfono</dt>
                  <dd className="col-sm-8">{orden.cliente.telefono}</dd>

                  <dt className="col-sm-4">Domicilio</dt>
                  <dd className="col-sm-8">{orden.cliente.domicilio}</dd>
                </dl>
              </div>
            </div>

            {/* Tarjeta Vehículo */}
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="h5 mb-0">
                  <i className="bi bi-car-front me-2"></i>
                  Información del Vehículo Cliente - ID # {orden.vehiculo.id}
                </h3>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4">Marca/Modelo</dt>
                  <dd className="col-sm-8">
                    {orden.vehiculo.marca} {orden.vehiculo.modelo}
                  </dd>

                  <dt className="col-sm-4">Matrícula</dt>
                  <dd className="col-sm-8">{orden.vehiculo.matricula}</dd>

                  <dt className="col-sm-4">Color</dt>
                  <dd className="col-sm-8">{orden.vehiculo.color}</dd>

                  <dt className="col-sm-4">Kilometraje</dt>
                  <dd className="col-sm-8">
                    {orden.vehiculo.kilometraje || "N/A"}
                  </dd>

                  <dt className="col-sm-4">N° Serie</dt>
                  <dd className="col-sm-8">
                    {orden.vehiculo.numero_de_serie || "N/A"}
                  </dd>

                  <dt className="col-sm-4">N° Motor</dt>
                  <dd className="col-sm-8">
                    {orden.vehiculo.numero_de_motor || "N/A"}
                  </dd>

                  <dt className="col-sm-4">Fecha compra</dt>
                  <dd className="col-sm-8">
                    {orden.vehiculo.fecha_de_compra
                      ? formatDate(orden.vehiculo.fecha_de_compra)
                      : "N/A"}
                  </dd>
                </dl>
              </div>
            </div>

            <Button
              className="mt-3"
              variant="outline-primary"
              onClick={() =>
                navigate("/jefe/imprimir-orden", { state: { orden } })
              }
            >
              <i class="bi bi-printer"> Vista de impresion</i>
            </Button>
          </div>

          {/* Columna Derecha - Detalles Orden */}
          <div className="col-lg-6">
            {/* Tarjeta Detalles Orden */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h3 className="h5 mb-0">
                  <i className="bi bi-clipboard-data me-2"></i>
                  Detalles de la Orden
                </h3>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <h4 className="h6 text-muted mb-3">Fechas importantes</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Recepción</label>
                        <div className="fw-semibold">
                          {formatDate(orden.recepcion)}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Prometida</label>
                        <div className="fw-semibold">
                          {formatDate(orden.prometido) || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="h6 text-muted mb-3">
                    Detalles de trabajos a realizar
                  </h4>
                  <div className="bg-light p-3 rounded">
                    {orden.detalle_de_trabajos_a_realizar}{" "}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="h6 text-muted mb-3">
                    Detalles de entrada de vehiculo
                  </h4>
                  <div className="bg-light p-3 rounded">
                    {orden.detalles_de_entrada_del_vehiculo}
                  </div>
                </div>
                <div>
                  <div className="d-flex flex-column gap-2">
                    <small
                      className={
                        orden.cambio_de_aceite ? "text-success" : "text-danger"
                      }
                    >
                      {orden.cambio_de_aceite ? (
                        <i className="bi bi-check-circle-fill">
                          Cambio de Aceite
                        </i>
                      ) : (
                        <i className="bi bi-x-circle-fill"> Cambio de Aceite</i>
                      )}
                    </small>
                    <small
                      className={
                        orden.cambio_de_filtro ? "text-success" : "text-danger"
                      }
                    >
                      {orden.cambio_de_filtro ? (
                        <i className="bi bi-check-circle-fill">
                          Cambio de Filtro
                        </i>
                      ) : (
                        <i className="bi bi-x-circle-fill"> Cambio de Filtro</i>
                      )}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección Tareas */}
            {/* <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="h5 mb-0">
                  <i className="bi bi-exclamation"></i>
                  Información Importante
                </h3>
              </div>
              <div className="card-body">
                <div className="alert alert-info mb-0">
                  <p className="mb-3">
                    Por la presente autorizo a efectuar las reparaciones aquí
                    descriptas utilizando el material necesario. Como así
                    también transitar con este vehículo por las calles,
                    carreteras, etc., a efectos de realizar las pruebas o
                    inspecciones pertinentes.
                  </p>
                  <p className="mb-3">
                    Es condición el pago contra entrega del vehículo. Esta
                    empresa no se responsabiliza por pérdida, daños, incendio,
                    robo, etc., causados a su vehículo y/o artículos dejados en
                    el interior del mismo por cualquier motivo.
                  </p>
                  <div className="d-flex flex-column align-items-start mt-5">
                    <strong className="mb-3">Firma del cliente:</strong>
                    <div
                      className="border-top border-dark w-100"
                      style={{ height: "2rem" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Botones de acción */}
        {/* <Stack direction="horizontal" gap={3} className="mt-4">
          <Button
            variant="outline-primary"
            onClick={() =>
              navigate(`/jefe/orden/editar/${id}`, { state: { orden } })
            }
          >
            <i className="bi bi-pencil me-2"></i>
            Editar Orden
          </Button>
          <Button variant="outline-primary">
            <i className="bi bi-trash me-2"></i>
            Eliminar Orden
          </Button>
        </Stack> */}
      </div>
    </Layout>
  );
};
