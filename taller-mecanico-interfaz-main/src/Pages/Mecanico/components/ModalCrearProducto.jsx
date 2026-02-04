import { Form, Modal, Button, InputGroup } from "react-bootstrap";
import Select from "react-select";
import { useSelectorProductos } from "../hooks/useSelectorProductos";
import { useForm } from "../../../hooks/useForm";
import { useProductoUsadoStore } from "../hooks/useProductoUsadoStore";
import Swal from "sweetalert2";

const createProductoField = {
  tarea_id: "",
  producto_id: "",
  cantidad: "",
};

export const ModalCrearProducto = ({ showModal, handleClose, tareaId }) => {
  const { tarea_id, producto_id, cantidad, onInputChange } =
    useForm(createProductoField);

  const { opcionesAgrupadas, setSearchTerm } = useSelectorProductos(showModal);

  const { startSavingProducto } = useProductoUsadoStore();

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    startSavingProducto({
      tarea_id: tareaId,
      producto_id,
      cantidad,
    });
    Swal.fire(
      "Ok",
      "Producto agregado. Se recargará la página para guardar los cambios.",
      "success"
    );
    setTimeout(() => {
      location.reload();
    }, 1500);
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Crear Producto Usado</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Producto</Form.Label>
            <div className="mb-2">
              

              <Select
                options={opcionesAgrupadas}
                onChange={(selected) =>
                  onInputChange({
                    target: { name: "producto_id", value: selected.value },
                  })
                }
                placeholder="Seleccione un producto"
                noOptionsMessage={() => "No se encontraron productos"}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              value={cantidad}
              onChange={onInputChange}
              required
              min="1"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className="btn btn-success" variant="primary" type="submit">
            Crear Producto
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
