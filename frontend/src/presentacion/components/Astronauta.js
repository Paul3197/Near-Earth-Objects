import React from 'react';
import astronautaImg from '../source/astronauta.png';

function Astronauta({ planeta }) {
  const mensajes = {
    "El Sol": ["¡Bienvenido al sistema solar!", "Este es nuestro Sol, el centro de todo."],
    "Mercurio": ["Este es Mercurio,", "el planeta más cercano al Sol."],
    "Venus": ["¡Cuidado con el calor!", "Este es Venus."],
    "La Tierra": ["¡Bienvenido a casa!", "Este es nuestro planeta, la Tierra."],
    "Marte": ["Aquí está Marte,", "el planeta rojo."],
    "Júpiter": ["Júpiter es el planeta más grande", "del sistema solar."],
    "Saturno": ["Mira esos anillos,", "estamos en Saturno."],
    "Urano": ["Urano tiene una inclinación única.", "¡Fascinante!"],
    "Neptuno": ["Finalmente, hemos llegado a Neptuno,", "el más lejano."]
  };

  return (
    <div className="astronauta">
      <p>
        {mensajes[planeta][0]}<br />
        {mensajes[planeta][1]}
      </p>
      <img 
        src={astronautaImg}
        alt="Astronauta"
        className="astronauta-img"
      />
    </div>
  );
}

export default Astronauta;
