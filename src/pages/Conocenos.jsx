import React from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabase/client'; 
import Footer from '../components/Footer';

function Conocenos() {
  const location = useLocation();
  console.log(location.pathname);

  const [misionImagenUrl, setMisionImagenUrl] = React.useState('');
  const [visionImagenUrl, setVisionImagenUrl] = React.useState('');
  const [objetivosImagenUrl, setObjetivosImagenUrl] = React.useState('');

  React.useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        
        const { data: misionData } = await supabase
          .storage
          .from('images') 
          .getPublicUrl('mision.jpg'); 

      
        const { data: visionData } = await supabase
          .storage
          .from('images') 
          .getPublicUrl('vision.jpg'); 

    
        const { data: objetivosData } = await supabase
          .storage
          .from('images') 
          .getPublicUrl('objetivos.jpg'); 

        setMisionImagenUrl(misionData.publicUrl);
        setVisionImagenUrl(visionData.publicUrl);
        setObjetivosImagenUrl(objetivosData.publicUrl);
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
      }
    };

    fetchImageUrls();
  }, []);

  return (
    <div style={styles.misionContainer}>
      <div style={styles.imageContainer}>
        <img src={misionImagenUrl} alt="imagen_misión" />
      </div>
      <div style={styles.textContainer}>
        <h2 style={styles.title}>MISIÓN</h2>
        <p style={styles.text}>
          Brindar a los estudiantes una plataforma centralizada orientada a la exposición de diferentes rutas de senderismo del Proyecto Ávila.
          Buscamos fomentar la participación estudiantil y facilitar el alcance a actividades recreativas brindando la información necesaria
          sobre las rutas. Además, incentivar la educación y concientización ambiental, promoviendo prácticas sostenibles y el respeto por
          la naturaleza. Facilitando la organización de caminatas guiadas, fortaleciendo la comunidad unimetana y su conexión con el entorno natural.
        </p>
      </div>

      <div style={styles.visionContainer}>
        <div style={styles.imageContainer}>
          <img src={visionImagenUrl} alt="imagen_vision" />
        </div>
        <div style={styles.textContainer}>
          <h2 style={styles.title}>VISIÓN</h2>
          <p style={styles.text}>
            A partir de la creación de “Ruta Ávila UNIMET” se busca proporcionar una plataforma virtual 
            dinámica que permita a los estudiantes de la UNIMET acceder a oportunidades de realizar rutas 
            de senderismo y conectar con el mundo natural. El objetivo es ser un medio donde los estudiantes 
            puedan descubrir, explorar y participar en diversas rutas ofrecidas, fomentando una cultura de 
            participación activa en las actividades recreativas de la universidad.
          </p>
        </div>
      </div>

      <div style={styles.objetivosContainer}>
        <div style={styles.imageContainer}>
          <img src={objetivosImagenUrl} alt="imgen_objetivo" />
        </div>
        <div style={styles.textContainer}>
          <h2 style={styles.title}>OBJETIVO</h2>
          <p style={styles.text}>
            Promover la participación estudiantil y el desarrollo integral de los
            estudiantes de la Universidad Metropolitana a través de la creación de 
            rutas de senderismo, empleando una plataforma virtual que facilita la 
            información y registro para el usuario.
          </p>
        </div>
      </div>
      <div style={styles.foot}>
        <Footer />
      </div>
    </div>
  );
}


const styles = {
  misionContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '10rem',
  },
  imageContainer: {
    marginBottom: '2rem',
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#FFA500',
    color: 'white',
    padding: '40px',
    borderRadius: '8px',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  text: {
    lineHeight: '1.6',
  },
  visionContainer: {
    marginTop: '10rem',
  },
  objetivosContainer: {
    marginTop: '10rem',
  },
  foot: {
    marginTop: '10rem',
  },
};

export default Conocenos;