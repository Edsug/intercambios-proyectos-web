import React from "react";
import Section from "../common/Section";

export default function DatosAdicionales({ alumno, onChange }) {
  const isChecked = v => v===true||v===1||v==="1";

  return (
    <Section title="Datos Adicionales" className="datos-adicionales-section">
      {/* Revalidación */}
      <div className="form-row">
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="revalidacion_materias"
            name="revalidacion_materias"
            checked={isChecked(alumno.revalidacion_materias)}
            onChange={onChange}
          />
          <label htmlFor="revalidacion_materias" className="checkbox-label">
            REVALIDACIÓN MATERIAS
          </label>
        </div>
        {isChecked(alumno.revalidacion_materias) && (
          <div className="conditional-field">
            <textarea
              name="datos_revalidacion"
              value={alumno.datos_revalidacion||""}
              onChange={onChange}
              placeholder="Detalle revalidación"
              style={{ textTransform: "uppercase" }}
            />
          </div>
        )}
      </div>

      {/* Certificado / Discapacidad */}
      <div className="form-row">
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="certificado_calificaciones"
            name="certificado_calificaciones"
            checked={isChecked(alumno.certificado_calificaciones)}
            onChange={onChange}
          />
          <label htmlFor="certificado_calificaciones" className="checkbox-label">
            CERTIFICADO
          </label>
        </div>
        
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="cuenta_discapacidad"
            name="cuenta_discapacidad"
            checked={isChecked(alumno.cuenta_discapacidad)}
            onChange={onChange}
          />
          <label htmlFor="cuenta_discapacidad" className="checkbox-label">
            DISCAPACIDAD
          </label>
        </div>
        
        {isChecked(alumno.cuenta_discapacidad) && (
          <div className="conditional-field">
            <textarea
              name="datos_discapacidad"
              style={{ textTransform: "uppercase" }}
              value={alumno.datos_discapacidad||""}
              onChange={onChange}
              placeholder="Detalle discapacidad"
            />
          </div>
        )}
      </div>

      {/* Seguro */}
      <div className="form-row">
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="seguro_viaje"
            name="seguro_viaje"
            checked={isChecked(alumno.seguro_viaje)}
            onChange={onChange}
          />
          <label htmlFor="seguro_viaje" className="checkbox-label">
            SEGURO DE VIAJE
          </label>
        </div>
      </div>
      
      {isChecked(alumno.seguro_viaje) && (
        <div className="conditional-field">
          <div className="form-row">
            <label>
              ASEGURADORA:
              <input
                style={{ textTransform: "uppercase" }}
                name="aseguradora"
                value={alumno.aseguradora||""}
                onChange={onChange}
                placeholder="Aseguradora"
              />
            </label>
            <label>
              PÓLIZA:
              <input
                style={{ textTransform: "uppercase" }}     
                name="poliza"
                value={alumno.poliza||""}
                onChange={onChange}
                placeholder="Póliza"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              FECHA INICIO:
              <input
                type="date"
                name="seguro_inicio"
                value={alumno.seguro_inicio||""}
                onChange={onChange}
              />
            </label>
            <label>
              FECHA FIN:
              <input
                type="date"
                name="seguro_fin"
                value={alumno.seguro_fin||""}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              OBSERVACIONES:
              <textarea
                name="obs_seguro"
                value={alumno.obs_seguro||""}
                style={{ textTransform: "uppercase" }}
                onChange={onChange}
                placeholder="Observaciones del seguro"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              CONTACTO:
              <input
                name="contacto_aseguradora"
                value={alumno.contacto_aseguradora||""}
                onChange={onChange}
                style={{ textTransform: "uppercase" }}
                placeholder="Contacto aseguradora"
              />
            </label>
          </div>
        </div>
      )}

      {/* Experiencia */}
      <div className="form-row">
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="exp_compartida"
            name="exp_compartida"
            checked={isChecked(alumno.exp_compartida)}
            onChange={onChange}
          />
          <label htmlFor="exp_compartida" className="checkbox-label">
            COMPARTIR EXPERIENCIA
          </label>
        </div>
      </div>
      
      {isChecked(alumno.exp_compartida) && (
        <div className="conditional-field">
          <textarea
            name="detalles_experiencia"
            value={alumno.detalles_experiencia||""}
            onChange={onChange}
            placeholder="Detalles experiencia"
            style={{ textTransform: "uppercase" }}
          />
        </div>
      )}
    </Section>
  );
}