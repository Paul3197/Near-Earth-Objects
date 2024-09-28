const express = require('express');
const axios = require('axios');
const router = express.Router();

const horizonsBaseUrl = "https://ssd.jpl.nasa.gov/api/horizons.api?format=json&MAKE_EPHEM=YES&EPHEM_TYPE=VECTORS&CENTER='500@10'&START_TIME='2024-09-26'&STOP_TIME='2024-10-5'&STEP_SIZE='1%20d'";

// Identificadores de los planetas en el sistema Horizons
const planetIds = {
  mercury: "199",
  venus: "299",
  earth: "399",
  mars: "499"
};

// Ruta para obtener los datos del planeta
router.get('/planet/:name', async (req, res) => {
  const planet = req.params.name.toLowerCase();
  const planetId = planetIds[planet];

  if (!planetId) {
    return res.status(404).json({ error: 'Planeta no encontrado' });
  }

  try {
    // Construimos la URL para obtener los datos de Horizons
    const apiUrl = `${horizonsBaseUrl}&COMMAND='${planetId}'`;

    const response = await axios.get(apiUrl);
    
    if (response.data && response.data.result) {
      // Enviamos los datos obtenidos en el formato necesario para el modelado 3D
      res.json(response.data.result);
    } else {
      res.status(500).json({ error: 'No se pudo obtener los datos del planeta' });
    }
  } catch (error) {
    console.error('Error al obtener datos del planeta:', error);
    res.status(500).json({ error: 'Error al obtener los datos del planeta' });
  }
});

module.exports = router;
