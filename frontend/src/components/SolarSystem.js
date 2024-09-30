import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import planetsData from './data/planetData'; // Importar los datos de los planetas
import ringImg from './img/ring.png';
import sunImg from './img/sun.jpg';

const SolarSystem = () => {
  const mountRef = useRef(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  useEffect(() => {
    const currentMountRef = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMountRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

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
    const geometrySun = new THREE.SphereGeometry(3, 32, 32);
    const materialSun = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunImg) });
    const sun = new THREE.Mesh(geometrySun, materialSun);
    scene.add(sun);

    const sunLight = new THREE.PointLight(0xffffff, 900, 500);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const planets = [];

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

      // Crear la órbita
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

      // Añadir anillos de Saturno
      if (planetData.hasRings) {
        const ringGeometry = new THREE.RingGeometry(3, 4, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
          map: textureLoader.load(ringImg), 
          side: THREE.DoubleSide,
          transparent: true
        });

        const uv = ringGeometry.attributes.uv;
        for (let i = 0; i < uv.count; i++) {
          const u = uv.getX(i);
          const angle = u * Math.PI * 2;
          const newU = Math.cos(angle) * 0.5 + 0.5;
          const newV = Math.sin(angle) * 0.5 + 0.5;
          uv.setXY(i, newU, newV);
        }
        uv.needsUpdate = true;

        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = THREE.MathUtils.degToRad(90);
        planet.add(ring);
      }
    });

    camera.position.z = 150;

    const animate = () => {
      requestAnimationFrame(animate);

      planets.forEach(({ mesh, distance, eccentricity, speedFactor }) => {
        const time = Date.now() * 0.00005 * speedFactor * speedMultiplier;
        const angle = time % (2 * Math.PI);
        const radiusX = distance * (1 + eccentricity);
        const radiusY = distance * (1 - eccentricity);
        mesh.position.x = radiusX * Math.cos(angle);
        mesh.position.z = radiusY * Math.sin(angle);

        mesh.rotation.y += 0.01 * speedMultiplier;
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (currentMountRef) {
        currentMountRef.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [speedMultiplier]);

  return (
    <div>
      <div ref={mountRef}></div>
      <div>
        <label>Speed Multiplier:</label>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={speedMultiplier}
          onChange={e => setSpeedMultiplier(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SolarSystem;
