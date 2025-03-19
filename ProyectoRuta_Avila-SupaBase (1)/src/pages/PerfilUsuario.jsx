import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../credenciales'; // Importar auth desde firebase.js
import { onAuthStateChanged } from 'firebase/auth';
import { supabase } from '../supabase/client'; // Importar Supabase

// Estilos con styled-components
const AccountSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 80px;
`;

const MainHeading = styled.h1`
  padding: 10px 20px;
  color: #333;
  @media (max-width: 800px) {
    font-size: 24px;
  }
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 15px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

const InfoValue = styled.span`
  color: #666;
`;

const EditableInput = styled.input`
  color: #666;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`;

const ProfilePictureContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const UploadButton = styled.label`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #c82333;
  }
`;

const AccountSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: 'Ejemplo Nombre',
    apellido: 'Ejemplo Apellido',
    correo: '', // Correo se actualizará automáticamente
    carnet: '20250188/1',
    carrera: 'Ingeniería de Sistemas',
    profilePicture: null, // Aquí almacenamos la imagen en base64
    fechaCreacion: '', // Fecha de creación de la cuenta
    fechaUltimoAcceso: '', // Fecha del último acceso
  });

  // Obtener el correo, fecha de creación y fecha de último acceso del usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Obtener metadatos del usuario desde Firebase
        const creationTime = user.metadata.creationTime; // Fecha de creación
        const lastSignInTime = user.metadata.lastSignInTime; // Fecha de último acceso

        // Obtener datos del perfil desde Supabase
        try {
          const { data, error } = await supabase
            .from('profiles') // Nombre de la tabla en Supabase
            .select('*')
            .eq('user_id', user.uid) // Filtra por el ID del usuario
            .single(); // Obtén un solo registro

          if (error) {
            console.error('Error al cargar desde Supabase:', error);
          } else if (data) {
            console.log('Datos cargados desde Supabase:', data);
            setUserInfo({
              nombre: data.nombre || 'Ejemplo Nombre',
              apellido: data.apellido || 'Ejemplo Apellido',
              correo: user.email || 'No disponible',
              carnet: data.carnet || '20250188/1',
              carrera: data.carrera || 'Ingeniería de Sistemas',
              profilePicture: data.profile_picture_url || null, // Cargar la URL de la imagen
              fechaCreacion: creationTime || 'No disponible',
              fechaUltimoAcceso: lastSignInTime || 'No disponible',
            });
          }
        } catch (error) {
          console.error('Error al cargar desde Supabase:', error);
        }
      } else {
        // Si no hay usuario autenticado, restablecer el estado
        setUserInfo({
          nombre: 'Ejemplo Nombre',
          apellido: 'Ejemplo Apellido',
          correo: '',
          carnet: '20250188/1',
          carrera: 'Ingeniería de Sistemas',
          profilePicture: null,
          fechaCreacion: '',
          fechaUltimoAcceso: '',
        });
        window.location.href = '/login';
      }
    });

    return () => unsubscribe(); // Limpiar suscripción
  }, []);

  // Manejar la subida de la imagen
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({
          ...userInfo,
          profilePicture: reader.result, // Guardar la imagen en base64
        });
      };
      reader.readAsDataURL(file); // Convertir la imagen a base64
    }
  };

  // Manejar la eliminación de la imagen
  const handleDeletePicture = () => {
    setUserInfo({
      ...userInfo,
      profilePicture: null, // Eliminar la imagen
    });
  };

  // Guardar los cambios en Supabase
  const handleSave = async () => {
    setIsEditing(false);
    const user = auth.currentUser;

    if (user) {
      try {
        console.log("Usuario autenticado:", user);

        // Guardar los datos en Supabase
        const { data, error } = await supabase
          .from('profiles')
          .upsert(
            {
              user_id: user.uid,
              nombre: userInfo.nombre,
              apellido: userInfo.apellido,
              carnet: userInfo.carnet,
              carrera: userInfo.carrera,
              profile_picture_url: userInfo.profilePicture, // Guardar la imagen en base64
            },
            { onConflict: 'user_id' }
          );

        if (error) {
          console.error("Error al guardar en Supabase:", error);
        } else {
          console.log("Información guardada en Supabase:", data);

          // Recargar los datos desde Supabase
          const { data: newData, error: reloadError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.uid)
            .single();

          if (reloadError) {
            console.error("Error al recargar desde Supabase:", reloadError);
          } else {
            console.log("Datos recargados desde Supabase:", newData);

            // Actualizar el estado local con los nuevos datos
            setUserInfo({
              nombre: newData.nombre || 'Ejemplo Nombre',
              apellido: newData.apellido || 'Ejemplo Apellido',
              correo: user.email || 'No disponible',
              carnet: newData.carnet || '20250188/1',
              carrera: newData.carrera || 'Ingeniería de Sistemas',
              profilePicture: newData.profile_picture_url || null,
              fechaCreacion: user.metadata.creationTime || 'No disponible',
              fechaUltimoAcceso: user.metadata.lastSignInTime || 'No disponible',
            });
          }
        }
      } catch (error) {
        console.error("Error general:", error);
      }
    } else {
      console.error("No hay usuario autenticado");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <AccountSettingsContainer>
      <MainHeading>Información de Perfil</MainHeading>

      <ProfilePictureContainer>
        <ProfilePicture
          src={userInfo.profilePicture || 'src/assets/Perfil.jpeg'}
          alt="Foto de perfil"
        />
      </ProfilePictureContainer>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <UploadButton>
          Subir Foto
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </UploadButton>
        {userInfo.profilePicture && (
          <DeleteButton onClick={handleDeletePicture}>Eliminar Foto</DeleteButton>
        )}
      </div>

      <Section>
        <SectionTitle>Información del Usuario</SectionTitle>
        <InfoItem>
          <InfoLabel>Nombre</InfoLabel>
          {isEditing ? (
            <EditableInput
              type="text"
              name="nombre"
              value={userInfo.nombre}
              onChange={handleChange}
            />
          ) : (
            <InfoValue>{userInfo.nombre}</InfoValue>
          )}
        </InfoItem>
        <InfoItem>
          <InfoLabel>Apellido</InfoLabel>
          {isEditing ? (
            <EditableInput
              type="text"
              name="apellido"
              value={userInfo.apellido}
              onChange={handleChange}
            />
          ) : (
            <InfoValue>{userInfo.apellido}</InfoValue>
          )}
        </InfoItem>
        <InfoItem>
          <InfoLabel>Correo Unimet</InfoLabel>
          <InfoValue>{userInfo.correo}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Carnet Unimet</InfoLabel>
          {isEditing ? (
            <EditableInput
              type="text"
              name="carnet"
              value={userInfo.carnet}
              onChange={handleChange}
            />
          ) : (
            <InfoValue>{userInfo.carnet}</InfoValue>
          )}
        </InfoItem>
        <InfoItem>
          <InfoLabel>Carrera</InfoLabel>
          {isEditing ? (
            <EditableInput
              type="text"
              name="carrera"
              value={userInfo.carrera}
              onChange={handleChange}
            />
          ) : (
            <InfoValue>{userInfo.carrera}</InfoValue>
          )}
        </InfoItem>
      </Section>

      <Section>
        <SectionTitle>Actividad de Registro</SectionTitle>
        <InfoItem>
          <InfoLabel>Primer acceso al sitio</InfoLabel>
          <InfoValue>{userInfo.fechaCreacion}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Último acceso al sitio</InfoLabel>
          <InfoValue>{userInfo.fechaUltimoAcceso}</InfoValue>
        </InfoItem>
      </Section>

      <Section>
        <SectionTitle>Rutas Culminadas</SectionTitle>
        {/* Aquí puedes agregar las rutas culminadas */}
      </Section>

      <Section>
        <SectionTitle>Rutas Pendientes</SectionTitle>
        {/* Aquí puedes agregar las rutas pendientes */}
      </Section>

      {isEditing ? (
        <SaveButton onClick={handleSave}>Guardar Cambios</SaveButton>
      ) : (
        <SaveButton onClick={handleEdit}>Editar Información</SaveButton>
      )}
    </AccountSettingsContainer>
  );
};

export default AccountSettings;