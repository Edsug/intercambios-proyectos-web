// components/SeccionMovilidad.js
import React from 'react';
import { paises, estadosRepublica } from '../config/config';

export default function SeccionMovilidad({ formData, handleChange, prevSection, nextSection, errores }) {
  return (
    <div className="form-section">
      <h2 className="section-title">Datos de Movilidad</h2>
      <div className="section-content">
        <div className="form-row">
          <label className="select-label">
            TIPO DE MOVILIDAD:
            <select
              name="TIPO_MOVILIDAD"
              value={formData.TIPO_MOVILIDAD}
              onChange={handleChange}
              required
            >
              <option value="">SELECCIONE EL TIPO DE MOVILIDAD</option>
                <option value="ESTACIA ACADEMICA">ESTACIA ACADEMICA</option>
                <option value="ESTANCIA DE INVESTIGACION">ESTANCIA DE INVESTIGACION</option>  
                <option value="ESTANCIA PARA PRACTICAS PROFESIONALES">ESTANCIA PARA PRACTICAS PROFESIONALES</option>
                <option value="ESTANCIAS CORTAS (CURSO DE VERANO O INVIERNO)">ESTANCIAS CORTAS (CURSO DE VERANO O INVIERNO)</option>
                <option value="ESTANCIAS CORTAS PARA INVESTIGACION DE POSGRADOS">ESTANCIAS CORTAS PARA INVESTIGACION DE POSGRADOS</option>
            </select>
            {errores.TIPO_MOVILIDAD && <span className="error-message">{errores.TIPO_MOVILIDAD}</span>}
          </label> 
        </div>
        <div className="form-row">
          <label className="checkbox-label">
            <input
              type="radio"
              name="TIPO_DESTINO"
              value="NACIONAL"
              checked={formData.TIPO_DESTINO === "NACIONAL"}
              onChange={handleChange}
            />
            MOVILIDAD NACIONAL
          </label>
          <label className="checkbox-label">
            <input
              type="radio"
              name="TIPO_DESTINO"
              value="INTERNACIONAL"
              checked={formData.TIPO_DESTINO === "INTERNACIONAL"}
              onChange={handleChange}
              />
              MOVILIDAD INTERNACIONAL
              </label>
          </div>

        <div className="form-row">
          <label>
            INSTITUCIÓN DESTINO:
            <input
              type="text"
              name="INSTITUCION_DESTINO"
              value={formData.INSTITUCION_DESTINO}
              onChange={handleChange}
              required
            />
            {errores.INSTITUCION_DESTINO && <span className="error-message">{errores.INSTITUCION_DESTINO}</span>}
          </label>

        {formData.TIPO_DESTINO === "INTERNACIONAL" ? (
          <label className="select-label">
            PAÍS:
            <select
              name="PAIS"
              value={formData.PAIS}
              onChange={handleChange}
              required
            >
              <option value="">SELECCIONE PAÍS</option>
              {paises.map((p, i) => <option key={i} value={p}>{p}</option>)}
            </select>
            {errores.PAIS && <span className="error-message">{errores.PAIS}</span>}
          </label>
        ) : (
          <label className="select-label">
            ESTADO:
            <select
              name="ESTADO_REPUBLICA"
              value={formData.ESTADO_REPUBLICA}
              onChange={handleChange}
              required
            >
              <option value="">SELECCIONE ESTADO</option>
              {estadosRepublica.map((e, i) => <option key={i} value={e}>{e}</option>)}
            </select>
            {errores.ESTADO_REPUBLICA && <span className="error-message">{errores.ESTADO_REPUBLICA}</span>}
          </label>
        )}
        </div>
        
        <div className="form-row">
          <label>
            FECHA INICIO:
            <input
              type="date"
              name="FECHA_INICIO"
              value={formData.FECHA_INICIO}
              onChange={handleChange}
              required
            />
            {errores.FECHA_INICIO && <span className="error-message">{errores.FECHA_INICIO}</span>}
          </label>
          <label>
            FECHA FIN:
            <input
              type="date"
              name="FECHA_FIN"
              value={formData.FECHA_FIN}
              onChange={handleChange}
              required
            />
            {errores.FECHA_FIN && <span className="error-message">{errores.FECHA_FIN}</span>}
          </label>
        </div>
        <div className="form-row">
          <label>
            OBSERVACIONES:
            <textarea
              name="OBSERVACIONES"
              value={formData.OBSERVACIONES}
              onChange={handleChange}
            />
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

