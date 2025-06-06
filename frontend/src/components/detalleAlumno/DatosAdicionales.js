// src/components/detalleAlumno/DatosAdicionales.js
import React from "react";
import Section from "../common/Section";

export default function DatosAdicionales({ alumno, onChange }) {
  return (
    <Section title="Datos Adicionales" className="datos-adicionales-section">
      {/* Revalidación de materias */}
      <div className="form-row checkbox-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="revalidacion_materias"
            name="revalidacion_materias"
            checked={alumno.revalidacion_materias || false}
            onChange={onChange}
          />
          <span>Revalidación de materias</span>
        </label>
      </div>
      {alumno.revalidacion_materias && (
        <div className="conditional-field">
          <label htmlFor="datos_revalidacion">Detalles de revalidación:</label>
          <textarea
            id="datos_revalidacion"
            name="datos_revalidacion"
            value={alumno.datos_revalidacion || ""}
            onChange={onChange}
            placeholder="Ingrese los detalles de la revalidación..."
          />
        </div>
      )}

      {/* Certificado de calificaciones */}
      <div className="form-row checkbox-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="certificado_calificaciones"
            name="certificado_calificaciones"
            checked={alumno.certificado_calificaciones || false}
            onChange={onChange}
          />
          <span>Entregó certificado de calificaciones</span>
        </label>
      </div>

      {/* Seguro de viaje */}
      <div className="form-row checkbox-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="seguro_viaje"
            name="seguro_viaje"
            checked={alumno.seguro_viaje || false}
            onChange={onChange}
          />
          <span>Seguro de viaje</span>
        </label>
      </div>
      {alumno.seguro_viaje && (
        <div className="conditional-field">
          <div className="form-row">
            <label htmlFor="nombre_aseguradora">
              Nombre de la aseguradora:
              <input
                id="nombre_aseguradora"
                type="text"
                name="nombre_aseguradora"
                value={alumno.nombre_aseguradora || ""}
                onChange={onChange}
                placeholder="Nombre de la aseguradora"
              />
            </label>

            <label htmlFor="numero_poliza">
              Número de póliza:
              <input
                id="numero_poliza"
                type="text"
                name="numero_poliza"
                value={alumno.numero_poliza || ""}
                onChange={onChange}
                placeholder="Número de póliza"
              />
            </label>
          </div>

          <div className="form-row">
            <label htmlFor="fecha_inicio_seguro">
              Fecha de inicio:
              <input
                id="fecha_inicio_seguro"
                type="date"
                name="fecha_inicio_seguro"
                value={alumno.fecha_inicio_seguro || ""}
                onChange={onChange}
              />
            </label>

            <label htmlFor="fecha_fin_seguro">
              Fecha de fin:
              <input
                id="fecha_fin_seguro"
                type="date"
                name="fecha_fin_seguro"
                value={alumno.fecha_fin_seguro || ""}
                onChange={onChange}
              />
            </label>
          </div>

          <div className="form-row">
            <label htmlFor="contacto_aseguradora">
              Contacto de la aseguradora:
              <input
                id="contacto_aseguradora"
                type="text"
                name="contacto_aseguradora"
                value={alumno.contacto_aseguradora || ""}
                onChange={onChange}
                placeholder="Teléfono o email de contacto"
              />
            </label>
          </div>

          <div className="form-row">
            <label htmlFor="observaciones_seguro">
              Observaciones del seguro:
              <textarea
                id="observaciones_seguro"
                name="observaciones_seguro"
                value={alumno.observaciones_seguro || ""}
                onChange={onChange}
                placeholder="Observaciones adicionales sobre el seguro..."
              />
            </label>
          </div>
        </div>
      )}

      {/* Experiencia compartida */}
      <div className="form-row checkbox-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="experiencia_compartida"
            name="experiencia_compartida"
            checked={alumno.experiencia_compartida || false}
            onChange={onChange}
          />
          <span>Compartió experiencia</span>
        </label>
      </div>
      {alumno.experiencia_compartida && (
        <div className="conditional-field">
          <label htmlFor="detalles_experiencia">
            Detalles de la experiencia:
            <textarea
              id="detalles_experiencia"
              name="detalles_experiencia"
              value={alumno.detalles_experiencia || ""}
              onChange={onChange}
              placeholder="Describa los detalles de la experiencia compartida..."
            />
          </label>
        </div>
      )}
    </Section>
  );
}