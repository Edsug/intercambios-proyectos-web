// src/components/configuracion/BarraSeguridad.js
import React from "react";

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

export default BarraSeguridad;
