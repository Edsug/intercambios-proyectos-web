import React, { useEffect, useState } from 'react';

export default function SeccionMovilidad({
  formData,
  handleChange,
  prevSection,
  nextSection,
  errores
}) {
  const [tiposMovilidad, setTiposMovilidad] = useState([]);
  const [paises, setPaises] = useState([]);
  const [estadosRepublica, setEstadosRepublica] = useState([]);
  const [ciclosAnio, setCiclosAnio] = useState([]); // años únicos
  const [ciclosPorAnio, setCiclosPorAnio] = useState({}); // {2024: ['A','B'], 2025: ['A']...}

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

    fetch('http://localhost/basecambios/get_ciclos.php')
      .then(res => res.json())
      .then(ciclos => {
        // ciclos es un array de strings tipo "2024A", "2024B", "2025A", etc.
        const aniosUnicos = [...new Set(ciclos.map(c => c.substring(0, 4)))];
        setCiclosAnio(aniosUnicos);

        // Construir objeto {2024: ['A','B'], 2025: ['A'], ...}
        const porAnio = {};
        ciclos.forEach(c => {
          const anio = c.substring(0, 4);
          const ab = c.substring(4);
          if (!porAnio[anio]) porAnio[anio] = [];
          if (!porAnio[anio].includes(ab)) porAnio[anio].push(ab);
        });
        setCiclosPorAnio(porAnio);

        if (formData.CICLO && formData.CICLO.length === 5) {
          const anio = formData.CICLO.slice(0, 4);
          const ab = formData.CICLO.slice(4);
          handleChange({ target: { name: "CICLO_SEMESTRAL_ANIO", value: anio } });
          handleChange({ target: { name: "CICLO_SEMESTRAL_AB", value: ab } });
          handleChange({ target: { name: "CICLO_SEMESTRAL", value: formData.CICLO } });
        }
      })
      .catch(console.error);
  }, [formData.CICLO, handleChange]);

  // Obtener semestres disponibles para el año seleccionado
  const semestresDisponibles = ciclosPorAnio[formData.CICLO_SEMESTRAL_ANIO] || [];

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
              {tiposMovilidad.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
            {errores.TIPO_MOVILIDAD && <span className="error-message">{errores.TIPO_MOVILIDAD}</span>}
          </label>
          

          <label>
            CICLO ACADÉMICO:
            <div style={{ display: "flex", gap: "8px" }}>
              <select
                value={formData.CICLO_SEMESTRAL_ANIO || ""}
                onChange={e => {
                  const anio = e.target.value;
                  const ab = ""; // Limpiar semestre al cambiar año
                  const ciclo = "";
                  handleChange({ target: { name: "CICLO_SEMESTRAL_ANIO", value: anio } });
                  handleChange({ target: { name: "CICLO_SEMESTRAL_AB", value: ab } });
                  handleChange({ target: { name: "CICLO_SEMESTRAL", value: ciclo } });
                  handleChange({ target: { name: "CICLO", value: ciclo } });
                }}
                required
                style={{ flex: 1 }}
              >
                <option value="">Año</option>
                {ciclosAnio.map((anio, i) => (
                  <option key={i} value={anio}>{anio}</option>
                ))}
              </select>

              <select
                value={formData.CICLO_SEMESTRAL_AB || ""}
                onChange={e => {
                  const ab = e.target.value;
                  const anio = formData.CICLO_SEMESTRAL_ANIO || "";
                  const ciclo = anio && ab ? `${anio}${ab}` : "";
                  handleChange({ target: { name: "CICLO_SEMESTRAL_AB", value: ab } });
                  handleChange({ target: { name: "CICLO_SEMESTRAL", value: ciclo } });
                  handleChange({ target: { name: "CICLO", value: ciclo } });
                }}
                required
                style={{ flex: 1 }}
                disabled={!formData.CICLO_SEMESTRAL_ANIO}
              >
                <option value="">Semestre</option>
                {semestresDisponibles.length === 2 && (
                  <>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </>
                )}
                {semestresDisponibles.length === 1 && semestresDisponibles[0] === "A" && (
                  <option value="A">A</option>
                )}
                {semestresDisponibles.length === 1 && semestresDisponibles[0] === "B" && (
                  <option value="B">B</option>
                )}
              </select>
            </div>
            {errores.CICLO && <span className="error-message">{errores.CICLO}</span>}
          </label>
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

        {/* Institución destino + país o estado */}
        <div className="form-row">
          <label>
            INSTITUCIÓN DESTINO:
            <input
              type="text"
              name="INSTITUCION_DESTINO"
              style={{ textTransform: "uppercase" }}
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
                {paises.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
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
                {estadosRepublica.map((e, i) => (
                  <option key={i} value={e}>{e}</option>
                ))}
              </select>
              {errores.ESTADO_REPUBLICA && <span className="error-message">{errores.ESTADO_REPUBLICA}</span>}
            </label>
          )}
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

        {/* Observaciones */}
        <div className="form-row">
          <label>
            OBSERVACIONES:
            <textarea
              name="OBSERVACIONES"
              style={{ textTransform: "uppercase" }}
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
