import React from 'react';
import { Link } from 'react-router-dom';

const Lateralbar = ({ isOpen, onClose, user }) => {

  const styles = {
    menuLateral: {
      position: 'fixed',
      top: '66px', 
      right: isOpen ? '0' : '-300px',
      width: '250px',
      height: 'calc(100% - 60px)',
      backgroundColor: 'rgba(255, 255, 255, 0.57)',
      boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)',
      transition: 'right 0.3s ease',
      zIndex: 1000, 
      padding: '20px',
    },
    menuLateralHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    menuLateralCerrar: {
      background: 'none',
      border: 'none',
      fontSize: '1.5em',
      cursor: 'pointer',
    },
    menuLateralOpcion: {
      padding: '10px 0',
      cursor: 'pointer',
      color: '#333',
      textDecoration: 'none',
      display: 'block',
    },
    menuLateralOpcionHover: {
      backgroundColor: '#f0f0f0',
    },
    usuarioNombre: {
        fontSize: '1.1em',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
      },
  };



  return (


    <div style={styles.menuLateral}>
         
    
      {user && (
        <h4 style={styles.usuarioNombre}>
          {user.email} 
        </h4>
      )}
      <Link
        to="/perfil"
        style={styles.menuLateralOpcion}
        onClick={onClose}
      >
        Ver Perfil
      </Link>
      <Link
        to="/logout"
        style={styles.menuLateralOpcion}
        onClick={onClose}
      >
        Cerrar Sesión
      </Link>
    </div>
  );
};

export default Lateralbar;