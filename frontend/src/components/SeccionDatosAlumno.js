// components/SeccionDatosAlumno.js
import React from 'react';
import { carreras } from '../config/config';

export default function SeccionDatosAlumno({ formData, handleChange, handleChangeDynamic, setFormData, errores, prevSection, nextSection }) {
  // Lista de maestrías inline
  const opcionesMaestria = [
    "ADMINISTRACIÓN DE NEGOCIOS",
    "CIENCIAS EN PRODUCCIÓN APÍCOLA",
    "CIENCIA DEL COMPORTAMIENTO CON ORIENTACIÓN EN ALIMENTACIÓN Y NUTRICIÓN",
    "DERECHO",
    "DESARROLLO HUMANO",
    "EDUCACIÓN E INTERCULTURALIDAD",
    "ESTUDIOS RURALES",
    "PSICOLOGÍA CON ORIENTACIÓN EN CALIDAD DE VIDA Y SALUD",
    "MAESTRÍA EN SALUD PÚBLICA",
    "TECNOLOGÍAS PARA EL APRENDIZAJE",
    "GESTIÓN PÚBLICA"
  ];

  return (
    <div className="form-section">
      <h2 className="section-title">Datos del Alumno</h2>
      <div className="section-content">
        <div className="form-row">
          <label>
            CÓDIGO:
            <input
              type="text"
              name="CODIGO"
              value={formData.CODIGO}
              onChange={handleChange}
              placeholder="Código del alumno"
              maxLength={9}
              required
            />
            {errores.CODIGO && <span className="error-message">{errores.CODIGO}</span>}
          </label>
          <label>
            NOMBRE(S):
            <input
              type="text"
              name="NOMBRE"
              value={formData.NOMBRE}
              onChange={handleChange}
              placeholder="Nombre(s) del alumno"
              required
            />
            {errores.NOMBRE && <span className="error-message">{errores.NOMBRE}</span>}
          </label>
        </div>
        <div className="form-row">
          <label>
            APELLIDOS:
            <input
              type="text"
              name="APELLIDOS"
              value={formData.APELLIDOS}
              onChange={handleChange}
              placeholder="Apellidos del alumno"
              required
            />
            {errores.APELLIDOS && <span className="error-message">{errores.APELLIDOS}</span>}
          </label>
          <label className="select-label">
            NIVEL ACADÉMICO:
            <select
              name="NIVEL_ACADEMICO"
              value={formData.NIVEL_ACADEMICO || ''}
              onChange={(e) => {
                const v = e.target.value;
                setFormData({ ...formData, NIVEL_ACADEMICO: v, CARRERA: '' });
              }}
              required
            >
              <option value="">SELECCIONE EL NIVEL ACADÉMICO</option>
              <option value="LICENCIATURA">LICENCIATURA</option>
              <option value="MAESTRÍA">MAESTRÍA</option>
            </select>
            {errores.NIVEL_ACADEMICO && <span className="error-message">{errores.NIVEL_ACADEMICO}</span>}
          </label>
        </div>

        {formData.NIVEL_ACADEMICO === 'LICENCIATURA' && (
          <div className="form-row">
            <label className="select-label">
              CARRERA:
              <select
                name="CARRERA"
                value={formData.CARRERA || ''}
                onChange={handleChange}
                required
              >
                <option value="">SELECCIONE UNA CARRERA</option>
                {carreras.map((c, i) => <option key={i} value={c}>{c}</option>)}
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
                value={formData.MAESTRIA || ''}
                onChange={handleChange}
                required
              >
                <option value="">SELECCIONE UNA MAESTRÍA</option>
                {opcionesMaestria.map((m, i) => <option key={i} value={m}>{m}</option>)}
              </select>
              {errores.MAESTRIA && <span className="error-message">{errores.MAESTRIA}</span>}
            </label>
          </div>
        )}

        <div className="form-row">
          <label>
            SEMESTRE:
            <input
              type="number"
              min="1"
              max="12"
              name="SEMESTRE"
              value={formData.SEMESTRE}
              onChange={handleChange}
              placeholder="Semestre actual"
              required
            />
            {errores.SEMESTRE && <span className="error-message">{errores.SEMESTRE}</span>}
          </label>
          <label>
            PROMEDIO:
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              name="PROMEDIO"
              value={formData.PROMEDIO}
              onChange={handleChange}
              placeholder="Promedio general"
              required
            />
            {errores.PROMEDIO && <span className="error-message">{errores.PROMEDIO}</span>}
          </label>
        </div>
        <div className="form-row">
          <label className="select-label">
            GÉNERO:
            <select
              name="GENERO"
              value={formData.GENERO}
              onChange={handleChange}
              required
            >
              <option value="">SELECCIONE</option>
              <option value="M">MASCULINO</option>
              <option value="F">FEMENINO</option>
            </select>
            {errores.GENERO && <span className="error-message">{errores.GENERO}</span>}
          </label>
          <label>
            FECHA DE NACIMIENTO:
            <input
              type="date"
              name="FECHA_NACIMIENTO"
              value={formData.FECHA_NACIMIENTO}
              onChange={handleChange}
              required
            />
            {errores.FECHA_NACIMIENTO && <span className="error-message">{errores.FECHA_NACIMIENTO}</span>}
          </label>
        </div>
        <div className="form-row">
          <label className="select-label">
            TIPO DE SANGRE:
            <select
              name="TIPO_SANGRE"
              value={formData.TIPO_SANGRE}
              onChange={handleChange}
              required
            >
              <option value="">SELECCIONE</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </label>
          <label>
            NÚMERO DE TELÉFONO:
            <input
              type="tel"
              name="TELEFONO"
              value={formData.TELEFONO}
              onChange={handleChange}
              placeholder="Número de teléfono"
              maxLength={10}
              required
            />
            {errores.TELEFONO && <span className="error-message">{errores.TELEFONO}</span>}
          </label>
        </div>
        <div className="form-row">
          <label>
            CORREO INSTITUCIONAL:
            <input
              type="email"
              name="CORREO"
              value={formData.CORREO}
              onChange={handleChange}
              placeholder="Correo institucional"
              required
            />
            {errores.CORREO && <span className="error-message">{errores.CORREO}</span>}
          </label>
          <label>
            CONTACTO DE EMERGENCIA (TELÉFONO):
            <input
              type="tel"
              name="CONTACTO_EMERGENCIA"
              value={formData.CONTACTO_EMERGENCIA}
              onChange={handleChange}
              placeholder="Teléfono de emergencia"
              maxLength={10}
              required
            />
            {errores.CONTACTO_EMERGENCIA && <span className="error-message">{errores.CONTACTO_EMERGENCIA}</span>}
          </label>
        </div>
        {formData.CONTACTO_EMERGENCIA && (
          <div className="form-row">
            <label>
              NOMBRE DEL CONTACTO DE EMERGENCIA:
              <input
                type="text"
                name="NOMBRE_CONTACTO_EMERGENCIA"
                value={formData.NOMBRE_CONTACTO_EMERGENCIA}
                onChange={handleChange}
                placeholder="Nombre del contacto de emergencia"
                required
              />
              {errores.NOMBRE_CONTACTO_EMERGENCIA && <span className="error-message">{errores.NOMBRE_CONTACTO_EMERGENCIA}</span>}
            </label>
          </div>
        )}
        <div className="form-row">
          <label>
            NÚMERO DE SEGURO SOCIAL (NSS):
            <input
              type="text"
              name="NSS"
              value={formData.NSS}
              onChange={handleChange}
              placeholder="Número de Seguro Social"
              maxLength={11}
              required
            />
            {errores.NSS && <span className="error-message">{errores.NSS}</span>}
          </label>
        </div>
      </div>
      <div className="form-navigation">
        <button type="button" onClick={prevSection} className="prev-button">Anterior</button>
        <button type="button" onClick={nextSection} className="next-button">Siguiente</button>
      </div>
    </div>
  );
}
