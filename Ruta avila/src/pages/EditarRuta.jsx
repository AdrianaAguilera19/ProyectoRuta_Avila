import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AgregarRuta.css';

export default function EditarRuta({ rutas, setRutas }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Estado para almacenar la ruta que se está editando
  const [formData, setFormData] = useState({
    nombre: '',
    distancia: '',
    tiempo: '',
    precio: '',
    imagen: '',
    imagenes: ['', ''],
    descripcion: '',
    dificultades: ['', '', ''],
    cupos: 0,
    rating: '/src/assets/homepage/union-15.svg'
  });

  // Cargar los datos de la ruta cuando el componente se monta
  useEffect(() => {
    const rutaToEdit = rutas.find(r => r.id === parseInt(id));
    
    if (!rutaToEdit) {
      setErrorMessage('Ruta no encontrada');
      return;
    }
    
    // Preparar dificultades para el formulario
    const dificultadesArray = rutaToEdit.dificultades.map(d => {
      const parts = d.split(':');
      return parts.length > 1 ? parts[1].trim() : '';
    });
    
    // Rellenar con cadenas vacías si hay menos de 3 dificultades
    while (dificultadesArray.length < 3) {
      dificultadesArray.push('');
    }
    
    setFormData({
      id: rutaToEdit.id,
      nombre: rutaToEdit.nombre,
      distancia: rutaToEdit.distancia,
      tiempo: rutaToEdit.tiempo,
      precio: rutaToEdit.precio,
      imagen: rutaToEdit.imagen,
      imagenes: rutaToEdit.imagenes || [rutaToEdit.imagen, ''],
      descripcion: rutaToEdit.descripcion || '',
      dificultades: dificultadesArray,
      cupos: rutaToEdit.cupos || 0,
      rating: rutaToEdit.rating || '/src/assets/homepage/union-15.svg'
    });
  }, [id, rutas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImagenChange = (e, index) => {
    const value = e.target.value;
    
    if (index === 0) {
      // Si es la imagen principal, actualizamos también el campo imagen
      setFormData({
        ...formData,
        imagen: value,
        imagenes: formData.imagenes.map((img, i) => i === 0 ? value : img)
      });
    } else {
      // Si es otra imagen, solo actualizamos el array de imágenes
      const nuevasImagenes = [...formData.imagenes];
      nuevasImagenes[index] = value;
      setFormData({
        ...formData,
        imagenes: nuevasImagenes
      });
    }
  };

  const handleDificultadChange = (e, index) => {
    const value = e.target.value;
    const nuevasDificultades = [...formData.dificultades];
    nuevasDificultades[index] = value;
    
    setFormData({
      ...formData,
      dificultades: nuevasDificultades
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.distancia || !formData.tiempo || !formData.precio || !formData.imagen) {
      setErrorMessage('Por favor, completa todos los campos requeridos');
      return;
    }
    
    // Convertir dificultades al formato adecuado
    const dificultadesFormateadas = formData.dificultades
      .filter(d => d.trim() !== '')
      .map((d, i) => `${['Sencilla', 'Moderada', 'Difícil'][i]}: ${d}`);
    
    // Crear objeto de ruta actualizado
    const rutaActualizada = {
      ...formData,
      dificultades: dificultadesFormateadas,
      id: parseInt(formData.id)
    };
    
    // Actualizar el estado global de rutas
    setRutas(prevRutas => 
      prevRutas.map(r => r.id === rutaActualizada.id ? rutaActualizada : r)
    );
    
    // Mostrar mensaje de éxito
    setSuccessMessage('¡Ruta actualizada con éxito!');
    setErrorMessage('');
    
    // Esperar un momento antes de redirigir
    setTimeout(() => {
      navigate('/admin/dashboard');
    }, 1500);
  };

  // Si la ruta no se encontró
  if (errorMessage === 'Ruta no encontrada') {
    return (
      <div className="formulario-container">
        <div className="error-message">{errorMessage}</div>
        <button onClick={() => navigate('/admin/dashboard')} className="back-button">
          Volver al Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="formulario-container">
      <h2>✏️ Editar Ruta: {formData.nombre}</h2>
      
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Información Principal</legend>
          
          <div className="form-group">
            <label>Nombre de la ruta:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Sabas Nieves"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Distancia:</label>
              <input
                type="text"
                name="distancia"
                value={formData.distancia}
                onChange={handleInputChange}
                placeholder="Ej: 3,9km"
                required
              />
            </div>

            <div className="form-group">
              <label>Tiempo estimado:</label>
              <input
                type="text"
                name="tiempo"
                value={formData.tiempo}
                onChange={handleInputChange}
                placeholder="Ej: 1h 55min"
                required
              />
            </div>

            <div className="form-group">
              <label>Precio:</label>
              <input
                type="text"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="Ej: $5,00 USD"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Cupos disponibles:</label>
            <input
              type="number"
              name="cupos"
              value={formData.cupos}
              onChange={handleInputChange}
              placeholder="Ej: 20"
              required
            />
          </div>

          <div className="form-group">
            <label>URL Imagen Principal (Homepage):</label>
            <input
              type="url"
              value={formData.imagenes[0]}
              onChange={(e) => handleImagenChange(e, 0)}
              placeholder="https://ejemplo.com/imagen.jpg"
              required
            />
            {formData.imagenes[0] && (
              <div className="preview-image">
                <img src={formData.imagenes[0]} alt="Vista previa" />
              </div>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Detalles Adicionales</legend>
          
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe la ruta..."
              required
            />
          </div>

          <div className="dificultades-group">
            <h4>Niveles de Dificultad:</h4>
            {['Sencilla', 'Moderada', 'Difícil'].map((nivel, index) => (
              <div key={index} className="dificultad-input">
                <label>{nivel}</label>
                <input
                  type="text"
                  value={formData.dificultades[index] || ''}
                  onChange={(e) => handleDificultadChange(e, index)}
                  placeholder={`Descripción ${nivel.toLowerCase()}`}
                  required={index === 0} // Al menos el primer nivel es requerido
                />
              </div>
            ))}
          </div>

          <div className="imagenes-detalle">
            <h4>Imágenes para la página de detalles:</h4>
            {[0, 1].map((index) => (
              <div key={index} className="form-group">
                <label>Imagen {index + 1}:</label>
                <input
                  type="url"
                  value={formData.imagenes[index] || ''}
                  onChange={(e) => handleImagenChange(e, index)}
                  placeholder={`URL imagen ${index + 1}`}
                  required={index === 0} // Al menos la primera imagen es requerida
                />
                {formData.imagenes[index] && (
                  <div className="preview-image">
                    <img src={formData.imagenes[index]} alt={`Vista previa ${index + 1}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/dashboard')} className="cancel-button">
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