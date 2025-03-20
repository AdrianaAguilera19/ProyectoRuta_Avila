import React, { useState, useEffect } from 'react';
import TituloR from '../components/TituloR';
import Rutas from '../components/Rutas';
import Mapa from '../components/Mapa';
import Forum from "../components/Forum";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { auth } from '../credenciales';
import { onAuthStateChanged } from 'firebase/auth';
import { supabase } from '../supabase/client';
import FeedbackButton from '../components/Feedback';

// Estilo para el botón "Explora y Aprende"
const ExploraAprendeButton = styled(Link)`
  color: #535353;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  font-weight: 500;
  font-size: 1rem;
`;

const AbrirForoButton = styled.button`
  color: #535353;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  font-weight: 500;
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
`;

const AdminButton = styled(Link)`
    position: absolute;
    top: 10px;
    left: 10px;
    color: #fff;
    background-color: #0070ba;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    z-index: 10;
    &:hover {
        background-color: #005f9e;
    }
`;

export default function Rutes() {
  const navbarHeight = '80px';
  const [showForum, setShowForum] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
          console.log('Estado de autenticación cambiado:', user);
          if (user) {
              console.log('Usuario autenticado:', user.uid);
              try {
                  const { data, error } = await supabase
                      .from('profiles')
                      .select('*')
                      .eq('user_id', user.uid)
                      .single();
                  console.log('Datos de Supabase:', data);
                  console.log('Error de Supabase:', error);
                  if (error) {
                      console.error('Error al cargar desde Supabase:', error);
                  } else if (data) {
                      setUserInfo(data);
                      if (user.uid === 'YiFEDEAYJ4PiOuozKA4sj1it62s1') {
                          setIsAdmin(true);
                          console.log('Usuario es administrador.');
                      } else {
                          setIsAdmin(false);
                          console.log('Usuario no es administrador.');
                      }
                  }
              } catch (error) {
                  console.error('Error al cargar desde Supabase:', error);
              }
          } else {
              setUserInfo(null);
              setIsAdmin(false);
              console.log('Usuario no autenticado.');
          }
      });
      return () => unsubscribe();
  }, []);

  const rutasHomepageStyle = {
    position: 'relative',
    maxWidth: '1200px',
    margin: `${navbarHeight} auto 2rem auto`,
    padding: '2rem',
  };

  const rectangle32Style = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(242, 243, 240, 0.8)',
    zIndex: '-1',
    borderRadius: 'var(--border-radius)',
  };

  const flexContainerStyle = {
    display: 'flex',
    gap: '2rem',
  };

  const buttonContainerStyle = {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  };

  return (
    <div className="rutas-homepage-1" style={rutasHomepageStyle}>
      <div className="rectangle-3-2" style={rectangle32Style}></div>
      <TituloR />
      <div className="flex-container" style={flexContainerStyle}>
        <Rutas />
        <div style={{ position: 'relative', width: '50%' }}>
          <Mapa />
          {isAdmin && (
            <AdminButton to="/admin-rutas">
              Administrar Rutas
            </AdminButton>
          )}
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <AbrirForoButton onClick={() => setShowForum(!showForum)}>
          {showForum ? "Cerrar Foro" : "Abrir Foro"}
        </AbrirForoButton>
        <ExploraAprendeButton to="/explora-aprende">
          Explora y Aprende
        </ExploraAprendeButton>
      </div>

      {showForum && <Forum topic="Rutas" user={userInfo} />}

      <div style={{ textAlign: "center", margin: "20px" }}>
        <FeedbackButton to="/feedback">
          Feedback
        </FeedbackButton>
      </div>
    </div>
  );
}