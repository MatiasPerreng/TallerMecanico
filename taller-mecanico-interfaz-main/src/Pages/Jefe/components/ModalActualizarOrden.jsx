import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useOrdenStore } from "../hooks/useOrdenStore";
import Swal from "sweetalert2";
import Select from "react-select";
import { useSelectorClientes } from "../hooks/useSelectorClientes";
import { useSelectorVehiculos } from "../hooks/useSelectorVehiculos";

export const ModalActualizarOrden = ({ showModal, handleClose, ordenData }) => {
  const [formData, setFormData] = useState(
    ordenData || {
      cliente_id: "",
      vehiculo_id: "",
      detalle_de_trabajos_a_realizar: "",
      recepcion: "",
      prometido: "",
      cambio_de_aceite: "",
      cambio_de_filtro: "",
      detalles_de_entrada_del_vehiculo: "",
      disponible: "",
    }
  );

  const { startSavingOrden } = useOrdenStore();

  useEffect(() => {
    if (ordenData) {
      setFormData(ordenData);
    }
  }, [ordenData]);

  const {
    opcionesAgrupadas: opcionesClientes,
    handleClienteChange,
    setSearchTerm: setClienteSearchTerm,
  } = useSelectorClientes(showModal);

  const {
    opcionesAgrupadas: opcionesVehiculos,
    handleVehiculoChange,
    setSearchTerm: setVehiculoSearchTerm,
  } = useSelectorVehiculos(showModal);

  const selectedCliente = opcionesClientes
    .flatMap((group) => group.options)
    .find((opt) => opt.value === formData.cliente_id);

  const selectedVehiculo = opcionesVehiculos
    .flatMap((group) => group.options)
    .find((opt) => opt.value === formData.vehiculo_id);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChangeCheckbox = (e) => {
    const { name, type, checked } = e.target;
    const value = type === "checkbox" ? checked : e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.detalle_de_trabajos_a_realizar.trim() ||
      !formData.detalles_de_entrada_del_vehiculo.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Los campos no pueden estar vacíos. En los campos opcionales, escriba 'N/A'.",
      });
      return;
    }
    startSavingOrden(formData);
    Swal.fire("Ok", "Orden actualizada", "success");
    handleClose();
  };

  if (!ordenData) return null;

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Orden</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <div className="mb-2">
              {/* Eliminado el recuadro de búsqueda */}
              <Select
                options={opcionesClientes}
                value={selectedCliente}
                onChange={(selected) =>
                  handleClienteChange(selected, setFormData)
                }
                placeholder="Seleccione un cliente"
                noOptionsMessage={() => "No se encontraron clientes"}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vehículo</Form.Label>
            <div className="mb-2">
              {/* Eliminado el recuadro de búsqueda */}
              <Select
                options={opcionesVehiculos}
                value={selectedVehiculo}
                onChange={(selected) =>
                  handleVehiculoChange(selected, setFormData)
                }
                placeholder="Seleccione un vehículo"
                noOptionsMessage={() => "No se encontraron vehículos"}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Detalles de trabajos a realizar (Si es opcional, escribir N/A)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="detalle_de_trabajos_a_realizar"
              value={formData.detalle_de_trabajos_a_realizar}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Este campo es opcional, al dejarse vacío se colocará por defecto
              un 'N/A'.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha Recepcion</Form.Label>
            <Form.Control
              type="date"
              name="recepcion"
              value={formData.recepcion}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha prometida (Opcional).</Form.Label>
            <Form.Control
              type="date"
              name="prometido"
              value={formData.prometido}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Si la fecha marca como 1/1/1900, considere que esto no afectará el
              flujo ni el comportamiento del sistema, ya que es reconocido como
              fecha no definida. No lo cambie para no alterar el flujo de
              información, a menos que quiera colocar una fecha real.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="cambio_de_aceite"
              label="Cambio de aceite"
              checked={formData.cambio_de_aceite}
              onChange={handleInputChangeCheckbox}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="cambio_de_filtro"
              label="Cambio de filtro"
              checked={formData.cambio_de_filtro}
              onChange={handleInputChangeCheckbox}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Detalles de entrada de vehiculo (Si es opcional, escribir N/A)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="detalles_de_entrada_del_vehiculo"
              value={formData.detalles_de_entrada_del_vehiculo}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Este campo es opcional, al dejarse vacío se colocará por defecto
              un 'N/A'.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="disponible"
              label="Disponible"
              checked={formData.disponible}
              onChange={handleInputChangeCheckbox}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
