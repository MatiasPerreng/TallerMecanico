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
  const { opcionesAgrupadas, setSearchTerm } = useSelectorOrdenes(showModal);

  const {
    opcionesAgrupadas: opcionesAgrupadasMecanico,
    setSearchTerm: setSearchTermMecanico,
  } = useSelectorMecanicos(showModal);

  const {
    orden_id,
    mecanico_id,
    estado_de_trabajo,
    notificacion_al_cliente,
    onInputChange,
  } = useForm(createTareaField);

  const { startSavingTarea } = useTareaStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!orden_id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe seleccionar una orden.",
      });
      return;
    }

    if (!mecanico_id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe seleccionar un mecánico.",
      });
      return;
    }

    if (!estado_de_trabajo) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe seleccionar un estado de trabajo.",
      });
      return;
    }

    startSavingTarea({
      orden_id,
      mecanico_id,
      estado_de_trabajo,
      notificacion_al_cliente,
    });

    Swal.fire(
      "Ok",
      "Tarea creada. Se recargará la página para guardar los cambios.",
      "success"
    );
    setTimeout(() => {
      location.reload();
    }, 1500);
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          <h4>Crear Nueva Tarea</h4>
          {/* <p className="text-danger small">
            Advertencia: Si la página queda congelada después de cerrar el
            modal, recárguela.
          </p> */}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Orden</Form.Label>
            <div className="mb-2">
              {/* Eliminado el recuadro de búsqueda de orden */}
              <Select
                options={opcionesAgrupadas}
                onChange={(selected) =>
                  onInputChange({
                    target: { name: "orden_id", value: selected.value },
                  })
                }
                placeholder="Seleccione una orden"
                noOptionsMessage={() => "No se encontraron ordenes"}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mecanico</Form.Label>
            <div className="mb-2">
              {/* Eliminado el recuadro de búsqueda de mecánico */}
              <Select
                options={opcionesAgrupadasMecanico}
                onChange={(selected) =>
                  onInputChange({
                    target: { name: "mecanico_id", value: selected.value },
                  })
                }
                placeholder="Seleccione un mecanico"
                noOptionsMessage={() => "No se encontraron mecanicos"}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estado de Trabajo</Form.Label>
            <Form.Select
              name="estado_de_trabajo"
              value={estado_de_trabajo}
              onChange={onInputChange}
              required
            >
              <option value="" disabled hidden>
                Estado de trabajo
              </option>
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Progreso</option>
              <option value="pendiente_de_facturacion">Por Facturar</option>
              <option value="completado">Completado</option>
            </Form.Select>
            <Form.Text className="text-muted">
              Es obligatorio el ingreso de un estado de trabajo.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Detalle de la tarea</Form.Label>
            <Form.Control
              type="text"
              name="notificacion_al_cliente"
              value={notificacion_al_cliente}
              onChange={onInputChange}
            />
            <Form.Text className="text-muted">
              Este campo es opcional, al dejarse vacío se colocará por defecto
              un 'N/A'.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className="btn btn-success" variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
