import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RutaCard from './RutaCard';
import { supabase } from '../supabase/client'; // Asegúrate de importar el cliente de Supabase

export default function Rutas() {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const { data, error } = await supabase
          .from('ruta_detalles')
          .select('*');

        if (error) {
          throw error;
        }

        setRutas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRutas();
  }, []);

  const rutasContainerStyle = {
    flex: '2',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rutas-container" style={rutasContainerStyle}>
      {rutas.map((ruta) => (
        <Link to={`/ruta/${ruta.id}`} key={ruta.id} style={{ textDecoration: 'none' }}>
          <RutaCard ruta={ruta} />
        </Link>
      ))}
    </div>
  );
}