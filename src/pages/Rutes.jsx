import React from 'react';
import TituloR from '../components/TituloR';
import Rutas from '../components/Rutas';
import Mapa from '../components/Mapa';
import Forum from "../components/Forum"; // Importe el foro
import { useState } from "react";

export default function Rutes() {
  const navbarHeight = '80px'; 
  const [showForum, setShowForum] =useState(false); //estado para el foro
  const rutasHomepageStyle = {
    position: 'relative',
    maxWidth: '1200px',
    margin: `${navbarHeight} auto 2rem auto`, 
    padding: '2rem',
  };

  const rectangle32Style = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(242, 243, 240, 0.8)',
    zIndex: '-1',
    borderRadius: 'var(--border-radius)',
  };

  const flexContainerStyle = {
    display: 'flex',
    gap: '2rem',
  };

  return (
    <div className="rutas-homepage-1" style={rutasHomepageStyle}>
      <div className="rectangle-3-2" style={rectangle32Style}></div>
      <TituloR />
      <div className="flex-container" style={flexContainerStyle}>
        <Rutas />
        <Mapa />
      </div>
    
   {/* Botón para abrir/cerrar el foro */}
   <div style={{ textAlign: "center", margin: "20px" }}>
   <button onClick={() => setShowForum(!showForum)}>
     {showForum ? "Cerrar Foro" : "Abrir Foro"}
   </button>
 </div>

 {/* Mostrar el foro solo si el usuario lo abre */}
 {showForum && <Forum topic="Rutas" />}
</div>
  )
}
