import React from "react";

export default function BecasSection({ alumno, onAdd, onBecaChange, onRemove }) {
  return (
    <section>
      <h3>Becas</h3>

      {alumno.becas.length === 0 && (
        <p>No hay becas registradas para este alumno.</p>
      )}

      {alumno.becas.map((beca, index) => (
        <div key={index} className="beca-row">
          <label>Tipo:</label>
          <input
            type="text"
            value={beca.tipo}
            onChange={e => onBecaChange(index, "tipo", e.target.value)}
          />

          <label>Nombre:</label>
          <input
            type="text"
            value={beca.nombre}
            onChange={e => onBecaChange(index, "nombre", e.target.value)}
          />

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

          <button type="button" onClick={() => onRemove(index)} className="remove-beca">
            Eliminar
          </button>
        </div>
      ))}

      <button type="button" onClick={onAdd} className="add-beca">
        + Agregar Beca
      </button>
    </section>
  );
}
