import { useState, useEffect } from "react";

const Forum = ({ topic }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Cargar comentarios desde el almacenamiento local
  useEffect(() => {
    const savedComments = localStorage.getItem("comments-${topic}");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [topic]);

  // Guardar comentarios en el almacenamiento local
  useEffect(() => {
    localStorage.setItem("comments-${topic}", JSON.stringify(comments));
  }, [comments, topic]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const comment = {
      id: Date.now(),
      text: newComment,
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div style={styles.container}>
      <h2>Foro: {topic}</h2>
      <div style={styles.commentList}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={styles.comment}>
              {comment.text}
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