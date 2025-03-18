import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { rutas } from '../components/RutasData.jsx';
import { supabase } from '../supabase/client';
import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';

const Contenedor = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 50px;
  align-items: flex-start;
  padding-top: 100px;
  position: relative;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const SeccionIzquierda = styled.div`
  width: 45%;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const ContenedorImagenes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ImagenPrincipal = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 992px) {
    height: 350px;
  }

  @media (max-width: 576px) {
    height: 250px;
  }
`;

const ImagenSecundaria = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 992px) {
    height: 150px;
  }

  @media (max-width: 576px) {
    height: 120px;
  }
`;

const Precio = styled.div`
  position: absolute;
  top: 100px;
  right: 0;
  background: #fff;
  padding: 15px 35px;
  border-radius: 25px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  color: #535353;

  @media (max-width: 992px) {
    font-size: 1.1rem;
    padding: 12px 25px;
    right: 20px;
  }

  @media (max-width: 576px) {
    font-size: 0.9rem;
    padding: 10px 20px;
    top: 80px;
    right: 15px;
  }
`;

const SeccionDerecha = styled.div`
  width: 55%;
  padding-top: 20px;
  padding-right: 20px;
  overflow: visible;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const Titulo = styled.h1`
  font-family: 'Montserrat', sans-serif;
  color: #535353;
  font-size: 2.8rem;
  margin-bottom: 25px;

  @media (max-width: 992px) {
    font-size: 2.2rem;
  }
`;

const Detalles = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 35px;
  font-size: 1.1rem;
  color: #535353;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Descripcion = styled.div`
  width: 100%;
  overflow: visible;
  white-space: normal;
  margin-bottom: 20px;
`;

const ParrafoDescripcion = styled.p`
  line-height: 1.7;
  margin-bottom: 30px;
  color: #535353;
  font-size: 1rem;
  width: 100%;
  overflow: visible;
  white-space: normal;
`;

const Dificultades = styled.div`
  margin-top: 20px;
  width: auto;
`;

const Dificultad = styled.div`
  margin-bottom: 15px;
  width: 100%;
  white-space: normal;
  overflow: visible;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #535353;
`;

const DificultadOpcion = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  white-space: normal;
  overflow: visible;
  cursor: pointer;

  &.seleccionada {
    background-color: #f0f8ff;
    border-color: #0070ba;
  }
`;

const RadioInput = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const BotonPaypal = styled.button`
  background: #0070ba;
  color: white;
  border: none;
  padding: 18px 45px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 112, 186, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 576px) {
    width: 100%;
    justify-content: center;
    padding: 15px;
  }
`;

const Enlaces = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 30px;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const FechasDisponibles = styled.span`
  color: #535353;
  text-decoration: underline;
  font-weight: 500;
  font-size: 1rem;
  cursor: not-allowed;
  opacity: 0.5;
`;

const VolverRutas = styled(Link)`
  color: #535353;
  text-decoration: underline;
  font-weight: 500;
  font-size: 1rem;
`;

function RutaDetalles() {
  const { id } = useParams();
  const ruta = rutas.find((r) => r.id === parseInt(id));
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState('');
  const [imagenesUrls, setImagenesUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const urls = await Promise.all(
          ruta.imagenes.map(async (imagen) => {
            const { data, error } = await supabase
              .storage
              .from('images')
              .getPublicUrl(imagen);
            if (error) throw error;
            return data.publicUrl;
          })
        );
        setImagenesUrls(urls);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
        toast.error("Error al cargar las imágenes");
      }
    };

    fetchImageUrls();
  }, [ruta.imagenes]);

  if (!ruta) {
    return <div>Ruta no encontrada</div>;
  }

  const handleDificultadChange = (event) => {
    setDificultadSeleccionada(event.target.value);
  };

  return (
    <Contenedor>
      <SeccionIzquierda>
        <ContenedorImagenes>
          <ImagenPrincipal src={imagenesUrls[0] || null} alt="Sendero principal" />
          <ImagenSecundaria src={imagenesUrls[1] || null} alt="Detalles del sendero" />
        </ContenedorImagenes>
      </SeccionIzquierda>

      <SeccionDerecha>
        <Titulo>{ruta.nombre}</Titulo>

        <Detalles>
          <p className="distancia">{ruta.distancia} • {ruta.tiempo}</p>
          <p className="cupos">Cupos disponibles: {ruta.cupos}</p>
        </Detalles>

        <Descripcion>
          <ParrafoDescripcion>{ruta.descripcion}</ParrafoDescripcion>

          <Dificultades>
            {ruta.dificultades.map((dificultad, index) => (
              <Dificultad key={index}>
                <DificultadOpcion className={dificultadSeleccionada === dificultad ? 'seleccionada' : ''}>
                  <RadioInput
                    type="radio"
                    name="dificultad"
                    value={dificultad}
                    checked={dificultadSeleccionada === dificultad}
                    onChange={handleDificultadChange}
                  />
                  <strong> {dificultad.split(':')[0]}:</strong> {dificultad.split(':')[1]}
                </DificultadOpcion>
              </Dificultad>
            ))}
          </Dificultades>

          <PayPalButtons
            style={{
              layout: "horizontal",
              color: "gold",
              shape: "rect",
              label: "paypal",
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: '10.00',
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                setTimeout(() => {
                  toast.success('Pago exitoso');
                }, 1000); 
              });
            }}
            onError={(err) => {
              toast.error('Error en el pago');
              console.error(err);
            }}
          />

        </Descripcion>

        <Enlaces>
          <FechasDisponibles>Ver fechas disponibles</FechasDisponibles>
          <VolverRutas to="/routes">Volver a Rutas</VolverRutas>
        </Enlaces>
      </SeccionDerecha>

      <Precio>{ruta.precio}</Precio>
    </Contenedor>
  );
}

export default RutaDetalles;