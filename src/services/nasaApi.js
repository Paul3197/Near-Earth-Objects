// src/services/nasaApi.js
import axios from 'axios';

const NASA_API_KEY = 'TU_API_KEY_AQUI';
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/neo/browse';

export const fetchNearEarthObjects = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?api_key=${NASA_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos de la API de la NASA:', error);
    return null;
  }
};
