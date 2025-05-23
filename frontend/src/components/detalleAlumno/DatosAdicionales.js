// src/components/detalleAlumno/DatosAdicionales.js
import React from "react";
import "../../styles/DatosAdicionales.css";

export default function DatosAdicionales({ alumno, onChange }) {
  return (
    <section className="app-section datos-adicionales-section">
      <header className="section-header">
        <h3>Datos Adicionales</h3>
      </header>
      <div className="section-content">
        {/* Revalidación de materias */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="revalidacion_materias"
            name="revalidacion_materias"
            checked={alumno.revalidacion_materias || false}
            onChange={onChange}
          />
          <label htmlFor="revalidacion_materias">Revalidación de materias</label>
        </div>
        {alumno.revalidacion_materias && (
          <div className="conditional-field">
            <label htmlFor="datos_revalidacion">Detalles de revalidación:</label>
            <textarea
              id="datos_revalidacion"
              name="datos_revalidacion"
              value={alumno.datos_revalidacion || ""}
              onChange={onChange}
            />
          </div>
        )}

        {/* Certificado de calificaciones */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="certificado_calificaciones"
            name="certificado_calificaciones"
            checked={alumno.certificado_calificaciones || false}
            onChange={onChange}
          />
          <label htmlFor="certificado_calificaciones">
            Entregó certificado de calificaciones
          </label>
        </div>

        {/* Discapacidad */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="cuenta_discapacidad"
            name="cuenta_discapacidad"
            checked={alumno.cuenta_discapacidad || false}
            onChange={onChange}
          />
          <label htmlFor="cuenta_discapacidad">Cuenta con discapacidad</label>
        </div>
        {alumno.cuenta_discapacidad && (
          <div className="conditional-field">
            <label htmlFor="datos_discapacidad">Detalles de discapacidad:</label>
            <textarea
              id="datos_discapacidad"
              name="datos_discapacidad"
              value={alumno.datos_discapacidad || ""}
              onChange={onChange}
            />
          </div>
        )}

        {/* Seguro de viaje */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="seguro_viaje"
            name="seguro_viaje"
            checked={alumno.seguro_viaje || false}
            onChange={onChange}
          />
          <label htmlFor="seguro_viaje">Seguro de viaje</label>
        </div>
        {alumno.seguro_viaje && (
          <div className="conditional-field">
            <label htmlFor="nombre_aseguradora">Nombre de la aseguradora:</label>
            <input
              id="nombre_aseguradora"
              type="text"
              name="nombre_aseguradora"
              value={alumno.nombre_aseguradora || ""}
              onChange={onChange}
            />

            <label htmlFor="numero_poliza">Número de póliza:</label>
            <input
              id="numero_poliza"
              type="text"
              name="numero_poliza"
              value={alumno.numero_poliza || ""}
              onChange={onChange}
            />

            <label htmlFor="fecha_inicio_seguro">Fecha de inicio:</label>
            <input
              id="fecha_inicio_seguro"
              type="date"
              name="fecha_inicio_seguro"
              value={alumno.fecha_inicio_seguro || ""}
              onChange={onChange}
            />

            <label htmlFor="fecha_fin_seguro">Fecha de fin:</label>
            <input
              id="fecha_fin_seguro"
              type="date"
              name="fecha_fin_seguro"
              value={alumno.fecha_fin_seguro || ""}
              onChange={onChange}
            />

            <label htmlFor="contacto_aseguradora">Contacto de la aseguradora:</label>
            <input
              id="contacto_aseguradora"
              type="text"
              name="contacto_aseguradora"
              value={alumno.contacto_aseguradora || ""}
              onChange={onChange}
            />

            <label htmlFor="observaciones_seguro">Observaciones del seguro:</label>
            <textarea
              id="observaciones_seguro"
              name="observaciones_seguro"
              value={alumno.observaciones_seguro || ""}
              onChange={onChange}
            />
          </div>
        )}

        {/* Experiencia compartida */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="experiencia_compartida"
            name="experiencia_compartida"
            checked={alumno.experiencia_compartida || false}
            onChange={onChange}
          />
          <label htmlFor="experiencia_compartida">Compartió experiencia</label>
        </div>
        {alumno.experiencia_compartida && (
          <div className="conditional-field">
            <label htmlFor="detalles_experiencia">Detalles de la experiencia:</label>
            <textarea
              id="detalles_experiencia"
              name="detalles_experiencia"
              value={alumno.detalles_experiencia || ""}
              onChange={onChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
