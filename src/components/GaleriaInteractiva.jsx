import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client"; // Ruta de Supabase correcta

const GaleriaInteractiva = () => {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Lista las imágenes desde la carpeta 'public' en el bucket 'images'
        const { data, error } = await supabase.storage.from("galeria").list("public");

        if (error) throw error;

        // Obtiene las URLs públicas de las imágenes
        const urls = data.map((file) =>
          supabase.storage.from("galeria").getPublicUrl(`public/${file.name}`).data.publicUrl
        );

        setImagenes(urls);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const filePath = `public/${file.name}`;
    const { error: uploadError } = await supabase.storage.from("galeria").upload(filePath, file);

    if (uploadError) {
      console.error("Error al subir la imagen:", uploadError);
      return;
    }

    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("galeria")
      .getPublicUrl(filePath);

    if (urlError) {
      console.error("Error al obtener la URL pública:", urlError);
      return;
    }

    setImagenes((prev) => [...prev, publicUrlData.publicUrl]);
  };

  const agregarImagen = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleFileChange;
    input.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Galería Interactiva</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando imágenes...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "10px",
          }}
        >
          {imagenes.length > 0 ? (
            imagenes.map((imagen, index) => (
              <img
                key={index}
                src={imagen}
                alt={`Imagen ${index + 1}`}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No hay imágenes disponibles.</p>
          )}
        </div>
      )}

      <button
        onClick={agregarImagen}
        style={{
          marginTop: "20px",
          display: "block",
          margin: "0 auto",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Agregar Imagen
      </button>
    </div>
  );
};

export default GaleriaInteractiva;
