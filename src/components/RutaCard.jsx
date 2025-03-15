import React from 'react';
import { supabase } from '../supabase/client'; // Importa Supabase

export default function RutaCard({ ruta }) {
  const [imagenUrl, setImagenUrl] = React.useState('');
  const [ratingUrl, setRatingUrl] = React.useState('');

  React.useEffect(() => {
    const fetchImageUrls = async () => {
      // Obtener la URL de la imagen de la ruta
      const { data: imagenData } = await supabase
        .storage
        .from('images') // Nombre del bucket en Supabase
        .getPublicUrl(ruta.imagen); // Nombre del archivo de la imagen

      // Obtener la URL de la imagen de rating
      const { data: ratingData } = await supabase
        .storage
        .from('images') // Nombre del bucket en Supabase
        .getPublicUrl(ruta.rating); // Nombre del archivo de la imagen

      setImagenUrl(imagenData.publicUrl);
      setRatingUrl(ratingData.publicUrl);
    };

    fetchImageUrls();
  }, [ruta.imagen, ruta.rating]);

  const routeCardStyle = {
    background: 'var(--white)',
    borderRadius: 'var(--border-radius)',
    padding: '1.8rem',
    boxShadow: 'var(--shadow)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  };

  const h2Style = {
    fontSize: '26px',
    fontWeight: '600',
    color: 'var(--text-rgb-83-83-83)',
    margin: '0',
  };

  const priceStyle = {
    fontSize: '24px',
    fontWeight: '500',
    color: 'var(--text-rgb-83-83-83)',
    margin: '0',
  };

  const routeDetailsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const spanStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '19px',
    fontWeight: '500',
    color: 'var(--text-rgb-83-83-83)',
  };

  const ratingImgStyle = {
    width: '70px',
    height: '70px',
    marginRight: '4px',
  };

  return (
    <div className="route-card" style={routeCardStyle}>
      <div className="header" style={headerStyle}>
        <img src={imagenUrl} alt="icono" />
        <h2 className="text-31" style={h2Style}>{ruta.nombre}</h2>
        <p className="price" style={priceStyle}>{ruta.precio}</p>
      </div>
      <div className="route-details" style={routeDetailsStyle}>
        <span className="text-32" style={spanStyle}>
          <i className="fas fa-mountain"></i> {ruta.dificultad}
        </span>
        <span className="text-32" style={spanStyle}>
          <i className="fas fa-route"></i> {ruta.distancia}
        </span>
        <span className="text-32" style={spanStyle}>
          <i className="fas fa-clock"></i> {ruta.tiempo}
        </span>
        <div className="rating">
          <img src={ratingUrl} alt="estrella" style={ratingImgStyle} />
        </div>
      </div>
    </div>
  );
}