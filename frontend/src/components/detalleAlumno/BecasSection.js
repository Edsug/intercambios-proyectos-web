// components/detalleAlumno/BecasSection.js
import React, { useState, useEffect } from "react";
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
    <Section title="Becas" className="becas-section">
      {alumno.becas.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          color: '#666',
          background: 'rgba(0, 168, 107, 0.05)',
          borderRadius: '10px',
          border: '2px dashed rgba(0, 168, 107, 0.2)',
          marginBottom: '1.5rem'
        }}>
          <p>No hay becas registradas para este alumno.</p>
        </div>
      )}

      {alumno.becas.map((beca, index) => (
        <div key={index} className="beca-row">
          <div className="form-row">
            <label>
              Tipo:
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
            </label>

            <label>
              Nombre:
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
            </label>

            <label>
              Monto:
              <input
                type="number"
                step="0.01"
                value={beca.monto}
                onChange={e => onBecaChange(index, "monto", e.target.value)}
                placeholder="0.00"
              />
            </label>
          </div>

          <div className="form-row">
            <label style={{ width: '100%' }}>
              Detalles:
              <textarea
                value={beca.detalles}
                onChange={e => onBecaChange(index, "detalles", e.target.value)}
                placeholder="Detalles adicionales de la beca..."
              />
            </label>
          </div>

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="remove-beca"
            title="Eliminar beca"
          />
        </div>
      ))}

      <button type="button" onClick={onAdd} className="add-beca">
        Agregar Beca
      </button>
    </Section>
  );
}