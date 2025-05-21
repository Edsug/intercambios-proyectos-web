import React from "react";

export default function Programa({ alumno, onChange, catalogos }) {
  return (
    <section>
      <h2>Programa</h2>
      <div className="form-row">
        <label>
          PROGRAMA:
          <select
            name="programa"
            value={alumno.programa||""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione—</option>
            {catalogos.programas.map((p,i)=>(
              <option key={i} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <label>
          FOLIO:
          <input
            name="folio"
            style={{ textTransform: "uppercase" }}
            value={alumno.folio||""}
            onChange={onChange}
          />
        </label>
        <label>
          ESTADO PROGRAMA:
          <select
            name="estado_programa"
            value={alumno.estado_programa||""}
            onChange={onChange}
          >
            <option value="">—Seleccione—</option>
            {catalogos.estados.map((e,i)=>(
              <option key={i} value={e}>{e}</option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
