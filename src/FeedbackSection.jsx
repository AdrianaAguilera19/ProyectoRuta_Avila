import React, { useState, useEffect } from 'react';
import './FeedbackSection.css';

const FeedbackSection = () => {
  const routes = [
    { name: "Sabas Nieves", image: "/src/assets/download.jpeg" },
    { name: "Humbolt", image: "src/assets/humbolt.jpeg" },
    { name: "Naiguata", image: "src/assets/naiguata.jpeg" },
    { name: "Cruz de los Palmeros I", image: "src/assets/cruz1.jpeg" },
    { name: "El Banquito", image: "src/assets/banquito.jpeg" },
    { name: "Piedra del Indio", image: "src/assets/piedraindio.jpeg" },
    { name: "Cruz de los Palmeros II", image: "src/assets/cruz2 .jpeg" },
    { name: "Antenas Avila", image: "src/assets/antenas .jpeg" },
  ];

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

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
    const newFeedback = { routeName: selectedRoute, rating, comment };
    const updatedFeedbacks = [...feedbacks, newFeedback];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem(selectedRoute, JSON.stringify(updatedFeedbacks));
    setSubmitted(true);
  };

  return (
    <div>
      {selectedRoute ? (
        <div className="feedback-section">
          <button onClick={() => setSelectedRoute(null)} className="back-button">
            Volver a la lista de rutas
          </button>
          <h1>Feedback para {selectedRoute}</h1>
          {submitted ? (
            <div className="thank-you-message">
              <h2>¡Gracias por tu feedback!</h2>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="rating-section">
                <h3>Califica esta ruta:</h3>
                <div className="stars">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <span
                        key={starValue}
                        className={`star ${starValue <= rating ? 'selected' : ''}`}
                        onClick={() => handleRatingClick(starValue)}
                      >
                        ★
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="comment-section">
                <h3>Deja un comentario:</h3>
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Escribe tu comentario aquí..."
                />
              </div>
              <button type="submit">Enviar Feedback</button>
            </form>
          )}

          <div className="feedback-list">
            {feedbacks.map((feedback, index) => (
              <div key={index} className="feedback-item">
                <div className="stars">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <span key={i} className="star selected">★</span>
                  ))}
                </div>
                <div className="comment">{feedback.comment}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="route-list">
          <h1>Selecciona una ruta para dejar feedback</h1>
          <div className="route-grid">
            {routes.map((route, index) => (
              <div
                key={index}
                className="route-card"
                onClick={() => handleRouteClick(route.name)}
              >
                <img src={route.image} alt={route.name} className="route-image" />
                <h3>{route.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackSection;