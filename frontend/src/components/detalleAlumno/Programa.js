import React from "react";
import "../../styles/AlumnoDetail.css";

export default function Programa({ alumno, onChange, catalogos }) {
  return (
    <section>
      <h3>Programa</h3>

      <label>Programa:</label>
      <select name="programa" value={alumno.programa || ''} onChange={onChange}>
        <option value="">Seleccione</option>
        {catalogos.programas.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      <label>Folio:</label>
      <input type="text" name="folio" value={alumno.folio || ''} onChange={onChange} />

      <label>Estado del Programa:</label>
      <input type="text" name="estado_programa" value={alumno.estado_programa || ''} onChange={onChange} />

      <label>Fecha de Registro:</label>
      <input type="date" name="programa_fecha" value={alumno.programa_fecha || ''} onChange={onChange} />
    </section>
  );
}
