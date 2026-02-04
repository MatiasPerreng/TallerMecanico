import { Modal, Button } from "react-bootstrap";
import { useCategoriaStore } from "../hooks/useCategoriaStore";
import Swal from "sweetalert2";

export const ModalEliminarCategoria = ({
  showModal,
  handleClose,
  categoriaData,
}) => {
  const { startDeletingCategoria } = useCategoriaStore();

  const handleDeleteCategory = () => {
    startDeletingCategoria(categoriaData);
    Swal.fire(
      "Ok",
      "Categoria eliminada. Se recargará la página para guardar los cambios.",
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
        <Modal.Title>Eliminar Categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger fw-bold">
          ¿Estás seguro de que deseas eliminar esta categoría? Si borras la
          categoría, todo rastro relacionado con ella, como los productosn
          también serán eliminados.
          <br />
          <u>Esta acción no se puede deshacer.</u>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteCategory}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
