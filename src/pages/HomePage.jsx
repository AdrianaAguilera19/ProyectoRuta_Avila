import React, { useState, useEffect } from 'react';
import { app } from '../credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //Cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (userConnected) => {
      console.log(userConnected);
      if (userConnected) {
        setUser(userConnected); 
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bienvenido a Ruta Ávila Unimet</h1>
      <p>Explora nuestras rutas y aventuras.</p>
      {user ? (
        <div>
          <h2>Usuario conectado:</h2>
          <p>Correo: {user.email}</p>
        </div>
      ) : (
        <h2>No hay usuario conectado</h2>
      )}
    </div>
  );
};

export default Home;