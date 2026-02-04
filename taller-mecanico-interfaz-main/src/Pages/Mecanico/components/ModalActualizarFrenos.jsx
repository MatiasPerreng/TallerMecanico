import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFrenoStore } from "../hooks/useFrenoStore";

const initialFormState = {
  delanteros: "",
  traseros: "",
  estacionamiento: "",
  numero_cricket: "",
};

export const ModalActualizarFrenos = ({
  showModal,
  handleClose,
  handleUpdate,
  frenosData,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const { startSavingFrenos } = useFrenoStore();

  useEffect(() => {
    if (frenosData) {
      setFormData(frenosData);
    }
  }, [frenosData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startSavingFrenos(formData);
    handleClose();
  };

  if (!frenosData) return null;

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Frenos</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {["delanteros", "traseros", "estacionamiento", "numero_cricket"].map((campo) => (
            <Form.Group className="mb-3" key={campo}>
              <Form.Label>{campo.replace("_", " ").toUpperCase()}</Form.Label>
              <Form.Control
                type="text"
                name={campo}
                value={formData[campo]}
                onChange={handleInputChange}
              />
            </Form.Group>
          ))}
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
