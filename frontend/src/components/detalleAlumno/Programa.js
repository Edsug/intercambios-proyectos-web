// src/components/detalleAlumno/Programa.js

import React, { useState, useEffect } from "react";
import Section from "../common/Section";

export default function Programa({ alumno, onChange }) {
  const [programas, setProgramas] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    fetch("http://localhost/basecambios/get_programas.php")
      .then(res => res.json())
      .then(data => setProgramas(data))
      .catch(err => console.error("Error cargando programas:", err));

    fetch("http://localhost/basecambios/get_estado_programa.php")
      .then(res => res.json())
      .then(data => setEstados(data))
      .catch(err => console.error("Error cargando estados de programa:", err));
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
            type="text"
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
            required
          >
            <option value="">—Seleccione—</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.nombre}>
                {estado.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>

    </Section>
  );
}
