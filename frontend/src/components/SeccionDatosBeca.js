import React, { useState } from 'react';

export default function SeccionDatosBeca({
  formData, 
  prevSection, 
  nextSection, 
  errores,
  onAddBeca,
  onRemoveBeca
}) {
  const [newBeca, setNewBeca] = useState({
    tipo: 'CUSUR',
    monto: '',
    nombre: '',
    detalles: ''
  });

  const handleNewBecaChange = e => {
    const { name, value } = e.target;
    setNewBeca(prev => ({ ...prev, [name]: value }));
  };

  const agregarBeca = () => {
    if (!newBeca.tipo) {
      alert('Seleccione el tipo de beca');
      return;
    }

    if (!newBeca.monto || isNaN(newBeca.monto) || Number(newBeca.monto) < 0) {
      alert('Ingrese un monto válido (mayor o igual a 0)');
      return;
    }

    if ((newBeca.tipo === 'CGCI' || newBeca.tipo === 'EXTERNA') && !newBeca.nombre) {
      alert('Ingrese el nombre de la beca');
      return;
    }

    onAddBeca(newBeca);
    setNewBeca({ tipo: 'CUSUR', monto: '', nombre: '', detalles: '' });
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Datos de Beca</h2>
      <div className="section-content">
        <div className="form-row">
          <h3>Agregar Beca</h3>
          <label>
            Tipo:
            <select 
              name="tipo" 
              value={newBeca.tipo} 
              onChange={handleNewBecaChange}
            >
              <option value="CUSUR">CUSUR</option>
              <option value="CGCI">CGCI</option>
              <option value="PROGRAMA">PROGRAMA</option>
              <option value="EXTERNA">EXTERNA</option>
            </select>
          </label>
          <label>
            Monto:
            <input
              type="number"
              name="monto"
              value={newBeca.monto}
              onChange={handleNewBecaChange}
              placeholder="Monto de la beca"
              min="0"
            />
          </label>
          <label>
            Nombre de Beca:
            <input
              type="text"
              name="nombre"
              value={newBeca.nombre}
              onChange={handleNewBecaChange}
              placeholder="Nombre de la beca"
            />
          </label>
          <label>
            Detalles:
            <textarea
              name="detalles"
              value={newBeca.detalles}
              onChange={handleNewBecaChange}
              placeholder="Detalles adicionales"
            />
          </label>
          <button type="button" onClick={agregarBeca} className="add-button">
            + Agregar Beca
          </button>
        </div>

        {formData.BECAS && formData.BECAS.length > 0 ? (
          <div className="form-row">
            <h3>Becas Registradas</h3>
            <ul className="becas-list">
              {formData.BECAS.map((beca, i) => (
                <li key={i}>
                  <strong>{beca.tipo}</strong>
                  {beca.monto && ` - Monto: $${beca.monto}`}
                  {beca.nombre && ` - Nombre: ${beca.nombre}`}
                  {beca.detalles && ` - Detalles: ${beca.detalles}`}
                  <button type="button" onClick={() => onRemoveBeca(i)} className="delete-button">
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="form-row error-message">
            {errores.BECAS && "Debe agregar al menos una beca"}
          </div>
        )}
      </div>
      <div className="form-navigation">
        <button type="button" onClick={prevSection} className="prev-button">
          Anterior
        </button>
        <button type="button" onClick={nextSection} className="next-button">
          Siguiente
        </button>
      </div>
    </div>
  );
}
