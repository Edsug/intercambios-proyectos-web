// components/SeccionDatosBeca.js
import React from 'react';

export default function SeccionDatosBeca({ formData, handleChange, prevSection, nextSection, errores }) {
  return (
    <div className="form-section">
      <h2 className="section-title">Datos de Beca</h2>
      <div className="section-content">

        {/* Opción 1: Beca Cusur */}
        <div className="form-row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="BECADO_CUSUR"
              checked={formData.BECADO_CUSUR}
              onChange={handleChange}
            /> 
          BECA CUSUR
          </label>
        </div>
        {formData.BECADO_CUSUR && (
          <div className="for">
            <label>
              MONTO OBTENIDO:
                <input 
                  type="number" 
                  name="MONTO_CUSUR" 
                  value={formData.MONTO_CUSUR} 
                  onChange={handleChange} 
                  placeholder="Monto en MXN"
                  required 
                />
              {errores.MONTO_CUSUR && <span className="error-message">{errores.MONTO_CUSUR}</span>}
            </label>
            <label>
              DETALLES EXTRAS:
                <textarea 
                  name="DETALLES_CUSUR" 
                  value={formData.DETALLES_CUSUR} 
                  onChange={handleChange} 
                  placeholder="Detalles adicionales sobre la beca"
                  rows="3"
                />
            </label>
          </div>
        )}
        
        {/* Opción 2: Becas CGCI */}
        <div className="form-row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="BECADO_CGCI"
              checked={formData.BECADO_CGCI}
              onChange={handleChange}
            /> BECADO CGCI
          </label>
        
          {formData.BECADO_CGCI && (
            <label>
              NÚMERO BECAS CGCI:
              <input
                type="number"
                name="NUMERO_BECAS_CGCI"
                value={formData.NUMERO_BECAS_CGCI}
                onChange={handleChange}
              />
              {errores.NUMERO_BECAS_CGCI && <span className="error-message">{errores.NUMERO_BECAS_CGCI}</span>}
            </label>
          )}
        </div>

        
        <div className="form-row">
          <label>
            <input
              type="checkbox"
              name="BECADO_PROGRAMA"
              checked={formData.BECADO_PROGRAMA}
              onChange={handleChange}
            /> BECADO PROGRAMA
          </label>
          {formData.BECADO_PROGRAMA && (
            <>
              <label>
                MONTO PROGRAMA:
                <input
                  type="text"
                  name="MONTO_PROGRAMA"
                  value={formData.MONTO_PROGRAMA}
                  onChange={handleChange}
                />
              </label>
              <label>
                DETALLES PROGRAMA:
                <textarea
                  name="DETALLES_PROGRAMA"
                  value={formData.DETALLES_PROGRAMA}
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
              name="BECADO_EXTERNO"
              checked={formData.BECADO_EXTERNO}
              onChange={handleChange}
            /> BECADO EXTERNO
          </label>
          {formData.BECADO_EXTERNO && (
            <label>
              NÚMERO BECAS EXTERNAS:
              <input
                type="number"
                name="NUMERO_BECAS_EXTERNAS"
                value={formData.NUMERO_BECAS_EXTERNAS}
                onChange={handleChange}
              />
              {errores.NUMERO_BECAS_EXTERNAS && <span className="error-message">{errores.NUMERO_BECAS_EXTERNAS}</span>}
            </label>
          )}
        </div>
      </div>
      <div className="form-navigation">
        <button type="button" onClick={prevSection} className="prev-button">Anterior</button>
        <button type="button" onClick={nextSection} className="next-button">Siguiente</button>
      </div>
    </div>
  );
}
