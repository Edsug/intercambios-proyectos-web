import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

export default function SeccionDatosBeca({
  formData,
  prevSection,
  nextSection,
  errores,
  onAddBeca,
  onRemoveBeca
}) {
  const [catalogoBecas, setCatalogoBecas] = useState([]);
  const [montoInput, setMontoInput] = useState('');
  const [showAddError, setShowAddError] = useState(false);
  const [newBeca, setNewBeca] = useState({
    tipo: '',
    monto: '',
    nombre: '',
    detalles: ''
  });

  const handleMontoChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setMontoInput(value);
    setNewBeca(prev => ({ ...prev, monto: value }));
  };
  const handleMontoBlur = () => {
    if (montoInput) {
      const num = parseFloat(montoInput);
      setMontoInput(num.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }));
    }
  };
  const handleMontoFocus = () => {
    setMontoInput(newBeca.monto || '');
  };

  // Cargar catálogo desde PHP
  useEffect(() => {
    fetch(`${BASE_URL}get_becas_catalogo.php`)
      .then(res => res.json())
      .then(data => {
        setCatalogoBecas(data);
        if (data.length > 0) {
          setNewBeca(prev => ({
            ...prev,
            tipo: data[0].tipo
          }));
        }
      })
      .catch(console.error);
  }, []);

  const tiposDisponibles = [...new Set(catalogoBecas.map(b => b.tipo))];
  const nombresPorTipo = catalogoBecas
    .filter(b => b.tipo === newBeca.tipo)
    .map(b => b.nombre);

  const handleNewBecaChange = (e) => {
    const { name, value } = e.target;

    if (name === 'tipo') {
      setNewBeca({
        tipo: value,
        monto: '',
        nombre: '',
        detalles: ''
      });
    } else {
      setNewBeca(prev => ({ ...prev, [name]: value }));
    }
  };

  const agregarBeca = () => {
    if (!newBeca.tipo || !newBeca.nombre || !newBeca.monto || isNaN(newBeca.monto)) {
      setShowAddError(true);
      toast.error("Complete todos los campos correctamente.");
      return;
    }
    setShowAddError(false);
    onAddBeca(newBeca);
    setNewBeca({
      tipo: tiposDisponibles[0] || '',
      monto: '',
      nombre: '',
      detalles: ''
    });
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Datos de Beca</h2>
      <div className="section-content">
        <div className="form-row">
          <h3>Agregar Beca</h3>

          <label>
            Tipo:
            <select name="tipo" value={newBeca.tipo} onChange={handleNewBecaChange}>
              {tiposDisponibles.map((tipo, i) => (
                <option key={i} value={tipo}>{tipo}</option>
              ))}
            </select>
          </label>

          <label>
            Monto:
            <input
              type="text"
              name="monto"
              value={montoInput}
              onChange={handleMontoChange}
              onBlur={handleMontoBlur}
              onFocus={handleMontoFocus}
              placeholder="$ 0.00"
              min="0"
              autoComplete="off"
            />
          </label>

          <label>
            Nombre de Beca:
            <select name="nombre" value={newBeca.nombre} onChange={handleNewBecaChange}>
              <option value="">Seleccione una beca</option>
              {nombresPorTipo.map((nombre, i) => (
                <option key={i} value={nombre}>{nombre}</option>
              ))}
            </select>
          </label>

          <label>
            Detalles:
            <textarea
              name="detalles"
              value={newBeca.detalles}
              onChange={handleNewBecaChange}
              placeholder="Detalles (opcional)"
            />
          </label>

          <button type="button" onClick={agregarBeca} className="add-button">
            + Agregar Beca
          </button>
        </div>

        {formData.BECAS?.length > 0 ? (
          <div className="form-row">
            <h3>Becas Registradas</h3>
            <ul className="becas-list">
              {formData.BECAS.map((beca, i) => (
                <li key={i}>
                  <strong>{beca.tipo}</strong>
                  {beca.monto && ` - Monto: $${beca.monto}`}
                  {beca.nombre && ` - Nombre: ${beca.nombre}`}
                  {beca.detalles && ` - Detalles: ${beca.detalles}`}
                  <button onClick={() => onRemoveBeca(i)} className="delete-button">Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          showAddError && (
            <div className="form-row error-message">
               Debe agregar al menos una beca antes de agregar otra.
            </div>
          )
        )}
      </div>

      <div className="form-navigation">
        <button onClick={prevSection} className="prev-button">Anterior</button>
        <button onClick={nextSection} className="next-button">Siguiente</button>
      </div>
    </div>
  );
}
