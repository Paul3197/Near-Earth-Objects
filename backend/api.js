const express = require('express');
const axios = require('axios');
const router = express.Router();

const horizonsApiUrl = 'https://ssd.jpl.nasa.gov/api/horizons.api';

const planetIds = {
  mercury: "199",
  venus: "299",
  earth: "399",
  mars: "499",
  jupiter: "599",
  saturn: "699",
  uranus: "799",
  neptune: "899"
};

router.get('/planet/:name', async (req, res) => {
  const planet = req.params.name;
  const planetId = planetIds[planet];

  if (!planetId) {
    return res.status(404).json({ error: 'Planeta no encontrado' });
  }

  try {
    const response = await axios.post(horizonsApiUrl, {
      "format": "json",
      "COMMAND": planetId,
      "OBJ_DATA": "YES",
      "MAKE_EPHEM": "YES",
      "EPHEM_TYPE": "VECTORS",
      "START_TIME": "2024-09-28",
      "STOP_TIME": "2024-09-28",
      "STEP_SIZE": "1 d"
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener datos del planeta:', error);
    res.status(500).json({ error: 'Error al obtener los datos del planeta' });
  }
});

module.exports = router;
