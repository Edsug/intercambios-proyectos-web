import React from "react";
import "../../styles/AlumnoDetail.css";
export default function Movilidad({ alumno, onChange, catalogos }) {
  return (
    <section>
      <h3>Movilidad</h3>

      <label>Tipo de Movilidad:</label>
      <select name="tipo_movilidad" value={alumno.tipo_movilidad || ''} onChange={onChange}>
        <option value="">Seleccione</option>
        {catalogos.tiposMovilidad.map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      <label>Tipo de Destino:</label>
      <select name="tipo_destino" value={alumno.tipo_destino || ''} onChange={onChange}>
        <option value="">Seleccione</option>
        {catalogos.tiposDestino.map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      <label>Institución Destino:</label>
      <input type="text" name="institucion_destino" value={alumno.institucion_destino || ''} onChange={onChange} />

      <label>País:</label>
      <select name="pais" value={alumno.pais || ''} onChange={onChange}>
        <option value="">Seleccione</option>
        {catalogos.paises.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      <label>Estado:</label>
      <select name="estado" value={alumno.estado || ''} onChange={onChange}>
        <option value="">Seleccione</option>
        {catalogos.estados.map(e => <option key={e} value={e}>{e}</option>)}
      </select>

      <label>Fecha de Inicio:</label>
      <input type="date" name="fecha_inicio" value={alumno.fecha_inicio || ''} onChange={onChange} />

      <label>Fecha de Fin:</label>
      <input type="date" name="fecha_fin" value={alumno.fecha_fin || ''} onChange={onChange} />

      <label>Observaciones:</label>
      <textarea name="observaciones_movilidad" value={alumno.observaciones_movilidad || ''} onChange={onChange} />
    </section>
  );
}
