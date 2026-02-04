import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useProductoStore } from "../../Jefe/hooks/useProductoStore";
import Swal from "sweetalert2";
import { useProductoUsadoStore } from "../hooks/useProductoUsadoStore";

export const ModalActualizarProductos = ({
  showModal,
  handleClose,
  handleUpdate,
  productosData,
}) => {
  const [formData, setFormData] = useState(
    productosData || {
      tarea_id: "",
      producto_id: "",
      cantidad: "",
    }
  );

  const { startSavingProducto } = useProductoUsadoStore();

  // Actualizar el estado si productosData cambia
  useEffect(() => {
    if (productosData) {
      setFormData(productosData);
    }
  }, [productosData]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { tarea_id, ...dataToSend } = formData;
    startSavingProducto(dataToSend);
    Swal.fire("Ok", "Producto actualizado", "success");
    handleClose(); // Cierra el modal
  };

  if (!productosData) return null; // No renderizar nada si productosData es null

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Producto Usado</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Mostrar el nombre del producto */}

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleInputChange}
              required
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
