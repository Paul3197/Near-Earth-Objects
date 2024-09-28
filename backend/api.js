const express = require('express');
const axios = require('axios');
const router = express.Router();

// Base URL para la API de Horizons
const horizonsBaseUrl = "https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND=";

// Identificadores de los planetas
const planetIds = {
  mercury: "199",
  venus: "299",
  earth: "399",
  mars: "499"
};

// Tamaños aproximados de los planetas en km (radio)
const planetSizes = {
  mercury: 2439.7,
  venus: 6051.8,
  earth: 6371.0,
  mars: 3389.5
};

router.get('/planet/:name', async (req, res) => {
  const planet = req.params.name.toLowerCase();
  const planetId = planetIds[planet];
  const planetSize = planetSizes[planet];

  if (!planetId) {
    return res.status(404).json({ error: 'Planeta no encontrado' });
  }

  try {
    // URL de la API para extraer elementos orbitales
    const apiUrl = `${horizonsBaseUrl}${planetId}&EPHEM_TYPE=ELEMENTS`;
    const response = await axios.get(apiUrl);

    if (response.data && response.data.result) {
      const result = response.data.result;

      // Parsear los elementos orbitales de la API
      const elements = extractOrbitalElements(result);

      res.json({
        name: planet,
        size: planetSize,  // Tamaño del planeta (predefinido en km)
        orbitalElements: elements  // Elementos orbitales reales
      });
    } else {
      res.status(500).json({ error: 'No se pudieron obtener los datos del planeta' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener los datos del planeta' });
  }
});

// Función para extraer los elementos orbitales de los datos de la API
function extractOrbitalElements(data) {
  const lines = data.split('\n');
  
  const elements = {};
  lines.forEach(line => {
    if (line.includes("EC=")) {
      elements.excentricity = parseFloat(line.split("=")[1].trim());
    }
    if (line.includes("QR=")) {
      elements.perihelion = parseFloat(line.split("=")[1].trim());
    }
    if (line.includes("IN=")) {
      elements.inclination = parseFloat(line.split("=")[1].trim());
    }
    if (line.includes("OM=")) {
      elements.longitudeAscendingNode = parseFloat(line.split("=")[1].trim());
    }
    if (line.includes("W =" )) {
      elements.argumentOfPerihelion = parseFloat(line.split("=")[1].trim());
    }
    if (line.includes("MA=")) {
      elements.meanAnomaly = parseFloat(line.split("=")[1].trim());
    }
  });

  return elements;
}

module.exports = router;
