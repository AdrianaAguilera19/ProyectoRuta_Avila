import React, { useState } from 'react';
import { app } from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app);

const Login = () => {
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            setSuccess('');
            return;
        }

        const emailDomain = email.split('@')[1];
        if (emailDomain !== 'correo.unimet.edu.ve') {
            setError('Solo se permiten correos de la UNIMET.');
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
            setError(error.message);
            setSuccess('');
            console.error('Error:', error.message);
        }
    };

    return (
        <div className={`container ${isActive ? "active" : ""}`} id="container">
            <div className="form-container sign-up">
                <form onSubmit={handleSubmit}>
                    <h1>Crea una cuenta</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <i className="fa-brands fa-google-plus-g"></i>
                        </a>
                    </div>
                    <input 
                        type="email" 
                        placeholder="Correo electrónico" 
                        value={email} 
                        onChange={handleEmailChange} 
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={handlePasswordChange} 
                    />
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
                        <a href="#" className="icon">
                            <i className="fa-brands fa-google-plus-g"></i>
                        </a>
                    </div>
                    <input 
                        type="email" 
                        placeholder="Correo electrónico" 
                        value={email} 
                        onChange={handleEmailChange} 
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={handlePasswordChange} 
                    />
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
                    <a href="#">¿Olvidaste tu contraseña?</a>
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