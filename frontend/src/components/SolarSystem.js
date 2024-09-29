import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Importar texturas
import mercuryImg from './img/mercury.jpg';
import venusImg from './img/venus.jpg';
import earthImg from './img/earth_dy.jpg';
import marsImg from './img/marte.jpg';
import jupiterImg from './img/jupiter.jpg';
import saturnImg from './img/saturn.jpg';
import uranusImg from './img/urano.jpg';
import neptuneImg from './img/neptune.jpg';
import ringImg from './img/ring.png';
import sunImg from './img/sun.jpg'; // Importar la textura del sol

const SolarSystem = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Crear fondo estrellado
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000); 
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Crear el sol con textura
    const geometrySun = new THREE.SphereGeometry(5, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const materialSun = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunImg) }); // Aplicar textura del sol
    const sun = new THREE.Mesh(geometrySun, materialSun);
    scene.add(sun);

    // Crear una luz puntual que emana desde el Sol con mayor intensidad
    const sunLight = new THREE.PointLight(0xffffff, 9000, 500); // Luz del sol
    sunLight.position.set(0, 0, 0); // La luz está en el mismo lugar que el Sol
    scene.add(sunLight);

    // Datos de los planetas con posiciones más realistas
    const planetsData = [
      { name: 'Mercury', texture: mercuryImg, size: 0.383, distance: 10, inclination: 7, eccentricity: 0.2056, speedFactor: 1.61 },
      { name: 'Venus', texture: venusImg, size: 0.949, distance: 15, inclination: 3.39, eccentricity: 0.0067, speedFactor: 1.18 },
      { name: 'Earth', texture: earthImg, size: 1, distance: 20, inclination: 0, eccentricity: 0.0167, speedFactor: 1.00 },
      { name: 'Mars', texture: marsImg, size: 0.532, distance: 30, inclination: 1.85, eccentricity: 0.0934, speedFactor: 0.81 },
      { name: 'Jupiter', texture: jupiterImg, size: 11.21, distance: 50, inclination: 1.31, eccentricity: 0.0489, speedFactor: 0.44 },
      { name: 'Saturn', texture: saturnImg, size: 9.45, distance: 70, inclination: 2.49, eccentricity: 0.0565, speedFactor: 0.33, hasRings: true },
      { name: 'Uranus', texture: uranusImg, size: 4.01, distance: 90, inclination: 0.77, eccentricity: 0.0463, speedFactor: 0.23 },
      { name: 'Neptune', texture: neptuneImg, size: 3.88, distance: 110, inclination: 1.77, eccentricity: 0.0086, speedFactor: 0.18 }
    ];

    const planets = [];

    // Crear los planetas y las órbitas
    planetsData.forEach(planetData => {
      const geometryPlanet = new THREE.SphereGeometry(planetData.size, 32, 32);
      const materialPlanet = new THREE.MeshPhongMaterial({ 
        map: textureLoader.load(planetData.texture)
      });
      const planet = new THREE.Mesh(geometryPlanet, materialPlanet);

      const distanceAtPerihelion = planetData.distance * (1 - planetData.eccentricity);
      planet.position.x = distanceAtPerihelion;
      scene.add(planet);
      planets.push({ mesh: planet, ...planetData });

      // Crear la órbita del planeta
      const curve = new THREE.EllipseCurve(
        0, 0, 
        planetData.distance * (1 + planetData.eccentricity), 
        planetData.distance * (1 - planetData.eccentricity), 
        0, 2 * Math.PI, 
        false, 
        THREE.MathUtils.degToRad(planetData.inclination)
      );

      const points = curve.getPoints(50);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      orbit.rotation.x = THREE.MathUtils.degToRad(90);
      scene.add(orbit);

      // Crear anillos de Saturno
      if (planetData.hasRings) {
        const ringGeometry = new THREE.RingGeometry(11, 15, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
          map: textureLoader.load(ringImg), 
          side: THREE.DoubleSide,
          transparent: true
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = THREE.MathUtils.degToRad(90); 
        planet.add(ring);
      }
    });

    camera.position.z = 150;

    const animate = () => {
      requestAnimationFrame(animate);

      planets.forEach(({ mesh, distance, eccentricity, speedFactor }) => {
        const time = Date.now() * 0.00005 * speedFactor;
        const angle = time % (2 * Math.PI);
        const radiusX = distance * (1 + eccentricity);
        const radiusY = distance * (1 - eccentricity);
        mesh.position.x = radiusX * Math.cos(angle);
        mesh.position.z = radiusY * Math.sin(angle);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Limpiar al desmontar
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default SolarSystem;
