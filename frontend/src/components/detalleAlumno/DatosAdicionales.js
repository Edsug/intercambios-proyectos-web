import React from "react";
import "../../styles/DatosAdicionales.css";
export default function DatosAdicionales({ alumno, onChange }) {
  return (
    <section>
      <h3>Datos Adicionales</h3>

      <label>
        <input
          type="checkbox"
          name="revalidacion_materias"
          checked={alumno.revalidacion_materias || false}
          onChange={onChange}
        />
        Revalidación de materias
      </label>
      {alumno.revalidacion_materias && (
        <>
          <label>Detalles de revalidación:</label>
          <textarea
            name="datos_revalidacion"
            value={alumno.datos_revalidacion || ""}
            onChange={onChange}
          />
        </>
      )}

      <label>
        <input
          type="checkbox"
          name="certificado_calificaciones"
          checked={alumno.certificado_calificaciones || false}
          onChange={onChange}
        />
        Entregó certificado de calificaciones
      </label>

      <label>
        <input
          type="checkbox"
          name="cuenta_discapacidad"
          checked={alumno.cuenta_discapacidad || false}
          onChange={onChange}
        />
        Cuenta con discapacidad
      </label>
      {alumno.cuenta_discapacidad && (
        <>
          <label>Detalles de discapacidad:</label>
          <textarea
            name="datos_discapacidad"
            value={alumno.datos_discapacidad || ""}
            onChange={onChange}
          />
        </>
      )}

      <label>
        <input
          type="checkbox"
          name="seguro_viaje"
          checked={alumno.seguro_viaje || false}
          onChange={onChange}
        />
        Seguro de viaje
      </label>
      {alumno.seguro_viaje && (
        <>
          <label>Nombre de la aseguradora:</label>
          <input
            type="text"
            name="nombre_aseguradora"
            value={alumno.nombre_aseguradora || ""}
            onChange={onChange}
          />

          <label>Número de póliza:</label>
          <input
            type="text"
            name="numero_poliza"
            value={alumno.numero_poliza || ""}
            onChange={onChange}
          />

          <label>Fecha de inicio del seguro:</label>
          <input
            type="date"
            name="fecha_inicio_seguro"
            value={alumno.fecha_inicio_seguro || ""}
            onChange={onChange}
          />

          <label>Fecha de fin del seguro:</label>
          <input
            type="date"
            name="fecha_fin_seguro"
            value={alumno.fecha_fin_seguro || ""}
            onChange={onChange}
          />

          <label>Contacto de la aseguradora:</label>
          <input
            type="text"
            name="contacto_aseguradora"
            value={alumno.contacto_aseguradora || ""}
            onChange={onChange}
          />

          <label>Observaciones del seguro:</label>
          <textarea
            name="observaciones_seguro"
            value={alumno.observaciones_seguro || ""}
            onChange={onChange}
          />
        </>
      )}

      <label>
        <input
          type="checkbox"
          name="experiencia_compartida"
          checked={alumno.experiencia_compartida || false}
          onChange={onChange}
        />
        Compartió experiencia
      </label>
      {alumno.experiencia_compartida && (
        <>
          <label>Detalles de la experiencia compartida:</label>
          <textarea
            name="detalles_experiencia"
            value={alumno.detalles_experiencia || ""}
            onChange={onChange}
          />
        </>
      )}
    </section>
  );
}

