export const rutas = [
  {
    id: 1,
    nombre: "Sabas Nieves",
    precio: "$5,00 USD",
    distancia: "3,9km",
    tiempo: "Est. 1h 55min",
    cupos: 23,
    descripcion: "Sendero emblemático y punto de partida clásico para explorar el Ávila. Atraviesa bosques de galería, donde la sombra de árboles centenarios como el bucare y el jabillo acompaña el camino.",
    imagen: "/src/assets/homepage/image-40.png", // Campo para la vista de tarjeta
    imagenes: [
      "/src/assets/rutasdetalladas/sabas-nieves-1.png",
      "/src/assets/rutasdetalladas/sabas-nieves-2.png",
    ],
    dificultades: [
      "Sencilla: Recorrido parcial con guía explicando biodiversidad, paradas para fotos y terreno estable. Ideal para familias o primer contacto con el senderismo.",
      "Moderada: Ruta completa con ascensos moderados y menos asistencia. Ideal para practicar resistencia sin exigencia técnica.",
      "Difícil: Extensión a senderos no señalizados, con tramos rocosos y autonomía. Para expertos que buscan explorar zonas menos transitadas.",
    ],
    rating: "/src/assets/homepage/union-15.svg"
  },
  {
    id: 2,
    nombre: "Humbolt",
    precio: "$7,00 USD",
    distancia: "6,4km",
    tiempo: "Est. 3h 14min",
    cupos: 13,
    descripcion: "Ascenso al icónico Pico Humboldt (1.890 msnm). El camino serpentea cerca del antiguo Hotel Humboldt y ofrece vistas al mar Caribe. La ruta combina historia, biodiversidad y desafío físico, con parches de bosque húmedo y formaciones rocosas únicas.",
    imagen: "/src/assets/homepage/image-10-43.png",
    imagenes: [
      "/src/assets/rutasdetalladas/humboldt-1.png",
      "/src/assets/rutasdetalladas/humboldt-2.png",
    ],
    dificultades: [
      "Sencilla: Recorrido hasta el mirador 'La Ventana', con guía narrando la historia del teleférico y apoyo constante en pendientes.",
      "Moderada: Subida clásica con tramos de rocas sueltas y apoyo técnico en zonas resbaladizas.",
      "Difícil: Ascenso por la cara norte, incluye escalada en roca básica y supervisión mínima del guía.",
    ],
    rating: "/src/assets/homepage/union-15.svg"
  },
  {
    id: 3,
    nombre: "Naiguatá",
    precio: "$20,00 USD",
    distancia: "16,4km",
    tiempo: "Est. 8h 21min",
    cupos: 10,
    descripcion: "La cumbre más alta del Ávila (2.765 msnm), un reto para los amantes del senderismo extremo. Atraviesa bosques nublados donde la neblina es protagonista, creando un ambiente místico. La ruta exige salir al amanecer para evitar tormentas repentinas y ofrece panorámicas de La Guaira y Caracas.",
    imagen: "/src/assets/homepage/image-8-41.png",
    imagenes: [
      "/src/assets/rutasdetalladas/naiguatá-1.png",
      "/src/assets/rutasdetalladas/naiguatá-2.png",
    ],
    dificultades: [
      "Sencilla: Trekking hasta 'El Portachuelo', con guía experto en clima y apoyo logístico para manejar cambios bruscos.",
      "Moderada: Subida hasta la base de la cumbre, ideal para entrenar resistencia en terrenos variables.",
      "Difícil: Ascenso total con equipo técnico, como bastones de trekking. Guía supervisada, pero la autonomía es clave.",
    ],
    rating: "/src/assets/homepage/union-15.svg"
  },
  {
    id: 4,
    nombre: "Cruz de Los Palmeros I",
    precio: "$10,00 USD",
    distancia: "7,4km",
    tiempo: "Est. 4h 12min",
    cupos: 5,
    descripcion: "Ruta histórica utilizada durante la Semana Santa para cargar la cruz hasta el Ávila, una tradición que data del siglo XVIII. Combina senderos empedrados con áreas boscosas y pequeñas capillas simbólicas. El trayecto es un viaje espiritual y físico, con vistas al valle de Caracas desde sus puntos altos.",
    imagen: "/src/assets/homepage/image-9-42.png",
    imagenes: [
      "/src/assets/rutasdetalladas/CPI-1.png",
      "/src/assets/rutasdetalladas/CPI-2.png",
    ],
    dificultades: [
      "Sencilla: Recorrido hasta la 'Cruz Pequeña', con guía explicando el significado religioso y apoyo en escalones.",
      "Moderada: Subida completa, incluye tramos expuestos al sol y asistencia en zonas irregulares.",
      "Difícil: Ruta alternativa por 'El Camino de los Penitentes', con senderos estrechos y ritmo autónomo.",
    ],
    rating: "/src/assets/homepage/union-15.svg"
  },
  {
    id: 5,
    nombre: "El Banquito",
    precio: "$15,00 USD",
    distancia: "8,6km",
    tiempo: "Est. 10h 40min",
    cupos: 2,
    descripcion: "Aunque su nombre sugiere sencillez, esta ruta esconde secretos. Su punto central es una gran roca plana ('el banco') junto a una quebrada cristalina, ideal para descansar o tomar fotos. El camino está rodeado de heliconias y helechos gigantes, con sonidos de aves como el cristofué. En temporada de lluvias, se forman cascadas efímeras.",
    imagen: "/src/assets/homepage/image-24-11.png",
    imagenes: [
      "/src/assets/rutasdetalladas/banquito-1.png",
      "/src/assets/rutasdetalladas/banquito-2.png",
    ],
    dificultades: [
      "Sencilla: Paseo familiar hasta el banco, con guía interactuando y explicando la geología del lugar.",
      "Moderada: Ruta extendida que incluye la cascada 'Escondida' y terrenos más húmedos.",
      "Difícil: Conexión con la ruta 'Piedra del Indio', exigiendo equilibrio en senderos embarrados y raíces expuestas.",
    ],
    rating: "/src/assets/homepage/union-15.svg"
  },
  {
    id: 6,
    nombre: "Piedra del Indio",
    precio: "$5,00 USD",
    distancia: "6,3km",
    tiempo: "Est. 2h 38min",
    cupos: 24,
    descripcion: "Famosa por su formación rocosa erosionada que simula el perfil de un rostro indígena, esta ruta combina mitos locales y naturaleza. El sendero atraviesa bosques densos con árboles de caoba y samanes, y pasa por pequeñas cascadas como 'El Salto del Silencio'. Ideal para fotógrafos y amantes de la geología.",
    imagen: "/src/assets/homepage/image-25-12.png",
    imagenes: [
      "/src/assets/rutasdetalladas/piedra-1.png",
      "/src/assets/rutasdetalladas/piedra-2.png",
    ],
    dificultades: [
      "Sencilla: Acceso directo a la base de la roca, con guía ayudando en zonas resbaladizas y contando leyendas locales.",
      "Moderada: Ruta circular que incluye miradores ocultos y ascensos cortos pero técnicos.",
      "Difícil: Escalada guiada (con arnés) hasta la cima de la formación, para aventureros con experiencia previa.",
    ],
    rating: "/src/assets/homepage/union-15.svg"
  },
  {
    id: 7,
    nombre: "Cruz de Los Palmeros II",
    precio: "$10,00 USD",
    distancia: "4,6km",
    tiempo: "Est. 7h 30min",
    cupos: 18,
    descripcion: "Variante menos conocida pero igualmente histórica de la ruta tradicional de Semana Santa. Este sendero alternativo se adentra por zonas boscosas más densas y pendientes pronunciadas, ofreciendo una experiencia más íntima con la naturaleza. El punto culminante es un mirador secreto con vistas al valle de Caracas y al Cerro El Ávila en su esplendor.",
    imagen: "/src/assets/homepage/image-26-13.png",
    imagenes: [
      "/src/assets/rutasdetalladas/naiguatá-1.png",
      "/src/assets/rutasdetalladas/naiguatá-2.png",
    ],
    dificultades: [
      "Sencilla: Recorrido acortado hasta el 'Mirador de los Petroglifos', con guía explicando el significado cultural y apoyo en tramos empinados. Ideal para grupos pequeños.",
      "Moderada: Subida completa, incluye senderos estrechos entre la vegetación y asistencia técnica en zonas rocosas.",
      "Difícil: Ruta extendida hacia la 'Cueva del Viento', con escaladas básicas y terrenos inestables. Guía actúa como orientador, priorizando la autosuficiencia del grupo.",
    ],
    rating: "/src/assets/homepage/union-15.svg"
  },
  {
    id: 8,
    nombre: "Antenas Ávila",
    precio: "$5,00 USD",
    distancia: "5,1km",
    tiempo: "Est. 2h 25min",
    cupos: 0,
    descripcion: "Subida exigente hacia las torres de comunicación que coronan el cerro. El camino ofrece vistas contrastantes: hacia el sur, el skyline de Caracas; hacia el norte, el azul del Caribe. La vegetación cambia de bosque seco a matorrales altos, y es común ver halcones peregrinos sobrevolando las antenas.",
    imagen: "/src/assets/homepage/image-27-14.png",
    imagenes: [
      "/src/assets/rutasdetalladas/antenas-1.png",
      "/src/assets/rutasdetalladas/antenas-2.png",
    ],
    dificultades: [
      "Sencilla: Caminata suave con apoyo en zonas pedregosas y explicaciones sobre la fauna local.",
      "Moderada: Ascenso completo, incluye exposición solar y asistencia en terrenos irregulares.",
      "Difícil: Ruta por el 'Filotecho', sendero escarpado con rocas sueltas y supervisión mínima del guía.",
    ],
    rating: "/src/assets/homepage/union-15.svg"
  },
];