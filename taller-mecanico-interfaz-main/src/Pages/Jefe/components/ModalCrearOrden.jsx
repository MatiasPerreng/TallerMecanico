import { Form, Modal, Button } from "react-bootstrap";
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
  recepcion: "",
  prometido: "",
  cambio_de_aceite: "",
  cambio_de_filtro: "",
  detalles_de_entrada_del_vehiculo: "",
};

export const ModalCrearOrden = ({ showModal, handleClose }) => {
  const { opcionesAgrupadas, setSearchTerm } = useSelectorClientes(showModal);

  const {
    opcionesAgrupadas: opcionesAgrupadasVehiculos,
    setSearchTerm: setSearchTermVehiculo,
  } = useSelectorVehiculos(showModal);

  const {
    cliente_id,
    vehiculo_id,
    detalle_de_trabajos_a_realizar,
    recepcion,
    prometido,
    cambio_de_aceite,
    cambio_de_filtro,
    detalles_de_entrada_del_vehiculo,

    onInputChange,
  } = useForm(createOrdenField);

  const { startSavingOrden } = useOrdenStore();

  const handleInputChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    onInputChange({ target: { name, value: checked } });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cliente_id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe seleccionar un cliente.",
      });
      return;
    }

    if (!vehiculo_id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe seleccionar un vehiculo.",
      });
      return;
    }

    startSavingOrden({
      cliente_id,
      vehiculo_id,
      detalle_de_trabajos_a_realizar,
      recepcion,
      prometido,
      cambio_de_aceite,
      cambio_de_filtro,
      detalles_de_entrada_del_vehiculo,
    });

    Swal.fire(
      "Ok",
      "Orden creada. Se recargará la página para guardar cambios.",
      "success"
    );
    setTimeout(() => {
      location.reload();
    }, 1500);
    handleClose();
  };

  return (
    <>
      {/* Modal para agregar nueva orden */}
      <Modal show={showModal} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Crear Nueva Orden</h4>
            {/* <p className="text-danger small">
              Advertencia: Si la página queda congelada después de cerrar el
              modal, recárguela.
            </p> */}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <div className="mb-2">
                {/* <InputGroup className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Buscar cliente..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup> */}

                <Select
                  options={opcionesAgrupadas}
                  onChange={(selected) =>
                    onInputChange({
                      target: { name: "cliente_id", value: selected.value },
                    })
                  }
                  placeholder="Seleccione un cliente"
                  noOptionsMessage={() => "No se encontraron clientes"}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vehiculo</Form.Label>
              <div className="mb-2">
                {/* SE QUITÓ EL INPUT DE BÚSQUEDA QUE NO HACÍA NADA */}
                <Select
                  options={opcionesAgrupadasVehiculos}
                  onChange={(selected) =>
                    onInputChange({
                      target: { name: "vehiculo_id", value: selected.value },
                    })
                  }
                  placeholder="Seleccione un vehiculo"
                  noOptionsMessage={() => "No se encontraron vehiculos"}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Detalles de trabajos a realizar (Opcional)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="detalle_de_trabajos_a_realizar"
                value={detalle_de_trabajos_a_realizar}
                onChange={onInputChange}
              />
              <Form.Text className="text-muted">
                Este campo es opcional, al dejarse vacío se colocará por defecto
                un 'N/A'.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Recepción</Form.Label>
              <Form.Control
                type="date"
                name="recepcion"
                value={recepcion}
                onChange={onInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Prometida (Opcional)</Form.Label>
              <Form.Control
                type="date"
                name="prometido"
                value={prometido}
                onChange={onInputChange}
              />
              <Form.Text className="text-muted">
                Este campo es opcional, al dejarse vacío se colocará por defecto
                una fecha que el sistema detectará como no definida.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="cambio_de_aceite"
                label="Cambio de aceite"
                checked={cambio_de_aceite}
                onChange={handleInputChangeCheckbox}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="cambio_de_filtro"
                label="Cambio de filtro"
                checked={cambio_de_filtro}
                onChange={handleInputChangeCheckbox}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Detalles de entrada de vehiculo (Opcional)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="detalles_de_entrada_del_vehiculo"
                value={detalles_de_entrada_del_vehiculo}
                onChange={onInputChange}
              />
              <Form.Text className="text-muted">
                Este campo es opcional, al dejarse vacío se colocará por defecto
                un 'N/A'.
              </Form.Text>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button className="btn btn-success" variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
