import React from 'react';
import RutaCard from './RutaCard'; // Importamos el componente RutaCard

const rutas = [
  {
    id: 1,
    nombre: "#1 Sabas Nieves",
    precio: "5.00 USD",
    dificultad: "Moderada",
    distancia: "3,9km",
    tiempo: "Est. 1h 55min",
    imagen: "src/assets/image-40.png",
    rating: "src/assets/union-15.svg",
  },
  {
    id: 2,
    nombre: "#2 Humbolt",
    precio: "7.00 USD",
    dificultad: "Difícil",
    distancia: "6,4km",
    tiempo: "Est. 3h 14min",
    imagen: "src/assets/image-10-43.png",
    rating: "src/assets/union-15.svg",
  },
  {
    id: 3,
    nombre: "#3 Naiguatá",
    precio: "20.00 USD",
    dificultad: "Difícil",
    distancia: "16,4km",
    tiempo: "Est. 8h 21min",
    imagen: "src/assets/image-8-41.png",
    rating: "src/assets/union-15.svg",
  },
  {
    id: 4,
    nombre: "#4 Cruz de Los Palmeros I",
    precio: "10.00 USD",
    dificultad: "Difícil",
    distancia: "7,4km",
    tiempo: "Est. 4h 12min",
    imagen: "src/assets/image-9-42.png",
    rating: "src/assets/union-15.svg",
  },
  {
    id: 5,
    nombre: "#5 El Banquito",
    precio: "15.00 USD",
    dificultad: "Difícil",
    distancia: "8,8km",
    tiempo: "Est. 10h 40min",
    imagen: "src/assets/image-24-11.png",
    rating: "src/assets/union-15.svg",
  },
  {
    id: 6,
    nombre: "#6 Piedra del Indio",
    precio: "5.00 USD",
    dificultad: "Moderada",
    distancia: "6,3km",
    tiempo: "Est. 2h 38min",
    imagen: "src/assets/image-25-12.png",
    rating: "src/assets/union-15.svg",
  },
  {
    id: 7,
    nombre: "#7 Cruz de los Palmeros II",
    precio: "10.00 USD",
    dificultad: "Difícil",
    distancia: "4,6km",
    tiempo: "Est. 7h 30min",
    imagen: "src/assets/image-26-13.png",
    rating: "src/assets/union-15.svg",
  },
  {
    id: 8,
    nombre: "#8 Antenas Ávila",
    precio: "5.00 USD",
    dificultad: "Moderada",
    distancia: "5,1km",
    tiempo: "Est. 2h 25min",
    imagen: "src/assets/image-27-14.png",
    rating: "src/assets/union-15.svg",
  },
  
];

export default function Rutas() {
    const rutasContainerStyle = {
      flex: '2',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    };
  
    return (
      <div className="rutas-container" style={rutasContainerStyle}>
        {rutas.map((ruta) => (
          <RutaCard key={ruta.id} ruta={ruta} />
        ))}
      </div>
    );
  }