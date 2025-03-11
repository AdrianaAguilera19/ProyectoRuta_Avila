import React from 'react';

const Hero = () => {
  const styles = {
    hero: {
      display: 'flex',
      paddingBottom: '20px', // Reducir el padding inferior
      flexDirection: 'column',
      position: 'relative',
      minHeight: '400px', // Reducir la altura del contenedor
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    heroContent: {
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '200px 80px 0', // Reducir el padding superior
    },
    backgroundImage: {
      position: 'absolute',
      inset: '0',
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      zIndex: '-1',
    },
    foregroundImage: {
      aspectRatio: '1.65',
      objectFit: 'contain',
      objectPosition: 'center',
      width: '400px', // Reducir el tamaño del logo
      zIndex: '10',
      marginBottom: '-20px', // Ajustar el margen inferior
      maxWidth: '100%',
    },
    visuallyHidden: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0',
    },
    '@media (max-width: 991px)': {
      heroContent: {
        maxWidth: '100%',
        padding: '100px 20px 0', // Ajustar el padding para móviles
      },
      foregroundImage: {
        marginBottom: '10px',
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      backgroundImage: {
        transition: 'none',
      },
      foregroundImage: {
        transition: 'none',
      },
    },
  };

  return (
    <section style={styles.hero} aria-labelledby="heroTitle">
      <h1 id="heroTitle" style={styles.visuallyHidden}>Welcome to Our Hero Section</h1>
      <div style={styles.heroContent}>
        <img
          src="https://t4.ftcdn.net/jpg/05/30/11/41/360_F_530114130_TYglhi5JbHEm36bw2Hkb8BIes5KMHQtq.jpg"
          alt=""
          style={styles.backgroundImage}
          aria-hidden="true"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/217830854cab20ddb1584ccc2a7619790aac938e09d5c09661cf85fbc0e6eee9?placeholderIfAbsent=true&apiKey=9d59b51cf67643c49323759cacb2fdc0"
          alt="Hero image showcasing our main product"
          style={styles.foregroundImage}
        />
      </div>
    </section>
  );
};

export default Hero;