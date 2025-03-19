import React from 'react';

const MissionVisionObjective = () => {
  const styles = {
    misionVisionObjetivo: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '80px 20px', 
      background: 'linear-gradient(135deg, rgb(17, 102, 163),rgb(71, 128, 204))',
      textAlign: 'center',
      flexWrap: 'wrap',
      margin: 0, 
    },
    card: {
      width: '30%',
      padding: '30px',
      borderRadius: '15px',
      background: 'linear-gradient(135deg, #FFA500, #3498db)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      margin: '20px 10px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      ':hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
      },
    },
    title: {
      fontSize: '1.75rem',
      marginBottom: '20px',
      color: '#fff',
      fontWeight: '700',
    },
    text: {
      fontSize: '1.1rem',
      color: '#fff',
      lineHeight: '1.8',
    },
    icon: {
      fontSize: '3rem',
      color: '#fff',
      marginBottom: '20px',
    },
    '@media (max-width: 991px)': {
      card: {
        width: '45%',
      },
    },
    '@media (max-width: 640px)': {
      card: {
        width: '90%',
        margin: '10px 0',
      },
      title: {
        fontSize: '1.5rem',
      },
      text: {
        fontSize: '1rem',
      },
    },
  };

  return (
    <section style={styles.misionVisionObjetivo}>
    <div style={styles.card}>
      <i className="fas fa-rocket" style={styles.icon}></i> 
      <h2 style={styles.title}>MISIÓN</h2>
      <p style={styles.text}>
        Nuestra misión es brindar a los estudiantes de la Universidad Metropolitana una
        plataforma centralizada orientada a la exposición de diferentes rutas de
        senderismo proporcionadas por el Proyecto Ávila.
      </p>
    </div>
    <div style={styles.card}>
      <i className="fas fa-globe" style={styles.icon}></i> 
      <h2 style={styles.title}>VISIÓN</h2>
      <p style={styles.text}>
        Promover la participación estudiantil y el desarrollo integral de los estudiantes
        de la Universidad Metropolitana a través de la creación de rutas de senderismo.
      </p>
    </div>
    <div style={styles.card}>
      <i className="fas fa-bullseye" style={styles.icon}></i> 
      <h2 style={styles.title}>OBJETIVO</h2>
      <p style={styles.text}>
        A partir de la creación de “Ruta Ávila UNIMET” se busca proporcionar una plataforma
        virtual que permita a los estudiantes acceder a oportunidades de realizar rutas y
        conectar con el mundo natural.
      </p>
    </div>
  </section>
);
};

export default MissionVisionObjective;