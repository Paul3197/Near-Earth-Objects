import React, { useState } from 'react';

function Menus({ planeta }) {
  const [menuActivo, setMenuActivo] = useState(null);

  const toggleMenu = (menu) => {
    setMenuActivo(menuActivo === menu ? null : menu);
  };

  return (
    <div className="menus">
      <div className="menu">
        <button onClick={() => toggleMenu('descripcion')}>Descripción</button>
        {menuActivo === 'descripcion' && <p>{planeta.descripcion}</p>}
      </div>

      <div className="menu">
        <button onClick={() => toggleMenu('calendario')}>Calendario Cósmico</button>
        {menuActivo === 'calendario' && <p>{planeta.calendario}</p>}
      </div>

      <div className="menu">
        <button onClick={() => toggleMenu('exploraciones')}>Exploraciones</button>
        {menuActivo === 'exploraciones' && <p>{planeta.exploraciones}</p>}
      </div>
    </div>
  );
}

export default Menus;

