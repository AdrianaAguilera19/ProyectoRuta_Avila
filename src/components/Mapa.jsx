import React from 'react';

export default function Mapa() {
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
        <img src="src\assets\image-11-44.png" alt="map" style={imageStyle} />
      </div>
    </div>
  );
}