import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useUsuarioStore } from "../hooks/useUsuarioStore";

export const ModalEliminarUsuario = ({
  showModal,
  handleClose,
  usuarioData,
}) => {
  const { startDeletingUsuario } = useUsuarioStore();

  const handleDeleteUsuario = () => {
    startDeletingUsuario(usuarioData);
    Swal.fire(
      "Ok",
      "Usuario eliminado. Se recargará la página para guardar los cambios.",
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
        <Modal.Title>Eliminar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger fw-bold">
          <p>
            ¿Desea eliminar permanentemente este registro de usuario? Esta
            acción:
          </p>
          <br />
          <p>
            • Eliminará todas las tareas asociadas al perfil y sus cálculos de
            costos asociados
          </p>
          <p>• Borrará el historial de actividades relacionadas </p>
          <p>• Actualizará los registros de auditoría del sistema</p>
          <br />
          <p>Impactos críticos: </p>
          <p>⚠️ Pérdida de trazabilidad en procesos vinculados</p>
          <p>⚠️ Alteración de métricas históricas de productividad</p>
          <p>⚠️ Requerirá ajustes manuales en dependencias activas</p>
          <br />
          <p>Nota técnica:</p>
          <p>
            La eliminación es irreversible y afectará integridad referencial de
            la base de datos y consistencia de registros transaccionales.
          </p>
          <p>
            Recomendación: En vez de eliminar, deshabilite el registro en el
            botón de editar.
          </p>
          <br />
          <u>Esta acción no se puede deshacer.</u>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteUsuario}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
