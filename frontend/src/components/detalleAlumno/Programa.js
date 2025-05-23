// src/components/detalleAlumno/Programa.js

import React, { useState, useEffect } from "react";
import Section from "../common/Section";

export default function Programa({ alumno, onChange }) {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    fetch("http://localhost/basecambios/get_programas.php")
      .then(res => res.json())
      .then(data => setProgramas(data))
      .catch(err => console.error("Error cargando programas:", err));
  }, []);

  return (
    <Section title="Programa" className="programa-section">
      <div className="form-row">
        <label>
          PROGRAMA:
          <select
            name="programa"
            value={alumno.programa || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione—</option>
            {programas.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label>
          FOLIO:
          <input
            name="folio"
            style={{ textTransform: "uppercase" }}
            value={alumno.folio || ""}
            onChange={onChange}
          />
        </label>

        <label>
          ESTADO DEL PROGRAMA:
          <select
            name="estado_programa"
            value={alumno.estado_programa || ""}
            onChange={onChange}
          >
            <option value="">—Seleccione—</option>
            <option value="ACTIVO">ACTIVO</option>
            <option value="CANCELADO">CANCELADO</option>
            <option value="RECHAZADO">RECHAZADO</option>
          </select>
        </label>
      </div>

    </Section>
  );
}
