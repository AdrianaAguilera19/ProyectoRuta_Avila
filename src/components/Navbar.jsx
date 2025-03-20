import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Lateralbar from './Lateralbar';
import SearchResults from '../components/SearchResults';
import { supabase } from '../supabase/client';

const Navbar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setShowResults(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ruta_detalles')
        .select('id, nombre')
        .ilike('nombre', `%${searchTerm}%`);

      if (error) {
        console.error('Error searching routes:', error);
        return;
      }

      setSearchResults(data || []);
      setShowResults(true);
    } catch (err) {
      console.error('Error during search:', err);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const styles = {
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
      lineHeight: '1.2',
    },
    logoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textDecoration: 'none',
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
    menuAActive: {
      textDecoration: 'none',
      color: 'orange',
      fontWeight: 'bold',
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
    usuarioContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
    },
    usuarioNombre: {
      fontSize: '0.9em',
      color: '#333',
    },
    usuarioIcono: {
      fontSize: '1.2em',
      color: '#666',
    },
    searchResultsContainer: {
      position: 'absolute',
      top: '60px',
      right: '20px',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      zIndex: 1001,
      width: '300px',
      maxHeight: '200px',
      overflowY: 'auto',
    },
  };

  return (
    <header style={styles.header}>
      <nav style={styles.barraNavegacion}>
        <div style={styles.grupoIzquierdo}>
          <Link to="/" style={styles.logoContainer}>
            <span style={styles.logo}>RUTA</span>
            <span style={styles.logo}>ÁVILA</span>
          </Link>

          <ul style={styles.menu}>
            {/* Mostrar opciones según el tipo de usuario */}
            {user?.type === 'guia' ? (
              // Opciones para el guía
              <>
                <li>
                  <Link
                    to="/mis-rutas"
                    style={location.pathname === '/mis-rutas' ? styles.menuAActive : styles.menuA}
                  >
                    Mis Rutas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reservas"
                    style={location.pathname === '/reservas' ? styles.menuAActive : styles.menuA}
                  >
                    Reservas
                  </Link>
                </li>
              </>
            ) : (
              // Opciones para usuarios normales
              <>
                <li>
                  <Link
                    to="/login"
                    style={location.pathname === '/login' ? styles.menuAActive : styles.menuA}
                  >
                    Inicia Sesión
                  </Link>
                </li>
                <li>
                  <Link
                    to="/conocenos"
                    style={location.pathname === '/conocenos' ? styles.menuAActive : styles.menuA}
                  >
                    Conócenos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/routes"
                    style={location.pathname === '/routes' ? styles.menuAActive : styles.menuA}
                  >
                    Rutas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contacto"
                    style={location.pathname === '/contacto' ? styles.menuAActive : styles.menuA}
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    to="/galeria"
                    style={location.pathname === '/galeria' ? styles.menuAActive : styles.menuA}
                  >
                    Galería
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div style={styles.grupoDerecho}>
          <div style={styles.busqueda}>
            <input
              type="text"
              placeholder="Nombre de la ruta"
              style={styles.busquedaInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button style={styles.iconoLupa} onClick={handleSearch}>
              🔍
            </button>
          </div>

          {showResults && (
            <div style={styles.searchResultsContainer}>
              <SearchResults results={searchResults} onClose={() => setShowResults(false)} />
            </div>
          )}

          <div style={styles.idioma}>
            <span role="img" aria-label="Bandera de España">
              🇪🇸
            </span>
          </div>

          <div
            style={styles.usuarioContainer}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span style={styles.usuarioIcono}>👤</span>
          </div>
        </div>
      </nav>

      <Lateralbar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        ref={menuRef}
        user={user}
      />
    </header>
  );
};

export default Navbar;