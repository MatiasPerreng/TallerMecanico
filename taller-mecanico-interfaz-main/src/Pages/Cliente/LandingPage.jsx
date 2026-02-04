import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  ListGroup,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { Layout } from "./components/common/Layout";
import { useBuscadorStore } from "./hooks/useBuscadorStore";
import { SpinnerComponent } from "../../components/SpinnerComponent";

export const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { buscador, isLoadingBuscador, startLoadingBuscador } =
    useBuscadorStore();

  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      if (!searchTerm) return;
      await startLoadingBuscador(searchTerm);
      setError("");
    } catch (error) {
      setError(
        "Error al buscar la orden. Verifica la matrícula e intenta nuevamente."
      );
    }
  };

  return (
    <Layout>
      <div className="p-4 bg-light min-vh-100 animate__animated animate__fadeIn">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <Card className="shadow">
                <Card.Body>
                  <h2 className="mb-4 text-center">
                    Consulta el estado de tu vehículo
                  </h2>

                  {/* Buscador */}
                  <div className="d-flex gap-2 mb-4">
                    <Form.Control
                      type="text"
                      placeholder="Ingresa la matrícula de su vehiculo (ej: AB456CR)"
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value.toUpperCase())
                      }
                      onSubmit={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <Button variant="primary" onClick={handleSearch}>
                      Buscar
                    </Button>
                  </div>

                  {error && <Alert variant="danger">{error}</Alert>}

                  {/* Resultados */}
                  {isLoadingBuscador ? (
                    <SpinnerComponent />
                  ) : (
                    buscador?.results?.map((orden) => (
                      <Card key={orden.id} className="mb-4">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                          <h4 className="mb-0">Orden #{orden.id}</h4>
                          <Badge bg="info">
                            Matrícula: {orden.vehiculo?.matricula}
                          </Badge>
                        </Card.Header>

                        <Card.Body>
                          <ListGroup variant="flush">
                            <ListGroup.Item>
                              <strong>Vehículo:</strong>{" "}
                              {orden.vehiculo?.modelo} - {orden.vehiculo?.color}
                            </ListGroup.Item>

                            <ListGroup.Item>
                              <strong>Matricula:</strong>{" "}
                              {orden.vehiculo?.matricula}
                            </ListGroup.Item>

                            <ListGroup.Item>
                              <strong>Cliente:</strong> {orden.cliente?.nombre}
                            </ListGroup.Item>

                            <ListGroup.Item>
                              <strong>Recepción:</strong>{" "}
                              {new Date(orden.recepcion).toLocaleDateString()}
                            </ListGroup.Item>

                            <ListGroup.Item>
                              <strong>Detalles de entrada:</strong>{" "}
                              {orden.detalles_de_entrada_del_vehiculo}
                            </ListGroup.Item>
                          </ListGroup>

                          <h5 className="mt-4">Tareas en curso</h5>
                          {isLoadingBuscador ? (
                            <SpinnerComponent />
                          ) : orden.tareas?.length > 0 ? (
                            orden.tareas.map((tarea) => (
                              <Card key={tarea.id} className="mb-3">
                                <Card.Body>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <Badge
                                        bg={
                                          tarea.estado_de_trabajo ===
                                          "pendiente"
                                            ? "warning"
                                            : tarea.estado_de_trabajo ===
                                              "en_proceso"
                                            ? "primary"
                                            : "success"
                                        }
                                      >
                                        {tarea.estado_de_trabajo.replace(
                                          "_",
                                          " "
                                        )}
                                      </Badge>
                                      <p className="mt-2 mb-0">
                                        <strong>
                                          Notificación al cliente:
                                        </strong>{" "}
                                        {tarea.notificacion_al_cliente}
                                      </p>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Card>
                            ))
                          ) : (
                            <Alert variant="info" className="mt-3">
                              No hay información hasta el momento.
                            </Alert>
                          )}
                        </Card.Body>
                      </Card>
                    ))
                  )}

                  {buscador?.results?.length === 0 && (
                    <Alert variant="info" className="mt-4">
                      No se encontraron resultados para esta matrícula
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
