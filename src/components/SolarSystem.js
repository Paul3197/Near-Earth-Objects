import React, { useEffect } from 'react';
import * as THREE from 'three';

const SolarSystem = () => {
  useEffect(() => {
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('solar-system-canvas').appendChild(renderer.domElement);

    
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    
    const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0077ff });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(5, 0, 0);  
    scene.add(earth);

    camera.position.z = 10;

    
    const animate = () => {
      requestAnimationFrame(animate);
      
      
      earth.rotation.y += 0.01;
      earth.position.x = 5 * Math.cos(Date.now() * 0.001);  // Movimiento circular simple
      earth.position.z = 5 * Math.sin(Date.now() * 0.001);

      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <div className="solar-system">
      <div id="solar-system-canvas"></div>
    </div>
  );
};

export default SolarSystem;
