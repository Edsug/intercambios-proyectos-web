import React, { useEffect, useState } from "react";
import Section from "../common/Section";

export default function Movilidad({ alumno, onChange }) {
  const [catalogos, setCatalogos] = useState({});
  const [loading, setLoading] = useState(true);

  const esNacional = alumno?.tipo_destino === "NACIONAL";

  useEffect(() => {
    fetch("http://localhost/basecambios/get_catalogos.php")
      .then(res => res.json())
      .then(data => {
        console.log("Catálogos cargados:", data);
        setCatalogos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar catálogos", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando catálogos...</p>;

  return (
    <Section title="Movilidad" className="movilidad-section">
      <div className="form-row">
        <label>
          TIPO DESTINO:
          <select
            name="tipo_destino"
            value={alumno.tipo_destino || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione—</option>
            {(catalogos.destinos || []).map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          ACTIVIDAD:
          <select
            name="actividad"
            value={alumno.actividad || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione—</option>
            {(catalogos.tipo_movilidad || []).map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </label>

        {esNacional ? (
          <label>
            ESTADO (Geo):
            <select
              name="estado_geo"
              value={alumno.estado_geo || ""}
              onChange={onChange}
              required
            >
              <option value="">—Seleccione—</option>
              {(catalogos.estados_geo || []).map((e, i) => (
                <option key={i} value={e}>{e}</option>
              ))}
            </select>
          </label>
        ) : (
          <label>
            PAÍS:
            <select
              name="pais"
              value={alumno.pais || ""}
              onChange={onChange}
              required
            >
              <option value="">—Seleccione—</option>
              {(catalogos.paises || []).map((p, i) => (
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
            style={{ textTransform: "uppercase" }}
            name="institucion"
            value={alumno.institucion || ""}
            onChange={onChange}
          />
        </label>
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

      <div className="form-row">
        <label>
          OBSERVACIONES:
          <textarea
            name="movilidades_observaciones"
            value={alumno.movilidades_observaciones || ""}
            onChange={onChange}
            placeholder="Ingrese observaciones sobre la movilidad del alumno..."
          />
        </label>
      </div>
    </Section>
  );
}
