import { Form, Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { useSelectorCategorias } from "../hooks/useSelectorCategorias";
import { useForm } from "../../../hooks/useForm";
import { useProductoStore } from "../hooks/useProductoStore";
import Swal from "sweetalert2";

const createProductoField = {
  categoria_id: "",
  nombre: "",
  detalles: "",
  marca: "",
  stock: "",
  precio: "",
};

export const ModalCrearProducto = ({ showModal, handleClose }) => {
  const {
    categoria_id,
    nombre,
    detalles,
    marca,
    stock,
    precio,
    onInputChange,
    onResetForm,
  } = useForm(createProductoField);

  const { opcionesAgrupadas } = useSelectorCategorias(showModal);
  const { startSavingProducto } = useProductoStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoria_id) {
      return Swal.fire("Error", "Debe seleccionar una categoría", "error");
    }

    const productoData = {
      categoria_id: parseInt(categoria_id),
      nombre: nombre.trim(),
      detalles: detalles.trim() || "N/A",
      marca: marca.trim(),
      stock: parseInt(stock),
      precio: parseFloat(precio),
    };

    const success = await startSavingProducto(productoData);

    if (success) {
      Swal.fire("Ok", "Producto creado correctamente", "success");
      onResetForm();
      handleClose();
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Crear nuevo producto</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <div className="mb-2">
              <Select
                options={opcionesAgrupadas}
                onChange={(selected) =>
                  onInputChange({
                    target: { name: "categoria_id", value: selected.value },
                  })
                }
                placeholder="Seleccione una categoria"
                noOptionsMessage={() => "No se encontraron categorias"}
              />
            </div>
          </Form.Group>

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
            <Form.Label>Detalles (Opcional)</Form.Label>
            <Form.Control
              type="text"
              name="detalles"
              value={detalles}
              onChange={onInputChange}
            />
            <Form.Text className="text-muted">
              Campo opcional, por defecto 'N/A'.
            </Form.Text>
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
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={stock}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="precio"
              value={precio}
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
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};