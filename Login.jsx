import React, { useState, useEffect } from 'react';
import { app } from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../login.css';

const auth = getAuth(app);
const db = getFirestore(app);

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [warning, setWarning] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
    setError('');
    setSuccess('');
  };

  const handleLoginClick = () => {
    setIsActive(false);
    setError('');
    setSuccess('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = '@correo.unimet.edu.ve';
    return emailRegex.test(email) && email.endsWith(domain) && !email.includes(' ');
  };

  const isValidPassword = (password) => {
    const forbiddenChars = /[!·%/()=?¿+*^Çªº¨]/;
    return (
      !password.includes(' ') &&
      password.length >= 6 &&
      !forbiddenChars.test(password)
    );
  };

  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name) && name.trim() !== '';
  };

  const validateForm = () => {
    let isValid = true;

    if (!isValidEmail(email)) {
      setError('El correo electrónico no es válido');
      isValid = false;
    }

    if (!isValidPassword(password)) {
      setError('Mínimo 6 caracteres, sin espacios ni caracteres especiales');
      isValid = false;
    }

    if (isActive && password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      isValid = false;
    }

    if (isActive && !isValidName(name)) {
      setError('El nombre no puede estar vacío y no debe contener caracteres especiales o números');
      isValid = false;
    }

    if (isActive && !userType) {
      setError('Selecciona un tipo de usuario');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setWarning('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      setWarning('La operación está tardando más de lo esperado. Por favor, verifica tu conexión a internet.');
    }, 10000);

    try {
      if (isActive) {
        // Registrar usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar el tipo de usuario en Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: name,
          userType: userType,
        });

        console.log('Usuario registrado:', email);
        setSuccess('Registro exitoso.');
      } else {
        // Iniciar sesión
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Obtener el tipo de usuario desde Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userType = userDoc.data().userType;

        // Redirigir según el tipo de usuario
        if (userType === 'estudiante') {
          navigate('/estudiante');
        } else if (userType === 'guia') {
          navigate('/guia');
        }

        console.log('Usuario autenticado:', email);
        setSuccess('Inicio de sesión exitoso.');
      }
    } catch (error) {
      console.error('Error completo:', error);

      let errorMessage = 'Ocurrió un error. Por favor, inténtalo de nuevo.';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo ya está registrado. Por favor, inicia sesión.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico no es válido.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Por favor, intenta de nuevo más tarde.';
          break;
        case 'permission-denied':
          errorMessage = 'No tienes permiso para realizar esta acción.';
          break;
        default:
          errorMessage = `Error inesperado: ${error.message}`;
          break;
      }

      setError(errorMessage);
      setSuccess('');
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Crea una cuenta</h1>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={handleNameChange}
            />
            <select
              value={userType}
              onChange={handleUserTypeChange}
              required
            >
              <option value="">Selecciona tu tipo de usuario</option>
              <option value="estudiante">Estudiante</option>
              <option value="guia">Guía</option>
            </select>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={handleEmailChange}
              maxLength={64}
            />
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                maxLength={40}
              />
              <i
                className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"} password-icon`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <i
                className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"} password-icon`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            {warning && <p className="warning-message">{warning}</p>}
            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Registrarse"}
            </button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Iniciar sesión</h1>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={handleEmailChange}
              maxLength={64}
            />
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                maxLength={40}
              />
              <i
                className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"} password-icon`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            {warning && <p className="warning-message">{warning}</p>}
            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>¡Bienvenido!</h1>
              <p>Ingresa tus datos para tener acceso a la experiencia Ruta Ávila</p>
              <button className="hidden" id="login" onClick={handleLoginClick}>
                Iniciar sesión
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>¡Bienvenido de nuevo!</h1>
              <p>¡Es hora de explorar el Ávila! Reserva tu excursión ahora</p>
              <button className="hidden" id="register" onClick={handleRegisterClick}>
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
