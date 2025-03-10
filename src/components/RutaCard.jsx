import React from 'react';
import { Link } from 'react-router-dom';

export default function RutaCard({ ruta }) {
  return (
    <Link to={`/ruta/${ruta.id}`} className="route-card">
      <div className="header">
        <img src={ruta.imagen} alt="icono" />
        <h2>{ruta.nombre}</h2>
        <p className="price">{ruta.precio}</p>
      </div>
      <div className="route-details">
        <span>
          {ruta.distancia} - {ruta.tiempo}
        </span>
        <div className="rating">
          <img src={ruta.rating} alt="estrella" />
        </div>
      </div>
    </Link>
  );
}