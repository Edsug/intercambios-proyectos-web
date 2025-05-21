import React, { useState, useEffect } from "react";
import Section from "../common/Section";
import '../../styles/DatosPersonales.css';



export default function DatosPersonales({ alumno, onChange, catalogos }) {
  const [carreras, setCarreras] = useState([]);
  const [maestrias, setMaestrias] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [sexos, setSexos] = useState([]);
  const [tiposSangre, setTiposSangre] = useState([]);

  useEffect(() => {
    setCarreras(catalogos.carreras);
    setMaestrias(catalogos.maestrias);
    setNacionalidades(catalogos.nacionalidades);
    setNiveles(catalogos.niveles);
    setSexos(catalogos.sexos);
    setTiposSangre(catalogos.tiposSangre);
  }, [catalogos]);

  const esLic = alumno.nivel_academico === "LICENCIATURA";
  const esMast = alumno.nivel_academico === "MAESTRÍA";

  return (
    <Section title="Datos Personales" className="datos-personales-section">
      {/* 1️⃣ Código / Nombre */}
      <div className="form-row">
        <label>
          CÓDIGO:
          <input
            name="codigo"
            type="text" 
            value={alumno.codigo || ""}
            onChange={onChange}
            maxLength={9}
            placeholder="Ingrese código"
            required
          />
        </label>
        <label>
          NOMBRE(S):
          <input
            name="nombre"
            type="text"
            style={{ textTransform: "uppercase" }}
            value={alumno.nombre || ""}
            onChange={onChange}
            placeholder="Ingrese nombre(s)"
            required
          />
        </label>
      </div>

      {/* 2️⃣ Apellidos / Nacionalidad */}
      <div className="form-row">
        <label>
          APELLIDOS:
          <input
            type="text"
            style={{ textTransform: "uppercase" }}
            name="apellidos"
            value={alumno.apellidos || ""}
            onChange={onChange}
            placeholder="Ingrese apellidos"
            required
          />
        </label>
        <label>
          NACIONALIDAD:
          <select
            name="nacionalidad"
            value={alumno.nacionalidad || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione una nacionalidad—</option>
            {nacionalidades.map((n, i) => (
              <option key={i} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      {/* 3️⃣ Nivel Académico */}
      <div className="form-row">
        <label>
          NIVEL ACADÉMICO:
          <select
            name="nivel_academico"
            value={alumno.nivel_academico || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione un nivel académico—</option>
            {niveles.map((n, i) => (
              <option key={i} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      {/* 4️⃣ Carrera o Maestría */}
      {esLic && (
        <div className="form-row">
          <label>
            CARRERA:
            <select
              name="carrera"
              value={alumno.carrera || ""}
              onChange={onChange}
              required
            >
              <option value="">—Seleccione una carrera—</option>
              {carreras.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      {esMast && (
        <div className="form-row">
          <label>
            MAESTRÍA:
            <select
              name="maestria"
              value={alumno.maestria || ""}
              onChange={onChange}
              required
            >
              <option value="">—Seleccione una maestría—</option>
              {maestrias.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* 5️⃣ Semestre / Promedio */}
      <div className="form-row">
        <label>
          SEMESTRE:
          <input
            type="number"
            name="semestre"
            value={alumno.semestre ?? ""}
            onChange={onChange}
            min="1" max="12"
            placeholder="Ingrese semestre (1-12)"
            required
          />
        </label>
        <label>
          PROMEDIO:
          <input
            type="number"
            name="promedio"
            value={alumno.promedio ?? ""}
            onChange={onChange}
            step="0.01" min="0" max="100"
            placeholder="Ingrese promedio (0-100)"
            required
          />
        </label>
      </div>

      {/* 6️⃣ Sexo / Fecha de nacimiento */}
      <div className="form-row">
        <label>
          SEXO:
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
          FECHA NAC.:
          <input
            type="date"
            name="fecha_nacimiento"
            value={alumno.fecha_nacimiento || ""}
            onChange={onChange}
            required
          />
        </label>
      </div>

      {/* 7️⃣ Tipo sangre / Teléfono */}
      <div className="form-row">
        <label>
          TIPO SANGRE:
          <select
            name="tipo_sangre"
            value={alumno.tipo_sangre || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione tipo de sangre—</option>
            {tiposSangre.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          TELÉFONO:
          <input
            type="tel"
            name="telefono"
            value={alumno.telefono || ""}
            onChange={onChange}
            maxLength={10}
            placeholder="Ingrese número de teléfono"
            required
          />
        </label>
      </div>

      {/* 8️⃣ Correo / Contacto emergencia */}
      <div className="form-row">
        <label>
          CORREO:
          <input
            type="email"
            style={{ textTransform: "uppercase" }}
            name="correo"
            value={alumno.correo || ""}
            onChange={onChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </label>
        <label>
          CONTACTO EMERGENCIA:
          <input
            type="tel"
            name="contacto_emergencia"
            value={alumno.contacto_emergencia || ""}
            onChange={onChange}
            maxLength={10}
            placeholder="Número para emergencias"
            required
          />
        </label>
      </div>

      {/* 9️⃣ Nombre contacto (condicional) */}
      {alumno.contacto_emergencia && (
        <div className="form-row">
          <label>
            NOMBRE CONTACTO:
            <input
              type="text"
              style={{ textTransform: "uppercase" }}
              name="nombre_contacto_emergencia"
              value={alumno.nombre_contacto_emergencia || ""}
              onChange={onChange}
              placeholder="Nombre de contacto de emergencia"
              required
            />
          </label>
        </div>
      )}

      {/* 🔟 NSS */}
      <div className="form-row">
        <label>
          NSS:
          <input
            type="text"
            style={{ textTransform: "uppercase" }}
            name="nss"
            maxLength={11}
            value={alumno.nss || ""}
            onChange={onChange}
            placeholder="Número de Seguro Social"
            required
          />
        </label>
      </div>
    </Section>
  );
}