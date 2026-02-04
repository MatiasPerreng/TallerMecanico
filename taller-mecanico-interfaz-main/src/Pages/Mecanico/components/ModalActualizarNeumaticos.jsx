import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNeumaticoStore } from "../hooks/useNeumaticoStore";
import Swal from "sweetalert2";

export const ModalActualizarNeumaticos = ({
  showModal,
  handleClose,
  neumaticosData,
}) => {
  const [formData, setFormData] = useState(
    neumaticosData || {
      delanteros_derechos: "", delanteros_izquierdos: "", traseros_derechos: "", traseros_izquierdos: ""
    }
  );

  const { startSavingNeumaticos } = useNeumaticoStore();

  useEffect(() => {
    if (neumaticosData) {
      setFormData(neumaticosData);
    }
  }, [neumaticosData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startSavingNeumaticos(formData);
    handleClose();
    Swal.fire("Ok", "Neumáticos actualizados", "success");
    handleClose();
  };

  if (!neumaticosData) return null;

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Estado de Neumáticos</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          
          <Form.Group className="mb-3">
            <Form.Label>Delanteros Derechos</Form.Label>
            <Form.Control
              type="text"
              name="delanteros_derechos"
              value={formData.delanteros_derechos}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Delanteros Izquierdos</Form.Label>
            <Form.Control
              type="text"
              name="delanteros_izquierdos"
              value={formData.delanteros_izquierdos}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Traseros Derechos</Form.Label>
            <Form.Control
              type="text"
              name="traseros_derechos"
              value={formData.traseros_derechos}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Traseros Izquierdos</Form.Label>
            <Form.Control
              type="text"
              name="traseros_izquierdos"
              value={formData.traseros_izquierdos}
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
