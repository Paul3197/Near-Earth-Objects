import React, { useState } from "react";
import Planeta from "./components/Planeta";
import Menus from "./components/Menus";
import Astronauta from "./components/Astronauta";
import "./Presentacion.css";

const planetas = [  
  { 
    nombre: "The Sun", 
    descripcion: "The Sun is the star of the solar system, providing light and heat to our planet.", 
    calendario: "Upcoming solar events include solar eclipses and sunspots.", 
    exploraciones: "Explorations of the Sun have been conducted by missions like Parker Solar Probe.", 
    curiosidades: "The Sun accounts for about 99.86% of the mass of the solar system.", 
    masInformacion: "For more information, visit [NASA - The Sun](https://solarsystem.nasa.gov/solar-system/sun/overview/) and explore careers in astronomy at [NASA Careers](https://www.nasa.gov/careers)."
  },
  { 
    nombre: "Mercury", 
    descripcion: "Mercury is the closest planet to the Sun, with a very thin atmosphere.", 
    calendario: "Mercury's calendar features extreme temperature fluctuations between day and night.", 
    exploraciones: "Explorations on Mercury have been carried out by Mariner 10 and MESSENGER.", 
    curiosidades: "Mercury is the smallest planet in our solar system.", 
    masInformacion: "Learn more at [NASA - Mercury](https://solarsystem.nasa.gov/planets/mercury/overview/) and find out about careers in planetary science at [American Geophysical Union](https://www.agu.org/)."
  },
  { 
    nombre: "Venus", 
    descripcion: "Venus is known for its dense atmosphere, which traps heat.", 
    calendario: "Cosmic events on Venus include its retrograde rotation.", 
    exploraciones: "Explorations of Venus include the Soviet Venera missions.", 
    curiosidades: "Venus is often called Earth's 'sister planet' due to its similar size.", 
    masInformacion: "For more details, visit [NASA - Venus](https://solarsystem.nasa.gov/planets/venus/overview/) and consider studying planetary geology at [Geological Society of America](https://www.geosociety.org/)."
  },
  { 
    nombre: "Earth", 
    descripcion: "Our home, the third planet from the Sun, supports life with its diverse ecosystems.", 
    calendario: "The astronomical calendar of Earth includes various celestial events like solstices and equinoxes.", 
    exploraciones: "Explorations of Earth include numerous space missions and satellite observations.", 
    curiosidades: "Earth is the only known planet to support life.", 
    masInformacion: "Explore more at [NASA - Earth](https://solarsystem.nasa.gov/planets/earth/overview/) and look into environmental science careers at [American Society for Environmental Scientists](https://www.ases.org/)."
  },
  { 
    nombre: "Mars", 
    descripcion: "The red planet, with its mountains and deserts, has the largest volcano and canyon in the solar system.", 
    calendario: "Cosmic events on Mars include the occurrence of dust storms.", 
    exploraciones: "Explorations of Mars have been conducted by rovers like Curiosity and Perseverance.", 
    curiosidades: "Mars has two small moons named Phobos and Deimos.", 
    masInformacion: "Learn more at [NASA - Mars](https://solarsystem.nasa.gov/planets/mars/overview/) and consider a career in astrobiology at [Astrobiology Institute](https://astrobiology.nasa.gov/)."
  },
  { 
    nombre: "Jupiter", 
    descripcion: "Jupiter is the largest planet, known for its Great Red Spot and many moons.", 
    calendario: "The astronomical calendar of Jupiter includes events like its moons' transits.", 
    exploraciones: "Explorations of Jupiter have been conducted by missions like Galileo and Juno.", 
    curiosidades: "Jupiter has a strong magnetic field and radiation belts.", 
    masInformacion: "For more information, visit [NASA - Jupiter](https://solarsystem.nasa.gov/planets/jupiter/overview/) and explore careers in astrophysics at [American Physical Society](https://www.aps.org/)."
  },
  { 
    nombre: "Saturn", 
    descripcion: "Famous for its rings, Saturn is a gas giant with a unique beauty.", 
    calendario: "Cosmic events on Saturn include ring visibility and moon alignments.", 
    exploraciones: "Explorations of Saturn have been carried out by the Cassini spacecraft.", 
    curiosidades: "Saturn could float in water because it is mostly made of gas.", 
    masInformacion: "Learn more at [NASA - Saturn](https://solarsystem.nasa.gov/planets/saturn/overview/) and find resources for studying space science at [Space Science Institute](https://www.spacescience.org/)."
  },
  { 
    nombre: "Uranus", 
    descripcion: "Uranus rotates on its side, giving it a unique orientation in the solar system.", 
    calendario: "Cosmic events on Uranus include the visibility of its rings.", 
    exploraciones: "Explorations of Uranus have been conducted mainly by the Voyager 2 mission.", 
    curiosidades: "Uranus is often referred to as an 'ice giant'.", 
    masInformacion: "For more information, visit [NASA - Uranus](https://solarsystem.nasa.gov/planets/uranus/overview/) and consider careers in planetary research at [Planetary Society](https://www.planetary.org/)."
  },
  { 
    nombre: "Neptune", 
    descripcion: "The last planet of the solar system, Neptune is known for its deep blue color and strong winds.", 
    calendario: "Cosmic events on Neptune include its dynamic atmosphere.", 
    exploraciones: "Explorations of Neptune have been conducted by Voyager 2.", 
    curiosidades: "Neptune has the strongest winds in the solar system, reaching up to 2,100 kilometers per hour.", 
    masInformacion: "Learn more at [NASA - Neptune](https://solarsystem.nasa.gov/planets/neptune/overview/) and explore oceanography careers at [American Geophysical Union](https://www.agu.org/)."
  }
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
      <Astronauta
        planeta={planetas[planetaActual].nombre}
        descripcion={planetas[planetaActual].descripcion}
      />
      <Planeta nombre={planetas[planetaActual].nombre} />
      <Menus planeta={planetas[planetaActual]} />

      <div className="botones-container">
        <button
          className="btn-anterior"
          onClick={anteriorPlaneta}
          disabled={planetaActual === 0}
        >
          Previous
        </button>
        <button className="btn-siguiente" onClick={siguientePlaneta}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Presentacion;
