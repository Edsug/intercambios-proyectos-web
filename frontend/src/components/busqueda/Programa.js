import React from "react";
import Section from "../common/Section";

export default function Programa({ alumno, onChange, catalogos }) {
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
            {catalogos.programas.map((p, i) => (
              <option key={i} value={p}>{p}</option>
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
          ESTADO PROGRAMA:
          <select
            name="estado_programa"
            value={alumno.estado_programa || ""}
            onChange={onChange}
          >
            <option value="">—Seleccione—</option>
            {catalogos.estados.map((e, i) => (
              <option key={i} value={e}>{e}</option>
            ))}
          </select>
        </label>
      </div>
      
      <div className="form-row">
        <label>
          OBSERVACIONES:
          <textarea
            name="programa_observaciones"
            value={alumno.programa_observaciones || ""}
            onChange={onChange}
            placeholder="Ingrese observaciones relacionadas al programa..."
          />
        </label>
      </div>
    </Section>
  );
}