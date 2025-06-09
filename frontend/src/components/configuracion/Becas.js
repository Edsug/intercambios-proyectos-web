import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";
import { BASE_URL } from "../../config"; // Importa la URL base

const Becas = () => {
  const [becas, setBecas] = useState([]);
  const [nuevaBeca, setNuevaBeca] = useState({ tipo: "", nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoTipo, setNuevoTipo] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);

  const obtenerBecas = async () => {
    try {
      const res = await fetch(`${BASE_URL}get_becas_catalogo_admin.php`);
      const data = await res.json();
      setBecas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener becas:", err);
      setBecas([]);
    }
  };

  useEffect(() => {
    obtenerBecas();
  }, []);

  const agregarBeca = async (e) => {
    e.preventDefault();
    if (!nuevaBeca.tipo.trim() || !nuevaBeca.nombre.trim()) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}agregar_beca_catalogo.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaBeca),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevaBeca({ tipo: "", nombre: "", visible: 1 });
      obtenerBecas();
    } catch (err) {
      console.error("Error al agregar beca:", err);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}actualizar_beca_catalogo.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          tipo: nuevoTipo,
          nombre: nuevoNombre,
          visible: nuevaVisibilidad,
        }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setEditandoId(null);
      obtenerBecas();
    } catch (err) {
      console.error("Error al actualizar beca:", err);
    }
  };

  const eliminarBeca = async (id) => {
    const confirmacion = window.confirm("⚠️ Esta acción eliminará permanentemente la beca. ¿Estás completamente seguro?");
    if (!confirmacion) return;

    try {
      const res = await fetch(`${BASE_URL}eliminar_beca_catalogo.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      obtenerBecas();
    } catch (err) {
      console.error("Error al eliminar beca:", err);
    }
  };

  const becasAgrupadas = becas.reduce((acc, beca) => {
    if (!acc[beca.tipo]) acc[beca.tipo] = [];
    acc[beca.tipo].push(beca);
    return acc;
  }, {});

  return (
    <div className="becas-admin">
      <h3>Agregar Beca</h3>
      <form onSubmit={agregarBeca} className="config-form">
        <div className="form-group">
          <label>Tipo:</label>
          <input
            type="text"
            value={nuevaBeca.tipo}
            onChange={(e) => setNuevaBeca({ ...nuevaBeca, tipo: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevaBeca.nombre}
            onChange={(e) => setNuevaBeca({ ...nuevaBeca, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Visible:</label>
          <select
            value={nuevaBeca.visible}
            onChange={(e) => setNuevaBeca({ ...nuevaBeca, visible: parseInt(e.target.value) })}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="save-button">Agregar Beca</button>
      </form>

      <h3>Listado de Becas por Tipo</h3>
      {Object.keys(becasAgrupadas).length === 0 ? (
        <p>No hay becas registradas.</p>
      ) : (
        Object.entries(becasAgrupadas).map(([tipo, becasDelTipo]) => (
          <div key={tipo} className="grupo-tipo">
            <h4>{tipo}</h4>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Visible</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {becasDelTipo.map((b) => (
                  <tr key={b.id}>
                    <td>
                      {editandoId === b.id ? (
                        <input value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
                      ) : (
                        b.nombre
                      )}
                    </td>
                    <td>
                      {editandoId === b.id ? (
                        <select value={nuevaVisibilidad} onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}>
                          <option value={1}>Sí</option>
                          <option value={0}>No</option>
                        </select>
                      ) : (
                        <span className={`etiqueta ${Number(b.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                          {Number(b.visible) === 1 ? "Sí" : "No"}
                        </span>
                      )}
                    </td>
                    <td>
                      {editandoId === b.id ? (
                        <>
                          <button onClick={() => guardarEdicion(b.id)}>Guardar</button>
                          <button onClick={() => setEditandoId(null)}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button
                            className="edit-button"
                            onClick={() => {
                              setEditandoId(b.id);
                              setNuevoTipo(b.tipo);
                              setNuevoNombre(b.nombre);
                              setNuevaVisibilidad(Number(b.visible));
                            }}
                          >
                            Editar
                          </button>
                          <button className="delete-button" onClick={() => eliminarBeca(b.id)}>Eliminar</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default Becas;
