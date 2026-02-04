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

export const ModalCrearCliente = ({ handleShow, handleClose, showModal }) => {
  const { nombre, email, rut, telefono, domicilio, disponible, onInputChange } =
    useForm(createClienteField);

  const { startSavingEvent } = useClienteStore();

  // const handleInputChangeCheckbox = (e) => {
  //   const { name, checked } = e.target;
  //   onInputChange({ target: { name, value: checked } });
  // };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    startSavingEvent({
      nombre,
      email,
      rut,
      telefono,
      domicilio,
    });

    Swal.fire(
      "Ok",
      "Cliente creado. Se recargará la página para guardar los cambios.",
      "success"
    );
    setTimeout(() => {
      location.reload();
    }, 1500);
    handleClose();
  };
  return (
    <>
      {/* Modal para agregar nuevo cliente */}
      <Modal show={showModal} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo cliente</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nombre}
                onChange={onInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
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
                name="rut"
                value={rut}
                onChange={onInputChange}
              />
              <Form.Text className="text-muted">
                Este campo es opcional, al dejarse vacío se colocará por defecto
                un 'N/A'.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
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
                name="domicilio"
                placeholder="Máximo 255 carácteres"
                value={domicilio}
                onChange={onInputChange}
                maxLength={254}
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
    </>
  );
};
