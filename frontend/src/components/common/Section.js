// frontend/src/components/common/Section.js
import React from "react";

/**
 * Componente de sección estandarizado para toda la aplicación
 * @param {Object} props
 * @param {string} props.title - Título de la sección
 * @param {React.ReactNode} props.children - Contenido de la sección
 * @param {string} [props.className] - Clases adicionales para la sección
 */
export default function Section({ title, children, className = "" }) {
  return (
    <section className={`app-section ${className}`}>
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}