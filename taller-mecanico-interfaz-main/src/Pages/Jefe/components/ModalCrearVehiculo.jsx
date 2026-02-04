/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useVehiculoStore } from "../hooks/useVehiculoStore";
import Swal from "sweetalert2";
import { useForm } from "../../../hooks/useForm";

const createVehiculoField = {
  modelo: "",
  marca: "",
  color: "",
  matricula: "",
  kilometraje: "",
  numero_de_serie: "",
  numero_de_motor: "",
  fecha_de_compra: "",
};

export const ModalCrearVehiculo = ({ showModal, handleClose }) => {
  const [formData, setFormData] = useState({
    modelo: "",
    marca: "",
    color: "",
    matricula: "",
    kilometraje: "",
    numero_de_serie: "",
    numero_de_motor: "",
    fecha_de_compra: "",
  });

  // const handleInputChangeCheckbox = (e) => {
  //   const { name, checked } = e.target;
  //   onInputChange({ target: { name, value: checked } });
  // };

  const { startSavingVehiculo } = useVehiculoStore();

  const {
    modelo,
    marca,
    color,
    matricula,
    kilometraje,
    numero_de_serie,
    numero_de_motor,
    fecha_de_compra,
    onInputChange,
  } = useForm(createVehiculoField);

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    startSavingVehiculo({
      modelo,
      marca,
      color,
      matricula,
      kilometraje,
      numero_de_serie,
      numero_de_motor,
      fecha_de_compra,
    });

    Swal.fire(
      "Ok",
      "Vehiculo creado. Se recargará la página para guardar los cambios.",
      "success"
    );
    setTimeout(() => {
      location.reload();
    }, 1500);
    handleClose();
  };

  return (
    <>
      {/* Modal para agregar nuevo veiculo */}
      <Modal show={showModal} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo vehiculo</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="modelo"
                value={modelo}
                onChange={onInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="marca"
                value={marca}
                onChange={onInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={color}
                onChange={onInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Matricula</Form.Label>
              <Form.Control
                type="text"
                name="matricula"
                value={matricula}
                onChange={onInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kilometraje</Form.Label>
              <Form.Control
                type="text"
                name="kilometraje"
                value={kilometraje}
                onChange={onInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numero de serie (Opcional)</Form.Label>
              <Form.Control
                type="text"
                name="numero_de_serie"
                value={numero_de_serie}
                onChange={onInputChange}
              />
              <Form.Text className="text-muted">
                Este campo es opcional, al dejarse vacío se colocará por defecto
                un 'N/A'.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numero de motor (Opcional)</Form.Label>
              <Form.Control
                type="text"
                name="numero_de_motor"
                value={numero_de_motor}
                onChange={onInputChange}
              />
              <Form.Text className="text-muted">
                Este campo es opcional, al dejarse vacío se colocará por defecto
                un 'N/A'.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de compra (Opcional)</Form.Label>
              <Form.Control
                type="date"
                name="fecha_de_compra"
                value={fecha_de_compra}
                onChange={onInputChange}
              />
              <Form.Text className="text-muted">
                Este campo es opcional, al dejarse vacío se colocará por defecto
                una fecha que el sistema detectará como no definida.
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
