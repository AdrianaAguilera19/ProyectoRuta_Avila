import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { rutas } from '../data/RutasData';
import '../styles/RutaDetalles.css';

export default function RutaDetalles() {
  const { id } = useParams();
  const ruta = rutas.find((r) => r.id === parseInt(id));
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState('');

  if (!ruta) {
    return <div>Ruta no encontrada</div>;
  }

  const handleDificultadChange = (event) => {
    setDificultadSeleccionada(event.target.value);
  };

  return (
    <div className="contenedor">
      {/* Sección Izquierda - Imágenes */}
      <div className="seccion-izquierda">
        <div className="contenedor-imagenes">
          <img src={ruta.imagenes[0]} className="imagen-principal" alt="Sendero principal" />
          <img src={ruta.imagenes[1]} className="imagen-secundaria" alt="Detalles del sendero" />
        </div>
        <div className="precio">{ruta.precio}</div>
      </div>

      {/* Sección Derecha - Contenido */}
      <div className="seccion-derecha">
        <h1>{ruta.nombre}</h1>

        <div className="detalles">
          <p className="distancia">{ruta.distancia} • {ruta.tiempo}</p>
          <p className="cupos">Cupos disponibles: {ruta.cupos}</p>
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
                    checked={dificultadSeleccionada === dificultad}
                    onChange={handleDificultadChange}
                  />
                  <span className={`dificultad-opcion ${dificultadSeleccionada === dificultad ? 'seleccionada' : ''}`}>
                    <strong>– {dificultad.split(':')[0]}:</strong> {dificultad.split(':')[1]}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="acciones">
          <button className="boton-paypal" disabled>
            <img src="/src/assets/rutasdetalladas/paypal.png" alt="PayPal" />
            Pagar con PayPal
          </button>

          <div className="enlaces">
            <span className="fechas-disponibles">Ver fechas disponibles</span>
            <Link to="/" className="volver-rutas">Volver a Rutas</Link>
          </div>
        </div>
      </div>
    </div>
  );
}