import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css';

export default function AdminDashboard({ rutas, setRutas }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Función para eliminar una ruta
  const handleDeleteRuta = (id) => {
    setRutas(prevRutas => prevRutas.filter(ruta => ruta.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <div className="header-actions">
          <Link to="/admin/agregar-ruta" className="action-button">
            + Nueva Ruta
          </Link>
          <Link to="/" className="back-button">← Volver al Inicio</Link>
        </div>
      </div>

      <div className="routes-list">
        <h2>Rutas Registradas ({rutas.length})</h2>
        <div className="routes-container">
          {rutas.map(ruta => (
            <div key={ruta.id} className="route-item">
              <div className="route-info">
                <h3>{ruta.nombre}</h3>
                <div className="meta-info">
                  <span>{ruta.distancia}</span>
                  <span>{ruta.tiempo}</span>
                  <span>{ruta.precio}</span>
                  <span>Cupos: {ruta.cupos}</span>
                </div>
              </div>
              <div className="route-preview">
                {ruta.imagen && (
                  <img src={ruta.imagen} alt={ruta.nombre} className="route-thumbnail" />
                )}
              </div>
              <div className="route-actions">
                <Link
                  to={`/admin/editar-ruta/${ruta.id}`}
                  className="edit-button"
                >
                  ✏️ Editar
                </Link>
                <button 
                  className="delete-button"
                  onClick={() => setShowDeleteConfirm(ruta.id)}
                >
                  🗑️ Eliminar
                </button>
                
                {showDeleteConfirm === ruta.id && (
                  <div className="delete-confirm">
                    <p>¿Estás seguro de eliminar esta ruta?</p>
                    <div className="confirm-actions">
                      <button 
                        className="confirm-yes" 
                        onClick={() => handleDeleteRuta(ruta.id)}
                      >
                        Sí, eliminar
                      </button>
                      <button 
                        className="confirm-no"
                        onClick={() => setShowDeleteConfirm(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}