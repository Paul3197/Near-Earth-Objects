import React, { useEffect } from 'react';
import * as THREE from 'three';
import axios from 'axios';

const SolarSystem = () => {
  useEffect(() => {
    console.log("Comenzando a renderizar el sistema solar...");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Asegúrate de añadir el renderer al div correcto
    const solarSystemDiv = document.getElementById('solar-system');
    solarSystemDiv.appendChild(renderer.domElement);

    // Función para crear un planeta
    const createPlanet = (color, size, position) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: color });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.x = position;
      scene.add(planet);
      return planet;
    };

    // Crear el Sol
    const sun = createPlanet(0xffff00, 1, 0); // Sol

    // Crear la Tierra
    const earth = createPlanet(0x0000ff, 0.3, 3); // Tierra a 3 unidades de distancia

    camera.position.z = 5;

    let earthAngle = 0; // Variable para animar la Tierra

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotar el Sol
      sun.rotation.y += 0.01;

      // Hacer que la Tierra gire alrededor del Sol
      earthAngle += 0.01; // Ajusta la velocidad según sea necesario
      earth.position.x = 3 * Math.cos(earthAngle); // Posición en el eje X
      earth.position.z = 3 * Math.sin(earthAngle); // Posición en el eje Z

      renderer.render(scene, camera);
    };
    animate();

    // Función para obtener datos de los planetas desde la API
    const fetchPlanetData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/planet/earth'); // Cambia la ruta según tu API
        const planets = response.data; // Supongamos que es un arreglo de planetas

        planets.forEach(planet => {
          createPlanet(planet.color, planet.size, planet.distance); // Asegúrate de que estos campos existan en la respuesta
        });
      } catch (error) {
        console.error('Error al obtener datos de los planetas:', error);
      }
    };

    fetchPlanetData();

    // Manejar cambios en el tamaño de la ventana
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Limpiar al desmontar el componente
      window.removeEventListener('resize', handleResize);
      solarSystemDiv.removeChild(renderer.domElement); // Limpia el DOM
    };
  }, []);

  return <div id="solar-system" style={{ width: '100%', height: '100%' }}></div>;
};

export default SolarSystem;
