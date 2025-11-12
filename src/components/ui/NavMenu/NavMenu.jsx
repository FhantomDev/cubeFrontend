import React, { useState } from 'react';
import './NavMenu.css';

const NavMenu = () => {
  const [activeTab, setActiveTab] = useState('Proyección');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="nav-menu">
      <button
        className={`nav-menu-item ${activeTab === 'Proyección' ? 'active' : ''}`}
        onClick={() => handleTabClick('Proyección')}
      >
        Proyección
      </button>
      <button
        className={`nav-menu-item ${activeTab === 'Evolución' ? 'active' : ''}`}
        onClick={() => handleTabClick('Evolución')}
      >
        Evolución
      </button>
      <button
        className={`nav-menu-item ${activeTab === 'Comparativo' ? 'active' : ''}`}
        onClick={() => handleTabClick('Comparativo')}
      >
        Comparativo
      </button>
    </div>
  );
};

export default NavMenu;
