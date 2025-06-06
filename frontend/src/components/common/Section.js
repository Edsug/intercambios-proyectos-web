// src/components/common/Section.js
import React from "react";

export default function Section({ title, children, className = "" }) {
  return (
    <section className={`app-section ${className}`}>
      {title && (
        <div className="section-header">
          <h2>{title}</h2>
        </div>
      )}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}