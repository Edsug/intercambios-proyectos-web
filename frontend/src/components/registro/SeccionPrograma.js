import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../../config";

export default function SeccionPrograma({ formData, handleChange, nextSection, errores }) {
  const [programas, setProgramas] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}get_programas.php`)
      .then(res => res.json())
      .then(data => setProgramas(data))
      .catch(err => console.error("Error al cargar programas:", err));

    fetch(`${BASE_URL}get_estado_programa.php`)
      .then(res => res.json())
      .then(data => setEstados(data))
      .catch(err => console.error("Error al cargar estados de programa:", err));
  }, []);

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
              {programas.map((nombre, i) => (
                <option key={i} value={nombre}>{nombre}</option>
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
              style={{ textTransform: "uppercase" }}
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
              required
            >
              <option value="">SELECCIONE UN ESTADO</option>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.nombre}>{estado.nombre}</option>
              ))}
            </select>
            {errores.ESTADO && <span className="error-message">{errores.ESTADO}</span>}
          </label>
        </div>
      </div>

      <div className="form-navigation">
        <button type="button" onClick={nextSection} className="next-button">Siguiente</button>
      </div>
    </div>
  );
}
