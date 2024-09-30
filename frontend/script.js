const apiKey = "nN7jPtSC28o6T79F77aekXb6bUn8MZOtObMl01em"; // Reemplaza con tu clave de API
const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // Muestra los datos en la consola
    // Aquí puedes procesar los datos como desees
  })
  .catch((error) => {
    console.error("Hubo un problema con la solicitud:", error);
  });
