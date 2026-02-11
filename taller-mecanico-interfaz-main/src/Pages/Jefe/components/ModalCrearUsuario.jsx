import { Form, Modal, Button } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import Swal from "sweetalert2";
import { useAuthStore } from "../../../hooks/useAuthStore";

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPasswordConfirmation: "",
};

export const ModalCrearUsuario = ({ showModal, handleClose }) => {
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPasswordConfirmation,
    onInputChange,
    onResetForm,
  } = useForm(registerFormFields);

  const { startRegister } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (registerPassword.length < 8) {
      return Swal.fire("Error", "La contraseña debe tener al menos 8 caracteres", "error");
    }

    if (registerPassword !== registerPasswordConfirmation) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }


    const resp = await startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });


    if ( resp ) {
      Swal.fire("Ok", "Usuario creado correctamente", "success");
      onResetForm();
      handleClose();
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          <h4 className="mb-0">Crear nuevo usuario</h4>
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="alert alert-warning py-2 small">
            <strong>Advertencia:</strong> Las contraseñas se hashean automáticamente. 
            Asegúrese de gestionarlas con cuidado ya que no son recuperables.
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              type="text"
              name="registerName"
              value={registerName}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="registerEmail"
              value={registerEmail}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="registerPassword"
              value={registerPassword}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              name="registerPasswordConfirmation"
              value={registerPasswordConfirmation}
              onChange={onInputChange}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className="btn btn-success" type="submit">
            Crear Usuario
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};