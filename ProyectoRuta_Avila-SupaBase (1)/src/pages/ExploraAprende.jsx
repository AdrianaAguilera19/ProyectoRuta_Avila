import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const App = () => {
  const [cardsData, setCardsData] = useState([]);
  const [imagenesUrls, setImagenesUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const ruta = {
          imagenes: ["imagen-bienvenida.jpg", "piedra-2.png", "banquito-2.png", "imagen-4.jpg", "imagen-5.jpg", "imagen-6.png"]
        };

        const urls = await Promise.all(
          ruta.imagenes.map(async (imagen) => {
            const { data, error } = await supabase
              .storage
              .from('images')
              .getPublicUrl(imagen);
            if (error) throw error;
            return data.publicUrl;
          })
        );
        setImagenesUrls(urls);

        const cards = [
          {
            id: 1,
            title: "La Naturaleza del Ávila",
            description: "Descubre la riqueza natural del Parque Nacional El Ávila y cómo podemos contribuir a su conservación. Aprende sobre la flora y fauna que habita en sus senderos y las mejores prácticas para mantener el entorno limpio y saludable. Juntos, podemos preservar este hermoso espacio natural para las futuras generaciones.",
            image: urls[0],
          },
          {
            id: 2,
            title: "Primer vez en el Ávila",
            description: "Si es tu primera vez haciendo senderismo, ¡no te preocupes! Te ofrecemos una guía completa con todo lo que necesitas saber para disfrutar de tu primera aventura en El Ávila. Desde la preparación adecuada hasta los esenciales que debes llevar contigo.",
            image: urls[1],
          },
          {
            id: 3,
            title: "Mejorando tu Experiencia",
            description: "Nos complace anunciar que hemos actualizado nuestras rutas de senderismo para ofrecerte la mejor experiencia posible. Descubre las nuevas rutas, los eventos especiales que hemos organizado y cómo puedes participar. Mantente informado con las últimas noticias y mejoras que hemos implementado para ti.",
            image: urls[2],
          },
          {
            id: 4,
            title: "Conexión con la Naturaleza y la Comunidad",
            description: "Únete a nuestras caminatas guiadas y eventos especiales para conocer mejor El Ávila y conectar con la comunidad unimetana. Aprende de expertos sobre la biodiversidad del parque y disfruta de actividades al aire libre en un ambiente amigable y seguro.",
            image: urls[3],
          },
          {
            id: 5,
            title: "Senderismo Seguro en El Ávila",
            description: "Tu seguridad es nuestra prioridad. Te ofrecemos consejos y recomendaciones para un senderismo seguro en El Ávila. Aprende sobre cómo prepararte para diferentes condiciones climáticas, qué hacer en caso de emergencia, cómo navegar por los senderos y otros aspectos importantes para disfrutar de tu visita sin riesgos.",
            image: urls[4],
          },
          {
            id: 6,
            title: "Diseña tu Experiencia Ideal en El Ávila",
            description: "Descubre las múltiples opciones que El Ávila tiene para ofrecer y planifica tu visita perfecta. Te ayudamos a elegir las rutas de senderismo que mejor se adaptan a tu nivel y preferencias, te informamos sobre los puntos de interés imperdibles y te damos consejos para aprovechar al máximo tu tiempo en este hermoso parque nacional.",
            image: urls[5],
          },
        ];

        setCardsData(cards);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      }
    };

    fetchImageUrls(); 
  }, []);

  const styles = {
    container: {
      textAlign: 'center',
      padding: '50px',
      paddingTop: '100px',
    },
    headerWrapper: {
      position: 'relative',
      height: '400px',
    },
    rectangle: {
      backgroundColor: 'orange',
      height: '350px',
      borderRadius: '20px 20px 0 0',
    },
    triangle: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      height: '50px',
      backgroundColor: 'orange',
      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
    },
    headerContent: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      padding: '100px',
      color: 'white',
      textAlign: 'center',
    },
    title: {
      fontSize: '3.5rem',
      margin: '0 0 30px 0',
    },
    cardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginTop: '100px',
    },
    card: {
      borderRadius: '10px',
      padding: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      textAlign: 'left'
    },
    cardImageContainer: {
      width: '100%',
      height: '200px',
      overflow: 'hidden',
      borderRadius: '10px 10px 0 0',
    },
    cardImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    cardTitle: {
      fontSize: '2rem',
      margin: '40px 0 40px 0'
    },
    cardDescription: {
      fontSize: '1.5rem',
      margin: '10px',
      lineHeight: '1.5'
    },
    foot: {
        marginTop: '5rem',
        textAlign: 'center'
    },
  };

  const Enlaces = styled.div`
    margin-top: 20px;
     margin-bottom: 30px;
  `;

  const VolverRutas = styled(Link)`
    color: #535353;
    text-decoration: underline;
    font-weight: 500;
    font-size: 1.3rem;
  `;

  return (
    <div style={styles.container}>
      <div style={styles.headerWrapper}>
        <div style={styles.rectangle}></div>
        <div style={styles.triangle}></div>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Explora y Aprende</h1>
          <h2>Aquí encontrarás respuestas a las preguntas </h2>
          <h2>más frecuentes sobre cómo planificar tu aventura.</h2>
        </div>
      </div>

      <div style={styles.cardContainer}>
        {cardsData.map((card) => (
          <div style={styles.card} key={card.id}>
            <div style={styles.cardImageContainer}>
              <img
                src={card.image}
                alt={card.title}
                style={styles.cardImage}
              />
            </div>
            <h2 style={styles.cardTitle}>{card.title}</h2>
            <p style={styles.cardDescription}>{card.description}</p>
          </div>
        ))}
      </div>
      <div style={styles.foot}>
        <Enlaces>
          <VolverRutas to="/routes">Volver a Rutas</VolverRutas>
        </Enlaces>
        <Footer />
      </div>
    </div>
  );
};

export default App;