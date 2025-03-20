import React from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabase/client';
import Footer from '../components/Footer';
import styled from 'styled-components';

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
      <PageContainer>
          <ContentContainer>
              <Section>
                  <Article>
                      <ImageContainer>
                          <AnimatedImage src={misionImagenUrl} alt="imagen_misión" />
                      </ImageContainer>
                      <TextContainer>
                          <Title>MISIÓN</Title>
                          <Text>
                              Brindar a los estudiantes una plataforma centralizada orientada a la exposición de diferentes rutas de senderismo del Proyecto Ávila.
                              Buscamos fomentar la participación estudiantil y facilitar el alcance a actividades recreativas brindando la información necesaria
                              sobre las rutas. Además, incentivar la educación y concientización ambiental, promoviendo prácticas sostenibles y el respeto por
                              la naturaleza. Facilitando la organización de caminatas guiadas, fortaleciendo la comunidad unimetana y su conexión con el entorno natural.
                          </Text>
                      </TextContainer>
                  </Article>
              </Section>

              <Section>
                  <Article style={{ flexDirection: 'row-reverse' }}>
                      <ImageContainer>
                          <AnimatedImage src={visionImagenUrl} alt="imagen_vision" />
                      </ImageContainer>
                      <TextContainer>
                          <Title>VISIÓN</Title>
                          <Text>
                              A partir de la creación de “Ruta Ávila UNIMET” se busca proporcionar una plataforma virtual
                              dinámica que permita a los estudiantes de la UNIMET acceder a oportunidades de realizar rutas
                              de senderismo y conectar con el mundo natural. El objetivo es ser un medio donde los estudiantes
                              puedan descubrir, explorar y participar en diversas rutas ofrecidas, fomentando una cultura de
                              participación activa en las actividades recreativas de la universidad.
                          </Text>
                      </TextContainer>
                  </Article>
              </Section>

              <Section>
                  <Article>
                      <ImageContainer>
                          <AnimatedImage src={objetivosImagenUrl} alt="imgen_objetivo" />
                      </ImageContainer>
                      <TextContainer>
                          <Title>OBJETIVO</Title>
                          <Text>
                              Promover la participación estudiantil y el desarrollo integral de los
                              estudiantes de la Universidad Metropolitana a través de la creación de
                              rutas de senderismo, empleando una plataforma virtual que facilita la
                              información y registro para el usuario.
                          </Text>
                      </TextContainer>
                  </Article>
              </Section>
          </ContentContainer>
          <Foot>
              <Footer />
          </Foot>
      </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 10rem auto 0;
  padding: 0 20px;
`;

const Section = styled.section`
  margin-bottom: 5rem;
`;

const Article = styled.article`
  display: flex;
  align-items: stretch;
`;

const ImageContainer = styled.div`
  width: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  transition: opacity 0.3s ease-in-out;

  &:hover {
      opacity: 0.8;
      cursor: pointer;
  }
`;

const TextContainer = styled.div`
  width: 50%;
  background-color: #FFA500;
  color: white;
  padding: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
`;

const Text = styled.p`
  line-height: 1.6;
`;

const Foot = styled.div`
  width: 100%;
  margin-top: 10rem;
`;

export default Conocenos;