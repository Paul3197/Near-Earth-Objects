import mercuryImg from '../img/mercury.jpg';
import venusImg from '../img/venus.jpg';
import earthImg from '../img/earth_dy.jpg';
import marsImg from '../img/marte.jpg';
import jupiterImg from '../img/jupiter.jpg';
import saturnImg from '../img/saturn.jpg';
import uranusImg from '../img/urano.jpg';
import neptuneImg from '../img/neptune.jpg';

const planetsData = [
    { name: 'Mercury', texture: mercuryImg, size: 0.5, distance: 5, inclination: 7, eccentricity: 0.2056, speedFactor: 1.61 },
    { name: 'Venus', texture: venusImg, size: 1, distance: 7, inclination: 3.39, eccentricity: 0.0067, speedFactor: 1.18 },
    { name: 'Earth', texture: earthImg, size: 1.2, distance: 10, inclination: 0, eccentricity: 0.0167, speedFactor: 1.00 },
    { name: 'Mars', texture: marsImg , size: 0.7, distance: 13, inclination: 1.85, eccentricity: 0.0934, speedFactor: 0.81 },
    { name: 'Jupiter', texture: jupiterImg, size: 3, distance: 18, inclination: 1.31, eccentricity: 0.0489, speedFactor: 0.44 },
    { name: 'Saturn', texture: saturnImg, size: 2.5, distance: 23, inclination: 2.49, eccentricity: 0.0565, speedFactor: 0.33, hasRings: true },
    { name: 'Uranus', texture: uranusImg, size: 1.5, distance: 28, inclination: 0.77, eccentricity: 0.0463, speedFactor: 0.23 },
    { name: 'Neptune', texture: neptuneImg , size: 1.4, distance: 33, inclination: 1.77, eccentricity: 0.0086, speedFactor: 0.18 }
  ];


export default planetsData;
