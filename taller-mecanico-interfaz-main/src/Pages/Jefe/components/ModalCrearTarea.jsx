import { Modal, Form, Button } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";

import { useSelectorOrdenes } from "../hooks/useSelectorOrdenes";
import { useSelectorMecanicos } from "../hooks/useSelectorMecanicos";
import { useForm } from "../../../hooks/useForm";
import { useTareaStore } from "../hooks/useTareaStore";

const createTareaField = {
  orden_id: "",
  mecanico_id: "",
  estado_de_trabajo: "",
  notificacion_al_cliente: "",
};

export const ModalCrearTarea = ({ showModal, handleClose }) => {
  const { opcionesAgrupadas: opcionesOrdenes } =
    useSelectorOrdenes(showModal);

  const { opcionesAgrupadas: opcionesMecanicos } =
    useSelectorMecanicos(showModal);

  const {
    orden_id,
    mecanico_id,
    estado_de_trabajo,
    notificacion_al_cliente,
    onInputChange,
    setFormState,
  } = useForm(createTareaField);

  const { startSavingTarea } = useTareaStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orden_id || !mecanico_id || !estado_de_trabajo) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe completar todos los campos obligatorios.",
      });
      return;
    }

    await startSavingTarea({
      orden_id,
      mecanico_id,
      estado_de_trabajo,
      notificacion_al_cliente: notificacion_al_cliente || "N/A",
    });

    Swal.fire(
      "Correcto",
      "Tarea creada correctamente. La página se recargará.",
      "success"
    );

    setTimeout(() => location.reload(), 1200);
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Crear Nueva Tarea</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* ORDEN */}
          <Form.Group className="mb-3">
            <Form.Label>Orden</Form.Label>
            <Select
              options={opcionesOrdenes}
              placeholder="Seleccione una orden"
              noOptionsMessage={() => "No se encontraron órdenes"}
              onChange={(option) =>
                setFormState((prev) => ({
                  ...prev,
                  orden_id: option?.value || "",
                }))
              }
            />
          </Form.Group>

          {/* MECÁNICO */}
          <Form.Group className="mb-3">
            <Form.Label>Mecánico</Form.Label>
            <Select
              options={opcionesMecanicos}
              placeholder="Seleccione un mecánico"
              noOptionsMessage={() => "No se encontraron mecánicos"}
              onChange={(option) =>
                setFormState((prev) => ({
                  ...prev,
                  mecanico_id: option?.value || "",
                }))
              }
            />
          </Form.Group>

          {/* ESTADO */}
          <Form.Group className="mb-3">
            <Form.Label>Estado de Trabajo</Form.Label>
            <Form.Select
              name="estado_de_trabajo"
              value={estado_de_trabajo}
              onChange={onInputChange}
              required
            >
              <option value="" disabled>
                Seleccione un estado
              </option>
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Proceso</option>
              <option value="pendiente_de_facturacion">
                Pendiente de Facturación
              </option>
              <option value="completado">Completado</option>
            </Form.Select>
          </Form.Group>

          {/* DETALLE */}
          <Form.Group className="mb-3">
            <Form.Label>Detalle de la tarea</Form.Label>
            <Form.Control
              type="text"
              name="notificacion_al_cliente"
              value={notificacion_al_cliente}
              onChange={onInputChange}
              placeholder="Opcional"
            />
            <Form.Text className="text-muted">
              Si se deja vacío se guardará como <b>N/A</b>.
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" type="submit">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
