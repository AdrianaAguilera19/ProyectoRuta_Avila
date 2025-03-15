import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
   
      fontFamily: "'Montserrat', sans-serif",
    },
    box: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '30px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.35)',
      textAlign: 'center',
      maxWidth: '600px',
      width: '100%',
    },                    
    heading: {
      fontSize: '6em',
      margin: '0',
      color: '#ff6347', 
    },
    subheading: {
      fontSize: '2em',
      margin: '20px 0',
    },
    message: {
      fontSize: '1.2em',
      margin: '20px 0',
    },
    link: {
      padding: '10px 20px',
      textDecoration: 'none',
      backgroundColor: '#c98715', 
      color: '#fff',
      borderRadius: '8px',
      fontWeight: 600,
      textTransform: 'uppercase',
      transition: 'background-color 0.3s',
    },
    linkHover: {
      backgroundColor: '#ff4500', 
    },
  };

  const [hover, setHover] = React.useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.heading}>404</h1>
        <h2 style={styles.subheading}>Página no encontrada</h2>
        <p style={styles.message}>
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link
          to="/"
          style={{ ...styles.link, ...(hover ? styles.linkHover : {}) }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
