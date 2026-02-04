import { NavLink } from "react-router-dom";
import "../../../styles/Navbar.css";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { status, user } = useSelector((state) => state.auth);

  return (
    <header className="navbar-main">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid px-4">
          {/* Brand con Logo */}
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center gap-2"
          >
            <img
              src="../../../../../public/logo final.png"
              alt="DataSoft Logo"
              className="brand-logo"
            />
          </NavLink>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav mx-auto">
              {[
                // Elemento estático (siempre visible)
                {
                  to: "/",
                  icon: "speedometer2",
                  text: "Inicio",
                },

                // Login solo visible cuando NO está autenticado
                ...(status !== "authenticated"
                  ? [
                      {
                        to: "/login",
                        icon: "person-workspace",
                        text: "Ingresa como empleado",
                      },
                    ]
                  : []),

                // Panel solo visible cuando ESTÁ autenticado
                ...(status === "authenticated"
                  ? [
                      {
                        to:
                          user.rol === "jefe"
                            ? "/jefe/dashboard"
                            : "/mecanico/dashboard",
                        icon: "person-workspace",
                        text: "Panel",
                      },
                    ]
                  : []),
              ].map((item, index) => (
                <li className="nav-item mx-2" key={index}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center ${
                        isActive ? "active" : ""
                      }`
                    }
                  >
                    <i className={`bi bi-${item.icon} nav-icon`}></i>
                    <span className="nav-text">{item.text}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* User Section */}
          </div>
        </div>
      </nav>
    </header>
  );
};
