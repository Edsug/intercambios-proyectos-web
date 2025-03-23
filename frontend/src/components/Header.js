import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt, FaKey, FaUserEdit, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Header.css";
import headerImage from "../assets/header.png";

const Header = ({ toggleSidebar, isOpen }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  // Cierra el menú si se hace clic fuera de él
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
    <>
      <div className="top-banner">
        <img src={headerImage} alt="Banner" className="header-banner-image" />
      </div>
      <header className="header">
        {/* Botón hamburguesa movido al header */}
        <button 
          className="hamburger-button"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        <div className="header-center">
          <h1 className="app-title">Sistema de Registro de Intercambio</h1>
        </div>

        <div className="user-section" ref={menuRef}>
          <button 
            onClick={toggleUserMenu} 
            className={`user-btn ${userMenuOpen ? 'active' : ''}`}
          >
            <FaUserCircle size={24} />
          </button>

          <div className={`user-menu ${userMenuOpen ? 'visible' : ''}`}>
            <button onClick={closeUserMenu}>
              <FaUserEdit size={16} /> <span>Editar Perfil</span>
            </button>
            <button onClick={closeUserMenu}>
              <FaKey size={16} /> <span>Cambiar Contraseña</span>
            </button>
            <button onClick={handleLogout}>
              <FaSignOutAlt size={16} /> <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;