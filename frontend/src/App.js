import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SolarSystem from './components/SolarSystem';
import Presentacion from './presentacion/Presentacion';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* La ruta para la página de presentación */}
          <Route path="/" element={<Presentacion />} />
          
          {/* La ruta para la página 3D */}
          <Route path="/pagina-3d" element={<SolarSystem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
