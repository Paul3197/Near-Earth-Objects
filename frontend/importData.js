const fetch = require('node-fetch');
const { Comet, Asteroid } = require('./models'); // Ajusta la ruta según tu estructura

const apiKey = "nN7jPtSC28o6T79F77aekXb6bUn8MZOtObMl01em"; // Tu clave de API
const cometsUrl = `https://data.nasa.gov/resource/b67r-rgxc.json`;
const asteroidUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;

async function fetchComets() {
  try {
    const response = await fetch(cometsUrl);
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API de cometas");
    }
    return await response.json();
  } catch (error) {
    console.error("Hubo un problema con la solicitud de cometas:", error);
  }
}

async function fetchAsteroids() {
  try {
    const response = await fetch(asteroidUrl);
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API de asteroides");
    }
    const data = await response.json();
    return data.near_earth_objects; // Asegúrate de que esto es lo que necesitas
  } catch (error) {
    console.error("Hubo un problema con la solicitud de asteroides:", error);
  }
}

async function saveData() {
  const comets = await fetchComets();
  const asteroids = await fetchAsteroids();

  if (comets) {
    for (const comet of comets) {
      await Comet.create({
        object_name: comet.object, // Ajusta los campos según el esquema
        epoch_tdb: comet.epoch_tdb,
        tp_tdb: comet.tp_tdb,
        e: comet.e,
        i_deg: comet.i_deg,
        w_deg: comet.w_deg,
        node_deg: comet.node_deg,
        q_au_1: comet.q_au_1,
        q_au_2: comet.q_au_2,
        p_yr: comet.p_yr,
        moid_au: comet.moid_au,
        ref: comet.ref,
      });
    }
  }

  for (const asteroid of asteroids) {
    if (asteroid.inclination !== null) {
      await Asteroid.create({
        id: asteroid.id,
        name: asteroid.name,
        inclination: asteroid.inclination,
        eccentricity: asteroid.eccentricity,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } else {
      console.log(`El asteroide ${asteroid.name} no tiene inclinación, no se insertará.`);
    }
  }
}



saveData();