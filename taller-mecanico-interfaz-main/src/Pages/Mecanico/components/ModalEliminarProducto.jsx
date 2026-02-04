import { Modal, Button } from "react-bootstrap";
import { useProductoUsadoStore } from "../hooks/useProductoUsadoStore";
import Swal from "sweetalert2";

export const ModalEliminarProducto = ({
  showModal,
  handleClose,
  productosData,
}) => {
  const { startDeletingProducto } = useProductoUsadoStore();

  const handleDeleteProducto = () => {
    startDeletingProducto(productosData);
    Swal.fire(
      "Ok",
      "Producto eliminado. Se recargará la página para guardar los cambios.",
      "success"
    );
    // setTimeout(() => {
    //   location.reload();
    // }, 1500);
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar este producto? Esta acción no se
          puede deshacer.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteProducto}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
