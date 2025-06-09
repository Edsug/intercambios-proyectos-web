import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";
import { BASE_URL } from "../../config"; // Importa la URL base

const Discapacidades = () => {
  const [discapacidades, setDiscapacidades] = useState([]);
  const [nuevaDiscapacidad, setNuevaDiscapacidad] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);
  const [loading, setLoading] = useState(false);

  const obtenerDiscapacidades = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}get_discapacidades_admin.php`);
      const data = await res.json();
      setDiscapacidades(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener discapacidades:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerDiscapacidades();
  }, []);

  const agregarDiscapacidad = async (e) => {
    e.preventDefault();
    if (!nuevaDiscapacidad.nombre.trim()) {
      alert("El nombre de la discapacidad es obligatorio.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}agregar_discapacidad.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaDiscapacidad),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevaDiscapacidad({ nombre: "", visible: 1 });
      obtenerDiscapacidades();
    } catch (err) {
      console.error("Error al agregar discapacidad:", err);
      alert("Error al agregar la discapacidad. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const guardarEdicion = async (id) => {
    const discapacidadOriginal = discapacidades.find(d => d.id === id);
    if (!discapacidadOriginal || !nuevoNombre.trim()) {
      alert("Verifica que el nombre no esté vacío.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}actualizar_discapacidad.php`, {
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
      obtenerDiscapacidades();
    } catch (err) {
      console.error("Error al actualizar discapacidad:", err);
      alert("Error al actualizar la discapacidad. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarDiscapacidad = async (id) => {
    const confirmacion = window.confirm(
      "⚠️ ¿Estás seguro de eliminar esta discapacidad?\n\nEsta acción es irreversible y puede afectar registros existentes."
    );
    if (!confirmacion) return;

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}eliminar_discapacidad.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      obtenerDiscapacidades();
    } catch (err) {
      console.error("Error al eliminar discapacidad:", err);
      alert("Error al eliminar la discapacidad. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevoNombre("");
    setNuevaVisibilidad(1);
  };

  const iniciarEdicion = (discapacidad) => {
    setEditandoId(discapacidad.id);
    setNuevoNombre(discapacidad.nombre);
    setNuevaVisibilidad(Number(discapacidad.visible));
  };

  return (
    <div className="carrera-admin">
      {/* Sección de agregar nueva discapacidad */}
      <div className="config-section">
        <h3>➕ Agregar Nueva Discapacidad</h3>
        <form onSubmit={agregarDiscapacidad} className="config-form">
          <div className="form-group">
            <label htmlFor="nombre-discapacidad">Nombre de la Discapacidad:</label>
            <input
              id="nombre-discapacidad"
              type="text"
              value={nuevaDiscapacidad.nombre}
              onChange={(e) => setNuevaDiscapacidad({ ...nuevaDiscapacidad, nombre: e.target.value })}
              placeholder="Ejemplo: Visual, Auditiva, Motriz"
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="visible-discapacidad">Visibilidad:</label>
            <select
              id="visible-discapacidad"
              value={nuevaDiscapacidad.visible}
              onChange={(e) => setNuevaDiscapacidad({ ...nuevaDiscapacidad, visible: parseInt(e.target.value) })}
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
              disabled={loading || !nuevaDiscapacidad.nombre.trim()}
            >
              {loading ? "⏳ Agregando..." : "💾 Agregar Discapacidad"}
            </button>
          </div>
        </form>
      </div>

      {/* Sección de listado de discapacidades */}
      <div className="config-section">
        <h3>📋 Discapacidades Registradas ({discapacidades.length})</h3>
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
            ⏳ Cargando discapacidades...
          </div>
        )}

        {!loading && discapacidades.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'var(--text-light)',
            background: '#f8fafc',
            borderRadius: 'var(--border-radius)',
            border: '2px dashed var(--border-color)'
          }}>
            📝 No hay discapacidades registradas aún.<br />
            <small>Agrega la primera discapacidad usando el formulario de arriba.</small>
          </div>
        )}

        {!loading && discapacidades.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nombre de la Discapacidad</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {discapacidades.map(discapacidad => (
                  <tr key={discapacidad.id}>
                    <td data-label="Nombre">
                      {editandoId === discapacidad.id ? (
                        <input
                          type="text"
                          value={nuevoNombre}
                          onChange={(e) => setNuevoNombre(e.target.value)}
                          placeholder="Nombre de la discapacidad"
                          style={{ width: '100%', minWidth: '200px' }}
                        />
                      ) : (
                        <span style={{ fontWeight: '500' }}>{discapacidad.nombre}</span>
                      )}
                    </td>
                    <td data-label="Estado">
                      {editandoId === discapacidad.id ? (
                        <select
                          value={nuevaVisibilidad}
                          onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                          style={{ width: '100%' }}
                        >
                          <option value={1}>✅ Visible (Sí)</option>
                          <option value={0}>❌ Oculta (No)</option>
                        </select>
                      ) : (
                        <span className={`etiqueta ${Number(discapacidad.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                          {Number(discapacidad.visible) === 1 ? "Visible" : "Oculta"}
                        </span>
                      )}
                    </td>
                    <td data-label="Acciones">
                      {editandoId === discapacidad.id ? (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <button 
                            onClick={() => guardarEdicion(discapacidad.id)}
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
                            onClick={() => iniciarEdicion(discapacidad)}
                            disabled={loading}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => eliminarDiscapacidad(discapacidad.id)}
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
      {discapacidades.length > 0 && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'var(--section-bg)',
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-light)',
          fontSize: '0.9rem'
        }}>
          💡 <strong>Tip:</strong> Las discapacidades ocultas no aparecerán en los formularios de registro, 
          pero los registros existentes mantendrán la referencia.
        </div>
      )}
    </div>
  );
};

export default Discapacidades;