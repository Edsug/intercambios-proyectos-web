// src/components/detalleAlumno/Movilidad.js

import React from "react";
import Section from "../common/Section";

export default function Movilidad({ alumno, onChange, catalogos }) {
  const tiposMov     = catalogos.tiposMovilidad ?? catalogos.tipos_movilidad ?? [];
  const tiposDest    = catalogos.tiposDestino ?? catalogos.tipos_destino ?? [];
  const paisesArr    = catalogos.paises ?? [];
  const estadosArr   = catalogos.estados ?? [];
  const ciclosArr    = catalogos.ciclos ?? []; // ✅ Ciclos académicos

  const mapToNames = (arr) =>
    arr.map(item => (item && typeof item === 'object' && 'nombre' in item ? item.nombre : item));

  const movilidadOptions = mapToNames(tiposMov);
  const destinoOptions   = mapToNames(tiposDest);
  const paisOptions      = mapToNames(paisesArr);
  const estadoOptions    = mapToNames(estadosArr);
  const cicloOptions     = mapToNames(ciclosArr); // ✅ Normaliza ciclos

  const tipoDestSeleccionado = (alumno.tipo_destino || '').toLowerCase();
  const esNacional      = tipoDestSeleccionado === 'nacional';
  const esInternacional = tipoDestSeleccionado === 'internacional';

  return (
    <Section title="Movilidad" className="movilidad-section">
      {/* Ciclo académico */}
      <div className="form-row">
        <label>
          CICLO:
          <select
            name="ciclo"
            value={alumno.ciclo || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione—</option>
            {cicloOptions.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Tipo de movilidad y destino */}
      <div className="form-row">
        <label>
          TIPO DE MOVILIDAD:
          <select
            name="tipo_movilidad"
            value={alumno.tipo_movilidad || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione—</option>
            {movilidadOptions.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          TIPO DESTINO:
          <select
            name="tipo_destino"
            value={alumno.tipo_destino || ""}
            onChange={onChange}
            required
            disabled
          >
            <option value="">—Seleccione—</option>
            {destinoOptions.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Institución y país/estado */}
      <div className="form-row">
        <label>
          INSTITUCIÓN DESTINO:
          <input
            type="text"
            name="institucion_destino"
            value={alumno.institucion_destino || ""}
            onChange={onChange}
          />
        </label>

        {esInternacional && (
          <label>
            PAÍS:
            <select
              name="pais"
              value={alumno.pais || ""}
              onChange={onChange}
              required
            >
              <option value="">—Seleccione—</option>
              {paisOptions.map((p, i) => (
                <option key={i} value={p}>{p}</option>
              ))}
            </select>
          </label>
        )}

        {esNacional && (
          <label>
            ESTADO:
            <select
              name="estado"
              value={alumno.estado || ""}
              onChange={onChange}
              required
            >
              <option value="">—Seleccione—</option>
              {estadoOptions.map((e, i) => (
                <option key={i} value={e}>{e}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      {/* Fechas */}
      <div className="form-row">
        <label>
          FECHA INICIO:
          <input
            type="date"
            name="fecha_inicio"
            value={alumno.fecha_inicio || ""}
            onChange={onChange}
          />
        </label>

        <label>
          FECHA FIN:
          <input
            type="date"
            name="fecha_fin"
            value={alumno.fecha_fin || ""}
            onChange={onChange}
          />
        </label>
      </div>

      {/* Observaciones */}
      <div className="form-row">
        <label>
          OBSERVACIONES:
          <textarea
            name="observaciones_movilidad"
            value={alumno.observaciones_movilidad || ""}
            onChange={onChange}
            placeholder="Detalles de la movilidad..."
          />
        </label>
      </div>
    </Section>
  );
}
