import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTrenTraseroStore } from "../hooks/useTrenTraseroStore";
import Swal from "sweetalert2";

export const ModalActualizarTrenTrasero = ({
  showModal,
  handleClose,
  trenTraseroData,
}) => {
  const [formData, setFormData] = useState(
    trenTraseroData || {
      conv: "", comba: "", brazos_susp: "", articulaciones: "", conv2: "", comba2: "", amort: ""
    }
  );

  const { startSavingTrenTrasero } = useTrenTraseroStore();

  useEffect(() => {
    if (trenTraseroData) {
      setFormData(trenTraseroData);
    }
  }, [trenTraseroData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startSavingTrenTrasero(formData);
    handleClose();
    Swal.fire("Ok", "Tren trasero actualizado", "success");
    handleClose();
  };

  if (!trenTraseroData) return null;

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Tren Trasero</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          
          <Form.Group className="mb-3">
            <Form.Label>Conv</Form.Label>
            <Form.Control
              type="text"
              name="conv"
              value={formData.conv}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Comba</Form.Label>
            <Form.Control
              type="text"
              name="comba"
              value={formData.comba}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Brazos Susp</Form.Label>
            <Form.Control
              type="text"
              name="brazos_susp"
              value={formData.brazos_susp}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Articulaciones</Form.Label>
            <Form.Control
              type="text"
              name="articulaciones"
              value={formData.articulaciones}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Conv2</Form.Label>
            <Form.Control
              type="text"
              name="conv2"
              value={formData.conv2}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Comba2</Form.Label>
            <Form.Control
              type="text"
              name="comba2"
              value={formData.comba2}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Amort</Form.Label>
            <Form.Control
              type="text"
              name="amort"
              value={formData.amort}
              onChange={handleInputChange}
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
