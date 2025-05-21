import React from 'react';

export default function SeccionDatosAdicionales({
  formData,
  setFormData,
  handleChange,
  prevSection,
  handleSubmit,
  errores
}) {
  return (
    <div className="form-section">
      <h2 className="section-title">Datos Adicionales</h2>
      <div className="section-content">
        
        {/* Revalidación de materias */}
        <div className="form-row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="REVALIDACION_MATERIAS"
              checked={formData.REVALIDACION_MATERIAS}
              onChange={handleChange}
            /> 
            Revalidación de Materias
          </label>
        </div>
        {formData.REVALIDACION_MATERIAS && (
          <div className="form-row">
            <label>
              DATOS REVALIDACIÓN:
              <textarea
                name="DATOS_REVALIDACION"
                value={formData.DATOS_REVALIDACION}
                onChange={handleChange}
                placeholder="Ingrese detalles sobre la revalidación"
                rows="3"
                style={{ textTransform: "uppercase" }}
              />
            </label>
          </div>
        )}

        {/* Discapacidad */}
        <div className="form-row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="CUENTA_CON_ALGUNA_DISCAPACIDAD"
              checked={formData.CUENTA_CON_ALGUNA_DISCAPACIDAD}
              onChange={handleChange}
            /> 
            Cuenta con alguna Discapacidad
          </label>
        </div>
        {formData.CUENTA_CON_ALGUNA_DISCAPACIDAD && (
          <div className="form-row">
            <label>
              DATOS DISCAPACIDAD:
              <textarea
                name="DATOS_DISCAPACIDAD"
                value={formData.DATOS_DISCAPACIDAD}
                onChange={handleChange}
                placeholder="Ingrese detalles sobre la discapacidad"
                rows="3"
                style={{ textTransform: "uppercase" }}
              />
            </label>
          </div>
        )}

        {/* Seguro de Viaje */}
        <div className="form-row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="SEGURO_VIAJE"
              checked={formData.SEGURO_VIAJE}
              onChange={handleChange}
            /> 
            Seguro de Viaje
          </label>
        </div>
        {formData.SEGURO_VIAJE && (
          <>
            <div className="form-row">
              <label>
                ASEGURADORA:
                <input
                  type="text"
                  name="NOMBRE_ASEGURADORA"
                  value={formData.NOMBRE_ASEGURADORA}
                  onChange={handleChange}
                  placeholder="Nombre de la aseguradora"
                  style={{ textTransform: "uppercase" }}
                  required
                />
              </label>
              <label>
                PÓLIZA:
                <input
                  type="text"
                  name="NUMERO_POLIZA"
                  value={formData.NUMERO_POLIZA}
                  onChange={handleChange}
                  placeholder="Número de póliza"
                  style={{ textTransform: "uppercase" }}
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                INICIO SEGURO:
                <input
                  type="date"
                  name="FECHA_INICIO_SEGURO"
                  value={formData.FECHA_INICIO_SEGURO}
                  onChange={handleChange}
                  required
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
            </div>
            <div className="form-row">
              <label>
                CONTACTO ASEGURADORA:
                <input
                  type="tel"
                  name="CONTACTO_ASEGURADORA"
                  value={formData.CONTACTO_ASEGURADORA}
                  onChange={handleChange}
                  style={{ textTransform: "uppercase" }}
                  placeholder="Teléfono de emergencias"
                  required
                />
              </label>
              <label>
                OBSERVACIONES SEGURO:
                <textarea
                  name="OBSERVACIONES_SEGURO"
                  value={formData.OBSERVACIONES_SEGURO}
                  onChange={handleChange}
                  placeholder="Observaciones sobre el seguro"
                  rows="3"
                  style={{ textTransform: "uppercase" }}
                />
              </label>
            </div>
          </>
        )}

        {/* Compartir experiencia */}
        <div className="form-row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="EXPERIENCIA_COMPARTIDA"
              checked={formData.EXPERIENCIA_COMPARTIDA}
              onChange={handleChange}
            /> 
            Compartir Experiencia
          </label>
        </div>
        {formData.EXPERIENCIA_COMPARTIDA && (
          <div className="form-row">
            <label>
              DETALLES:
              <textarea
                name="DETALLES_EXPERIENCIA"
                value={formData.DETALLES_EXPERIENCIA}
                onChange={handleChange}
                placeholder="Ingrese detalles sobre la experiencia"
                rows="3"
                style={{ textTransform: "uppercase" }}
              />
            </label>
          </div>
        )}
      </div>

      <div className="form-navigation">
        <button type="button" onClick={prevSection} className="prev-button">Anterior</button>
        <button type="submit" className="submit-button">Enviar</button>
      </div>
    </div>
  );
}
