import React from 'react';
import TituloR from '../components/TituloR';
import Rutas from '../components/Rutas';
import Mapa from '../components/Mapa';
import Forum from "../components/Forum";
import { useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Importa Link si estás usando react-router-dom

// Importa FeedbackButton
import FeedbackButton from '../components/Feedback';

// Estilo para el botón "Explora y Aprende"
const ExploraAprendeButton = styled(Link)`
  color: #535353;
  text-decoration: underline;
  font-weight: 500;
  font-size: 1rem;
  margin-left: 10px; // Espacio entre los botones
`;

// Estilo para el botón "Abrir Foro" (para que coincida con el estilo de "Explora y Aprende")
const AbrirForoButton = styled.button`
  color: #535353;
  text-decoration: underline;
  font-weight: 500;
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export default function Rutes() {
  const navbarHeight = '80px';
  const [showForum, setShowForum] = useState(false);

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

      {/* Contenedor para los botones */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <AbrirForoButton onClick={() => setShowForum(!showForum)}>
          {showForum ? "Cerrar Foro" : "Abrir Foro"}
        </AbrirForoButton>
        <ExploraAprendeButton to="/explora-aprende">
          Explora y Aprende
        </ExploraAprendeButton>
        <FeedbackButton to="/feedback">
          Feedback
        </FeedbackButton>
      </div>

      {/* Mostrar el foro solo si el usuario lo abre */}
      {showForum && <Forum topic="Rutas" />}
    </div>
  );
}