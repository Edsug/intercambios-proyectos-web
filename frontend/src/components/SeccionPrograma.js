// components/SeccionPrograma.js
import React from 'react';
import { programasPredefinidos } from '../config/config';

export default function SeccionPrograma({ formData, handleChange, nextSection, errores }) {
  return (
    <div className="form-section">
      <h2 className="section-title">Programa</h2>
      <div className="section-content">
        <div className="form-row">
          <label className="select-label">
            PROGRAMA:
            <select
              name="PROGRAMA"
              value={formData.PROGRAMA}
              onChange={handleChange}
              required
            >
              <option value="">SELECCIONE UN PROGRAMA</option>
              {programasPredefinidos.map((programa, i) => (
                <option key={i} value={programa}>{programa}</option>
              ))}
            </select>
            {errores.PROGRAMA && <span className="error-message">{errores.PROGRAMA}</span>}
          </label>
          <label>
            FOLIO:
            <input
              type="text"
              name="FOLIO"
              value={formData.FOLIO}
              onChange={handleChange}
              placeholder="Ej. MOV-2025A-001"
              required
            />
            {errores.FOLIO && <span className="error-message">{errores.FOLIO}</span>}
          </label>
        </div>
        <div className="form-row">
          <label className="select-label">
            ESTADO:
            <select
              name="ESTADO"
              value={formData.ESTADO}
              onChange={handleChange}
            >
              <option value="ACTIVO">ACTIVO</option>
              <option value="CANCELADO">CANCELADO</option>
              <option value="RECHAZADO">RECHAZADO</option>
            </select>
          </label>
        </div>
      </div>
      <div className="form-navigation">
        <button type="button" onClick={nextSection} className="next-button">Siguiente</button>
      </div>
    </div>
  );
}
