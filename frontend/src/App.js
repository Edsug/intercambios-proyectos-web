import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Registro from "./pages/Registro";
import Busqueda from "./pages/Busqueda";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Perfil from "./pages/Perfil";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Agregar o quitar clase en body cuando el sidebar está abierto
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [sidebarOpen]);

  // Componente de diseño para páginas autenticadas
  const AuthenticatedLayout = ({ children }) => (
    <div className="app-container">
      <Header toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
      <div className="dashboard-container">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="dashboard-main">{children}</main>
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
      </Routes>
    </Router>
  );
}

export default App;