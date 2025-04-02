import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaUserEdit, FaBars, FaChartBar, FaFileAlt, FaSearch, FaClipboardList, FaCog } from "react-icons/fa";
import "../styles/Header.css";
import headerImage from "../assets/header.png";

const Header = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    closeUserMenu();
    window.location.reload();
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

  useEffect(() => {
    const handleResize = () => {
      setShowHamburger(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="top-banner">
        <img src={headerImage} alt="Banner" className="header-banner-image" />
      </div>
      <header className="header">
        <div className="header-center">
          <h1 className="app-title">Sistema de Gestión de Alumnos</h1>
        </div>
      </header>
      <nav className="navbar">
        <ul className="navbar-menu">
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <a href="/dashboard"><FaChartBar size={20} /> Dashboard</a>
          </li>
          <li className={location.pathname === "/registro" ? "active" : ""}>
            <a href="/registro"><FaFileAlt size={20} /> Registro</a>
          </li>
          <li className={location.pathname === "/busqueda" ? "active" : ""}>
            <a href="/busqueda"><FaSearch size={20} /> Buscar</a>
          </li>
          <li className={location.pathname === "/reportes" ? "active" : ""}>
            <a href="/reportes"><FaClipboardList size={20} /> Reportes</a>
          </li>
          <li className={location.pathname === "/configuracion" ? "active" : ""}>
            <a href="/configuracion"><FaCog size={20} /> Configuración</a>
          </li>
        </ul>
        <div className="user-section" ref={menuRef}>
          <button onClick={toggleUserMenu} className={`user-btn ${userMenuOpen ? 'active' : ''}`}>
            <FaUserCircle size={24} />
          </button>
          <div className={`user-menu ${userMenuOpen ? 'visible' : ''}`}>
            <button className={location.pathname === "/perfil" ? "active" : ""} onClick={() => navigate("/perfil")}>
              <FaUserEdit size={16} /> <span>Editar Perfil</span>
            </button>
            <button onClick={handleLogout}>
              <FaSignOutAlt size={16} /> <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
        {showHamburger && (
          <button className="hamburger-button" aria-label="Toggle menu">
            <FaBars size={22} />
          </button>
        )}
      </nav>
    </>
  );
};

export default Header;