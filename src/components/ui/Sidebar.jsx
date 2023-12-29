import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const { handleLogOut } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
      <header>
        <div className="logo-content">
          <div className="logo">
            <i className="bx bxs-map"></i>
            <span className="logo-name">Medellín Map</span>
          </div>
          <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
        </div>
      </header>

      <hr />
      <div className="menu-bar">
        <div className="menu">
          <ul className="nav">
            <li>
              <Link
                to="/map"
                className={location.pathname === "/map" ? "active" : ""}
              >
                <i className="bx bx-home-alt"></i>
                <span className="link-name">Inicio</span>
              </Link>
              <span className="tooltip">Inicio</span>
            </li>

            <li>
              <Link
                to="/edit-account"
                className={
                  location.pathname === "/edit-account" ? "active" : ""
                }
              >
                <i className="bx bxs-edit"></i>
                <span className="link-name">Editar Cuenta</span>
              </Link>
              <span className="tooltip">Editar Cuenta</span>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li>
            <a onClick={handleLogOut}>
              <i className="bx bx-log-out"></i>
              <span className="link-name">Cerrar Sesión</span>
            </a>
            <span className="tooltip">Cerrar Sesión</span>
          </li>
        </div>
      </div>
    </nav>
  );
};
