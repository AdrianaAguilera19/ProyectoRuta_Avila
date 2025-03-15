import React, { useState , useEffect} from 'react';
import { app } from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import '../login.css'

const auth = getAuth(app);

const Login = () => {
    
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
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Usuario registrado:', email);
        setSuccess('Registro exitoso.');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuario autenticado:', email);
        setSuccess('Inicio de sesión exitoso.');
      }
    } catch (error) {
      console.log('Código de error:', error.code);
      console.log('Mensaje de error:', error.message);

      let errorMessage = 'Ocurrió un error. Por favor, inténtalo de nuevo.';

      switch (error.code) {
        case 'auth/network-request-failed':
          errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo ya está registrado. Por favor, inicia sesión.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico no es válido.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No existe una cuenta con este correo. Por favor, regístrate.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta. Por favor, verifica tus credenciales.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Por favor, intenta de nuevo más tarde.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Credenciales inválidas. Por favor, verifica tus datos.';
          break;
        default:
          errorMessage = `Ocurrió un error inesperado: ${error.message}`;
          break;
      }

      setError(errorMessage);
      setSuccess('');
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    setSuccess('');
    e.preventDefault();

    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('¡Debes usar el correo Unimet (@correo.unimet.edu.ve)!');
      return;
    }

    setError('');
    setWarning('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setWarning('Se ha enviado un correo electrónico para restablecer tu contraseña.');
    } catch (error) {
      console.log('Código de error:', error.code);
      console.log('Mensaje de error:', error.message);

      let errorMessage = 'Ocurrió un error al enviar el correo. Por favor, inténtalo de nuevo.';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No existe una cuenta con este correo. Por favor, regístrate.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico no es válido. Por favor, ingresa un correo válido.';
          break;
        default:
          errorMessage = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
          break;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      hd: 'correo.unimet.edu.ve',
      prompt: 'select_account',
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Usuario autenticado con Google:', user);
      setSuccess('Autenticación Exitosa');
    } catch (error) {
      if (error.code === 'auth/unauthorized-domain') {
        setError('Debes usar el correo Unimet (@correo.unimet.edu.ve).');
      } else {
        setError(error.message || 'Error al autenticar con Google.');
        console.error('Error al autenticar con Google:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Crea una cuenta</h1>
          <div className="social-icons">
            <a href="#" className="icon" onClick={handleGoogleAuth}>
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
          </div>

          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={handleNameChange}
          />
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
              className={`fa ${
                passwordVisible ? "fa-eye-slash" : "fa-eye"
              } password-icon`}
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
              className={`fa ${
                passwordVisible ? "fa-eye-slash" : "fa-eye"
              } password-icon`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          {error && (
            <p className="error-message">
              <i className="fa-solid fa-circle-exclamation"></i> {error}
            </p>
          )}
          {success && (
            <p className="success-message">
              <i className="fa-solid fa-circle-check"></i> {success}
            </p>
          )}
          {warning && (
            <p className="warning-message">
              <i className="fa-solid fa-triangle-exclamation"></i> {warning}
            </p>
          )}
          <button type="submit" disabled={loading}>
            {loading ? (
              <i className="fa-solid fa-spinner" style={{ color: "#ffa200" }}></i>
            ) : (
              "Registrate"
            )}
          </button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Iniciar sesión</h1>
          <div className="social-icons">
            <a href="#" className="icon" onClick={handleGoogleAuth}>
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
          </div>
          <input
            type="email"
            placeholder="Correo electrónico o nombre de usuario"
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
              className={`fa ${
                passwordVisible ? "fa-eye-slash" : "fa-eye"
              } password-icon`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          {error && (
            <p className="error-message">
              <i className="fa-solid fa-circle-exclamation"></i> {error}
            </p>
          )}
          {success && (
            <p className="success-message">
              <i className="fa-solid fa-circle-check"></i> {success}
            </p>
          )}
          {warning && (
            <p className="warning-message">
              <i className="fa-solid fa-triangle-exclamation"></i> {warning}
            </p>
          )}
          <a href="#" onClick={handlePasswordReset}>
            ¿Olvidaste tu contraseña?
          </a>
          <button type="submit" disabled={loading}>
            {loading ? (
              <i className="fa-solid fa-spinner" style={{ color: "#ffa200" }}></i>
            ) : (
              "Aceptar"
            )}
          </button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>¡Bienvenido!</h1>
            <p>
              Ingresa tus datos para tener acceso a la experiencia Ruta Avila
            </p>
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