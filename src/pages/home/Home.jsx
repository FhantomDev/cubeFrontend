import React from 'react';
import { Link } from 'react-router-dom';

const homeStyles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  padding: '40px',
};

const navStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  alignItems: 'center',
};

const linkStyles = {
  fontSize: '1.2rem',
  color: '#0275d8',
  textDecoration: 'none',
};

const Home = () => {
  return (
    <div style={homeStyles}>
      <h1>Página de Inicio</h1>
      <p>Bienvenido al proyecto de prueba.</p>
      <nav style={navStyles}>
        <Link to="/categoria" style={linkStyles}>Ver Datos de Cube.js</Link>
      </nav>
    </div>
  );
};

export default Home;
