import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  maxWidth: '300px',
  margin: '0 auto',
};

const inputStyles = {
  padding: '10px',
  fontSize: '1rem',
};

const buttonStyles = {
  padding: '10px',
  fontSize: '1rem',
  backgroundColor: '#0275d8',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

const errorStyles = {
  color: 'red',
  marginTop: '10px',
};

const Home = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'icb8899') {
      login();
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  if (isAuthenticated) {
    return (
      <div style={homeStyles}>
        <h1>Página de Inicio</h1>
        <p>Prueba de concepto de cube.js.</p>
        <nav style={navStyles}>
          <Link to="/categoria" style={linkStyles}>Ver Datos de Cube.js</Link>
          <button onClick={logout} style={buttonStyles}>Cerrar Sesión</button>
        </nav>
      </div>
    );
  }

  return (
    <div style={homeStyles}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin} style={formStyles}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyles}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyles}
        />
        <button type="submit" style={buttonStyles}>Entrar</button>
        {error && <p style={errorStyles}>{error}</p>}
      </form>
    </div>
  );
};

export default Home;
