import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt,  FaUserEdit, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import headerImage from "../assets/header.jpg";

const Header = ({ toggleSidebar, isOpen }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    // Limpia datos de sesión
    localStorage.clear(); // O usa localStorage.removeItem('token') si solo guardas el token
    sessionStorage.clear(); // Si usas sessionStorage
    closeUserMenu();
    window.location.reload();
  };

  const handleNavigate = (path) => {
    closeUserMenu();
    navigate(path);
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

  // Manejo del scroll para ocultar/mostrar el banner
  useEffect(() => {
    const handleScroll = () => {
      const banner = document.querySelector('.top-banner');
      const header = document.querySelector('.header');
      const contentWrapper = document.querySelector('.content-wrapper');
      
      if (window.scrollY > 50) {
        // Ocultar banner y mover header arriba
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-100px)';
        header.style.top = '0';
        
        // Ajustar el espacio para el contenido
        if (contentWrapper) {
          contentWrapper.style.paddingTop = '60px';
        }
      } else {
        // Mostrar banner y mover header abajo
        banner.style.opacity = '1';
        banner.style.transform = 'translateY(0)';
        header.style.top = '100px';
        
        // Restaurar el espacio para el contenido
        if (contentWrapper) {
          contentWrapper.style.paddingTop = '160px';
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="top-banner">
        <a href="http://www.cusur.udg.mx/es/" target="_blank" rel="noopener noreferrer">
          <img src={headerImage} alt="Banner" className="header-banner-image" />
        </a>
      </div>

      <header className="header">
        {/* Botón hamburguesa */}
        <button 
          className="hamburger-button"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        <div className="header-center">
          <h1 className="app-title">Gestion de area de intercambios</h1>
        </div>

        <div className="user-section" ref={menuRef}>
          <button 
            onClick={toggleUserMenu} 
            className={`user-btn ${location.pathname === "/Perfil" ? "active" : ""}`}
          >
            <FaUserCircle size={24} />
          </button>

          <div className={`user-menu ${userMenuOpen ? 'visible' : ''}`}>
            <button onClick={() => handleNavigate("/Perfil")}>
              <FaUserEdit size={16} /> <span>Editar Perfil</span>
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