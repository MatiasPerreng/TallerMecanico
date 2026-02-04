import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTrenDelanteroStore } from "../hooks/useTrenDelanteroStore";
import Swal from "sweetalert2";

export const ModalActualizarTrenDelantero = ({
  showModal,
  handleClose,
  trenDelanteroData,
}) => {
  const [formData, setFormData] = useState(
    trenDelanteroData || {
      conv: "",
      comba: "",
      avance: "",
      rotulas: "",
      punteros: "",
      bujes: "",
      caja_direccion: "",
      conv2: "",
      comba2: "",
      avance2: "",
      amort: "",
    }
  );

  const { startSavingTrenDelantero } = useTrenDelanteroStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (trenDelanteroData) {
      setFormData(trenDelanteroData);
    }
  }, [trenDelanteroData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    startSavingTrenDelantero(formData);
    Swal.fire("Ok", "Tren delantero actualizado", "success");
    handleClose();
  };

  if (!trenDelanteroData) return null;

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Tren Delantero</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {[
            "conv",
            "comba",
            "avance",
            "rotulas",
            "punteros",
            "bujes",
            "caja_direccion",
            "conv2",
            "comba2",
            "avance2",
            "amort",
          ].map((campo) => (
            <Form.Group className="mb-3" key={campo}>
              <Form.Label>{campo.replace(/_/g, " ").toUpperCase()}</Form.Label>
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
