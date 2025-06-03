// components/detalleAlumno/BecasSection.js
import React, { useState, useEffect } from "react";
import "../../styles/BecasSection.css";
import Section from "../common/Section";


export default function BecasSection({
  alumno,
  onAdd,
  onBecaChange,
  onRemove
}) {
  const [catalogo, setCatalogo] = useState([]);

  // Carga el catálogo directamente desde el PHP
  useEffect(() => {
    fetch("http://localhost/basecambios/get_becas_catalogo.php")
      .then(res => res.json())
      .then(data => {
        // data = [{ id, tipo, nombre, visible }, …]
        // si tu PHP no devuelve 'visible', ignóralo
        setCatalogo(data);
      })
      .catch(err => {
        console.error("Error cargando catálogo de becas:", err);
      });
  }, []);

  // Extrae todos los tipos únicos
  const tipos = [...new Set(catalogo.map(b => b.tipo))];

  // Dado un tipo, devuelve los nombres disponibles
  const getNombresPorTipo = tipo =>
    catalogo
      .filter(b => b.tipo === tipo)
      .map(b => b.nombre);

  return (
    <Section title="Becas" className="programa-section">

      {alumno.becas.length === 0 && (
        <p>No hay becas registradas para este alumno.</p>
      )}

      {alumno.becas.map((beca, index) => (
        <div key={index} className="beca-row">
          <label>Tipo:</label>
          <select
            value={beca.tipo}
            onChange={e => {
              const newTipo = e.target.value;
              // al cambiar tipo, resetea también el nombre
              onBecaChange(index, "tipo", newTipo);
              onBecaChange(index, "nombre", "");
            }}
          >
            <option value="">Seleccione</option>
            {tipos.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <label>Nombre:</label>
          <select
            value={beca.nombre}
            onChange={e => onBecaChange(index, "nombre", e.target.value)}
            disabled={!beca.tipo}
          >
            <option value="">Seleccione</option>
            {getNombresPorTipo(beca.tipo).map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <label>Monto:</label>
          <input
            type="number"
            step="0.01"
            value={beca.monto}
            onChange={e => onBecaChange(index, "monto", e.target.value)}
          />

          <label>Detalles:</label>
          <textarea
            value={beca.detalles}
            onChange={e => onBecaChange(index, "detalles", e.target.value)}
          />

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="remove-beca"
          >
            Eliminar
          </button>
        </div>
      ))}

      <button type="button" onClick={onAdd} className="add-beca">
        + Agregar Beca
      </button>
    </Section>
  );
}
