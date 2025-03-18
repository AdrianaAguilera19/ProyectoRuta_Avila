import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Titulo from './components/Titulo';
import Rutas from './components/Rutas';
import Mapa from './components/Mapa';
import AdminDashboard from './pages/AdminDashboard';
import AgregarRuta from './pages/AgregarRuta';
import RutaDetalles from './pages/RutaDetalles';
import { rutas as initialRutas } from './data/RutasData';
import composeIcon from './assets/homepage/compose.png';
import './styles/App.css';

export default function App() {
  const [rutas, setRutas] = useState(initialRutas);

  // Función para agregar nuevas rutas
  const agregarRuta = (nuevaRuta) => {
    setRutas(prevRutas => [...prevRutas, nuevaRuta]);
  };

  return (
    <Routes>
      {/* Ruta principal */}
      <Route 
        path="/" 
        element={
          <div className="rutas-homepage-1">
            <div className="rectangle-3-2"></div>
            <Titulo />
            <div className="flex-container">
              <div className="rutas-column">
                <Rutas rutas={rutas} />
              </div>
              
              <div className="map-column">
                <Link to="/admin/dashboard" className="admin-button">
                  <img 
                    src={composeIcon} 
                    alt="Panel de administración" 
                    className="compose-icon" 
                  />
                </Link>
                <Mapa />
              </div>
            </div>
          </div>
        }
      />

      {/* Ruta para detalles de cada excursión */}
      <Route 
        path="/ruta/:id" 
        element={<RutaDetalles rutas={rutas} />} 
      />

      {/* Panel de administración */}
      <Route 
        path="/admin/dashboard" 
        element={<AdminDashboard rutas={rutas} setRutas={setRutas} />} 
      />

      {/* Formulario para nuevas rutas */}
      <Route 
        path="/admin/agregar-ruta" 
        element={<AgregarRuta agregarRuta={agregarRuta} />} 
      />
    </Routes>
  );
}