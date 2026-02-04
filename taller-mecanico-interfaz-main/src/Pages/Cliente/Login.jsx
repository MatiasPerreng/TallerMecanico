import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Layout } from "./components/common/Layout";
import { useForm } from "../../hooks/useForm.js";
import { useAuthStore } from "../../hooks/useAuthStore.js";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export const Login = () => {
  const { loginEmail, loginPassword, onInputChange } = useForm(loginFormFields);
  const { startLogin, errorMessage, isLoadingAuth } = useAuthStore();
  const { status, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Alerta", errorMessage);
    }
  }, [errorMessage]);

  //* Al cambiar a “authenticated” redirigimos según rol
  useEffect(() => {
    if (status === "authenticated") {
      switch (user.rol) {
        case "jefe":
          navigate("/jefe/dashboard", { replace: true });
          break;
        case "mecanico":
          navigate("/mecanico/dashboard", { replace: true });
          break;
        default:
          navigate("/login", { replace: true });
      }
    }
  }, [status, user, navigate]);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  return (
    <Layout>
      <>
        <div
          style={{
            padding: "2rem",
          }}
          className="animate__animated animate__fadeIn"
        >
          <Container>
            <Row className="justify-content-center mt-5">
              <Col md={8} lg={6}>
                <Card
                  className="border-0 shadow-lg"
                  style={{ borderRadius: "1rem" }}
                >
                  <Card.Body className="p-5">
                    {/* Encabezado */}
                    {isLoadingAuth ? (
                      <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3">Cargando</h2>
                        <p className="text-muted">
                          Accediendo al panel principal, por favor espere..
                        </p>
                      </div>
                    ) : (
                      <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3">¿Eres empleado?</h2>
                        <p className="text-muted">
                          Inicia sesión para continuar
                        </p>
                      </div>
                    )}
                    {/* Formulario */}
                    <Form onSubmit={loginSubmit}>
                      {/* Email */}
                      <Form.Group className="mb-4" controlId="formEmail">
                        <Form.Label className="fw-medium">
                          Correo electrónico
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="loginEmail"
                          size="lg"
                          placeholder="nombre@ejemplo.com"
                          value={loginEmail}
                          onChange={onInputChange}
                          required
                        />
                      </Form.Group>

                      {/* Contraseña */}
                      <Form.Group className="mb-4" controlId="formPassword">
                        <Form.Label className="fw-medium">
                          Contraseña
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="loginPassword"
                          size="lg"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={onInputChange}
                          required
                        />
                      </Form.Group>

                      {/* Botón de login */}
                      <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        className="w-100 mb-4"
                      >
                        Iniciar sesión
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    </Layout>
  );
};
