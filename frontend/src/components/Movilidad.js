import React from "react";

export default function Movilidad({ alumno, onChange, catalogos }) {
  const esNacional = alumno.tipo_destino === "NACIONAL";

  return (
    <section>
      <h2>Movilidad</h2>
      <div className="form-row">
        <label>
          TIPO DESTINO:
          <select
            name="tipo_destino"
            value={alumno.tipo_destino||""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione—</option>
            {catalogos.tiposDestino.map((t,i)=>(
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </label>

        {esNacional ? (
          <label>
            ESTADO (Geo):
            <select
              name="estado_geo"
              value={alumno.estado_geo||""}
              onChange={onChange}
              required
            >
              <option value="">—Seleccione—</option>
              {catalogos.estados_geo.map((e,i)=>(
                <option key={i} value={e}>{e}</option>
              ))}
            </select>
          </label>
        ) : (
          <label>
            PAÍS:
            <select
              name="pais"
              value={alumno.pais||""}
              onChange={onChange}
              required
            >
              <option value="">—Seleccione—</option>
              {catalogos.paises.map((p,i)=>(
                <option key={i} value={p}>{p}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="form-row">
        <label>
          INSTITUCIÓN:
          <input
            name="institucion"
            value={alumno.institucion||""}
            onChange={onChange}
          />
        </label>
        <label>
          FECHA INICIO:
          <input
            type="date"
            name="fecha_inicio"
            value={alumno.fecha_inicio||""}
            onChange={onChange}
          />
        </label>
        <label>
          FECHA FIN:
          <input
            type="date"
            name="fecha_fin"
            value={alumno.fecha_fin||""}
            onChange={onChange}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          OBSERVACIONES:
          <textarea
            name="movilidades_observaciones"
            value={alumno.movilidades_observaciones||""}
            onChange={onChange}
          />
        </label>
      </div>
    </section>
  );
}
