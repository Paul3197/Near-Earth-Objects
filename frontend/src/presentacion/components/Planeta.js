import React from 'react';
import mercuryImg from '../source/mercury2d.png';
import venusImg from '../source/venus2d.png';
import earthImg from '../source/earth2d.png';
import marsImg from '../source/mars2d.png';
import jupiterImg from '../source/jupyter2d.png';
import saturnImg from '../source/saturn2d.png';
import uranusImg from '../source/uranus2d.png';
import neptuneImg from '../source/neptune2d.png';
import sunImg from '../source/sun2d.png';

const imagenes = {
  "El Sol": sunImg,
  "Mercurio": mercuryImg,
  "Venus": venusImg,
  "La Tierra": earthImg,
  "Marte": marsImg,
  "Júpiter": jupiterImg,
  "Saturno": saturnImg,
  "Urano": uranusImg,
  "Neptuno": neptuneImg,
};

function Planeta({ nombre }) {
  return (
    <div className="planeta-container">
      <h2 className="planeta-nombre">{nombre}</h2>
      <img 
        src={imagenes[nombre]} 
        alt={nombre}
        className="planeta-img"
      />
    </div>
  );
}

export default Planeta;
