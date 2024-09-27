import React, { useEffect } from 'react';
import * as THREE from 'three';
import axios from 'axios';

const SolarSystem = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(geometry, material);
    scene.add(sun);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      sun.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const fetchPlanetData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/planet/earth');
        console.log('Datos de la Tierra:', response.data);
      } catch (error) {
        console.error('Error al obtener datos del planeta:', error);
      }
    };

    fetchPlanetData();
  }, []);

  return <div id="solar-system" style={{ width: '100%', height: '100%' }}></div>;
};

export default SolarSystem;
