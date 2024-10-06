import React from 'react';
import astronautaImg from '../source/astronauta.png';
import '../Presentacion.css'

function Astronauta({ planeta }) {
  const mensajes = {
    "The Sun": ["Welcome to the solar system!", "This is our Sun, the center of it all."],
    "Mercury": ["This is Mercury,", "the closest planet to the Sun."],
    "Venus": ["Watch out for the heat!", "This is Venus."],
    "Earth": ["Welcome home!", "This is our planet, Earth."],
    "Mars": ["Here is Mars,", "the red planet."],
    "Jupiter": ["Jupiter is the largest planet", "in the solar system."],
    "Saturn": ["Look at those rings,", "we are on Saturn."],
    "Uranus": ["Uranus has a unique tilt.", "Fascinating!"],
    "Neptune": ["Finally, we have arrived at Neptune,", "the most distant."]
};

  return (
    <div className="astronauta-container">
      <p className='datesP'>
        {mensajes[planeta][0]}<br />
        {mensajes[planeta][1]}
      </p>
      <img 
        src={astronautaImg}
        alt="Astronauta"
        className="astronauta-img"
      />
      <div className='containerLink'>
        <span className="space-title">Are you fascinated about the universe?</span>
      </div>
      <a href="https://www.nasa.gov/careers" className="space-link" target="_blank">Learn more!</a>
      
    </div>
  );
}

export default Astronauta;
