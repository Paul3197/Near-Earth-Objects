const fetch = require("node-fetch");
const { Comet, Asteroid } = require("./models"); // Ajusta la ruta según tu estructura

// API de cometas
const cometsUrl = `https://data.nasa.gov/resource/b67r-rgxc.json`;

// API de asteroides
const apiKey = "nN7jPtSC28o6T79F77aekXb6bUn8MZOtObMl01em"; // Clave de API
const asteroidUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?page=1&size=20&api_key=${apiKey}}`;

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

  if (asteroids) {
    for (const asteroid of asteroids) {
      await Asteroid.create({
        id: asteroid.id,
        name: asteroid.name,
        nasa_jpl_url: asteroid.nasa_jpl_url,
        estimated_diameter_min: asteroid.estimated_diameter.kilometers.estimated_diameter_min,
        estimated_diameter_max: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
        is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
        kilometers_per_second: asteroid.close_approach_data.relative_velocity.kilometers_per_second,
        kilometers_per_hour: asteroid.close_approach_data.relative_velocity.kilometers_per_hour,
        miles_per_hour: asteroid.close_approach_data.relative_velocity.miles_per_hour,
        orbiting_body: asteroid.close_approach_data.orbiting_body
      });
    }
  }
}

saveData();