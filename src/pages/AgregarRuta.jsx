import '../components/AgregarRuta.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabase/client';

export default function AgregarRuta() {
  const navigate = useNavigate();

  const [datosBasicos, setDatosBasicos] = useState({
    nombre: '',
    distancia: '',
    tiempo: '',
    precio: '',
    imagenHome: '',
    rating: '/src/assets/homepage/union-15.svg',
  });

  const [detalles, setDetalles] = useState({
    descripcion: '',
    dificultades: ['', '', ''],
    imagenesDetalle: ['', ''],
  });

  const [dificultad, setDificultad] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit llamado');

    console.log('Datos básicos:', datosBasicos);
    console.log('Detalles:', detalles);

    const camposRequeridos = [
      datosBasicos.nombre,
      datosBasicos.distancia,
      datosBasicos.tiempo,
      datosBasicos.precio,
      datosBasicos.imagenHome,
      detalles.descripcion,
      ...detalles.dificultades,
      ...detalles.imagenesDetalle,
    ];

    console.log('Campos requeridos:', camposRequeridos);

    if (camposRequeridos.some((campo) => campo.trim() === '')) {
      console.log('Campos vacíos encontrados');
      alert('¡Todos los campos son obligatorios!');
      return;
    }

    const nuevaRuta = {
      ruta_id: uuidv4(), // Nuevo campo `ruta_id` de tipo UUID
      descripcion: detalles.descripcion,
      imagen1: datosBasicos.imagenHome,
      imagen2: detalles.imagenesDetalle[0],
      nombre: datosBasicos.nombre,
      precio: datosBasicos.precio,
      Sencilla: detalles.dificultades[0],
      Moderada: detalles.dificultades[1],
      Dificil: detalles.dificultades[2],
      distancia: datosBasicos.distancia,
      tiempo: datosBasicos.tiempo,
      cupos: '0',
      dificultad: dificultad,
      imagen3: detalles.imagenesDetalle[0],
      imagen4: detalles.imagenesDetalle[1],
    };

    console.log('Nueva ruta creada:', nuevaRuta);
    console.log('Cliente Supabase:', supabase);

    try {
      const { data, error } = await supabase
        .from('ruta_detalles')
        .insert([nuevaRuta]);

      console.log('Respuesta de Supabase:', { data, error });

      if (error) {
        console.error('Error al insertar la ruta:', error);
        alert('Error al guardar la ruta. Por favor, inténtalo de nuevo.');
      } else {
        console.log('Ruta insertada con éxito');
        navigate('/admin-rutas')
      }
    } catch (err) {
      console.error('Error en la solicitud a Supabase:', err);
      alert('Error inesperado al guardar la ruta.');
    }
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
              onChange={(e) => setDatosBasicos({ ...datosBasicos, nombre: e.target.value })}
              placeholder="Ej: Sabas Nieves"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Distancia:</label>
              <input
                type="text"
                value={datosBasicos.distancia}
                onChange={(e) => setDatosBasicos({ ...datosBasicos, distancia: e.target.value })}
                placeholder="Ej: 3,9km"
              />
            </div>

            <div className="form-group">
              <label>Tiempo estimado:</label>
              <input
                type="text"
                value={datosBasicos.tiempo}
                onChange={(e) => setDatosBasicos({ ...datosBasicos, tiempo: e.target.value })}
                placeholder="Ej: 1h 55min"
              />
            </div>

            <div className="form-group">
              <label>Dificultad:</label>
              <input
                type="text"
                value={dificultad}
                onChange={(e) => setDificultad(e.target.value)}
                placeholder="Ej: Fácil, Moderada, Difícil"
              />
            </div>

            <div className="form-group">
              <label>Precio:</label>
              <input
                type="text"
                value={datosBasicos.precio}
                onChange={(e) => setDatosBasicos({ ...datosBasicos, precio: e.target.value })}
                placeholder="Ej: $5,00 USD"
              />
            </div>
          </div>

          <div className="form-group">
            <label>URL Imagen Principal (Homepage):</label>
            <input
              type="url"
              value={datosBasicos.imagenHome}
              onChange={(e) => setDatosBasicos({ ...datosBasicos, imagenHome: e.target.value })}
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
              onChange={(e) => setDetalles({ ...detalles, descripcion: e.target.value })}
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
                    setDetalles({ ...detalles, dificultades: nuevasDificultades });
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
                    setDetalles({ ...detalles, imagenesDetalle: nuevasImagenes });
                  }}
                  placeholder={`URL imagen ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin-rutas')} className="cancel-button">
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