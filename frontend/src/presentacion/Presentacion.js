import React, { useState } from 'react';
import Planeta from './components/Planeta';
import Menus from './components/Menus';
import Astronauta from './components/Astronauta';
import './Presentacion.css';

const planetas = [
  { nombre: "El Sol", descripcion: "El Sol es la estrella del sistema solar...", calendario: "Próximos eventos solares...", exploraciones: "Exploraciones del Sol" },
  { nombre: "Mercurio", descripcion: "Mercurio es el planeta más cercano al Sol...", calendario: "Calendario de Mercurio", exploraciones: "Exploraciones en Mercurio" },
  { nombre: "Venus", descripcion: "Venus es conocido por su atmósfera densa...", calendario: "Eventos cósmicos en Venus...", exploraciones: "Exploraciones en Venus" },
  { nombre: "La Tierra", descripcion: "Nuestro hogar, el tercer planeta del Sol...", calendario: "Calendario astronómico de la Tierra", exploraciones: "Exploraciones a la Tierra" },
  { nombre: "Marte", descripcion: "El planeta rojo, con sus montañas y desiertos...", calendario: "Eventos cósmicos en Marte", exploraciones: "Exploraciones en Marte" },
  { nombre: "Júpiter", descripcion: "Júpiter es el más grande, con su gran mancha roja...", calendario: "Calendario astronómico de Júpiter", exploraciones: "Exploraciones a Júpiter" },
  { nombre: "Saturno", descripcion: "Famoso por sus anillos, este es Saturno...", calendario: "Eventos cósmicos en Saturno", exploraciones: "Exploraciones en Saturno" },
  { nombre: "Urano", descripcion: "Urano gira de lado, con su color azul-verde...", calendario: "Eventos cósmicos en Urano", exploraciones: "Exploraciones en Urano" },
  { nombre: "Neptuno", descripcion: "El último planeta del sistema solar...", calendario: "Eventos cósmicos en Neptuno", exploraciones: "Exploraciones en Neptuno" }
];

function Presentacion() {
  const [planetaActual, setPlanetaActual] = useState(0);

  const siguientePlaneta = () => {
    if (planetaActual < planetas.length - 1) {
      setPlanetaActual(planetaActual + 1);
    } else {
      window.location.href = "/pagina-3d"; // Redirige a la página 3D
    }
  };

  const anteriorPlaneta = () => {
    if (planetaActual > 0) {
      setPlanetaActual(planetaActual - 1);
    }
  };

  return (
    <div className="presentacion-container">
      <Astronauta planeta={planetas[planetaActual].nombre} descripcion={planetas[planetaActual].descripcion} />
      <Planeta nombre={planetas[planetaActual].nombre} />
      <Menus planeta={planetas[planetaActual]} />

      <div className="botones-container">
        <button className="btn-anterior" onClick={anteriorPlaneta} disabled={planetaActual === 0}>Anterior</button>
        <button className="btn-siguiente" onClick={siguientePlaneta}>Siguiente</button>
      </div>
    </div>
  );
}

export default Presentacion;
