import { Form, Modal, Button, Row, Col, InputGroup } from "react-bootstrap";
import Select from "react-select";
import { useSelectorClientes } from "../hooks/useSelectorClientes";
import { useSelectorVehiculos } from "../hooks/useSelectorVehiculos";
import { useOrdenStore } from "../hooks/useOrdenStore";
import { useForm } from "../../../hooks/useForm";
import Swal from "sweetalert2";

const createOrdenField = {
  cliente_id: "",
  vehiculo_id: "",
  detalle_de_trabajos_a_realizar: "",
  recepcion: new Date().toISOString().split("T")[0],
  prometido: "",
  cambio_de_aceite: false,
  cambio_de_filtro: false,
  detalles_de_entrada_del_vehiculo: "",
};

export const ModalCrearOrden = ({ showModal, handleClose }) => {

  const { opcionesAgrupadas, setSearchTerm: setSearchCliente } = useSelectorClientes(showModal);
  const { opcionesAgrupadas: opcionesVehiculos, setSearchTerm: setSearchVehiculo } = useSelectorVehiculos(showModal);

  const {
    formState,
    cliente_id,
    vehiculo_id,
    detalle_de_trabajos_a_realizar,
    recepcion,
    prometido,
    cambio_de_aceite,
    cambio_de_filtro,
    detalles_de_entrada_del_vehiculo,
    onInputChange,
    onResetForm,
  } = useForm(createOrdenField);

  const { startSavingOrden } = useOrdenStore();

  const handleInputChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    onInputChange({ target: { name, value: checked } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!cliente_id) {
      return Swal.fire("Error", "Debe seleccionar un cliente.", "error");
    }
    if (!vehiculo_id) {
      return Swal.fire("Error", "Debe seleccionar un vehículo.", "error");
    }

    const success = await startSavingOrden({
      ...formState,

      detalle_de_trabajos_a_realizar: detalle_de_trabajos_a_realizar || "N/A",
      detalles_de_entrada_del_vehiculo: detalles_de_entrada_del_vehiculo || "N/A",
      prometido: prometido || "1900-01-01", 
    });

    if (success) {
      Swal.fire("Éxito", "Orden creada correctamente", "success");
      onResetForm();
      handleClose();
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static" size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className="bi bi-file-earmark-plus me-2"></i>
          Crear Nueva Orden de Trabajo
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          <Row>
   
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label className="fw-bold">Cliente</Form.Label>
                <Select
                  options={opcionesAgrupadas}
                  onInputChange={(v) => setSearchCliente(v)}
                  onChange={(selected) =>
                    onInputChange({
                      target: { name: "cliente_id", value: selected?.value },
                    })
                  }
                  placeholder="Buscar cliente..."
                  noOptionsMessage={() => "No se encontraron clientes"}
                  isClearable
                />
              </Form.Group>
            </Col>

    
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label className="fw-bold">Vehículo</Form.Label>
                <Select
                  options={opcionesVehiculos}
                  onInputChange={(v) => setSearchVehiculo(v)}
                  onChange={(selected) =>
                    onInputChange({
                      target: { name: "vehiculo_id", value: selected?.value },
                    })
                  }
                  placeholder="Buscar vehículo..."
                  noOptionsMessage={() => "No se encontraron vehículos"}
                  isClearable
                />
              </Form.Group>
            </Col>
          </Row>

          <hr />

          <Row>

            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label className="fw-bold">Fecha de Recepción</Form.Label>
                <Form.Control
                  type="date"
                  name="recepcion"
                  value={recepcion}
                  onChange={onInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label className="fw-bold">Fecha Prometida (Opcional)</Form.Label>
                <Form.Control
                  type="date"
                  name="prometido"
                  value={prometido}
                  onChange={onInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="bg-light p-3 rounded mb-3 border">
            <h6 className="fw-bold mb-3 text-secondary">Mantenimiento Preventivo</h6>
            <div className="d-flex gap-4">
              <Form.Check
                type="checkbox"
                name="cambio_de_aceite"
                id="aceite"
                label="Cambio de Aceite"
                checked={cambio_de_aceite}
                onChange={handleInputChangeCheckbox}
              />
              <Form.Check
                type="checkbox"
                name="cambio_de_filtro"
                id="filtro"
                label="Cambio de Filtro"
                checked={cambio_de_filtro}
                onChange={handleInputChangeCheckbox}
              />
            </div>
          </div>


          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Detalles de Trabajos a Realizar</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="detalle_de_trabajos_a_realizar"
              value={detalle_de_trabajos_a_realizar}
              onChange={onInputChange}
              placeholder="Describa el problema o el servicio solicitado..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Detalles de Entrada del Vehículo</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="detalles_de_entrada_del_vehiculo"
              value={detalles_de_entrada_del_vehiculo}
              onChange={onInputChange}
              placeholder="Ej: Rayón en puerta izquierda, tanque a 1/4..."
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="bg-light">
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" className="px-4">
            <i className="bi bi-save me-2"></i>
            Guardar Orden
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};