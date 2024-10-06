import mercuryImg from '../../img/mercury.jpg';
import venusImg from '../../img/venus.jpg';
import earthImg from '../../img/earth_dy.jpg';
import marsImg from '../../img/marte.jpg';
import jupiterImg from '../../img/jupiter.jpg';
import saturnImg from '../../img/saturn.jpg';
import uranusImg from '../../img/urano.jpg';
import neptuneImg from '../../img/neptune.jpg';

import mercurio from '../../img/mercurio.jpg';
import venus from '../../img/venusIMG.jpg';
import tierra from '../../img/tierraIMG.jpg';
import marte from '../../img/marteIMG.jpg';
import jupiter from '../../img/jupiterIMG.jpg';
import saturno from '../../img/saturnoIMG.jpg';
import urano from '../../img/uranoIMG.jpg';
import neptuno from '../../img/neptunoIMG.jpg';

const planetsData = [
  { name: 'Mercury', img:mercurio, texture: mercuryImg, size: 0.5, distance: 5, inclination: 7, eccentricity: 0.2056, orbitalPeriod: 88,  position: { x: 57.9, y: 0, z: 0 }}, // 88 días
  { name: 'Venus', img:venus, texture: venusImg, size: 1, distance: 7, inclination: 3.39, eccentricity: 0.0067, orbitalPeriod: 225,  position: { x: 108.2, y: 0, z: 0 }}, // 225 días
  { name: 'Earth', img:tierra, texture: earthImg, size: 1.2, distance: 10, inclination: 0, eccentricity: 0.0167, orbitalPeriod: 365.25, position: { x: 149.6, y: 0, z: 0 }}, // 365.25 días
  { name: 'Mars', img:marte, texture: marsImg, size: 0.7, distance: 13, inclination: 1.85, eccentricity: 0.0934, orbitalPeriod: 687, position: { x: 227.9, y: 0, z: 0 }}, // 687 días
  { name: 'Jupiter', img:jupiter, texture: jupiterImg, size: 3, distance: 18, inclination: 1.31, eccentricity: 0.0489, orbitalPeriod: 11.86 * 365.25, position: { x: 778.3, y: 0, z: 0 }}, // 11.86 años
  { name: 'Saturn', img:saturno, texture: saturnImg, size: 2.5, distance: 23, inclination: 2.49, eccentricity: 0.0565, orbitalPeriod: 29.46 * 365.25, position: { x: 1427, y: 0, z: 0 }, hasRings: true }, // 29.46 años
  { name: 'Uranus', img:urano, texture: uranusImg, size: 1.5, distance: 28, inclination: 0.77, eccentricity: 0.0463, orbitalPeriod: 84 * 365.25, position: { x: 2871, y: 0, z: 0 }}, // 84 años
  { name: 'Neptune', img: neptuno, texture: neptuneImg, size: 1.4, distance: 33, inclination: 1.77, eccentricity: 0.0086, orbitalPeriod: 164.8 * 365.25, position: { x: 4497.1, y: 0, z: 0 } } // 164.8 años
];

export default planetsData;