// frontend/src/components/BecasSection.js
import React, { useState, useEffect } from "react";
import Section from "../common/Section";

export default function BecasSection({
  alumno,            // { becas: [ { tipo, nombre, monto, detalles }, ... ] }
  onAddBeca,         // function(newBeca)
  onBecaChange,      // function(index, field, value)
  onRemoveBeca       // function(index)
}) {
  const [catalogo, setCatalogo] = useState([]);
  const [newBeca, setNewBeca] = useState({
    tipo: "",
    nombre: "",
    monto: "",
    detalles: ""
  });

  // 1) cargar catálogo
  useEffect(() => {
    fetch("http://localhost/basecambios/get_becas.php")
      .then(r => r.json())
      .then(data => {
        setCatalogo(data);
        if (data.length > 0) {
          setNewBeca(b => ({ ...b, tipo: data[0].tipo }));
        }
      })
      .catch(console.error);
  }, []);

  // 2) tipos únicos y nombres filtrados
  const tipos = Array.from(new Set(catalogo.map(b => b.tipo)));
  const nombres = catalogo
    .filter(b => b.tipo === newBeca.tipo)
    .map(b => b.nombre);

  // 3) manejar formulario de nueva beca
  const handleNewChange = e => {
    const { name, value } = e.target;
    if (name === "tipo") {
      setNewBeca({ tipo: value, nombre: "", monto: "", detalles: "" });
    } else {
      setNewBeca(b => ({ ...b, [name]: value }));
    }
  };

  // 4) agregar beca
  const handleAdd = () => {
    if (!newBeca.nombre || newBeca.monto === "" || isNaN(newBeca.monto)) {
      alert("Por favor completa tipo, nombre y monto válidos.");
      return;
    }
    onAddBeca(newBeca);
    // reset monto/nombre/detalles but keep tipo
    setNewBeca(b => ({ ...b, nombre: "", monto: "", detalles: "" }));
  };

  return (
    <Section title="Becas" className="becas-section">
      {/* → Alta nueva beca */}
      <div className="form-row add-beca-row">
        <label>
          Tipo:
          <select name="tipo" value={newBeca.tipo} onChange={handleNewChange}>
            {tipos.map((t,i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Nombre:
          <select name="nombre" value={newBeca.nombre} onChange={handleNewChange}>
            <option value="">—Seleccione—</option>
            {nombres.map((n,i) => (
              <option key={i} value={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          Monto:
          <input
            type="number"
            name="monto"
            value={newBeca.monto}
            onChange={handleNewChange}
            min="0"
            placeholder="0.00"
          />
        </label>
        <label>
          Detalles:
          <textarea
            name="detalles"
            value={newBeca.detalles}
            onChange={handleNewChange}
            placeholder="(opcional)"
          />
        </label>
        <button type="button" onClick={handleAdd}>+ Agregar</button>
      </div>

      {/* → Lista de becas cargadas */}
      {alumno.becas.length > 0 && (
        <>
          <h3>Becas Registradas</h3>
          {alumno.becas.map((b, idx) => {
            const nombresFiltrados = catalogo
              .filter(cb => cb.tipo === b.tipo)
              .map(cb => cb.nombre);
            return (
              <div className="form-row edit-beca-row" key={idx}>
                <label>
                  Tipo:
                  <select
                    value={b.tipo}
                    onChange={e => onBecaChange(idx, "tipo", e.target.value)}
                  >
                    {tipos.map((t,i) => (
                      <option key={i} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Nombre:
                  <select
                    value={b.nombre}
                    onChange={e => onBecaChange(idx, "nombre", e.target.value)}
                  >
                    <option value="">—Seleccione—</option>
                    {nombresFiltrados.map((n,i) => (
                      <option key={i} value={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Monto:
                  <input
                    type="number"
                    value={b.monto}
                    onChange={e => onBecaChange(idx, "monto", e.target.value)}
                    min="0"
                  />
                </label>
                <label>
                  Detalles:
                  <textarea
                    value={b.detalles}
                    onChange={e => onBecaChange(idx, "detalles", e.target.value)}
                    placeholder="(opcional)"
                  />
                </label>
                <button type="button" onClick={() => onRemoveBeca(idx)}>
                  Eliminar
                </button>
              </div>
            );
          })}
        </>
      )}
    </Section>
  );
}