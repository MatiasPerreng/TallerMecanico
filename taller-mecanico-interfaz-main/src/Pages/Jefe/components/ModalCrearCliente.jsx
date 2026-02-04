/* eslint-disable no-unused-vars */
import { Form, Modal, Button } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import { useClienteStore } from "../hooks/useClienteStore";
import Swal from "sweetalert2";

const createClienteField = {
  nombre: "",
  email: "",
  rut: "",
  telefono: "",
  domicilio: "",
};

export const ModalCrearCliente = ({ handleClose, showModal }) => {

  const { nombre, email, rut, telefono, domicilio, onInputChange, onResetForm } =
    useForm(createClienteField);

  const { startSavingEvent } = useClienteStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await startSavingEvent({
      nombre,
      email,
      rut: rut || "N/A",
      telefono,
      domicilio: domicilio || "N/A",
    });

    if (success) {
     
      onResetForm();
      handleClose();
      Swal.fire("Guardado", "El cliente ha sido registrado con éxito", "success");
    }
 
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Crear nuevo cliente</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Juan Pérez"
              name="nombre"
              value={nombre}
              onChange={onInputChange}
              required
            />
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              name="email"
              value={email}
              onChange={onInputChange}
              required
            />
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>RUT (Opcional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="12.345.678-9"
              name="rut"
              value={rut}
              onChange={onInputChange}
            />
            <Form.Text className="text-muted">
              Si se deja vacío, se guardará como 'N/A'.
            </Form.Text>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Teléfono de Contacto</Form.Label>
            <Form.Control
              type="text"
              placeholder="+56 9 1234 5678"
              name="telefono"
              value={telefono}
              onChange={onInputChange}
              required
            />
          </Form.Group>

  
          <Form.Group className="mb-3">
            <Form.Label>Domicilio (Opcional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección, Ciudad"
              name="domicilio"
              value={domicilio}
              onChange={onInputChange}
              maxLength={254}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" type="submit">
            Guardar Cliente
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};