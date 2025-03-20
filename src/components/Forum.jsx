import { useState, useEffect } from "react";
import { supabase } from '../supabase/client'; // Importa tu cliente de Supabase
import { auth } from '../credenciales'; // Ajusta la ruta según tu estructura de archivos

const Forum = ({ topic, user }) => { // Recibe el objeto 'user' (userInfo)
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true); // Estado para la carga

  useEffect(() => {
    fetchComments();
  }, [topic]);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*, profiles(nombre)") // Obtiene el username de la tabla profiles
      .eq("topic", topic)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data);
    }
    setLoading(false);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "" || !user) return;

    const { error } = await supabase.from("comments").insert([
      {
        text: newComment,
        topic: topic,
        user_id: auth.currentUser.uid, // Usa el ID del usuario logeado
      },
    ]);

    if (error) {
      console.error("Error adding comment:", error);
    } else {
      setNewComment("");
      fetchComments(); // Recarga los comentarios después de agregar uno
    }
  };

  if (loading) {
    return <p>Cargando comentarios...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Foro: {topic}</h2>
      <div style={styles.commentList}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={styles.comment}>
              <strong>{comment.profiles?.nombre || user.nombre}:</strong> {comment.text}
              <br />
              <small>{new Date(comment.created_at).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
        )}
      </div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Escribe tu comentario..."
        style={styles.input}
      />
      <button onClick={handleAddComment} style={styles.button}>
        Comentar
      </button>
    </div>
  );
};

// Estilos acomodard para el foro
const styles = {
  container: {
    border: "1px solid #ccc",
    padding: "20px",
    margin: "20px auto",
    width: "80%",
    maxWidth: "600px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  commentList: {
    marginBottom: "10px",
  },
  comment: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  input: {
    width: "100%",
    height: "50px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Forum;