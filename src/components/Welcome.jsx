import React from 'react';

const Welcome = () => {
    const styles = {
        container: {
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            textAlign: 'left',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            overflow: 'hidden',
            padding: '100px 20px 0 20px',
        },
        contentWrapper: {
            position: 'relative',
            zIndex: 2,
            maxWidth: '851px',
            padding: '20px 20px 20px 40px',
        },
        title: {
            color: '#000026',
            marginBottom: '40px',
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '60px',
            fontWeight: '700',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            letterSpacing: '1px',
        },
        description: {
            color: '#000',
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '24px',
            fontWeight: '500',
            lineHeight: '1.6',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        },
        imageWrapper: {
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: 1,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        welcomeImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
        },
        '@media (max-width: 991px)': {
            title: {
                fontSize: '45px',
            },
            description: {
                fontSize: '20px',
            },
        },
        '@media (max-width: 640px)': {
            container: {
                padding: '80px 15px 0 15px',
            },
            title: {
                fontSize: '32px',
                marginBottom: '30px',
            },
            description: {
                fontSize: '16px',
            },
            imageWrapper: {
                height: '100%',
            },
        },
    };

    return (
        <main style={styles.container}>
            <div style={styles.contentWrapper}>
                <h1 style={styles.title}>Bienvenidos a Ruta Avila Unimet </h1>
                <p style={styles.description}>
                    Estudiantes de la Metropolitana, ¡vivan la aventura en el Ávila!
                    Excursiones guiadas, rutas seguras y guías expertos los esperan.
                    Conecten con la naturaleza y hagan comunidad. ¡Vean las rutas y
                    elijan su próxima expedición!
                </p>
            </div>
            <div style={styles.imageWrapper}>
                <img
                    src="/src/assets/wlcmblue.png"
                    alt="Bienvenida al Ávila"
                    style={styles.welcomeImage}
                />
            </div>
        </main>
    );
};

export default Welcome;