import React, { useState, useEffect } from "react";
import "../styles/Perfil.css";

const BarraSeguridad = ({ password }) => {
  if (!password) return null;

  const tieneMayus = /[A-Z]/.test(password);
  const tieneMinus = /[a-z]/.test(password);
  const tieneNumero = /\d/.test(password);
  const tieneSimbolo = /[^A-Za-z0-9]/.test(password);
  const longitud = password.length >= 8;

  const score = [tieneMayus, tieneMinus, tieneNumero, tieneSimbolo].filter(Boolean).length + (longitud ? 1 : 0);
  const porcentaje = (score / 5) * 100;

  let color = "red";
  if (porcentaje >= 80) color = "green";
  else if (porcentaje >= 60) color = "orange";

  const texto =
    porcentaje >= 80 ? "Segura" :
    porcentaje >= 60 ? "Media" :
    longitud ? "Débil" : "Muy débil";

  return (
    <div style={{ marginTop: "5px" }}>
      <div style={{
        height: "8px",
        background: "#ccc",
        borderRadius: "4px",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${porcentaje}%`,
          height: "100%",
          backgroundColor: color,
          transition: "width 0.3s ease"
        }}></div>
      </div>
      <small style={{ color }}>{`Seguridad: ${texto}`}</small>
    </div>
  );
};

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

    if (newPassword && newPassword.length < 8) {
      setMessage("La nueva contraseña debe tener al menos 8 caracteres.");
      setMessageType("error");
      return;
    }

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
      headers: { "Content-Type": "application/json" },
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
          <BarraSeguridad password={newPassword} />
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