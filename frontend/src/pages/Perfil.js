import React, { useState } from "react";
import "../styles/Perfil.css";

const Configuracion = () => {
  const [userProfile, setUserProfile] = useState({
    nombre: "admin",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    rol: "Administrador",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (userProfile.newPassword !== userProfile.confirmPassword) {
      alert("Las contraseñas nuevas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost/basecambios/actualizar_usuario.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          currentPassword: userProfile.currentPassword,
          newPassword: userProfile.newPassword,
          rol: userProfile.rol
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Datos actualizados correctamente");
        setUserProfile({ ...userProfile, currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        alert("Error: " + result.message);
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
              <input type="text" name="nombre" value={userProfile.nombre} readOnly />
            </div>
            <div className="form-group">
              <label>Contraseña Actual:</label>
              <input
                type="password"
                name="currentPassword"
                value={userProfile.currentPassword}
                onChange={handleProfileChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Nueva Contraseña:</label>
              <input
                type="password"
                name="newPassword"
                value={userProfile.newPassword}
                onChange={handleProfileChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirmar Nueva Contraseña:</label>
              <input
                type="password"
                name="confirmPassword"
                value={userProfile.confirmPassword}
                onChange={handleProfileChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Rol:</label>
              <select name="rol" value={userProfile.rol} disabled>
                <option value="Administrador">Administrador</option>
                <option value="Editor">Editor</option>
                <option value="Visualizador">Visualizador</option>
              </select>
            </div>
            <button type="submit" className="save-button">Actualizar Datos</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
