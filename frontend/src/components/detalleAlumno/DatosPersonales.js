import React from "react";
import "../../styles/DatosPersonales.css";
export default function DatosPersonales({ alumno, onChange, catalogos }) {
  return (
    <section>
      <h3>Datos Personales</h3>

      <label>Nombre:</label>
      <input type="text" name="nombre" value={alumno.nombre || ''} onChange={onChange} />

      <label>Apellidos:</label>
      <input type="text" name="apellidos" value={alumno.apellidos || ''} onChange={onChange} />

      <label>Nivel Académico:</label>
      <select name="nivel_academico" value={alumno.nivel_academico || ''} onChange={onChange}>
        <option value="">Seleccione</option>
        {catalogos.niveles.map(n => <option key={n} value={n}>{n}</option>)}
      </select>

      <label>Carrera:</label>
      <select name="carrera" value={alumno.carrera || ''} onChange={onChange}>
        <option value="">Seleccione</option>
        {catalogos.carreras.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <label>Maestría:</label>
      <select name="maestria" value={alumno.maestria || ''} onChange={onChange}>
        <option value="">Seleccione</option>
        {catalogos.maestrias.map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      <label>Sexo:</label>
      <select name="sexo" value={alumno.sexo || ''} onChange={onChange}>
        <option value="">Seleccione</option>
        {catalogos.sexos.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <label>Tipo de Sangre:</label>
      <select name="tipo_sangre" value={alumno.tipo_sangre || ''} onChange={onChange}>
        <option value="">Seleccione</option>
        {catalogos.tiposSangre.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      <label>Fecha de Nacimiento:</label>
      <input type="date" name="fecha_nacimiento" value={alumno.fecha_nacimiento || ''} onChange={onChange} />

      <label>Semestre:</label>
      <input type="number" name="semestre" value={alumno.semestre || ''} onChange={onChange} min="1" max="20" />

      <label>Promedio:</label>
      <input type="number" step="0.01" name="promedio" value={alumno.promedio || ''} onChange={onChange} />

      <label>Teléfono:</label>
      <input type="text" name="telefono" value={alumno.telefono || ''} onChange={onChange} />

      <label>Correo:</label>
      <input type="email" name="correo" value={alumno.correo || ''} onChange={onChange} />

      <label>Contacto Emergencia:</label>
      <input type="text" name="nombre_contacto_emergencia" value={alumno.nombre_contacto_emergencia || ''} onChange={onChange} />

      <label>Tel. Emergencia:</label>
      <input type="text" name="contacto_emergencia" value={alumno.contacto_emergencia || ''} onChange={onChange} />

      <label>NSS:</label>
      <input type="text" name="nss" value={alumno.nss || ''} onChange={onChange} />
    </section>
  );
}
