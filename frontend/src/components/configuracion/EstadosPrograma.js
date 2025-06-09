import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";
import { BASE_URL } from "../../config"; // Importa la URL base

const EstadosPrograma = () => {
  const [estados, setEstados] = useState([]);
  const [nuevoEstado, setNuevoEstado] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);
  const [loading, setLoading] = useState(false);

  const obtenerEstados = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}get_estado_programas_admin.php`);
      const data = await res.json();
      setEstados(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener estados de programa:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerEstados();
  }, []);

  const agregarEstado = async (e) => {
    e.preventDefault();
    if (!nuevoEstado.nombre.trim()) {
      alert("El nombre del estado es obligatorio.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}agregar_estado_programa.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEstado),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevoEstado({ nombre: "", visible: 1 });
      obtenerEstados();
    } catch (err) {
      console.error("Error al agregar estado:", err);
      alert("Error al agregar el estado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const guardarEdicion = async (id) => {
    const estadoOriginal = estados.find(e => e.id === id);
    if (!estadoOriginal || !nuevoNombre.trim()) {
      alert("Verifica que el nombre no esté vacío.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}actualizar_estado_programa.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          nombre: nuevoNombre,
          visible: nuevaVisibilidad
        }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setEditandoId(null);
      obtenerEstados();
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      alert("Error al actualizar el estado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarEstado = async (id) => {
    const confirmacion = window.confirm(
      "⚠️ ¿Estás seguro de eliminar este estado?\n\nEsta acción es irreversible y puede afectar registros existentes."
    );
    if (!confirmacion) return;

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}eliminar_estado_programa.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      obtenerEstados();
    } catch (err) {
      console.error("Error al eliminar estado:", err);
      alert("Error al eliminar el estado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevoNombre("");
    setNuevaVisibilidad(1);
  };

  const iniciarEdicion = (estado) => {
    setEditandoId(estado.id);
    setNuevoNombre(estado.nombre);
    setNuevaVisibilidad(Number(estado.visible));
  };

  return (
    <div className="carrera-admin">
      {/* Sección de agregar nuevo estado */}
      <div className="config-section">
        <h3>➕ Agregar Nuevo Estado de Programa</h3>
        <form onSubmit={agregarEstado} className="config-form">
          <div className="form-group">
            <label htmlFor="nombre-estado">Nombre del Estado:</label>
            <input
              id="nombre-estado"
              type="text"
              value={nuevoEstado.nombre}
              onChange={(e) => setNuevoEstado({ ...nuevoEstado, nombre: e.target.value })}
              placeholder="Ejemplo: ACTIVO, FINALIZADO, CANCELADO"
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="visible-estado">Visibilidad:</label>
            <select
              id="visible-estado"
              value={nuevoEstado.visible}
              onChange={(e) => setNuevoEstado({ ...nuevoEstado, visible: parseInt(e.target.value) })}
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
              disabled={loading || !nuevoEstado.nombre.trim()}
            >
              {loading ? "⏳ Agregando..." : "💾 Agregar Estado"}
            </button>
          </div>
        </form>
      </div>

      {/* Sección de listado de estados */}
      <div className="config-section">
        <h3>📋 Estados de Programa Registrados ({estados.length})</h3>
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
            ⏳ Cargando estados...
          </div>
        )}

        {!loading && estados.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'var(--text-light)',
            background: '#f8fafc',
            borderRadius: 'var(--border-radius)',
            border: '2px dashed var(--border-color)'
          }}>
            📝 No hay estados registrados aún.<br />
            <small>Agrega el primer estado usando el formulario de arriba.</small>
          </div>
        )}

        {!loading && estados.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nombre del Estado</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estados.map(estado => (
                  <tr key={estado.id}>
                    <td data-label="Nombre">
                      {editandoId === estado.id ? (
                        <input
                          type="text"
                          value={nuevoNombre}
                          onChange={(e) => setNuevoNombre(e.target.value)}
                          placeholder="Nombre del estado"
                          style={{ width: '100%', minWidth: '200px' }}
                        />
                      ) : (
                        <span style={{ fontWeight: '500' }}>{estado.nombre}</span>
                      )}
                    </td>
                    <td data-label="Estado">
                      {editandoId === estado.id ? (
                        <select
                          value={nuevaVisibilidad}
                          onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                          style={{ width: '100%' }}
                        >
                          <option value={1}>✅ Visible (Sí)</option>
                          <option value={0}>❌ Oculta (No)</option>
                        </select>
                      ) : (
                        <span className={`etiqueta ${Number(estado.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                          {Number(estado.visible) === 1 ? "Visible" : "Oculta"}
                        </span>
                      )}
                    </td>
                    <td data-label="Acciones">
                      {editandoId === estado.id ? (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <button 
                            onClick={() => guardarEdicion(estado.id)}
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
                            onClick={() => iniciarEdicion(estado)}
                            disabled={loading}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => eliminarEstado(estado.id)}
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

      {/* Información adicionaal */}
      {estados.length > 0 && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'var(--section-bg)',
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-light)',
          fontSize: '0.9rem'
        }}>
          💡 <strong>Tip:</strong> Los estados ocultos no aparecerán en los formularios, 
          pero los registros existentes mantendrán la referencia.
        </div>
      )}
    </div>
  );
};

export default EstadosPrograma;