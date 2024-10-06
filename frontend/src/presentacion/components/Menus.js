import React, { useState } from 'react';
import '../Presentacion.css'

function Menus({ planeta }) {
  const [menuActivo, setMenuActivo] = useState(null);

  const toggleMenu = (menu) => {
    setMenuActivo(menuActivo === menu ? null : menu);
  };

  return (
    <div className="menus">
      <div className="menu">
        <button className='buttonDates' onClick={() => toggleMenu('descripcion')}>Description</button>
        {menuActivo === 'descripcion' && <p>{planeta.descripcion}</p>}
      </div>

      <div className="menu">
        <button className='buttonDates' onClick={() => toggleMenu('calendario')}>Cosmic Calendar</button>
        {menuActivo === 'calendario' && <p>{planeta.calendario}</p>}
      </div>

      <div className="menu">
        <button className='buttonDates' onClick={() => toggleMenu('exploraciones')}>Explorations</button>
        {menuActivo === 'exploraciones' && <p>{planeta.exploraciones}</p>}
      </div>

      <div className="menu">
        <button className='buttonDates' onClick={() => toggleMenu('curiosidades')}>Curiosities</button>
        {menuActivo === 'curiosidades' && <p>{planeta.curiosidades}</p>}
      </div>

      <div className="menu">
        <button className='buttonDates' onClick={() => toggleMenu('masInformacion')}>More Information</button>
        {menuActivo === 'masInformacion' && <p>{planeta.masInformacion}</p>}
      </div>
    </div>
  );
}

export default Menus;

