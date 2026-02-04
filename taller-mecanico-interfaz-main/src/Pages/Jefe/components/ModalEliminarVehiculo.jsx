import { Modal, Button } from "react-bootstrap";
import { useVehiculoStore } from "../hooks/useVehiculoStore";
import Swal from "sweetalert2";

export const ModalEliminarVehiculo = ({
  showModal,
  handleClose,
  vehiculoData,
}) => {
  const { startDeletingVehiculo } = useVehiculoStore();

  const handleDeleteVehiculo = () => {
    startDeletingVehiculo(vehiculoData);
    Swal.fire(
      "Ok",
      "Vehiculo eliminado. Se recargará la página para guardar los cambios.",
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
        <Modal.Title>Eliminar Vehiculo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger fw-bold">
          ¿Estás seguro de que deseas eliminar este vehiculo? Si borras el
          vehiculo, todo rastro relacionado con él, como órdenes y tareas,
          también será eliminado.
          <br />
          <u>Esta acción no se puede deshacer.</u>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteVehiculo}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
