// ModalActualizarProducto.jsx
import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useProductoStore } from "../hooks/useProductoStore"; // Assuming this hook exists and provides startSavingProducto
import { useSelectorCategorias } from "../hooks/useSelectorCategorias"; // Assuming this hook exists
import Select from "react-select";
import Swal from "sweetalert2";

export const ModalActualizarProducto = ({
  showModal,
  handleClose,
  productoData,
}) => {
  const [formData, setFormData] = useState(
    productoData || {
      categoria_id: "",
      nombre: "",
      detalles: "",
      marca: "",
      stock: "",
      precio: "",
    }
  );

  const { opcionesAgrupadas } = useSelectorCategorias(showModal); // Assuming this hook loads categories
  const { startSavingProducto } = useProductoStore(); // This hook should handle the API call and Redux dispatch

  useEffect(() => {
    // This effect ensures formData is updated when productoData changes (e.g., when a new product is selected for editing)
    if (productoData) {
      setFormData({
        ...productoData,
        // Ensure categoria_id is set correctly for the Select component
        // It might come as productoData.categoria.id or directly as productoData.categoria_id
        categoria_id: productoData.categoria?.id || productoData.categoria_id,
      });
    }
  }, [productoData]);

  // Find the selected category for the Select component based on formData.categoria_id
  const selectedCategoria = opcionesAgrupadas
    ?.flatMap((group) => group.options)
    .find((opt) => opt.value === formData.categoria_id);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoriaChange = (selected) => {
    setFormData({
      ...formData,
      categoria_id: selected ? selected.value : "",
    });
  };

  // ***** IMPORTANT CHANGE HERE: make handleSubmit async *****
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!formData.nombre.trim() || !formData.marca.trim() || formData.stock === "" || formData.precio === "" || formData.categoria_id === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos obligatorios deben ser rellenados.",
      });
      return;
    }

    // Handle optional 'detalles' field: if empty, set to 'N/A'
    const payloadWithDetails = {
      ...formData,
      detalles: formData.detalles.trim() === "" ? "N/A" : formData.detalles,
    };

    // ***** IMPORTANT CHANGE HERE: await startSavingProducto *****
    try {
      await startSavingProducto(payloadWithDetails); // Ensure startSavingProducto returns a Promise
      Swal.fire("Ok", "Producto actualizado", "success");
      handleClose(); // Close the modal only after the save operation (and Redux update) is complete
    } catch (error) {
      // startSavingProducto should handle its own error reporting, but this is a fallback
      console.error("Error submitting product update:", error);
      Swal.fire("Error", "No se pudo actualizar el producto", "error");
    }
  };

  if (!productoData) return null;

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Producto</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Select
              options={opcionesAgrupadas}
              value={selectedCategoria || null}
              onChange={handleCategoriaChange}
              placeholder="Seleccione una categoria"
              noOptionsMessage={() => "No se encontraron categorias"}
              isClearable
              required // Make category selection required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Detalles (Opcional)</Form.Label>
            <Form.Control
              type="text"
              name="detalles"
              value={formData.detalles}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Este campo es opcional, al dejarse vacío se colocará por defecto un 'N/A'.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={formData.precio}
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