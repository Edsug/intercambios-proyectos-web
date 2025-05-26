// components/SeccionMovilidad.js
import React, { useEffect, useState } from 'react';

export default function SeccionMovilidad({
  formData,
  handleChange,
  prevSection,
  nextSection,
  errores
}) {
  const [tiposMovilidad, setTiposMovilidad]     = useState([]);
  const [paises, setPaises]                     = useState([]);
  const [estadosRepublica, setEstadosRepublica] = useState([]);
  const [ciclos, setCiclos]                     = useState([]);

  useEffect(() => {
    fetch('http://localhost/basecambios/get_tipos_movilidad.php')
      .then(res => res.json())
      .then(setTiposMovilidad)
      .catch(console.error);

    fetch('http://localhost/basecambios/get_paises.php')
      .then(res => res.json())
      .then(setPaises)
      .catch(console.error);

    fetch('http://localhost/basecambios/get_estadogeo.php')
      .then(res => res.json())
      .then(setEstadosRepublica)
      .catch(console.error);

    // Obtener ciclos académicos
    fetch('http://localhost/basecambios/get_ciclos.php')
      .then(res => res.json())
      .then(setCiclos)
      .catch(console.error);
  }, []);

  return (
    <div className="form-section">
      <h2 className="section-title">Datos de Movilidad</h2>
      <div className="section-content">

        {/* Ciclo académico */}
        <div className="form-row">
          <label className="select-label">
            CICLO:
            <select
              name="CICLO"
              value={formData.CICLO}
              onChange={handleChange}
              required
            >
              <option value="">SELECCIONE CICLO</option>
              {ciclos.map((ciclo, i) => (
                <option key={i} value={ciclo}>{ciclo}</option>
              ))}
            </select>
            {errores.CICLO && (
              <span className="error-message">{errores.CICLO}</span>
            )}
          </label>
        </div>

        {/* Tipo de Movilidad */}
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
              {tiposMovilidad.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
          </label>
          {errores.TIPO_MOVILIDAD && (
            <span className="error-message">{errores.TIPO_MOVILIDAD}</span>
          )}
        </div>

        {/* Nacional vs Internacional */}
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

        {/* Institución + País o Estado */}
        <div className="form-row">
          <label>
            INSTITUCIÓN DESTINO:
            <input
              type="text"
              style={{ textTransform: "uppercase" }}
              name="INSTITUCION_DESTINO"
              value={formData.INSTITUCION_DESTINO}
              onChange={handleChange}
              required
            />
          </label>
          {errores.INSTITUCION_DESTINO && (
            <span className="error-message">{errores.INSTITUCION_DESTINO}</span>
          )}

          {formData.TIPO_DESTINO === "INTERNACIONAL"
            ? (
              <label className="select-label">
                PAÍS:
                <select
                  name="PAIS"
                  value={formData.PAIS}
                  onChange={handleChange}
                  required
                >
                  <option value="">SELECCIONE PAÍS</option>
                  {paises.map((p, i) => (
                    <option key={i} value={p}>{p}</option>
                  ))}
                </select>
                {errores.PAIS && (
                  <span className="error-message">{errores.PAIS}</span>
                )}
              </label>
            )
            : (
              <label className="select-label">
                ESTADO:
                <select
                  name="ESTADO_REPUBLICA"
                  value={formData.ESTADO_REPUBLICA}
                  onChange={handleChange}
                  required
                >
                  <option value="">SELECCIONE ESTADO</option>
                  {estadosRepublica.map((e, i) => (
                    <option key={i} value={e}>{e}</option>
                  ))}
                </select>
                {errores.ESTADO_REPUBLICA && (
                  <span className="error-message">{errores.ESTADO_REPUBLICA}</span>
                )}
              </label>
            )
          }
        </div>

        {/* Fechas */}
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
            {errores.FECHA_INICIO && (
              <span className="error-message">{errores.FECHA_INICIO}</span>
            )}
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
            {errores.FECHA_FIN && (
              <span className="error-message">{errores.FECHA_FIN}</span>
            )}
          </label>
        </div>

        {/* Observaciones */}
        <div className="form-row">
          <label>
            OBSERVACIONES:
            <textarea
              style={{ textTransform: "uppercase" }}
              name="OBSERVACIONES"
              value={formData.OBSERVACIONES}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      {/* Navegación */}
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
