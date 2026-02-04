import { Modal, Button } from "react-bootstrap";
import { useClienteStore } from "../hooks/useClienteStore";
import Swal from "sweetalert2";

export const ModalEliminarCliente = ({
  showModal,
  handleClose,
  clienteData,
}) => {
  const { startDeletingCliente } = useClienteStore();

  const handleDeleteCliente = () => {
    startDeletingCliente(clienteData);
    Swal.fire(
      "Ok",
      "Cliente eliminado. Se recargará la página para guardar los cambios.",
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
        <Modal.Title>Eliminar al cliente {clienteData?.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger fw-bold">
          ¿Estás seguro de que deseas eliminar este cliente? Si borras el
          cliente, todo rastro relacionado con él, como órdenes y tareas,
          también será eliminado.
          <br />
          <u>Esta acción no se puede deshacer.</u>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteCliente}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
