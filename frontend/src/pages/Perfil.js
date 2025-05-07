import React, { useState, useEffect } from "react";
import "../styles/Perfil.css";

const Perfil = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setNombreUsuario(storedUser.nombre_usuario);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage("Las contraseñas nuevas no coinciden.");
      setMessageType("error");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      setMessage("Usuario no autenticado.");
      setMessageType("error");
      return;
    }

    const response = await fetch("http://localhost/basecambios/actualizar_usuario.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: storedUser.id,
        nombre_usuario: nombreUsuario,
        currentPassword,
        newPassword,
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      setMessage("Perfil actualizado correctamente.");
      setMessageType("success");
      // Actualizar el nombre de usuario en localStorage
      storedUser.nombre_usuario = nombreUsuario;
      localStorage.setItem("user", JSON.stringify(storedUser));
    } else {
      setMessage(data.message);
      setMessageType("error");
    }
  };

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario</label>
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña Actual</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nueva Contraseña</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirmar Nueva Contraseña</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Actualizar Perfil</button>
      </form>
      {message && <p className={messageType}>{message}</p>}
    </div>
  );
};

export default Perfil;
