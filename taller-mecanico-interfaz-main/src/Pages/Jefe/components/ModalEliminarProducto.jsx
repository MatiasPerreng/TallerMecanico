import { Modal, Button } from "react-bootstrap";
import { useProductoStore } from "../hooks/useProductoStore";
import Swal from "sweetalert2";

export const ModalEliminarProducto = ({
  showModal,
  handleClose,
  productoData,
}) => {
  const { startDeletingProducto } = useProductoStore();

  const handleDeleteProducto = () => {
    startDeletingProducto(productoData);
    Swal.fire(
      "Ok",
      "Producto eliminado. Se recargará la página para guardar los cambios.",
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
        <Modal.Title>Eliminar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger fw-bold">
          <p>
            ¿Desea proceder con la eliminación definitiva de este producto? Esta
            acción:
          </p>
          <br />
          <p> • Eliminará todos los registros asociados del sistema </p>
          <p>• Modificará irreversiblemente las tareas vinculadas </p>
          <p>
            • Actualizará los valores históricos en transacciones relacionadas
          </p>
          <br />
          <u>Esta acción no se puede deshacer.</u>
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
