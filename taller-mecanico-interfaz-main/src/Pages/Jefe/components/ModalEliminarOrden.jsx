import { Modal, Button } from "react-bootstrap";
import { useOrdenStore } from "../hooks/useOrdenStore";
import Swal from "sweetalert2";

export const ModalEliminarOrden = ({ showModal, handleClose, ordenData }) => {
  const { startDeletingOrden } = useOrdenStore();

  const handleDeleteOrden = () => {
    startDeletingOrden(ordenData);
    Swal.fire(
      "Ok",
      "Orden eliminada. Se recargará la página para guardar los cambios.",
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
        <Modal.Title>Eliminar Orden</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger fw-bold">
          ¿Estás seguro de que deseas eliminar esta órden? Si borras la orden,
          todo rastro relacionado con ella, como tareas, también será eliminada.
          <br />
          <u>Esta acción no se puede deshacer.</u>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteOrden}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
