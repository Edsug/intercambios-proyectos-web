// src/components/detalleAlumno/DatosPersonales.js
import React from "react";
import Section from "../common/Section";

export default function DatosPersonales({ alumno, onChange, catalogos }) {
  const {
    niveles,
    carreras,
    maestrias,
    sexos,
    tipos_sangre: tiposSangre,
    nacionalidades
  } = catalogos;

  return (
    <Section title="Datos Personales" className="datos-personales-section">
      {/* Código y Nombre */}
      <div className="form-row">
        <label>
          CÓDIGO:
          <input
            type="text"
            name="codigo"
            value={alumno.codigo || ""}
            onChange={onChange}
            style={{ textTransform: "uppercase" }}
            maxLength={9}
            required
          />
        </label>
        <label>
          NOMBRE(S):
          <input
            type="text"
            name="nombre"
            value={alumno.nombre || ""}
            onChange={onChange}
            style={{ textTransform: "uppercase" }}
            required
          />
        </label>
      </div>

      {/* Apellidos y Nivel académico */}
      <div className="form-row">
        <label>
          APELLIDOS:
          <input
            type="text"
            name="apellidos"
            value={alumno.apellidos || ""}
            onChange={onChange}
            style={{ textTransform: "uppercase" }}
            required
          />
        </label>
        <label>
          NIVEL ACADÉMICO:
          <select
            name="nivel_academico"
            value={alumno.nivel_academico || ""}
            onChange={e => {
              onChange({ target: { name: 'nivel_academico', value: e.target.value } });
              onChange({ target: { name: 'carrera', value: '' } });
              onChange({ target: { name: 'maestria', value: '' } });
            }}
            required
          >
            <option value="">—Seleccione—</option>
            {niveles.map((n, i) => (
              <option key={i} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Carrera o Maestría */}
      {alumno.nivel_academico === "LICENCIATURA" && (
        <div className="form-row">
          <label>
            CARRERA:
            <select
              name="carrera"
              value={alumno.carrera || ""}
              onChange={onChange}
              required
            >
              <option value="">—Seleccione—</option>
              {carreras.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      {alumno.nivel_academico === "MAESTRÍA" && (
        <div className="form-row">
          <label>
            MAESTRÍA:
            <select
              name="maestria"
              value={alumno.maestria || ""}
              onChange={onChange}
              required
            >
              <option value="">—Seleccione—</option>
              {maestrias.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Género, Tipo de Sangre y Nacionalidad */}
      <div className="form-row">
        <label>
          GÉNERO:
          <select
            name="sexo"
            value={alumno.sexo || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione—</option>
            {sexos.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          TIPO DE SANGRE:
          <select
            name="tipo_sangre"
            value={alumno.tipo_sangre || ""}
            onChange={onChange}
          >
            <option value="">—Seleccione—</option>
            {tiposSangre.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          NACIONALIDAD:
          <select
            name="nacionalidad"
            value={alumno.nacionalidad || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione—</option>
            {nacionalidades.map((n, i) => (
              <option key={i} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Fecha de nacimiento, Semestre y Promedio */}
      <div className="form-row">
        <label>
          FECHA NACIMIENTO:
          <input
            type="date"
            name="fecha_nacimiento"
            value={alumno.fecha_nacimiento || ""}
            onChange={onChange}
            required
          />
        </label>
        <label>
          SEMESTRE:
          <input
            type="number"
            name="semestre"
            value={alumno.semestre || ""}
            onChange={onChange}
            min="1"
            max="20"
          />
        </label>
        <label>
          PROMEDIO:
          <input
            type="number"
            name="promedio"
            value={alumno.promedio || ""}
            onChange={onChange}
            step="0.01"
            min="0"
            max="100"
          />
        </label>
      </div>
    </Section>
  );
}
