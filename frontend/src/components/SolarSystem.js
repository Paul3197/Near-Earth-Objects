import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const SolarSystem = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Crear el sol
    const geometrySun = new THREE.SphereGeometry(5, 32, 32);
    const materialSun = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(geometrySun, materialSun);
    scene.add(sun);

    // Datos de los planetas
    const planetsData = [
      { name: 'Mercury', color: 0xaaaaaa, size: 0.5, distance: 10, inclination: 7, eccentricity: 0.2056, speedFactor: 1.61 },
      { name: 'Venus', color: 0xffcc66, size: 0.9, distance: 15, inclination: 3.39, eccentricity: 0.0067, speedFactor: 1.18 },
      { name: 'Earth', color: 0x0000ff, size: 1, distance: 20, inclination: 0, eccentricity: 0.0167, speedFactor: 1.00 },
      { name: 'Mars', color: 0xff0000, size: 0.8, distance: 25, inclination: 1.85, eccentricity: 0.0934, speedFactor: 0.81 },
      { name: 'Jupiter', color: 0xffa500, size: 2, distance: 35, inclination: 1.31, eccentricity: 0.0489, speedFactor: 0.44 },
      { name: 'Saturn', color: 0xffff00, size: 1.7, distance: 45, inclination: 2.49, eccentricity: 0.0565, speedFactor: 0.33 },
      { name: 'Uranus', color: 0x00ffff, size: 1.5, distance: 55, inclination: 0.77, eccentricity: 0.0463, speedFactor: 0.23 },
      { name: 'Neptune', color: 0x0000ff, size: 1.4, distance: 65, inclination: 1.77, eccentricity: 0.0086, speedFactor: 0.18 }
    ];

    const planets = [];

    // Crear los planetas y sus órbitas
    planetsData.forEach(planetData => {
      const geometryPlanet = new THREE.SphereGeometry(planetData.size, 32, 32);
      const materialPlanet = new THREE.MeshBasicMaterial({ color: planetData.color });
      const planet = new THREE.Mesh(geometryPlanet, materialPlanet);

      // Posicionar el planeta en su distancia inicial (perihelio)
      const distanceAtPerihelion = planetData.distance * (1 - planetData.eccentricity);
      planet.position.x = distanceAtPerihelion;

      scene.add(planet);
      planets.push({ mesh: planet, ...planetData });

      // Crear la órbita
      const curve = new THREE.EllipseCurve(
        0, 0, // Centro
        planetData.distance * (1 + planetData.eccentricity), // Radio X (Afelio)
        planetData.distance * (1 - planetData.eccentricity), // Radio Y (Perihelio)
        0, 2 * Math.PI, // Ángulo inicial y final
        false, // Sentido antihorario
        THREE.MathUtils.degToRad(planetData.inclination) // Inclinación orbital
      );

      const points = curve.getPoints(50);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      orbit.rotation.x = THREE.MathUtils.degToRad(90); // Alineación con el plano eclíptico
      scene.add(orbit);
    });

    camera.position.z = 100;

    const animate = () => {
      requestAnimationFrame(animate);

      // Animar los planetas en sus órbitas
      planets.forEach((planetData) => {
        const { mesh, distance, eccentricity, speedFactor } = planetData;
        const time = Date.now() * 0.00005 * speedFactor; // Velocidad ajustada para cada planeta
        const angle = time % (2 * Math.PI); // Ángulo actual en radianes
        const radiusX = distance * (1 + eccentricity); // Radio mayor (afelio)
        const radiusY = distance * (1 - eccentricity); // Radio menor (perihelio)

        // Posicionar el planeta en la órbita elíptica
        mesh.position.x = radiusX * Math.cos(angle);
        mesh.position.z = radiusY * Math.sin(angle);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default SolarSystem;
