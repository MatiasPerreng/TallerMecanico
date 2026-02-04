import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useClienteStore } from "../hooks/useClienteStore";
import Swal from "sweetalert2";

export const ModalActualizarCliente = ({
  showModal,
  handleClose,
  clienteData,
}) => {
  const [formData, setFormData] = useState(
    clienteData || {
      nombre: "",
      email: "",
      rut: "",
      telefono: "",
      domicilio: "",
      disponible: "",
    }
  );

  const { startSavingEvent } = useClienteStore();

  // Actualizar el estado si clienteData cambia
  useEffect(() => {
    if (clienteData) {
      setFormData(clienteData);
    }
  }, [clienteData]);

  const handleInputChangeCheckbox = (e) => {
    const { name, type, checked } = e.target;
    // Para checkboxes usamos 'checked', de lo contrario 'value'
    const value = type === "checkbox" ? checked : e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.domicilio.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Los campos no pueden estar vacíos. En los campos opcionales, escriba 'N/A'.",
      });
      return; // Detener el envío del formulario
    }
    startSavingEvent(formData);
    Swal.fire("Ok", "Cliente actualizado", "success");
    handleClose();
  };

  if (!clienteData) return null; // No renderizar nada si clienteData es null

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Cliente</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>RUT (Si es opcional, escribir N/A)</Form.Label>
            <Form.Control
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Este campo es opcional, al dejarse vacío se colocará por defecto
              un 'N/A'.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Domicilio (Si es opcional, escribir N/A)</Form.Label>
            <Form.Control
              type="text"
              name="domicilio"
              value={formData.domicilio}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Este campo es opcional, al dejarse vacío se colocará por defecto
              un 'N/A'.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="disponible"
              label="Disponible"
              checked={formData.disponible}
              onChange={handleInputChangeCheckbox}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
