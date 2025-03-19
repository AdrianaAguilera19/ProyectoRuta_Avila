import '../components/AgregarRuta.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabase/client';

export default function EditarRuta() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtén el ID de la ruta desde la URL

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

  // Cargar los datos de la ruta existente
  useEffect(() => {
    const cargarRuta = async () => {
      try {
        console.log('Consultando ruta con ID:', id);

        const { data, error } = await supabase
          .from('ruta_detalles')
          .select('*')
          .eq('id', id) // Usa el ID directamente
          .single();

        if (error) {
          console.error('Error al cargar la ruta:', error.message);
          alert('Error al cargar la ruta. Por favor, inténtalo de nuevo.');
          return;
        }

        console.log('Datos de la ruta:', data);

        // Establecer los datos en el estado
        setDatosBasicos({
          nombre: data.nombre,
          distancia: data.distancia,
          tiempo: data.tiempo,
          precio: data.precio,
          imagenHome: data.imagen1,
        });

        setDetalles({
          descripcion: data.descripcion,
          dificultades: [data.Sencilla, data.Moderada, data.Dificil],
          imagenesDetalle: [data.imagen2, data.imagen3],
        });

        setDificultad(data.dificultad);
      } catch (err) {
        console.error('Error en la solicitud a Supabase:', err.message || err);
        alert('Error inesperado al cargar la ruta.');
      }
    };

    cargarRuta();
  }, [id]); // Usa id como dependencia

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (camposRequeridos.some((campo) => campo.trim() === '')) {
      alert('¡Todos los campos son obligatorios!');
      return;
    }

    const rutaActualizada = {
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
      dificultad: dificultad,
      imagen3: detalles.imagenesDetalle[1],
    };

    try {
      const { data, error } = await supabase
        .from('ruta_detalles')
        .update(rutaActualizada)
        .eq('id', id); // Usa el ID directamente

      if (error) {
        console.error('Error al actualizar la ruta:', error.message);
        alert('Error al guardar la ruta. Por favor, inténtalo de nuevo.');
      } else {
        console.log('Ruta actualizada con éxito');
        navigate('/admin-rutas');
      }
    } catch (err) {
      console.error('Error en la solicitud a Supabase:', err.message || err);
      alert('Error inesperado al guardar la ruta.');
    }
  };

  return (
    <div className="formulario-container">
      <h2>✏️ Editar Ruta</h2>

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
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}