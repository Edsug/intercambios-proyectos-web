import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";
import { BASE_URL } from "../../config"; // Importa la URL base

const Carreras = () => {
  const [carreras, setCarreras] = useState([]);
  const [nuevaCarrera, setNuevaCarrera] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);
  const [loading, setLoading] = useState(false);

  const obtenerCarreras = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}get_carreras_admin.php`);
      const data = await res.json();
      setCarreras(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener carreras:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCarreras();
  }, []);

  const agregarCarrera = async (e) => {
    e.preventDefault();
    if (!nuevaCarrera.nombre.trim()) {
      alert("El nombre de la carrera es obligatorio.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}agregar_carrera.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCarrera),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevaCarrera({ nombre: "", visible: 1 });
      obtenerCarreras();
    } catch (err) {
      console.error("Error al agregar carrera:", err);
      alert("Error al agregar la carrera. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const guardarEdicion = async (id) => {
    const carreraOriginal = carreras.find(c => c.id === id);
    if (!carreraOriginal || !nuevoNombre.trim()) {
      alert("Verifica que el nombre no esté vacío.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}actualizar_carrera.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreAnterior: carreraOriginal.nombre,
          nombre: nuevoNombre,
          visible: nuevaVisibilidad
        }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setEditandoId(null);
      obtenerCarreras();
    } catch (err) {
      console.error("Error al actualizar carrera:", err);
      alert("Error al actualizar la carrera. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarCarrera = async (id) => {
    const confirmacion = window.confirm(
      "⚠️ ¿Estás seguro de eliminar esta carrera?\n\nEsta acción es irreversible y puede afectar registros existentes."
    );
    if (!confirmacion) return;

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}eliminar_carreras.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      obtenerCarreras();
    } catch (err) {
      console.error("Error al eliminar carrera:", err);
      alert("Error al eliminar la carrera. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevoNombre("");
    setNuevaVisibilidad(1);
  };

  const iniciarEdicion = (carrera) => {
    setEditandoId(carrera.id);
    setNuevoNombre(carrera.nombre);
    setNuevaVisibilidad(Number(carrera.visible));
  };

  return (
    <div className="carrera-admin">
      {/* Sección de agregar nueva carrera */}
      <div className="config-section">
        <h3>➕ Agregar Nueva Carrera</h3>
        <form onSubmit={agregarCarrera} className="config-form">
          <div className="form-group">
            <label htmlFor="nombre-carrera">Nombre de la Carrera:</label>
            <input
              id="nombre-carrera"
              type="text"
              value={nuevaCarrera.nombre}
              onChange={(e) => setNuevaCarrera({ ...nuevaCarrera, nombre: e.target.value })}
              placeholder="Ejemplo: Ingeniería en Sistemas Computacionales"
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="visible-carrera">Visibilidad:</label>
            <select
              id="visible-carrera"
              value={nuevaCarrera.visible}
              onChange={(e) => setNuevaCarrera({ ...nuevaCarrera, visible: parseInt(e.target.value) })}
              disabled={loading}
            >
              <option value={1}>✅ Visible (Sí)</option>
              <option value={0}>❌ Oculta (No)</option>
            </select>
          </div>
          <div className="form-group">
            <button 
              type="submit" 
              className="save-button"
              disabled={loading || !nuevaCarrera.nombre.trim()}
            >
              {loading ? "⏳ Agregando..." : "💾 Agregar Carrera"}
            </button>
          </div>
        </form>
      </div>

      {/* Sección de listado de carreras */}
      <div className="config-section">
        <h3>📋 Carreras Registradas ({carreras.length})</h3>
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
            ⏳ Cargando carreras...
          </div>
        )}

        {!loading && carreras.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'var(--text-light)',
            background: '#f8fafc',
            borderRadius: 'var(--border-radius)',
            border: '2px dashed var(--border-color)'
          }}>
            📝 No hay carreras registradas aún.<br />
            <small>Agrega la primera carrera usando el formulario de arriba.</small>
          </div>
        )}

        {!loading && carreras.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nombre de la Carrera</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carreras.map(carrera => (
                  <tr key={carrera.id}>
                    <td data-label="Nombre">
                      {editandoId === carrera.id ? (
                        <input
                          type="text"
                          value={nuevoNombre}
                          onChange={(e) => setNuevoNombre(e.target.value)}
                          placeholder="Nombre de la carrera"
                          style={{ width: '100%', minWidth: '200px' }}
                        />
                      ) : (
                        <span style={{ fontWeight: '500' }}>{carrera.nombre}</span>
                      )}
                    </td>
                    <td data-label="Estado">
                      {editandoId === carrera.id ? (
                        <select
                          value={nuevaVisibilidad}
                          onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                          style={{ width: '100%' }}
                        >
                          <option value={1}>✅ Visible (Sí)</option>
                          <option value={0}>❌ Oculta (No)</option>
                        </select>
                      ) : (
                        <span className={`etiqueta ${Number(carrera.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                          {Number(carrera.visible) === 1 ? "Visible" : "Oculta"}
                        </span>
                      )}
                    </td>
                    <td data-label="Acciones">
                      {editandoId === carrera.id ? (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <button 
                            onClick={() => guardarEdicion(carrera.id)}
                            className="save-button"
                            disabled={loading || !nuevoNombre.trim()}
                          >
                            💾 Guardar
                          </button>
                          <button 
                            onClick={cancelarEdicion}
                            className="cancel-button"
                            disabled={loading}
                          >
                            ❌ Cancelar
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <button
                            className="edit-button"
                            onClick={() => iniciarEdicion(carrera)}
                            disabled={loading}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => eliminarCarrera(carrera.id)}
                            disabled={loading}
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Información adicional */}
      {carreras.length > 0 && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'var(--section-bg)',
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-light)',
          fontSize: '0.9rem'
        }}>
          💡 <strong>Tip:</strong> Las carreras ocultas no aparecerán en los formularios de registro, 
          pero los registros existentes mantendrán la referencia.
        </div>
      )}
    </div>
  );
};

export default Carreras;