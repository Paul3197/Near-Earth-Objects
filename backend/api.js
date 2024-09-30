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

// Ruta para obtener los elementos orbitales de un planeta
router.get('/planet/:name', async (req, res) => {
  const planet = req.params.name.toLowerCase();
  const planetId = planetIds[planet];
  const planetSize = planetSizes[planet];

  if (!planetId) {
    return res.status(404).json({ error: 'Planeta no encontrado' });
  }

  try {
    const apiUrl = `${horizonsBaseUrl}${planetId}&EPHEM_TYPE=ELEMENTS`;
    const response = await axios.get(apiUrl);

    if (response.data && response.data.result) {
      const result = response.data.result;
      const elements = extractOrbitalElements(result);

      res.json({
        name: planet,
        size: planetSize,
        orbitalElements: elements
      });
    } else {
      res.status(500).json({ error: 'No se pudieron obtener los datos del planeta' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener los datos del planeta' });
  }
});

// Función para extraer los elementos orbitales
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

// Ruta para obtener los cometas
// Obtener un cometa por su nombre (o cualquier otro campo único)
router.get('/comets/:name', async (req, res) => {
  try {
    const cometsUrl = 'https://data.nasa.gov/resource/b67r-rgxc.json';
    const response = await axios.get(cometsUrl);
    const cometsData = response.data;

    const cometName = req.params.name;
    // Buscar el cometa en la lista por su nombre
    const comet = cometsData.find(c => c.object_name.toLowerCase() === cometName.toLowerCase());

    if (comet) {
      // Si se encuentra el cometa, devolver sus datos
      const cometElement = {
        name: comet.object_name,
        epoch_tdb: comet.epoch_tdb,
        e: comet.e,
        i_deg: comet.i_deg,
        w_deg: comet.w_deg,
        node_deg: comet.node_deg,
        q_au_1: comet.q_au_1,
        q_au_2: comet.q_au_2,
        p_yr: comet.p_yr,
        moid_au: comet.moid_au
      };
      res.json(cometElement);
    } else {
      res.status(404).json({ error: 'Cometa no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener los datos del cometa:', error);
    res.status(500).json({ error: 'No se pudo obtener el cometa' });
  }
});

module.exports = router;

