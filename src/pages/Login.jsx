import React, { useState } from 'react';
import { app } from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, fetchSignInMethodsForEmail } from 'firebase/auth';


const auth = getAuth(app);

const Login = () => {
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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

    //Dominio para el formulario
    const isValidEmail = (email) => {
        return email.endsWith('@correo.unimet.edu.ve');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isActive && (!name || !email || !password || !confirmPassword)) {
            setError('Por favor, completa todos los campos.');
            setSuccess('');
            return;
        }

        if (!isActive && (!email || !password)) {
            setError('Por favor, completa todos los campos.');
            setSuccess('');
            return;
        }

        if (isActive && password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setSuccess('');
            return;
        }

        // Validación del dominio 
        if (!isValidEmail(email)) {
            setError('¡Debes usar el correo Unimet (@correo.unimet.edu.ve)!');
            setSuccess('');
            return; 
        }

        setError('');
        setSuccess('');

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
            if (error.code === 'auth/email-already-in-use') {
                setError('Este correo ya está registrado. Por favor, inicia sesión.');
            } else {
                setError(error.message);
            }
            setSuccess('');
            console.error('Error:', error.message);
        }
    };

    const handleGoogleSignIn = async () => {
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
    
            // Inicio de sesión exitoso (sin verificación de registro)
            setSuccess('Inicio de sesión con Google exitoso.');
            setIsActive(false);
    
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
    const handleGoogleSignUp = async () => {
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
    
            // Verificar si el usuario ya está registrado
            const methods = await fetchSignInMethodsForEmail(auth, user.email);
            if (methods && methods.length > 0) {
                // El usuario ya está registrado, iniciar sesión automáticamente
                setSuccess('Inicio de sesión con Google exitoso.');
                setIsActive(false);
                setLoading(false);
                return;
            }
    
            // Si no está registrado, mostrar mensaje de éxito en el registro
            setSuccess('Registro con Google exitoso.');
            setIsActive(false);
    
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
        <div className={`container ${isActive ? "active" : ""}`} id="container">
            <div className="form-container sign-up">
                <form onSubmit={handleSubmit}>
                    <h1>Crea una cuenta</h1>
                    <div className="social-icons">
                    <a href="#" className="icon" onClick={() =>  handleGoogleSignUp()}>
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
                    />
                    <div className="password-container">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={handlePasswordChange}
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
                    <button type="submit">Registrate</button>
                </form>
            </div>

            <div className="form-container sign-in">
                <form onSubmit={handleSubmit}>
                    <h1>Iniciar sesión</h1>
                    <div className="social-icons">
                    <a href="#" className="icon" onClick={() => handleGoogleSignIn()}>
                        <i className="fa-brands fa-google-plus-g"></i>
                    </a>
                    </div>
                    <input
                        type="email"
                        placeholder="Correo electrónico o nombre de usuario"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <div className="password-container">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <i
                            className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"} password-icon`}
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
                    <a href="#" onClick={(e) => handlePasswordReset(e)}>¿Olvidaste tu contraseña?</a>
                    <button type="submit">Aceptar</button>
                </form>
            </div>

            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>¡Bienvenido!</h1>
                        <p>
                            Ingresa tus datos para tener acceso a la experiencia
                            Ruta Avila
                        </p>
                        <button className="hidden" id="login" onClick={handleLoginClick}>
                            Iniciar sesión
                        </button>
                    </div>

                    <div className="toggle-panel toggle-right">
                        <h1>¡Bienvenido de nuevo!</h1>
                        <p>
                            ¡Es hora de explorar el Ávila! Reserva tu excursión ahora
                        </p>
                        <button className="hidden" id="register" onClick={handleRegisterClick}>
                            Registrarse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;