import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const containerStyles = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
};

const cardStyles = {
  background: 'white',
  borderRadius: '1rem',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  padding: '3rem',
  maxWidth: '450px',
  width: '100%',
  animation: 'fadeIn 0.5s ease',
};

const logoStyles = {
  width: '120px',
  height: 'auto',
  margin: '0 auto 2rem',
  display: 'block',
};

const titleStyles = {
  fontSize: '2rem',
  fontWeight: '700',
  color: '#1e293b',
  textAlign: 'center',
  marginBottom: '0.5rem',
};

const subtitleStyles = {
  fontSize: '1rem',
  color: '#64748b',
  textAlign: 'center',
  marginBottom: '2rem',
};

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
};

const inputGroupStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const labelStyles = {
  fontSize: '0.875rem',
  fontWeight: '600',
  color: '#475569',
};

const inputStyles = {
  width: '100%',
  padding: '0.75rem 1rem',
  fontSize: '1rem',
  border: '1px solid #e2e8f0',
  borderRadius: '0.5rem',
  outline: 'none',
  transition: 'all 0.2s ease',
  backgroundColor: '#fff',
};

const errorStyles = {
  color: '#ef4444',
  fontSize: '0.875rem',
  marginTop: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const buttonStyles = {
  padding: '0.875rem 1.5rem',
  fontSize: '1rem',
  fontWeight: '600',
  borderRadius: '0.5rem',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginTop: '0.5rem',
};

const primaryButtonStyles = {
  ...buttonStyles,
  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  color: 'white',
  boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)',
};

const secondaryButtonStyles = {
  ...buttonStyles,
  background: '#f1f5f9',
  color: '#475569',
};

const welcomeCardStyles = {
  textAlign: 'center',
};

const welcomeTitleStyles = {
  fontSize: '2.5rem',
  fontWeight: '700',
  color: '#1e293b',
  marginBottom: '1rem',
};

const welcomeTextStyles = {
  fontSize: '1.125rem',
  color: '#64748b',
  marginBottom: '2.5rem',
  lineHeight: '1.75',
};

const navStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const linkStyles = {
  textDecoration: 'none',
  width: '100%',
};

const Home = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isHoveringLogin, setIsHoveringLogin] = useState(false);
  const [isHoveringLogout, setIsHoveringLogout] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'icb8899') {
      login();
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const getInputStyles = (inputName) => ({
    ...inputStyles,
    borderColor: focusedInput === inputName ? '#ef4444' : '#e2e8f0',
    boxShadow: focusedInput === inputName ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none',
  });

  const getLoginButtonStyles = () => ({
    ...primaryButtonStyles,
    transform: isHoveringLogin ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHoveringLogin
      ? '0 10px 15px -3px rgba(239, 68, 68, 0.4)'
      : '0 4px 6px -1px rgba(239, 68, 68, 0.3)',
  });

  const getLogoutButtonStyles = () => ({
    ...secondaryButtonStyles,
    transform: isHoveringLogout ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHoveringLogout ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
  });

  if (isAuthenticated) {
    return (
      <div style={containerStyles}>
        <div style={{...cardStyles, ...welcomeCardStyles}}>
          <img src="/logo-icbfs.png" alt="ICB Food Services" style={logoStyles} />
          <h1 style={welcomeTitleStyles}>¡Bienvenido!</h1>
          <p style={welcomeTextStyles}>
            Panel de análisis de datos con Cube.js
            <br />
            <span style={{ fontSize: '0.975rem', color: '#94a3b8' }}>
              Explora tus datos de forma interactiva
            </span>
          </p>
          <nav style={navStyles}>
            <Link to="/dashboard" style={linkStyles}>
              <button
                style={primaryButtonStyles}
                onMouseEnter={() => setIsHoveringLogin(true)}
                onMouseLeave={() => setIsHoveringLogin(false)}
              >
                📈 Ver Dashboard
              </button>
            </Link>
            <button
              onClick={logout}
              style={getLogoutButtonStyles()}
              onMouseEnter={() => setIsHoveringLogout(true)}
              onMouseLeave={() => setIsHoveringLogout(false)}
            >
              Cerrar Sesión
            </button>
          </nav>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <img src="/logo-icbfs.png" alt="ICB Food Services" style={logoStyles} />
        <h1 style={titleStyles}>Iniciar Sesión</h1>
        <p style={subtitleStyles}>Accede a tu panel de análisis</p>

        <form onSubmit={handleLogin} style={formStyles}>
          <div style={inputGroupStyles}>
            <label htmlFor="username" style={labelStyles}>Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
              style={getInputStyles('username')}
              required
            />
          </div>

          <div style={inputGroupStyles}>
            <label htmlFor="password" style={labelStyles}>Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              style={getInputStyles('password')}
              required
            />
          </div>

          {error && (
            <div style={errorStyles}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            style={getLoginButtonStyles()}
            onMouseEnter={() => setIsHoveringLogin(true)}
            onMouseLeave={() => setIsHoveringLogin(false)}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
