import React from 'react';
import Titulo from './components/Titulo';
import Rutas from './components/Rutas';
import Mapa from './components/Mapa';
import './styles/App.css';

export default function App() {
  return (
    <div className="rutas-homepage-1">
      <div className="rectangle-3-2"></div>
      <Titulo />
      <div className="flex-container">
        <Rutas />
        <Mapa />
      </div>
    </div>
  );
}