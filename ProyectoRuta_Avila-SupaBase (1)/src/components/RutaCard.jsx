import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase/client';

export default function RutaCard({ ruta }) {
  const [imagenUrl, setImagenUrl] = React.useState('');
  const [ratingUrl, setRatingUrl] = React.useState('');

  
  React.useEffect(() => {
    const fetchImageUrls = async () => {
      const { data: imagenData } = await supabase
        .storage
        .from('images') 
        .getPublicUrl(ruta.imagen); 

        const { data: ratingData } = await supabase
        .storage
        .from('images')
        .getPublicUrl(ruta.rating); 

      setImagenUrl(imagenData.publicUrl);
      setRatingUrl(ratingData.publicUrl);
    };

    fetchImageUrls();
  }, [ruta.imagen, ruta.rating]);

  // Estilos
  const routeCardStyle = {
    background: 'var(--white)',
    borderRadius: 'var(--border-radius)',
    padding: '1.8rem',
    boxShadow: 'var(--shadow)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textDecoration: 'none',
    display: 'block', 
    color: 'gray', 
  };

  const hoverStyle = {
    transform: 'scale(1.05)', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
    color: '#535353',
    margin: '0',
  };

  const priceStyle = {
    fontSize: '24px',
    fontWeight: '500',
    color: '#535353',
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
    color: '#535353',
  };

  const ratingImgStyle = {
    width: '70px',
    height: '70px',
    marginRight: '4px',
  };

  return (
    <Link
      to={`/ruta/${ruta.id}`} 
      className="route-card"
      style={routeCardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = hoverStyle.transform;
        e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    >
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
    </Link>
  );
}