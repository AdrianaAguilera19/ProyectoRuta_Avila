import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabase/client';

const AdminDashboardContainer = styled.div`
  max-width: 1200px;
  margin: 100px auto;
  padding: 0 20px;
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  h1 {
    font-size: 28px;
    margin: 0;
    color: #333;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 15px;
`;

const ActionButton = styled(Link)`
  background-color: #28a745;
  color: white !important;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s, background-color 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #218838;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BackButton = styled(Link)`
  background: #0070ba;
  color: white !important;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const RoutesList = styled.div`
  h2 {
    font-size: 24px;
    margin-bottom: 30px;
    color: #333;
  }
`;

const RoutesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
`;

const RouteItem = styled.div`
  border: none;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  }
`;

const RouteInfo = styled.div`
  padding: 20px;

  h3 {
    margin: 0 0 15px 0;
    font-size: 20px;
    color: #333;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 15px;
  color: #555;
  margin-top: 10px;

  span {
    background-color: #f5f5f5;
    padding: 7px 15px;
    border-radius: 25px;
    white-space: nowrap;
  }
`;

const RoutePreview = styled.div`
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RouteActions = styled.div`
  display: flex;
  padding: 20px;
  gap: 12px;
  border-top: 1px solid #f0f0f0;
`;

const EditButton = styled(Link)`
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  text-decoration: none;
  text-align: center;
  flex: 1;
  font-weight: 600;
  transition: all 0.3s;
  background-color: #0070ba;
  color: white !important;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #005a96;
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  }
`;

const DeleteButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  text-align: center;
  flex: 1;
  font-weight: 600;
  transition: all 0.3s;
  background-color: #dc3545;
  color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  }
`;

const DeleteConfirm = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  z-index: 10;
  color: white;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

const ConfirmActions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const ConfirmYes = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #dc3545;
  color: white;
  font-weight: 600;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  }
`;

const ConfirmNo = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #6c757d;
  color: white;
  font-weight: 600;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color
    background-color: #5a6268;
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  }
`;

export default function AdminRutas() {
  const [rutas, setRutas] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guiaAsignado, setGuiaAsignado] = useState({});

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const { data, error } = await supabase.from('ruta_detalles').select('*');
        if (error) {
          setError(error);
          console.error('Error al cargar rutas:', error);
        } else {
          setRutas(data);
        }
      } catch (err) {
        setError(err);
        console.error('Error al cargar rutas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRutas();
  }, []);

  const handleDeleteRuta = async (id) => {
    try {
      await supabase.from('ruta_detalles').delete().eq('id', id);
      setRutas((prevRutas) => prevRutas.filter((ruta) => ruta.id !== id));
      setShowDeleteConfirm(null);
    } catch (err) {
      setError(err);
      console.error('Error al eliminar ruta:', err);
    }
  };

  if (loading) return <div>Cargando rutas...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const guias = [
    "Luis Rodríguez", "María González", "Carlos Sánchez", "Ana Pérez",
    "Pedro Martínez", "Sofía López", "Jorge Ramírez", "Laura Gómez",
    "Diego Herrera", "Valentina Torres", "Andrés Mendoza", "Camila Rojas",
    "Fernando Castro", "Isabel Vargas", "Ricardo Núñez", "Gabriela Silva",
    "Hugo Morales", "Elena Paredes", "Raúl Cordero", "Patricia Espinoza"
  ];

  return (
    <AdminDashboardContainer>
      <AdminHeader>
        <h1>Panel de Administración</h1>
        <HeaderActions>
          <ActionButton to="/agregar-ruta">+ Nueva Ruta</ActionButton>
          <BackButton to="/routes">← Volver al Rutas</BackButton>
        </HeaderActions>
      </AdminHeader>

      <RoutesList>
        <h2>Rutas Registradas ({rutas.length})</h2>
        <RoutesContainer>
          {rutas.map((ruta) => (
            <RouteItem key={ruta.id}>
              <RouteInfo>
                <h3>{ruta.nombre}</h3>
                <MetaInfo>
                  <span>{ruta.distancia}</span>
                  <span>{ruta.tiempo}</span>
                  <span>{ruta.precio}</span>
                  <span>Cupos: {ruta.cupos}</span>
                </MetaInfo>
              </RouteInfo>
              <RoutePreview>
                {ruta.imagen1 && <img src={ruta.imagen1} alt={ruta.nombre} />}
              </RoutePreview>
              <RouteActions>
              <EditButton to={`/editar-ruta/${ruta.id}`}>✏️ Editar</EditButton>
                <DeleteButton onClick={() => setShowDeleteConfirm(ruta.id)}>
                  ️ Eliminar
                </DeleteButton>
                <select 
                  value={guiaAsignado[ruta.id] || ''}
                  onChange={(e) => setGuiaAsignado(prev => ({...prev,
                  [ruta.id]: e.target.value
      }))}
              style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  flex: "1",
                  minWidth: "180px"
    }}
  >
             <option value="">Asignar guía</option>
                 {guias.map((guia, index) => (
             <option key={index} value={guia}>{guia}</option>
    ))}
              </select>
                
                {showDeleteConfirm === ruta.id && (
                  <DeleteConfirm>
                    <p>¿Estás seguro de eliminar esta ruta?</p>
                    <ConfirmActions>
                      <ConfirmYes onClick={() => handleDeleteRuta(ruta.id)}>
                        Sí, eliminar
                      </ConfirmYes>
                      <ConfirmNo onClick={() => setShowDeleteConfirm(null)}>
                        Cancelar
                      </ConfirmNo>
                    </ConfirmActions>
                  </DeleteConfirm>
                )}
              </RouteActions>
            </RouteItem>
          ))}
        </RoutesContainer>
      </RoutesList>
    </AdminDashboardContainer>
  );
}
