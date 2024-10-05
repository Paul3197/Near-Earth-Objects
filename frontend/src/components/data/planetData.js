import mercuryImg from '../../img/mercury.jpg';
import venusImg from '../../img/venus.jpg';
import earthImg from '../../img/earth_dy.jpg';
import marsImg from '../../img/marte.jpg';
import jupiterImg from '../../img/jupiter.jpg';
import saturnImg from '../../img/saturn.jpg';
import uranusImg from '../../img/urano.jpg';
import neptuneImg from '../../img/neptune.jpg';

const planetsData = [
  { name: 'Mercury', texture: mercuryImg, size: 0.5, distance: 5, inclination: 7, eccentricity: 0.2056, orbitalPeriod: 88 }, // 88 días
  { name: 'Venus', texture: venusImg, size: 1, distance: 7, inclination: 3.39, eccentricity: 0.0067, orbitalPeriod: 225 }, // 225 días
  { name: 'Earth', texture: earthImg, size: 1.2, distance: 10, inclination: 0, eccentricity: 0.0167, orbitalPeriod: 365.25 }, // 365.25 días
  { name: 'Mars', texture: marsImg, size: 0.7, distance: 13, inclination: 1.85, eccentricity: 0.0934, orbitalPeriod: 687 }, // 687 días
  { name: 'Jupiter', texture: jupiterImg, size: 3, distance: 18, inclination: 1.31, eccentricity: 0.0489, orbitalPeriod: 11.86 * 365.25 }, // 11.86 años
  { name: 'Saturn', texture: saturnImg, size: 2.5, distance: 23, inclination: 2.49, eccentricity: 0.0565, orbitalPeriod: 29.46 * 365.25, hasRings: true }, // 29.46 años
  { name: 'Uranus', texture: uranusImg, size: 1.5, distance: 28, inclination: 0.77, eccentricity: 0.0463, orbitalPeriod: 84 * 365.25 }, // 84 años
  { name: 'Neptune', texture: neptuneImg, size: 1.4, distance: 33, inclination: 1.77, eccentricity: 0.0086, orbitalPeriod: 164.8 * 365.25 } // 164.8 años
];

export default planetsData;
