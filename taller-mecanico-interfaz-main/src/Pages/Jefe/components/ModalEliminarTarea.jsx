import { Modal, Button } from "react-bootstrap";
import { useTareaStore } from "../hooks/useTareaStore";
import Swal from "sweetalert2";

export const ModalEliminarTarea = ({ showModal, handleClose, tareaData }) => {
  const { startDeletingTarea } = useTareaStore();

  const handleDeleteTarea = () => {
    startDeletingTarea(tareaData);
    Swal.fire(
      "Ok",
      "Tarea eliminada. Se recargará la página para guardar los cambios.",
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
        <Modal.Title>Eliminar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar este tarea? Esta acción no se
          puede deshacer.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteTarea}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
