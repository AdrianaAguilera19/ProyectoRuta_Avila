// src/pages/AgregarRuta.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../styles/AgregarRuta.css';

export default function AgregarRuta({ agregarRuta }) {
  const navigate = useNavigate();
  
  const [datosBasicos, setDatosBasicos] = useState({
    nombre: '',
    distancia: '',
    tiempo: '',
    precio: '',
    imagenHome: '',
    rating: '/src/assets/homepage/union-15.svg' // Valor por defecto
  });

  const [detalles, setDetalles] = useState({
    descripcion: '',
    dificultades: ['', '', ''],
    imagenesDetalle: ['', '']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación avanzada
    const camposRequeridos = [
      datosBasicos.nombre,
      datosBasicos.distancia,
      datosBasicos.tiempo,
      datosBasicos.precio,
      datosBasicos.imagenHome,
      detalles.descripcion,
      ...detalles.dificultades,
      ...detalles.imagenesDetalle
    ];

    if (camposRequeridos.some(campo => campo.trim() === '')) {
      alert('¡Todos los campos son obligatorios!');
      return;
    }

    // Crear nueva ruta
    const nuevaRuta = {
      id: uuidv4(),
      nombre: datosBasicos.nombre,
      precio: datosBasicos.precio,
      distancia: datosBasicos.distancia,
      tiempo: datosBasicos.tiempo,
      imagen: datosBasicos.imagenHome, // Campo usado en RutaCard
      rating: datosBasicos.rating, // Asegúrate de incluir este campo
      descripcion: detalles.descripcion,
      dificultades: detalles.dificultades.map((d, i) => `${['Sencilla', 'Moderada', 'Difícil'][i]}: ${d}`),
      imagenes: detalles.imagenesDetalle,
      cupos: 0
    };

    agregarRuta(nuevaRuta);
    navigate('/admin/dashboard');
  };

  return (
    <div className="formulario-container">
      <h2>➕ Nueva Ruta</h2>
      
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Información Principal</legend>
          
          <div className="form-group">
            <label>Nombre de la ruta:</label>
            <input
              type="text"
              value={datosBasicos.nombre}
              onChange={(e) => setDatosBasicos({...datosBasicos, nombre: e.target.value})}
              placeholder="Ej: Sabas Nieves"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Distancia:</label>
              <input
                type="text"
                value={datosBasicos.distancia}
                onChange={(e) => setDatosBasicos({...datosBasicos, distancia: e.target.value})}
                placeholder="Ej: 3,9km"
              />
            </div>

            <div className="form-group">
              <label>Tiempo estimado:</label>
              <input
                type="text"
                value={datosBasicos.tiempo}
                onChange={(e) => setDatosBasicos({...datosBasicos, tiempo: e.target.value})}
                placeholder="Ej: 1h 55min"
              />
            </div>

            <div className="form-group">
              <label>Precio:</label>
              <input
                type="text"
                value={datosBasicos.precio}
                onChange={(e) => setDatosBasicos({...datosBasicos, precio: e.target.value})}
                placeholder="Ej: $5,00 USD"
              />
            </div>
          </div>

          <div className="form-group">
            <label>URL Imagen Principal (Homepage):</label>
            <input
              type="url"
              value={datosBasicos.imagenHome}
              onChange={(e) => setDatosBasicos({...datosBasicos, imagenHome: e.target.value})}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Detalles Adicionales</legend>
          
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              value={detalles.descripcion}
              onChange={(e) => setDetalles({...detalles, descripcion: e.target.value})}
              rows="4"
              placeholder="Describe la ruta..."
            />
          </div>

          <div className="dificultades-group">
            <h4>Niveles de Dificultad:</h4>
            {detalles.dificultades.map((dificultad, index) => (
              <div key={index} className="dificultad-input">
                <label>{['Sencilla', 'Moderada', 'Difícil'][index]}</label>
                <input
                  type="text"
                  value={dificultad}
                  onChange={(e) => {
                    const nuevasDificultades = [...detalles.dificultades];
                    nuevasDificultades[index] = e.target.value;
                    setDetalles({...detalles, dificultades: nuevasDificultades});
                  }}
                  placeholder={`Descripción ${['sencilla', 'moderada', 'difícil'][index]}`}
                />
              </div>
            ))}
          </div>

          <div className="imagenes-detalle">
            <h4>Imágenes para la página de detalles:</h4>
            {detalles.imagenesDetalle.map((imagen, index) => (
              <div key={index} className="form-group">
                <label>Imagen {index + 1}:</label>
                <input
                  type="url"
                  value={imagen}
                  onChange={(e) => {
                    const nuevasImagenes = [...detalles.imagenesDetalle];
                    nuevasImagenes[index] = e.target.value;
                    setDetalles({...detalles, imagenesDetalle: nuevasImagenes});
                  }}
                  placeholder={`URL imagen ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/dashboard')} className="cancel-button">
            Cancelar
          </button>
          <button type="submit" className="submit-button">
            Guardar Ruta
          </button>
        </div>
      </form>
    </div>
  );
}