import React from 'react';
import { Link } from 'react-router-dom';

export default function RutaCard({ ruta }) {
  if (!ruta || !ruta.id) {
    return null;
  }

  const imagenURL = ruta.imagen || (ruta.imagenes && ruta.imagenes.length > 0 ? ruta.imagenes[0] : '');

  return (
    <Link to={`/ruta/${ruta.id}`} className="route-card">
      <div className="header">
        {imagenURL && <img src={imagenURL} alt="icono" />}
        <h2>{ruta.nombre}</h2>
      </div>

      <div className="route-details">
        <div className="info-group">
          <span className="distance">{ruta.distancia}</span>
          <span className="separator">|</span>
          <span className="time">{ruta.tiempo}</span>
          <span className="separator">|</span>
          <span className="price">{ruta.precio}</span>
        </div>
        <div className="rating">
          {ruta.rating && <img src={ruta.rating} alt="rating" />}
        </div>
      </div>
    </Link>
  );
}