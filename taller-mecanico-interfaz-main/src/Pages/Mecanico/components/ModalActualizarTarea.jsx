import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTareaAsignadaStore } from "../hooks/useTareaAsignadaStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const ModalActualizarTarea = ({ showModal, handleClose, tareaData }) => {
  const [formData, setFormData] = useState(
    tareaData || {
      orden_id: "",
      mecanico_id: "",
      estado_de_trabajo: "",
      notificacion_al_cliente: "",
    }
  );

  const navigate = useNavigate();

  const { startSavingTareaAsignada } = useTareaAsignadaStore();

  // Actualizar el estado si tareaData cambia
  useEffect(() => {
    if (tareaData) {
      setFormData(tareaData);
    }
  }, [tareaData]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { orden_id, mecanico_id, ...dataToSend } = formData;
    if (!formData.notificacion_al_cliente.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Los campos no pueden estar vacíos. En los campos opcionales, escriba 'N/A'.",
      });
      return; // Detener el envío del formulario
    }
    startSavingTareaAsignada(dataToSend); // Llama a la función para actualizar los datos
    Swal.fire(
      "Ok",
      "Tarea actualizada. Serás redirigido a la lista de tareas para que se guarden correctamente los cambios.",
      "success"
    );
    setTimeout(() => {
      navigate("/mecanico/tareas");
    }, 1000);
    handleClose(); // Cierra el modal
  };

  if (!tareaData) return null; // No renderizar nada si tareaData es null
  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Tarea</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Estado de trabajo</Form.Label>
            <Form.Select
              name="estado_de_trabajo"
              value={formData.estado_de_trabajo}
              onChange={handleInputChange}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En proceso</option>
              <option value="pendiente_de_facturacion">Por facturar</option>
              <option value="completado">Completado</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Detalles de Tarea</Form.Label>
            <Form.Control
              as="textarea"
              name="notificacion_al_cliente"
              value={formData.notificacion_al_cliente}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" type="submit">
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
