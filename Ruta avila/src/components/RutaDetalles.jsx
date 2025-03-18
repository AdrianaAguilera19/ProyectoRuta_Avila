import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/RutaDetalles.css';

export default function RutaDetalles({ rutas }) {
  const { id } = useParams();
  const ruta = rutas.find(r => r.id === parseInt(id));
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!ruta) {
    return <div className="error">⚠️ Ruta no encontrada</div>;
  }

  const handleReservar = () => {
    if (!dificultadSeleccionada) {
      setErrorMessage('Por favor, selecciona una dificultad antes de reservar');
      return;
    }
    
    // Verificar si hay cupos disponibles
    if (ruta.cupos <= 0) {
      setErrorMessage('Lo sentimos, no hay cupos disponibles para esta ruta');
      return;
    }
    
    setErrorMessage('');
    setSuccessMessage('¡Reserva en proceso! Te contactaremos pronto para confirmar.');
  };

  return (
    <div className="contenedor">
      <div className="seccion-izquierda">
        <div className="contenedor-imagenes">
          {ruta.imagenes && ruta.imagenes.length > 0 && (
            <>
              <img 
                src={ruta.imagenes[0]} 
                className="imagen-principal" 
                alt={`Vista principal de ${ruta.nombre}`} 
              />
              {ruta.imagenes.length > 1 && (
                <img 
                  src={ruta.imagenes[1]} 
                  className="imagen-secundaria" 
                  alt={`Vista adicional de ${ruta.nombre}`} 
                />
              )}
            </>
          )}
        </div>
        <div className="precio">{ruta.precio}</div>
      </div>

      <div className="seccion-derecha">
        <h1>{ruta.nombre}</h1>
        
        <div className="detalles">
          <p>{ruta.distancia} • {ruta.tiempo}</p>
          <p>Cupos disponibles: {ruta.cupos}</p>
        </div>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <div className="descripcion">
          <p>{ruta.descripcion}</p>

          <div className="dificultades">
            <h3>Selecciona tu nivel de dificultad:</h3>
            {ruta.dificultades.map((dificultad, index) => {
              const parts = dificultad.split(':');
              const nivel = parts[0].trim();
              const descripcion = parts.length > 1 ? parts[1].trim() : '';
              
              return (
                <div key={index} className="dificultad">
                  <label>
                    <input
                      type="radio"
                      name="dificultad"
                      value={dificultad}
                      onChange={(e) => setDificultadSeleccionada(e.target.value)}
                    />
                    <div className="dificultad-opcion">
                      <strong>{nivel}:</strong> {descripcion}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="acciones">
          <button 
            className="boton-reservar" 
            onClick={handleReservar}
            disabled={ruta.cupos <= 0}
          >
            {ruta.cupos > 0 ? 'Reservar ahora' : 'Sin cupos disponibles'}
          </button>
          <Link to="/" className="volver">← Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}