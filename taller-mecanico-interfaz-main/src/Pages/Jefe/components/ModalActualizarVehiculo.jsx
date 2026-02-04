import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useVehiculoStore } from "../hooks/useVehiculoStore";
import Swal from "sweetalert2";

export const ModalActualizarVehiculo = ({
  showModal,
  handleClose,
  vehiculoData,
}) => {
  const [formData, setFormData] = useState(
    vehiculoData || {
      modelo: "",
      marca: "",
      color: "",
      matricula: "",
      kilometraje: "",
      numero_de_serie: "",
      numero_de_motor: "",
      fecha_de_compra: "",
      disponible: "",
    }
  );

  const { startSavingVehiculo } = useVehiculoStore();

  // Actualizar el estado si vehiculoData cambia
  useEffect(() => {
    if (vehiculoData) {
      setFormData(vehiculoData);
    }
  }, [vehiculoData]);

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

    if (!formData.numero_de_serie.trim() || !formData.numero_de_motor.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Los campos no pueden estar vacíos. En los campos opcionales, escriba 'N/A'.",
      });
      return; // Detener el envío del formulario
    }

    startSavingVehiculo(formData);
    Swal.fire("Ok", "Vehiculo actualizado", "success");
    handleClose();
  };

  if (!vehiculoData) {
    return null; // No renderizar nada si vehiculoData es null
  }

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Vehículo</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Matricula</Form.Label>
            <Form.Control
              type="text"
              name="matricula"
              value={formData.matricula}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Kilometraje</Form.Label>
            <Form.Control
              type="text"
              name="kilometraje"
              value={formData.kilometraje}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Numero de serie (Si es opcional, escribir N/A)
            </Form.Label>
            <Form.Control
              type="text"
              name="numero_de_serie"
              value={formData.numero_de_serie}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Este campo es opcional, al dejarse vacío se colocará por defecto
              un 'N/A'.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Numero de motor (Si es opcional, escribir N/A)
            </Form.Label>
            <Form.Control
              type="text"
              name="numero_de_motor"
              value={formData.numero_de_motor}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Este campo es opcional, al dejarse vacío se colocará por defecto
              un 'N/A'.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <Form.Label>Fecha de compra (Opcional)</Form.Label>
            </Form.Label>
            <Form.Control
              type="date"
              name="fecha_de_compra"
              value={formData.fecha_de_compra ?? ""}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Si la fecha marca como 1/1/1900, considere que esto no afectará el
              flujo ni el comportamiento del sistema, ya que es reconocido como
              fecha no definida. No lo cambie para no alterar el flujo de
              información, a menos que quiera colocar una fecha real.
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
