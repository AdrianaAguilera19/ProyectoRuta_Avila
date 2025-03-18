import React from 'react';
import RutaCard from './RutaCard';

export const datosRutas = [
  {
    id: 1,
    nombre: "#1 Sabas Nieves",
    precio: "5.00 USD",
    distancia: "3,9km",
    tiempo: "Est. 1h 55min",
    imagen: "src/assets/homepage/image-40.png",
    rating: "src/assets/homepage/union-15.svg",
    descripcion: "Ruta ideal para principiantes con vistas panorámicas del Ávila.",
    cupos: 15,
    dificultades: [
      "Principiante:Ideal para personas sin experiencia previa",
      "Intermedio:Requiere algo de condición física",
      "Avanzado:Para excursionistas experimentados"
    ]
  },
  {
    id: 2,
    nombre: "#2 Humbolt",
    precio: "7.00 USD",
    distancia: "6,4km",
    tiempo: "Est. 3h 14min",
    imagen: "src/assets/homepage/image-10-43.png",
    rating: "src/assets/homepage/union-15.svg",
    descripcion: "Una de las rutas más populares del Ávila con vistas espectaculares.",
    cupos: 12,
    dificultades: [
      "Principiante:No recomendado para principiantes",
      "Intermedio:Nivel recomendado para esta ruta",
      "Avanzado:Cómodo para excursionistas experimentados"
    ]
  },
  {
    id: 3,
    nombre: "#3 Naiguatá",
    precio: "20.00 USD",
    distancia: "16,4km",
    tiempo: "Est. 8h 21min",
    imagen: "src/assets/homepage/image-8-41.png",
    rating: "src/assets/homepage/union-15.svg",
    descripcion: "Desafiante ascenso al pico más alto del Parque Nacional El Ávila.",
    cupos: 8,
    dificultades: [
      "Principiante:No apto para principiantes",
      "Intermedio:Muy exigente para nivel intermedio",
      "Avanzado:Recomendado solo para expertos"
    ]
  },
  {
    id: 4,
    nombre: "#4 Cruz de Los Palmeros I",
    precio: "10.00 USD",
    distancia: "7,4km",
    tiempo: "Est. 4h 12min",
    imagen: "src/assets/homepage/image-9-42.png",
    rating: "src/assets/homepage/union-15.svg",
    descripcion: "Ruta histórica con increíbles vistas panorámicas de Caracas.",
    cupos: 10,
    dificultades: [
      "Principiante:Desafiante para principiantes",
      "Intermedio:Ideal para este nivel",
      "Avanzado:Cómodo para avanzados"
    ]
  },
  {
    id: 5,
    nombre: "#5 El Banquito",
    precio: "15.00 USD",
    distancia: "8,8km",
    tiempo: "Est. 10h 40min",
    imagen: "src/assets/homepage/image-24-11.png",
    rating: "src/assets/homepage/union-15.svg",
    descripcion: "Extensa ruta con diversidad de ecosistemas y miradores naturales.",
    cupos: 8,
    dificultades: [
      "Principiante:No recomendado",
      "Intermedio:Muy exigente",
      "Avanzado:Nivel recomendado"
    ]
  },
  {
    id: 6,
    nombre: "#6 Piedra del Indio",
    precio: "5.00 USD",
    distancia: "6,3km",
    tiempo: "Est. 2h 38min",
    imagen: "src/assets/homepage/image-25-12.png",
    rating: "src/assets/homepage/union-15.svg",
    descripcion: "Ruta cultural con formaciones rocosas de significado histórico.",
    cupos: 15,
    dificultades: [
      "Principiante:Adecuado con guía",
      "Intermedio:Muy cómodo",
      "Avanzado:Fácil"
    ]
  },
  {
    id: 7,
    nombre: "#7 Cruz de los Palmeros II",
    precio: "10.00 USD",
    distancia: "4,6km",
    tiempo: "Est. 7h 30min",
    imagen: "src/assets/homepage/image-26-13.png",
    rating: "src/assets/homepage/union-15.svg",
    descripcion: "Variante más desafiante de la popular ruta de Cruz de los Palmeros.",
    cupos: 10,
    dificultades: [
      "Principiante:No recomendado",
      "Intermedio:Desafiante",
      "Avanzado:Nivel recomendado"
    ]
  },
  {
    id: 8,
    nombre: "#8 Antenas Ávila",
    precio: "5.00 USD",
    distancia: "5,1km",
    tiempo: "Est. 2h 25min",
    imagen: "src/assets/homepage/image-27-14.png",
    rating: "src/assets/homepage/union-15.svg",
    descripcion: "Recorrido técnico hasta las antenas de comunicación con vistas de 360°.",
    cupos: 12,
    dificultades: [
      "Principiante:No adecuado",
      "Intermedio:Desafiante pero factible",
      "Avanzado:Ideal para este nivel"
    ]
  },
  
];

export default function Rutas({ rutas = datosRutas }) { // Recibir las rutas como prop
  return (
    <div className="rutas-container">
      {rutas.map((ruta) => (
        <RutaCard key={ruta.id} ruta={ruta} />
      ))}
    </div>
  );
}