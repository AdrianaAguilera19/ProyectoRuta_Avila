import React, { useState } from 'react';
import './Gallery.css'; // Importa el archivo CSS

const Gallery = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filesWithComments = selectedFiles.map(file => ({
      file,
      comment: ''
    }));
    setFiles([...files, ...filesWithComments]);
  };

  const handleCommentChange = (index, comment) => {
    const updatedFiles = [...files];
    updatedFiles[index].comment = comment;
    setFiles(updatedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la subida de archivos y comentarios, por ejemplo, enviarlos a un servidor
    console.log('Archivos y comentarios:', files);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Galería de Fotos y Videos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*, video/*"
          multiple
          onChange={handleFileChange}
        />
        <div className="gallery-grid">
          {files.map((file, index) => (
            <div key={index} className="gallery-item">
              {file.file.type.startsWith('image') ? (
                <img src={URL.createObjectURL(file.file)} alt={`Imagen ${index}`} />
              ) : (
                <video src={URL.createObjectURL(file.file)} controls />
              )}
              <textarea
                placeholder="Añade un comentario..."
                value={file.comment}
                onChange={(e) => handleCommentChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="upload-button">Subir archivos</button>
      </form>
    </div>
  );
};

export default Gallery;