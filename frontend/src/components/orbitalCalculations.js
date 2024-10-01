export function calculateEllipticalPosition(orbitalElements, time) {
    const a = orbitalElements.semimajorAxis; // Semieje mayor
    const e = orbitalElements.eccentricity; // Excentricidad
    const inclination = orbitalElements.inclination; // Inclinación

    const M = calculateMeanAnomaly(time); // Anomalía media
    const E = solveKeplerEquation(M, e); // Ecuación de Kepler

    const r = a * (1 - e * Math.cos(E)); // Distancia radial

    // Coordenadas en 2D, aplanado
    const x = r * Math.cos(E);
    const z = r * Math.sin(E);

    return { x, z };
}

function calculateMeanAnomaly(time) {
    const n = 0.9856076686; // Velocidad angular media, tasa de cambio del angulo
    return n * time;
}

function solveKeplerEquation(M, e) {
    let E = M;
    let delta = 1;
    const tolerance = 1e-6;

    while (Math.abs(delta) > tolerance) {
        delta = E - e * Math.sin(E) - M;
        E -= delta / (1 - e * Math.cos(E));
    }

    return E;
}