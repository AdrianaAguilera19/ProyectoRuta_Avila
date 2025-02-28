import React from "react";
import "./style.css";

const App = () => {
    return (
        <div className="container" id="container">
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
            <div className="form-container sign-in">
                <form>
                    <h1>Iniciar sesion</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <i className="fa-brands fa-google-plus-g"></i>
                        </a>
                    </div>
                    <input type="nombre" placeholder="Nombre de usuario" />
                    <input type="contraseña" placeholder="Contraseña" />
                    <a href="#">Olvidaste tu contraseña?</a>
                    <button>Aceptar</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Bienvenido!</h1>
                        <p>
                            Ingresa tus datos para tener acceso a la
                            experiencia Ruta Avila
                        </p>
                        <button className="hidden" id="login">
                            Iniciar sesion
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>¡Bienvenido de nuevo!</h1>
                        <p>
                            ¡Es hora de explorar el Ávila! Reserva tu excursión
                            ahora
                        </p>
                        <button className="hidden" id="register">
                            Registrarse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
