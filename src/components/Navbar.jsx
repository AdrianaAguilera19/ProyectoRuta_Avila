import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const styles = {
    body: {
      fontFamily: 'sans-serif',
      margin: 0,
    },
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      backgroundColor: '#f0f0f0',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    barraNavegacion: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      width: '100%',
    },
    grupoIzquierdo: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      justifyContent: 'flex-start',
    },
    grupoDerecho: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      justifyContent: 'flex-end',
    },
    logo: {
      fontWeight: 'bold',
      fontSize: '1.2em',
      color: 'orange',
      textDecoration: 'none',
      lineHeight: '1.2', // Asegura espacio adecuado entre líneas
    },
    logoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textDecoration: 'none', // Elimina el subrayado del logo
    },
    menu: {
      listStyle: 'none',
      display: 'flex',
      margin: 0,
      padding: 0,
      gap: '15px',
    },
    menuA: {
      textDecoration: 'none',
      color: '#333',
    },
    busqueda: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '5px',
      marginRight: '20px',
    },
    busquedaInput: {
      border: 'none',
      outline: 'none',
      padding: '5px',
    },
    iconoLupa: {
      marginLeft: '5px',
      color: '#666',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    idioma: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '20px',
    },
    usuario: {
      border: '1px solid #ccc',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '20px',
      cursor: 'pointer',
    },
    iconoUsuario: {
      fontSize: '1.2em',
      color: '#666',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
  };

  return (
    //Llamada a rutas
    <header style={styles.header}>
      <nav style={styles.barraNavegacion}>
        <div style={styles.grupoIzquierdo}>
          <Link to="/" style={styles.logoContainer}>
            <span style={styles.logo}>RUTA</span>
            <span style={styles.logo}>ÁVILA</span>
          </Link>

          <ul style={styles.menu}>
            <li>
              <Link to="/login" style={styles.menuA}>Inicia Sesión</Link>
            </li>
            <li>
              <Link to="/about" style={styles.menuA}>Conócenos</Link>
            </li>
            <li>
              <Link to="/routes" style={styles.menuA}>Rutas</Link>
            </li>
            <li>
              <Link to="/contact" style={styles.menuA}>Contacto</Link>
            </li>
          </ul>
        </div>

        <div style={styles.grupoDerecho}>
          <div style={styles.busqueda}>
            <input
              type="text"
              placeholder="Pico Naiguatá"
              style={styles.busquedaInput}
            />
            <button style={styles.iconoLupa}>🔍</button>
          </div>
          <div style={styles.idioma}>
            <span role="img" aria-label="Bandera de España">🇪🇸</span>
          </div>
          <button style={styles.usuario}>
            <span style={styles.iconoUsuario}>👤</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
