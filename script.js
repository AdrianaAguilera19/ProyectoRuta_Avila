document.addEventListener('DOMContentLoaded' , () => {
    const formulario = document.querySelector( 'formulario form');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault(); //Esto evita que se recargue la pagina

        const email = document.getElementById('correo').value;
        const nombreApellido = document.getElementById('nombre-apellido').value;
        const numeroTelefonico = document.getElementById('numero-telefonico').value;
        const solicitud = document.getElementById('solicitud').value;

        // Validaciones basicas
        if (!email || !nombreApellido || !numeroTelefonico || !solicitud ){
            alert('Por favor, complete todos los campos' ); // Muestra una alerta si algon campo esta vacio
            return;
        }
        alert('Solicitud enviada correctamenre') //Muestra una alerta de confirmacion
        formulario.reset(); // Restablece el formulario
    });
    });
