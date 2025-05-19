import React, { useState, useEffect } from 'react';

export default function SeccionDatosAlumno({
  formData,
  handleChange,
  setFormData,
  errores,
  prevSection,
  nextSection
}) {
  const [carreras, setCarreras] = useState([]);
  const [maestrias, setMaestrias] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);

  useEffect(() => {
    fetch('http://localhost/basecambios/get_carreras.php')
      .then(r => r.json()).then(setCarreras).catch(console.error);
    fetch('http://localhost/basecambios/get_maestrias.php')
      .then(r => r.json()).then(setMaestrias).catch(console.error);
    fetch('http://localhost/basecambios/get_nacionalidades.php')
      .then(r => r.json()).then(setNacionalidades).catch(console.error);
  }, []);

  return (
    <div className="form-section">
      <h2 className="section-title">Datos del Alumno</h2>
      <div className="section-content">

        {/* 1️⃣ Código / Nombre(s) */}
        <div className="form-row">
          <label>
            CÓDIGO:
            <input
              type="text" name="CODIGO"
              value={formData.CODIGO}
              onChange={handleChange}
              maxLength={9} required />
            {errores.CODIGO && <span className="error-message">{errores.CODIGO}</span>}
          </label>
          <label>
            NOMBRE(S):
            <input
              type="text" name="NOMBRE"
              value={formData.NOMBRE}
              onChange={handleChange} required />
            {errores.NOMBRE && <span className="error-message">{errores.NOMBRE}</span>}
          </label>
        </div>

        {/* 2️⃣ Apellidos / Nivel Académico */}
        <div className="form-row">
          <label>
            APELLIDOS:
            <input
              type="text" name="APELLIDOS"
              value={formData.APELLIDOS}
              onChange={handleChange} required />
            {errores.APELLIDOS && <span className="error-message">{errores.APELLIDOS}</span>}
          </label>
          <label className="select-label">
            NIVEL ACADÉMICO:
            <select
              name="NIVEL_ACADEMICO"
              value={formData.NIVEL_ACADEMICO}
              onChange={e => {
                const v = e.target.value;
                setFormData({ ...formData,
                  NIVEL_ACADEMICO: v,
                  CARRERA: '',
                  MAESTRIA: ''
                });
              }}
              required
            >
              <option value="">—Seleccione—</option>
              <option value="LICENCIATURA">LICENCIATURA</option>
              <option value="MAESTRÍA">MAESTRÍA</option>
            </select>
            {errores.NIVEL_ACADEMICO && <span className="error-message">{errores.NIVEL_ACADEMICO}</span>}
          </label>
        </div>

        {/* 3️⃣ Carrera o Maestría */}
        {formData.NIVEL_ACADEMICO === 'LICENCIATURA' && (
          <div className="form-row">
            <label className="select-label">
              CARRERA:
              <select
                name="CARRERA"
                value={formData.CARRERA}
                onChange={handleChange}
                required
              >
                <option value="">—Seleccione—</option>
                {carreras.map((c,i) => <option key={i} value={c}>{c}</option>)}
              </select>
              {errores.CARRERA && <span className="error-message">{errores.CARRERA}</span>}
            </label>
          </div>
        )}
        {formData.NIVEL_ACADEMICO === 'MAESTRÍA' && (
          <div className="form-row">
            <label className="select-label">
              MAESTRÍA:
              <select
                name="MAESTRIA"
                value={formData.MAESTRIA}
                onChange={handleChange}
                required
              >
                <option value="">—Seleccione—</option>
                {maestrias.map((m,i) => <option key={i} value={m}>{m}</option>)}
              </select>
              {errores.MAESTRIA && <span className="error-message">{errores.MAESTRIA}</span>}
            </label>
          </div>
        )}

        {/* 4️⃣ Nacionalidad */}
        <div className="form-row">
          <label className="select-label">
            NACIONALIDAD:
            <select
              name="NACIONALIDAD"
              value={formData.NACIONALIDAD}
              onChange={handleChange}
              required
            >
              <option value="">—Seleccione—</option>
              {nacionalidades.map((n,i) => <option key={i} value={n}>{n}</option>)}
            </select>
            {errores.NACIONALIDAD && <span className="error-message">{errores.NACIONALIDAD}</span>}
          </label>
        </div>

        {/* 5️⃣ Semestre / Promedio */}
        <div className="form-row">
          <label>
            SEMESTRE:
            <input
              type="number" name="SEMESTRE"
              value={formData.SEMESTRE}
              onChange={handleChange}
              min="1" max="12" required />
            {errores.SEMESTRE && <span className="error-message">{errores.SEMESTRE}</span>}
          </label>
          <label>
            PROMEDIO:
            <input
              type="number" name="PROMEDIO"
              value={formData.PROMEDIO}
              onChange={handleChange}
              step="0.01" min="0" max="100" required />
            {errores.PROMEDIO && <span className="error-message">{errores.PROMEDIO}</span>}
          </label>
        </div>

        {/* 6️⃣ Género / Fecha de nacimiento */}
        <div className="form-row">
          <label className="select-label">
            GÉNERO:
            <select
              name="SEXO"
              value={formData.SEXO}
              onChange={handleChange}
              required
            >
              <option value="">—Seleccione—</option>
              <option value="M">MASCULINO</option>
              <option value="F">FEMENINO</option>
            </select>
            {errores.SEXO && <span className="error-message">{errores.SEXO}</span>}
          </label>
          <label>
            FECHA DE NACIMIENTO:
            <input
              type="date" name="FECHA_NACIMIENTO"
              value={formData.FECHA_NACIMIENTO}
              onChange={handleChange}
              required
            />
            {errores.FECHA_NACIMIENTO && <span className="error-message">{errores.FECHA_NACIMIENTO}</span>}
          </label>
        </div>

        {/* 7️⃣ Tipo de sangre / Teléfono */}
        <div className="form-row">
          <label className="select-label">
            TIPO DE SANGRE:
            <select
              name="TIPO_SANGRE"
              value={formData.TIPO_SANGRE}
              onChange={handleChange}
              required
            >
              <option value="">—Seleccione—</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errores.TIPO_SANGRE && <span className="error-message">{errores.TIPO_SANGRE}</span>}
          </label>
          <label>
            TELÉFONO:
            <input
              type="tel" name="TELEFONO"
              value={formData.TELEFONO}
              onChange={handleChange}
              maxLength={10} required
            />
            {errores.TELEFONO && <span className="error-message">{errores.TELEFONO}</span>}
          </label>
        </div>

        {/* 8️⃣ Correo / Contacto emergencia */}
        <div className="form-row">
          <label>
            CORREO:
            <input
              type="email" name="CORREO"
              value={formData.CORREO}
              onChange={handleChange}
              required
            />
            {errores.CORREO && <span className="error-message">{errores.CORREO}</span>}
          </label>
          <label>
            CONTACTO EMERGENCIA:
            <input
              type="tel" name="CONTACTO_EMERGENCIA"
              value={formData.CONTACTO_EMERGENCIA}
              onChange={handleChange}
              maxLength={10} required
            />
            {errores.CONTACTO_EMERGENCIA && <span className="error-message">{errores.CONTACTO_EMERGENCIA}</span>}
          </label>
        </div>

        {/* 9️⃣ Nombre contacto emergencia (si existe teléfono) */}
        {formData.CONTACTO_EMERGENCIA && (
          <div className="form-row">
            <label>
              NOMBRE CONTACTO:
              <input
                type="text" name="NOMBRE_CONTACTO_EMERGENCIA"
                value={formData.NOMBRE_CONTACTO_EMERGENCIA}
                onChange={handleChange}
                required
              />
              {errores.NOMBRE_CONTACTO_EMERGENCIA &&
               <span className="error-message">{errores.NOMBRE_CONTACTO_EMERGENCIA}</span>}
            </label>
          </div>
        )}

        {/* 🔟 NSS */}
        <div className="form-row">
          <label>
            NÚMERO DE SEGURO SOCIAL (NSS):
            <input
              type="text" name="NSS"
              value={formData.NSS}
              onChange={handleChange}
              maxLength={11} required
            />
            {errores.NSS && <span className="error-message">{errores.NSS}</span>}
          </label>
        </div>

      </div>

      <div className="form-navigation">
        <button type="button" onClick={prevSection} className="prev-button">
          Anterior
        </button>
        <button type="button" onClick={nextSection} className="next-button">
          Siguiente
        </button>
      </div>
    </div>
  );
}
