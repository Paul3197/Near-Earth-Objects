import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/planet';

export const getPlanetData = async (planetName) => {
  try {
    const response = await axios.get(`${apiUrl}/${planetName}`);
    const { size, velocity, orbit } = response.data; // Ajustamos para obtener los datos que nos interesan
    return { size, velocity, orbit };  // Devolvemos los datos formateados
  } catch (error) {
    console.error('Error fetching planet data:', error);
    throw error;
  }
};
