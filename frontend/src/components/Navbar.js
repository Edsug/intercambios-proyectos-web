import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartBar, FaFileAlt, FaSearch, FaClipboardList, FaCog, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = ({ onLogout }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    closeUserMenu();
    // Aquí manejas el cierre de sesión, por ejemplo eliminando el token o redirigiendo.
    console.log("Cerrar sesión");
    onLogout(); // Llamamos al callback de cierre de sesión que se pasa desde el componente principal.
    window.location.href = "/login"; // Redirige al login
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard"><FaChartBar /> <span>Dashboard</span></Link>
        </li>
        <li className={location.pathname === "/registro" ? "active" : ""}>
          <Link to="/registro"><FaFileAlt /> <span>Registro</span></Link>
        </li>
        <li className={location.pathname === "/busqueda" ? "active" : ""}>
          <Link to="/busqueda"><FaSearch /> <span>Buscar</span></Link>
        </li>
        <li className={location.pathname === "/reportes" ? "active" : ""}>
          <Link to="/reportes"><FaClipboardList /> <span>Reportes</span></Link>
        </li>
        <li className={location.pathname === "/configuracion" ? "active" : ""}>
          <Link to="/configuracion"><FaCog /> <span>Configuración</span></Link>
        </li>

        {/* Menú de usuario */}
        <div className="user-section" ref={menuRef}>
          <button 
            onClick={toggleUserMenu} 
            className={location.pathname === "/Perfil" ? "active" : ""}
          >
            <FaUserCircle size={24} />
          </button>

          <div className={`user-menu ${userMenuOpen ? 'visible' : ''}`}>
            <Link to="/Perfil">
              <button>
                <FaUserCircle size={16} /> <span>Perfil</span>
              </button>
            </Link>
            <button onClick={handleLogout}>
              <FaSignOutAlt size={16} /> <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
