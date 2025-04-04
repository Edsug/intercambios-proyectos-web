import React, { useState } from "react";
import "../styles/Perfil.css";

const Perfil = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");  // Nuevo estado para el tipo de mensaje

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmNewPassword) {
      setMessage("Las contraseñas nuevas no coinciden.");
      setMessageType("error");
      return;
    }

    // Enviar la solicitud de cambio de contraseña al backend
    const response = await fetch("http://localhost/basecambios/actualizar_usuario.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        rol: "admin", // Esto puede ser dinámico dependiendo del rol del usuario
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      setMessage("Contraseña actualizada con éxito.");
      setMessageType("success");
    } else {
      setMessage(data.message);
      setMessageType("error");
    }
  };

  return (
    <div>
      <h1>Cambiar contraseña</h1>
      <form onSubmit={handleSubmit}>
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
            required
          />
        </div>
        <div>
          <label>Confirmar Nueva Contraseña</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Actualizar Contraseña</button>
      </form>
      {message && <p className={messageType}>{message}</p>}
    </div>
  );
};

export default Perfil;
