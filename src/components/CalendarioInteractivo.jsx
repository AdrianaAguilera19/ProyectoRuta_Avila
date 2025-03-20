import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay, addDays } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useNavigate } from "react-router-dom";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarioInteractivo() {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  const generarEventosFijos = () => {
    const eventosFijos = [];
    const hoy = new Date();
    const diasAdicionales = 30;

    for (let i = 0; i <= diasAdicionales; i++) {
      const fecha = addDays(hoy, i);
      const diaSemana = getDay(fecha);

      if (diaSemana === 6) {
        eventosFijos.push({
          title: "Sabas Nieves",
          start: fecha,
          end: fecha,
          path: "/ruta/1", // Redirige al ID 1
        });
        eventosFijos.push({
          title: "Humboldt",
          start: fecha,
          end: fecha,
          path: "/ruta/2", // Redirige al ID 2
        });
        eventosFijos.push({
          title: "Naiguatá",
          start: fecha,
          end: fecha,
          path: "/ruta/3", // Redirige al ID 3
        });
      }
    }

    return eventosFijos;
  };

  useEffect(() => {
    const eventosFijos = generarEventosFijos();
    setEventos(eventosFijos);
  }, []);

  const handleSelectEvent = (event) => {
    if (event.path) {
      navigate(event.path);
    } else {
      alert(`Evento: ${event.title}`);
    }
  };

  return (
    <div>
      <h1>Calendario Interactivo</h1>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 1000, width: "100%", margin: "0 auto" }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}

export default CalendarioInteractivo;