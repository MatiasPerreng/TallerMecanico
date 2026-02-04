import { useEffect, useState } from "react";
import { Button, Form, Stack, Badge } from "react-bootstrap";
import { ModalCrearUsuario } from "./ModalCrearUsuario";
import { ModalEliminarUsuario } from "./ModalEliminarUsuario";
import { ModalActualizarUsuario } from "./ModalActualizarUsuario";
import { useUsuarioStore } from "../hooks/useUsuarioStore";
import { SpinnerComponent } from "../../../components/SpinnerComponent";
import { useSearch } from "../../../hooks/useSearch";

export const ListaUsuarios = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  const { usuarios, isLoadingUsuarios, startLoadingUsuario } =
    useUsuarioStore();

  const { filteredData, searchTerm, handleSearchChange } = useSearch(usuarios, [
    "name",
    "rol",
    "email",
  ]);

  useEffect(() => {
    startLoadingUsuario();
  }, []);

  const getRolColor = (rol) => {
    switch (rol.toLowerCase()) {
      case "jefe":
        return "primary";
      case "mecánico":
        return "warning";
      case "admin":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container-fluid px-4 py-3 animate__animated animate__fadeIn">
      {/* Encabezado */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h2 mb-1 fw-bold text-primary">Gestión de Usuarios</h1>
          <p className="text-muted mb-0">Administración de acceso y permisos</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="d-flex align-items-center gap-2"
        >
          <i className="bi bi-person-add"></i>
          Registrar nuevo usuario
        </Button>
      </div>

      {/* Buscador */}
      <div className="mb-4">
        <div className="input-group input-group-lg shadow-sm">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <Form.Control
            type="search"
            placeholder="Buscar usuarios..."
            className="border-start-0"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="table-responsive rounded-3">
          <table className="table table-hover align-middle mb-0 table-striped">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col" className="p-3">
                  ID
                </th>
                <th scope="col" className="p-3">
                  Usuario
                </th>
                <th scope="col" className="p-3">
                  Contacto
                </th>
                <th scope="col" className="p-3">
                  Rol
                </th>
                <th scope="col" className="text-end p-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoadingUsuarios ? (
                <SpinnerComponent colSpan={5} />
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-muted">
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                filteredData.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className={`transition-all ${
                      !usuario.disponible ? "table-secondary" : ""
                    }`}
                  >
                    {/* ID */}
                    <td className="p-3 fw-semibold text-muted">
                      #{usuario.id}
                    </td>

                    {/* Información del Usuario */}
                    <td className="p-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="avatar-circle bg-light text-primary">
                          <i className="bi bi-person fs-5"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 fw-semibold">{usuario.name}</h6>
                          {!usuario.disponible && (
                            <Badge pill bg="danger" className="mt-1">
                              Fuera de trabajo
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Contacto */}
                    <td className="p-3">
                      <div className="d-flex flex-column gap-2">
                        <a
                          href={`mailto:${usuario.email}`}
                          className="text-decoration-none d-flex align-items-center gap-2"
                        >
                          <i className="bi bi-envelope"></i>
                          {usuario.email}
                        </a>
                      </div>
                    </td>

                    {/* Rol */}
                    <td className="p-3">
                      <Badge
                        pill
                        bg={getRolColor(usuario.rol)}
                        className="d-flex align-items-center gap-2"
                      >
                        <i
                          className={`bi ${
                            usuario.rol === "Jefe"
                              ? "bi-shield-shaded"
                              : usuario.rol === "Mecánico"
                              ? "bi-tools"
                              : "bi-gear"
                          }`}
                        ></i>
                        <span className="text-capitalize">{usuario.rol}</span>
                      </Badge>
                    </td>

                    {/* Acciones */}
                    <td className="p-3">
                      <Stack
                        gap={2}
                        className="justify-content-end flex-md-row flex-column"
                      >
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="d-flex align-items-center gap-1"
                          onClick={() => {
                            setSelectedUsuario(usuario);
                            setShowUpdateModal(true);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                          <span className="d-none d-md-inline">Editar</span>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="d-flex align-items-center gap-1"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setSelectedUsuario(usuario);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                          <span className="d-none d-md-inline">Borrar</span>
                        </Button>
                      </Stack>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ModalCrearUsuario
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />
      <ModalEliminarUsuario
        showModal={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        usuarioData={selectedUsuario}
      />
      <ModalActualizarUsuario
        showModal={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        usuarioData={selectedUsuario}
      />

      <style>{`
        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #dee2e6;
        }
        
        .transition-all {
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
};
