import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Registro from "./pages/Registro";
import Busqueda from "./pages/Busqueda";
import Reportes from "./pages/Reportes";
import Perfil from "./pages/Perfil"; // Ajusta la ruta si es necesario
import Configuracion from "./pages/Configuracion";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Effect to update body class when sidebar state changes
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
    
    // Cleanup function
    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [sidebarOpen]);

  // Effect para manejar el comportamiento del banner durante el scroll
  useEffect(() => {
    const handleScroll = () => {
      const banner = document.querySelector('.top-banner');
      if (banner) {
        if (window.scrollY > 50) {
          banner.classList.add('hidden');
        } else {
          banner.classList.remove('hidden');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Layout component for authenticated pages
  const AuthenticatedLayout = ({ children }) => (
    <div className="app-container">
      <Header toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
      <div className="dashboard-container">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route 
          path="/registro" 
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <Registro />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route 
          path="/busqueda" 
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <Busqueda />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route 
          path="/reportes" 
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <Reportes />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route 
          path="/perfil" 
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <Perfil />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route 
          path="/configuracion" 
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <Configuracion />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;