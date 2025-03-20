import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../credenciales'; // Importa tu configuración de autenticación
import { onAuthStateChanged } from 'firebase/auth'; // Para escuchar cambios en la autenticación

// Estilos con styled-components (los mismos que antes)
const RouteList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  color: rgba(83, 83, 83, 1);
`;

const RouteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const RouteCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const FeedbackSectionContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const Star = styled.span`
  font-size: 28px;
  cursor: pointer;
  color: ${(props) => (props.selected ? '#ffcc00' : '#ccc')};
  transition: color 0.2s;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  resize: vertical;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 145, 77, 1);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(250, 165, 112);
  }
`;

const ThankYouMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: #28a745;
  margin-top: 20px;
`;

const FeedbackListContainer = styled.div`
  margin-top: 30px;
`;

const FeedbackItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
`;

const FeedbackComment = styled.div`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const LoginMessage = styled.div`
  text-align: center;
  color: #ff4d4d;
  font-size: 18px;
  margin-top: 20px;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const FeedbackSection = () => {
  const routes = [
    { name: "Sabas Nieves" },
    { name: "Humbolt" },
    { name: "Naiguata" },
    { name: "Cruz de los Palmeros I" },
    { name: "El Banquito" },
    { name: "Piedra del Indio" },
    { name: "Cruz de los Palmeros II" },
    { name: "Antenas Avila" },
  ];

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [user, setUser] = useState(null); // Estado para almacenar el usuario logueado
  const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario

  // Escuchar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Si hay un usuario logueado, actualiza el estado
        // Obtener el nombre del usuario (puedes obtenerlo de Firebase Auth o de tu base de datos)
        setUserName(user.displayName || 'Usuario Anónimo'); // Usar displayName o un valor por defecto
      } else {
        setUser(null); // Si no hay usuario, establece el estado en null
        setUserName(''); // Limpiar el nombre del usuario
      }
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar el componente
  }, []);

  useEffect(() => {
    if (selectedRoute) {
      const savedFeedbacks = JSON.parse(localStorage.getItem(selectedRoute)) || [];
      setFeedbacks(savedFeedbacks);
    }
  }, [selectedRoute]);

  const handleRouteClick = (routeName) => {
    setSelectedRoute(routeName);
    setRating(0);
    setComment('');
    setSubmitted(false);
  };

  const handleRatingClick = (star) => {
    setRating(star);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user) return; // Si no hay usuario logueado, no hacer nada

    const newFeedback = {
      routeName: selectedRoute,
      rating,
      comment,
      userId: user.uid, // Guardar el ID del usuario que hizo el comentario
      userName: userName, // Guardar el nombre del usuario
    };
    const updatedFeedbacks = [...feedbacks, newFeedback];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem(selectedRoute, JSON.stringify(updatedFeedbacks));
    setSubmitted(true);
  };

  const handleDeleteFeedback = (index) => {
    const updatedFeedbacks = feedbacks.filter((_, i) => i !== index);
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem(selectedRoute, JSON.stringify(updatedFeedbacks));
  };

  return (
    <div>
      {selectedRoute ? (
        <FeedbackSectionContainer>
          <SubmitButton onClick={() => setSelectedRoute(null)}>
            Volver a la lista de rutas
          </SubmitButton>
          <h1>Feedback para {selectedRoute}</h1>

          {!user ? (
            <LoginMessage>
              Debes iniciar sesión para dejar un comentario.
            </LoginMessage>
          ) : submitted ? (
            <ThankYouMessage>
              <h2>¡Gracias por tu feedback!</h2>
            </ThankYouMessage>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <h3>Califica esta ruta:</h3>
                <StarsContainer>
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <Star
                        key={starValue}
                        selected={starValue <= rating}
                        onClick={() => handleRatingClick(starValue)}
                      >
                        ★
                      </Star>
                    );
                  })}
                </StarsContainer>
              </div>
              <div>
                <h3>Deja un comentario:</h3>
                <TextArea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Escribe tu comentario aquí..."
                />
              </div>
              <SubmitButton type="submit">Enviar Feedback</SubmitButton>
            </form>
          )}

          <FeedbackListContainer>
            {feedbacks.map((feedback, index) => (
              <FeedbackItem key={index}>
                {user && feedback.userId === user.uid && (
                  <DeleteButton onClick={() => handleDeleteFeedback(index)}>
                    Eliminar
                  </DeleteButton>
                )}
                <UserName>{feedback.userName}</UserName> {/* Mostrar el nombre del usuario */}
                <StarsContainer>
                  {[...Array(feedback.rating)].map((_, i) => (
                    <Star key={i} selected>★</Star>
                  ))}
                </StarsContainer>
                <FeedbackComment>{feedback.comment}</FeedbackComment>
              </FeedbackItem>
            ))}
          </FeedbackListContainer>
        </FeedbackSectionContainer>
      ) : (
        <RouteList>
          <h1>Selecciona una ruta para dejar feedback</h1>
          <RouteGrid>
            {routes.map((route, index) => (
              <RouteCard
                key={index}
                onClick={() => handleRouteClick(route.name)}
              >
                <h3>{route.name}</h3>
              </RouteCard>
            ))}
          </RouteGrid>
        </RouteList>
      )}
    </div>
  );
};

export default FeedbackSection;