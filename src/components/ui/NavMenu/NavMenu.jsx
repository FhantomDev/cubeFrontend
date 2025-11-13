import React from 'react';
import './NavMenu.css';

const NavMenu = ({ activeTab, onTabClick }) => {
  return (
    <div className="nav-menu">
      <button
        className={`nav-menu-item ${activeTab === 'Proyección' ? 'active' : ''}`}
        onClick={() => onTabClick('Proyección')}
      >
        Proyección
      </button>
      <button
        className={`nav-menu-item ${activeTab === 'Evolución' ? 'active' : ''}`}
        onClick={() => onTabClick('Evolución')}
      >
        Evolución
      </button>
      <button
        className={`nav-menu-item ${activeTab === 'Comparativo' ? 'active' : ''}`}
        onClick={() => onTabClick('Comparativo')}
      >
        Comparativo
      </button>
    </div>
  );
};

export default NavMenu;
