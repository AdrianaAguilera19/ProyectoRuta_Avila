import React from 'react';
import { useLocation } from 'react-router-dom';
import '../style.css';
import Footer from '../components/Footer';

function Conocenos() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="mision-container" style={{ marginTop: '10rem' }}>
      <div className="image-container">
        <img src="src/assets/mision.jpg" alt="imagen_misión" />
      </div>
      <div className="text-container">
        <h2 className="mision-title">MISIÓN</h2>
        <p className="mision-text">
          Brindar a los estudiantes una plataforma centralizada orientada a la exposición de diferentes rutas de senderismo del Proyecto Ávila.
          Buscamos fomentar la participación estudiantil y facilitar el alcance a actividades recreativas brindando la información necesaria
          sobre las rutas. Además, incentivar la educación y concientización ambiental, promoviendo prácticas sostenibles y el respeto por
          la naturaleza. Facilitando la organización de caminatas guiadas, fortaleciendo la comunidad unimetana y su conexión con el entorno natural.
        </p>
      </div>

      <div className="vision-container" style={{ marginTop: '10rem' }}>
        <div className="image-container">
          <img src="src/assets/vision.jpg" alt="imagen_vision" />
        </div>
        <div className="text-container">
          <h2 className="Vision-title">VISIÓN</h2>
          <p className="Vision-text">
            A partir de la creación de “Ruta Ávila UNIMET” se busca proporcionar una plataforma virtual 
            dinámica que permita a los estudiantes de la UNIMET acceder a oportunidades de realizar rutas 
            de senderismo y conectar con el mundo natural. El objetivo es ser un medio donde los estudiantes 
            puedan descubrir, explorar y participar en diversas rutas ofrecidas, fomentando una cultura de 
            participación activa en las actividades recreativas de la universidad.
          </p>
        </div>
      </div>

      <div className="objetivos-container" style={{ marginTop: '10rem' }}>
        <div className="image-container">
          <img src="src/assets/objetivos.jpg" alt="imgen_objetivo" />
        </div>
        <div className="text-container">
          <h2 className="Objetivo-title">OBJETIVO</h2>
          <p className="objetivo-text">
            Promover la participación estudiantil y el desarrollo integral de los
            estudiantes de la Universidad Metropolitana a través de la creación de 
            rutas de senderismo, empleando una plataforma virtual que facilita la 
            información y registro para el usuario.
          </p>
        </div>
      </div>
      <div className='foot' style={{marginTop:'10 rem'}}>
        <Footer />
      </div>
    </div>
    
  );
}

export default Conocenos;