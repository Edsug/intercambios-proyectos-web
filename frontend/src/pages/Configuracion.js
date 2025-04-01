import React, { useState } from "react";
import "../styles/Configuracion.css";

const Configuracion = () => {
  const [userProfile, setUserProfile] = useState({
    nombre: "admin",
    password: "",
    rol: "Administrador"
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost//basecambios/actualizar_usuario.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Perfil actualizado correctamente");
      } else {
        alert("Error al actualizar perfil: " + result.message);
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
      console.error("Error:", error);
    }
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>⚙️ Configuración</h1>
        <p>Administra tu cuenta.</p>
      </div>
      
      <div className="config-container">
        <div className="config-content">
          <form onSubmit={handleProfileSubmit} className="config-form">
            <div className="form-group">
              <label>Nombre:</label>
              <input 
                type="text" 
                name="nombre" 
                value={userProfile.nombre} 
                onChange={handleProfileChange} 
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input 
                type="password" 
                name="password" 
                value={userProfile.password} 
                onChange={handleProfileChange} 
                required
              />
            </div>
            <div className="form-group">
              <label>Rol:</label>
              <select 
                name="rol" 
                value={userProfile.rol} 
                onChange={handleProfileChange}
                disabled
              >
                <option value="Administrador">Administrador</option>
                <option value="Editor">Editor</option>
                <option value="Visualizador">Visualizador</option>
              </select>
            </div>
            <button type="submit" className="save-button">Guardar Cambios</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
