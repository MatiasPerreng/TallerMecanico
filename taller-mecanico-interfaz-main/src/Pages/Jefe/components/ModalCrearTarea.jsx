import { Modal, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { useSelectorOrdenes } from "../hooks/useSelectorOrdenes";
import { useSelectorMecanicos } from "../hooks/useSelectorMecanicos";
import { useForm } from "../../../hooks/useForm";
import { useTareaStore } from "../hooks/useTareaStore";
import Swal from "sweetalert2";

const createTareaField = {
  orden_id: "",
  mecanico_id: "",
  estado_de_trabajo: "",
  notificacion_al_cliente: "",
};

export const ModalCrearTarea = ({ showModal, handleClose }) => {
  const { opcionesAgrupadas } = useSelectorOrdenes(showModal);
  const { opcionesAgrupadas: opcionesAgrupadasMecanico } = useSelectorMecanicos(showModal);

  const {
    orden_id,
    mecanico_id,
    estado_de_trabajo,
    notificacion_al_cliente,
    onInputChange,
    onResetForm,
  } = useForm(createTareaField);

  const { startSavingTarea } = useTareaStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de cliente
    if (!orden_id || !mecanico_id || !estado_de_trabajo) {
      return Swal.fire("Error", "Los campos Orden, Mecánico y Estado son obligatorios.", "error");
    }

    // Preparar objeto con TIPOS CORRECTOS
    const tareaData = {
      orden_id: parseInt(orden_id, 10),
      mecanico_id: parseInt(mecanico_id, 10),
      estado_de_trabajo,
      notificacion_al_cliente: notificacion_al_cliente.trim() || "N/A",
    };

    try {
      // Intentar guardar
      await startSavingTarea(tareaData);

      // Si startSavingTarea no lanza error, procedemos
      await Swal.fire("Éxito", "Tarea creada correctamente.", "success");
      
      onResetForm();
      handleClose();

      // Recarga controlada o actualización de estado
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error("Error al guardar:", error);
      Swal.fire("Error", "No se pudo crear la tarea. Revisa la conexión o los datos.", "error");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title><h4>Crear Nueva Tarea</h4></Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Orden</Form.Label>
            <Select
              options={opcionesAgrupadas}
              onChange={(selected) => onInputChange({ target: { name: "orden_id", value: selected.value }})}
              placeholder="Seleccione una orden"
              noOptionsMessage={() => "No se encontraron ordenes"}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mecánico</Form.Label>
            <Select
              options={opcionesAgrupadasMecanico}
              onChange={(selected) => onInputChange({ target: { name: "mecanico_id", value: selected.value }})}
              placeholder="Seleccione un mecánico"
              noOptionsMessage={() => "No se encontraron mecánicos"}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estado de Trabajo</Form.Label>
            <Form.Select
              name="estado_de_trabajo"
              value={estado_de_trabajo}
              onChange={onInputChange}
              required
            >
              <option value="">Seleccione un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Progreso</option>
              <option value="pendiente_de_facturacion">Por Facturar</option>
              <option value="completado">Completado</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Detalle de la tarea (Opcional)</Form.Label>
            <Form.Control
              type="text"
              name="notificacion_al_cliente"
              value={notificacion_al_cliente}
              onChange={onInputChange}
              placeholder="Ej: Revisión de frenos terminada"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="success" type="submit">Guardar Tarea</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};