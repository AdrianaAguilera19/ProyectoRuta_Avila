import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/RutaDetalles.css';

export default function RutaDetalles({ rutas }) {
  const { id } = useParams();
  const ruta = rutas.find(r => r.id === parseInt(id));
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState('');

  if (!ruta) {
    return <div className="error">⚠️ Ruta no encontrada</div>;
  }

  return (
    <div className="contenedor">
      <div className="seccion-izquierda">
        <div className="contenedor-imagenes">
          <img src={ruta.imagenes[0]} className="imagen-principal" alt="Vista principal" />
          <img src={ruta.imagenes[1]} className="imagen-secundaria" alt="Detalles adicionales" />
        </div>
        <div className="precio">{ruta.precio}</div>
      </div>

      <div className="seccion-derecha">
        <h1>{ruta.nombre}</h1>
        
        <div className="detalles">
          <p>{ruta.distancia} • {ruta.tiempo}</p>
          <p>Cupos disponibles: {ruta.cupos}</p>
        </div>

        <div className="descripcion">
          <p>{ruta.descripcion}</p>

          <div className="dificultades">
            {ruta.dificultades.map((dificultad, index) => (
              <div key={index} className="dificultad">
                <label>
                  <input
                    type="radio"
                    name="dificultad"
                    value={dificultad}
                    onChange={(e) => setDificultadSeleccionada(e.target.value)}
                  />
                  <div className="dificultad-opcion">
                    <strong>{dificultad.split(':')[0]}:</strong> {dificultad.split(':')[1]}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="acciones">
          <button className="boton-paypal" disabled>
            <img src="/src/assets/rutasdetalladas/paypal.png" alt="PayPal" />
            Reservar ahora
          </button>
          <Link to="/" className="volver">← Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}