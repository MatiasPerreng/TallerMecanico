import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { NavLink, useLocation } from "react-router-dom";

export const DetallesOrdenImpresion = () => {
  // const { id } = useParams();
  const location = useLocation();
  const { orden } = location.state || {};

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

  if (!orden) return null;

  return (
    <div className="container-fluid p-4 print-view">
      <style>
        {`
          @media print {
            body { -webkit-print-color-adjust: exact; }
            .print-view { padding: 0 !important; }
            .section-title { border-bottom: 2px solid #000 !important; }
            .signature-line { border-bottom: 1px solid #000; width: 70%; }
          }
          .company-header { margin-bottom: 2rem; }
          .legal-text { font-size: 0.9rem; line-height: 1.4; }
          .section-title { color: #2c3e50; font-weight: 600; }
        `}
      </style>

      {/* Encabezado de la empresa */}
      <div className="company-header text-center mb-4">
        <div className="d-flex flex-column align-items-center gap-3">
          {/* Imagen del logo */}
          <NavLink to="/jefe/dashboard" className="navbar-brand">
            <img
              src="../../../../public/TecnoLogo.jpg" // Cambia esta ruta si es necesario
              alt="DataSoft Logo"
              className="brand-logo img-fluid"
              style={{ maxWidth: "350px", height: "auto" }}
            />
          </NavLink>

          {/* Encabezado y detalles */}
          <div>
            <p className="mb-0">
              Gral. Flores 2366/68 entre Blandengues y Marcelino Berthelot
            </p>
            <p className="mb-0">
              Horario de atención Lunes a Viernes 8:00 a 12:00 y 14:00 a 19:00
            </p>
            <p className="mb-0">
              Tel: 2208 2468 | Email: info@tecnomotors.com.uy
            </p>
          </div>
        </div>
      </div>

      {/* Encabezado del documento */}
      <div className="d-flex justify-content-between align-items-start mb-1">
        <div>
          <h2 className="mb-0">Orden de Trabajo #{orden.id}</h2>
          <p className="text-muted mb-0">
            Fecha de emisión: {formatDate(new Date())}
          </p>
        </div>
        <div className="text-end">
          <div className="alert alert-light border">
            <strong>Fecha Recepcion:</strong> {formatDate(orden.recepcion)}
            <br />
            <strong>Fecha Prometida:</strong> {formatDate(orden.prometido)}
          </div>
        </div>
      </div>

      {/* Sección Cliente */}
      <div className="mb-4">
        <h3 className="section-title pb-2">Datos del Cliente</h3>
        <div className="row">
          <div className="col-6">
            <p className="mb-1">
              <strong>Nombre:</strong> {orden.cliente.nombre}
            </p>
            <p className="mb-1">
              <strong>RUT:</strong> {orden.cliente.rut}
            </p>
          </div>
          <div className="col-6">
            <p className="mb-1">
              <strong>Teléfono:</strong> {orden.cliente.telefono}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {orden.cliente.email}
            </p>
          </div>
          <div className="col-12">
            <p className="mb-0">
              <strong>Domicilio:</strong> {orden.cliente.domicilio}
            </p>
          </div>
        </div>
      </div>

      {/* Sección Vehículo */}
      <div className="mb-4">
        <h3 className="section-title pb-2">Datos del Vehículo</h3>
        <div className="row">
          <div className="col-4">
            <p className="mb-1">
              <strong>Marca/Modelo:</strong> {orden.vehiculo.marca}{" "}
              {orden.vehiculo.modelo}
            </p>
            <p className="mb-1">
              <strong>Matrícula:</strong> {orden.vehiculo.matricula}
            </p>
          </div>
          <div className="col-4">
            <p className="mb-1">
              <strong>Color:</strong> {orden.vehiculo.color}
            </p>
            <p className="mb-1">
              <strong>Kilometraje:</strong>{" "}
              {orden.vehiculo.kilometraje || "N/A"}
            </p>
          </div>
          <div className="col-4">
            <p className="mb-1">
              <strong>N° Serie:</strong>{" "}
              {orden.vehiculo.numero_de_serie || "N/A"}
            </p>
            <p className="mb-1">
              <strong>N° Motor:</strong>{" "}
              {orden.vehiculo.numero_de_motor || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Detalles del Trabajo */}
      <div className="mb-4">
        <h3 className="section-title pb-2">Descripción del Trabajo</h3>
        <div className="mb-3">
          <h4 className="h6">Estado del vehículo al ingreso:</h4>
          <p className="ps-3">{orden.detalles_de_entrada_del_vehiculo}</p>
        </div>
        <div>
          <h4 className="h6">Trabajos a realizar:</h4>
          <p className="ps-3">{orden.detalle_de_trabajos_a_realizar}</p>
        </div>
      </div>

      {/* Términos y Condiciones */}
      <div className="mt-1">
        <h3 className="section-title pb-2">Términos y Condiciones</h3>
        <div className="legal-text">
          <p>
            Por la presente autorizo las reparaciones aquí descriptas utilizando
            el material necsarios. Como así también a transitar con este
            vehículo por las calles, carreteras, etc. a efectos de realizar las
            priuebas o inspecciones pertinentes.
          </p>

          <p>Es condición el pago contra entrega del vehículo.</p>

          <p>
            Esta empresa no se responsabiliza por pérdida, daños, incencio,
            robo, etc. causados a su vehículo y/o artículos dejados en el
            interior del mismo o cualquier otro motivo.
          </p>

          <div className="mt-4">
            <div className="d-flex justify-content-between">
              <div>
                <p className="mb-1">Firma del Cliente:</p>
                <div
                  className="signature-line"
                  style={{ height: "120px" }}
                ></div>
              </div>
              <div>
                <p className="mb-1">Firma del Responsable:</p>
                <div
                  className="signature-line"
                  style={{ height: "120px" }}
                ></div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span>Nombre: {orden.cliente.nombre}</span>
              <span>Fecha: {formatDate(new Date())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
