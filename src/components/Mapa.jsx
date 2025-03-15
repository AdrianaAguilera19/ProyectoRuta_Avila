import React from 'react';
import { supabase } from '../supabase/client'; 

export default function Mapa() {
  const [mapaUrl, setMapaUrl] = React.useState('');

  React.useEffect(() => {
    const fetchMapaUrl = async () => {
      
      const { data } = await supabase
        .storage
        .from('images') 
        .getPublicUrl('image-11-44.png'); 

      setMapaUrl(data.publicUrl);
    };

    fetchMapaUrl();
  }, []);

  const mapCardStyle = {
    background: 'var(--white)',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--shadow)',
    padding: '1rem',
    flex: '1',
    position: 'sticky',
    top: '2rem',
    alignSelf: 'flex-start',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: 'var(--border-radius)',
  };

  return (
    <div className="map-card" style={mapCardStyle}>
      <div className="header">
        <img src={mapaUrl} alt="map" style={imageStyle} />
      </div>
    </div>
  );
}