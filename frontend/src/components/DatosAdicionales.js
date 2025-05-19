import React from "react";

export default function DatosAdicionales({ alumno, onChange }) {
  const isChecked = v => v===true||v===1||v==="1";

  return (
    <section>
      <h2>Datos Adicionales</h2>

      {/* Revalidación */}
      <div className="form-row">
        <label>
          <input
            type="checkbox"
            name="revalidacion_materias"
            checked={isChecked(alumno.revalidacion_materias)}
            onChange={onChange}
          /> Revalidación materias
        </label>
        <textarea
          name="datos_revalidacion"
          value={alumno.datos_revalidacion||""}
          onChange={onChange}
          placeholder="Detalle revalidación"
        />
      </div>

      {/* Certificado / Discapacidad */}
      <div className="form-row">
        <label>
          <input
            type="checkbox"
            name="certificado_calificaciones"
            checked={isChecked(alumno.certificado_calificaciones)}
            onChange={onChange}
          /> Certificado
        </label>
        <label>
          <input
            type="checkbox"
            name="cuenta_discapacidad"
            checked={isChecked(alumno.cuenta_discapacidad)}
            onChange={onChange}
          /> Discapacidad
        </label>
        <textarea
          name="datos_discapacidad"
          value={alumno.datos_discapacidad||""}
          onChange={onChange}
          placeholder="Detalle discapacidad"
        />
      </div>

      {/* Seguro */}
      <div className="form-row">
        <label>
          <input
            type="checkbox"
            name="seguro_viaje"
            checked={isChecked(alumno.seguro_viaje)}
            onChange={onChange}
          /> Seguro de Viaje
        </label>
      </div>
      {isChecked(alumno.seguro_viaje) && (
        <>
          <div className="form-row">
            <input
              name="aseguradora"
              value={alumno.aseguradora||""}
              onChange={onChange}
              placeholder="Aseguradora"
            />
            <input
              name="poliza"
              value={alumno.poliza||""}
              onChange={onChange}
              placeholder="Póliza"
            />
          </div>
          <div className="form-row">
            <input
              type="date"
              name="seguro_inicio"
              value={alumno.seguro_inicio||""}
              onChange={onChange}
            />
            <input
              type="date"
              name="seguro_fin"
              value={alumno.seguro_fin||""}
              onChange={onChange}
            />
          </div>
          <textarea
            name="obs_seguro"
            value={alumno.obs_seguro||""}
            onChange={onChange}
            placeholder="Obs. seguro"
          />
          <input
            name="contacto_aseguradora"
            value={alumno.contacto_aseguradora||""}
            onChange={onChange}
            placeholder="Contacto aseguradora"
          />
        </>
      )}

      {/* Experiencia */}
      <div className="form-row">
        <label>
          <input
            type="checkbox"
            name="exp_compartida"
            checked={isChecked(alumno.exp_compartida)}
            onChange={onChange}
          /> Compartir experiencia
        </label>
      </div>
      {isChecked(alumno.exp_compartida) && (
        <textarea
          name="detalles_experiencia"
          value={alumno.detalles_experiencia||""}
          onChange={onChange}
          placeholder="Detalles experiencia"
        />
      )}
    </section>
  );
}
