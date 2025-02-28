import React, { useState } from "react";
import "./style.css";

const App = () => {
    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    return (
        <div className={`container ${isActive ? "active" : ""}`} id="container">
            {/* Formulario de Registro */}
            <div className="form-container sign-up">
                <form>
                    <h1>Crea una cuenta</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <i className="fa-brands fa-google-plus-g"></i>
                        </a>
                    </div>
                    <input type="text" placeholder="Nombre de usuario" />
                    <input type="password" placeholder="Contraseña" />
                    <button>Registrate</button>
                </form>
            </div>

            {/* Formulario de Inicio de Sesión */}
            <div className="form-container sign-in">
                <form>
                    <h1>Iniciar sesion</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <i className="fa-brands fa-google-plus-g"></i>
                        </a>
                    </div>
                    <input type="text" placeholder="Nombre de usuario" />
                    <input type="password" placeholder="Contraseña" />
                    <a href="#">Olvidaste tu contraseña?</a>
                    <button>Aceptar</button>
                </form>
            </div>

            {/* Contenedor de Alternancia */}
            <div className="toggle-container">
                <div className="toggle">
                    {/* Panel Izquierdo (Inicio de Sesión) */}
                    <div className="toggle-panel toggle-left">
                        <h1>Bienvenido!</h1>
                        <p>
                            Ingresa tus datos para tener acceso a la experiencia
                            Ruta Avila
                        </p>
                        <button className="hidden" id="login" onClick={handleLoginClick}>
                            Iniciar sesion
                        </button>
                    </div>

                    {/* Panel Derecho (Registro) */}
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

export default App;