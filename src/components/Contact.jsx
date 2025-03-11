import React from 'react';
import backgroundImage from 'https://images.squarespace-cdn.com/content/v1/64ad6c705468b0201e17bb93/1722000877109-LE69F9DFG194AF0TZPTG/shutterstock_2200880881.jpg'; 

const Contact = () => {
  const styles = {
    contacto: {
      textAlign: 'center',
      padding: '90px 10px',
      backgroundImage: `url(${backgroundImage})`, 
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      margin: 0,
    },
    recuadroFormulario: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '15px',
      padding: '40px',
      width: '85%',
      maxWidth: '800px',
      margin: '40px auto',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
    formulario: {
      width: '100%',
      padding: '20px',
    },
    titulo: {
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#2c3e50',
    },
    descripcion: {
      fontSize: '1rem',
      color: '#34495e',
      marginBottom: '30px',
    },
    label: {
      display: 'block',
      fontSize: '1rem',
      color: '#2c3e50',
      marginBottom: '10px',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      ':focus': {
        borderColor: '#FFA500',
      },
    },
    textarea: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      resize: 'vertical',
      ':focus': {
        borderColor: '#FFA500',
      },
    },
    boton: {
      backgroundColor: '#FFA500',
      background: 'linear-gradient(135deg, #FFA500,rgb(255, 121, 4))',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      marginRight: '10px',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
    botonCancelar: {
      backgroundColor: '#FF4500',
      background: 'linear-gradient(135deg,rgb(255, 162, 0),rgb(238, 36, 0))',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
    '@media (max-width: 768px)': {
      contacto: {
        padding: '60px 20px',
      },
      recuadroFormulario: {
        width: '90%',
        padding: '20px',
      },
      titulo: {
        fontSize: '1.5rem',
      },
      descripcion: {
        fontSize: '0.9rem',
      },
    },
  };

  return (
    <section style={styles.contacto}>
      <div style={styles.recuadroFormulario}>
        <div style={styles.formulario}>
          <h2 style={styles.titulo}>SOLICITAR MÁS INFORMACIÓN</h2>
          <p style={styles.descripcion}>
            Rellene los campos y se pondrán en contacto con usted lo antes posible, muchas gracias.
          </p>
          <form>
            <label htmlFor="correo" style={styles.label}>E-mail</label>
            <input
              type="email"
              id="correo"
              placeholder="pedroperez@correo.unimet.edu.ve"
              style={styles.input}
            />

            <label htmlFor="nombre-apellido" style={styles.label}>Nombre y Apellido</label>
            <input
              type="text"
              id="nombre-apellido"
              placeholder="Pedro Pérez"
              style={styles.input}
            />

            <label htmlFor="numero-telefonico" style={styles.label}>Número de Teléfono</label>
            <input
              type="tel"
              id="numero-telefonico"
              placeholder="04141234567"
              style={styles.input}
            />

            <label htmlFor="solicitud" style={styles.label}>Solicitud</label>
            <textarea
              id="solicitud"
              cols="50"
              rows="5"
              placeholder="Solicito información sobre la ruta de Sabas Nieves"
              style={styles.textarea}
            ></textarea>

            <button type="submit" id="envio" style={styles.boton}>Enviar</button>
            <button type="button" style={styles.botonCancelar}>Cancelar</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;