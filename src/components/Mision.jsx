import React from 'react';
import './style.css'; // Importa tus estilos CSS

function MisionComponent() {
  return (
    <div className="mision-container">
      <div className="image-container">
        {/* Aquí irá la imagen con las personas */}
        <img src="/ruta/a/tu/imagen.jpg" alt="Personas en la misión" />
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