import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

    // Crear el sol
    const geometrySun = new THREE.SphereGeometry(5, 32, 32);
    const materialSun = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(geometrySun, materialSun);
    scene.add(sun);

    // Datos de los planetas con posiciones más realistas
    const planetsData = [
      { name: 'Mercury', color: 0xaaaaaa, size: 0.383, distance: 10, inclination: 7, eccentricity: 0.2056, speedFactor: 1.61 },
      { name: 'Venus', color: 0xffcc66, size: 0.949, distance: 15, inclination: 3.39, eccentricity: 0.0067, speedFactor: 1.18 },
      { name: 'Earth', color: 0x0000ff, size: 1, distance: 20, inclination: 0, eccentricity: 0.0167, speedFactor: 1.00 },
      { name: 'Mars', color: 0xff0000, size: 0.532, distance: 30, inclination: 1.85, eccentricity: 0.0934, speedFactor: 0.81 },
      { name: 'Jupiter', color: 0xffa500, size: 11.21, distance: 50, inclination: 1.31, eccentricity: 0.0489, speedFactor: 0.44 },
      { name: 'Saturn', color: 0xffff00, size: 9.45, distance: 70, inclination: 2.49, eccentricity: 0.0565, speedFactor: 0.33, hasRings: true },
      { name: 'Uranus', color: 0x00ffff, size: 4.01, distance: 90, inclination: 0.77, eccentricity: 0.0463, speedFactor: 0.23 },
      { name: 'Neptune', color: 0x0000ff, size: 3.88, distance: 110, inclination: 1.77, eccentricity: 0.0086, speedFactor: 0.18 }
    ];

    const planets = [];

    // Crear los planetas y las órbitas
    planetsData.forEach(planetData => {
      const geometryPlanet = new THREE.SphereGeometry(planetData.size, 32, 32);
      const materialPlanet = new THREE.MeshBasicMaterial({ color: planetData.color });
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
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = THREE.MathUtils.degToRad(90); 
        planet.add(ring);
      }
    });

    // Datos de los cometas con velocidades ajustadas
    const cometsData = [
      { name: 'Comet 1', size: 0.1, distance: 150, eccentricity: 0.9, speedFactor: 2.5, inclination: 30 }, // más lento
      { name: 'Comet 2', size: 0.15, distance: 200, eccentricity: 0.85, speedFactor: 3.0, inclination: 45 }, // intermedio
      { name: 'Comet 3', size: 0.1, distance: 250, eccentricity: 0.95, speedFactor: 3.5, inclination: 60 } // más rápido
    ];

    const comets = [];

    // Crear los cometas con nuevas velocidades
    cometsData.forEach(cometData => {
      const geometryComet = new THREE.SphereGeometry(cometData.size, 32, 32);
      const materialComet = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const comet = new THREE.Mesh(geometryComet, materialComet);
      const distanceAtPerihelion = cometData.distance * (1 - cometData.eccentricity);
      comet.position.x = distanceAtPerihelion;

      scene.add(comet);
      comets.push({ mesh: comet, ...cometData });
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

      comets.forEach(({ mesh, distance, eccentricity, speedFactor }) => {
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
