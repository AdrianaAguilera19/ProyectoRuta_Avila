import React from 'react';
import { supabase } from '../supabase/client'; 
import './style.css'; 

function MisionComponent() {
  const [imagenUrl, setImagenUrl] = React.useState('');

  React.useEffect(() => {
    const fetchImageUrl = async () => {
      try {
       
        const { data } = await supabase
          .storage
          .from('images') 
          .getPublicUrl('mision.jpg'); 

        setImagenUrl(data.publicUrl);
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    };

    fetchImageUrl();
  }, []);

  return (
    <div className="mision-container">
      <div className="image-container">
        {/* Aquí irá la imagen con las personas */}
        <img src={imagenUrl} alt="Personas en la misión" />
      </div>
      <div className="text-container">
        <h2 className="mision-title">MISIÓN</h2>
        <p className="mision-text">
          Brindar a los estudiantes una plataforma centralizada orientada a la exposición de diferentes rutas de senderismo del Proyecto Ávila.
          ... (el resto del texto)
        </p>
      </div>
    </div>
  );
}

export default MisionComponent;