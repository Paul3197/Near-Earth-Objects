// src/services/nasaApi.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/planet';

export const getPlanetData = async (planetName) => {
  try {
    const response = await axios.get(`${apiUrl}/${planetName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${planetName} data:`, error);
    throw error;
  }
};
