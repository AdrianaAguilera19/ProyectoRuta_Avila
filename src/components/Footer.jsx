import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#2c3e50',
      background: 'linear-gradient(135deg,rgb(30, 63, 38),rgb(10, 83, 156))',
      textAlign: 'center',
      padding: '40px 20px',
      color: '#fff',
      fontFamily: '"Poppins", sans-serif',
    },
    contenido: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    texto: {
      fontSize: '1rem',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },
    icono: {
      fontSize: '1.2rem',
    },
    boton: {
      backgroundColor: '#FFA500',
      background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      marginTop: '20px',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
    '@media (max-width: 768px)': {
      footer: {
        padding: '30px 15px',
      },
      texto: {
        fontSize: '0.9rem',
      },
      boton: {
        padding: '10px 20px',
        fontSize: '0.9rem',
      },
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.contenido}>
        <p style={styles.texto}>
          <i className="fas fa-phone" style={styles.icono}></i> Teléfono: +58 212 508 1000
        </p>
        <p style={styles.texto}>
          <i className="fas fa-envelope" style={styles.icono}></i> E-Mail: rutaavilaunimet@unimet.com
        </p>
       
      </div>
    </footer>
  );
};

export default Footer;