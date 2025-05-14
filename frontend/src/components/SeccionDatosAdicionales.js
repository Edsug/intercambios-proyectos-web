// components/SeccionDatosAdicionales.js
import React from 'react';

export default function SeccionDatosAdicionales({ formData, handleChange, prevSection, handleSubmit, errores }) {
  return (
    <div className="form-section">
      <h2 className="section-title">Datos Adicionales</h2>
      <div className="section-content">
        <div className="form-row">
          <label>
            <input
              type="checkbox"
              name="REVALIDACION_MATERIAS"
              checked={formData.REVALIDACION_MATERIAS}
              onChange={handleChange}
            /> Revalidación de Materias
          </label>
          {formData.REVALIDACION_MATERIAS && (
            <label>
              DATOS REVALIDACIÓN:
              <textarea
                name="DATOS_REVALIDACION"
                value={formData.DATOS_REVALIDACION}
                onChange={handleChange}
              />
            </label>
          )}
        </div>
        <div className="form-row">
          <label>
            <input
              type="checkbox"
              name="CERTIFICADO_CALIFICACIONES"
              checked={!!formData.CERTIFICADO_CALIFICACIONES}
              onChange={handleChange}
            /> Certificado de Calificaciones
          </label>
        </div>
        <div className="form-row">
          <label>
            <input
              type="checkbox"
              name="CUENTA_CON_ALGUNA_DISCAPACIDAD"
              checked={formData.CUENTA_CON_ALGUNA_DISCAPACIDAD}
              onChange={handleChange}
            /> ¿Cuenta con alguna Discapacidad?
          </label>
          {formData.CUENTA_CON_ALGUNA_DISCAPACIDAD && (
            <label>
              DATOS DISCAPACIDAD:
              <textarea
                name="DATOS_DISCAPACIDAD"
                value={formData.DATOS_DISCAPACIDAD}
                onChange={handleChange}
              />
            </label>
          )}
        </div>
        <div className="form-row">
          <label>
            <input
              type="checkbox"
              name="SEGURO_VIAJE"
              checked={formData.SEGURO_VIAJE}
              onChange={handleChange}
            /> Seguro de Viaje
          </label>
          {formData.SEGURO_VIAJE && (
            <>
              <label>
                ASEGURADORA:
                <input
                  type="text"
                  name="NOMBRE_ASEGURADORA"
                  value={formData.NOMBRE_ASEGURADORA}
                  onChange={handleChange}
                />
              </label>
              <label>
                PÓLIZA:
                <input
                  type="text"
                  name="NUMERO_POLIZA"
                  value={formData.NUMERO_POLIZA}
                  onChange={handleChange}
                />
              </label>
              <label>
                INICIO SEGURO:
                <input
                  type="date"
                  name="FECHA_INICIO_SEGURO"
                  value={formData.FECHA_INICIO_SEGURO}
                  onChange={handleChange}
                />
              </label>
              <label>
                FIN SEGURO:
                <input
                  type="date"
                  name="FECHA_FIN_SEGURO"
                  value={formData.FECHA_FIN_SEGURO}
                  onChange={handleChange}
                />
              </label>
              <label>
                CONTACTO ASEGURADORA:
                <input
                  type="text"
                  name="CONTACTO_ASEGURADORA"
                  value={formData.CONTACTO_ASEGURADORA}
                  onChange={handleChange}
                />
              </label>
              <label>
                OBSERVACIONES SEGURO:
                <textarea
                  name="OBSERVACIONES_SEGURO"
                  value={formData.OBSERVACIONES_SEGURO}
                  onChange={handleChange}
                />
              </label>
            </>
          )}
        </div>
        <div className="form-row">
          <label>
            <input
              type="checkbox"
              name="EXPERIENCIA_COMPARTIDA"
              checked={formData.EXPERIENCIA_COMPARTIDA}
              onChange={handleChange}
            /> Compartir Experiencia
          </label>
          {formData.EXPERIENCIA_COMPARTIDA && (
            <label>
              DETALLES:
              <textarea
                name="DETALLES_EXPERIENCIA"
                value={formData.DETALLES_EXPERIENCIA}
                onChange={handleChange}
              />
            </label>
          )}
        </div>
      </div>
      <div className="form-navigation">
        <button type="button" onClick={prevSection} className="prev-button">Anterior</button>
        <button type="submit" className="submit-button">Enviar</button>
      </div>
    </div>
  );
}
