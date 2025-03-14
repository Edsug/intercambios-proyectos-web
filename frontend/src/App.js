import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Registro from "./pages/Registro";
import Busqueda from "./pages/Busqueda";
import Reportes from "./pages/Reportes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/registro" element={isAuthenticated ? <Registro /> : <Navigate to="/" />} />
        <Route path="/busqueda" element={isAuthenticated ? <Busqueda /> : <Navigate to="/" />} />
        <Route path="/reportes" element={isAuthenticated ? <Reportes /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
