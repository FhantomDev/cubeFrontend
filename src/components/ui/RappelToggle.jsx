import React, { useState } from 'react';

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.5rem 1rem',
  background: '#ffffff',
  borderRadius: '0.75rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
};

const labelStyles = {
  fontSize: '0.925rem',
  fontWeight: '600',
  color: '#475569',
  userSelect: 'none',
};

const toggleWrapperStyles = {
  position: 'relative',
  width: '40px',
  height: '22px',
};

const toggleInputStyles = {
  opacity: '0',
  width: '0',
  height: '0',
};

const sliderStyles = {
  position: 'absolute',
  cursor: 'pointer',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: '#ccc',
  transition: '0.4s',
  borderRadius: '22px',
};

const sliderBeforeStyles = {
  position: 'absolute',
  content: '""',
  height: '16px',
  width: '16px',
  left: '3px',
  bottom: '3px',
  backgroundColor: 'white',
  transition: '0.4s',
  borderRadius: '50%',
};

const statusStyles = {
  fontSize: '0.925rem',
  fontWeight: '600',
  userSelect: 'none',
};

const RappelToggle = ({ onToggle }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);
    onToggle(newIsActive);
  };

  const finalSliderStyles = {
    ...sliderStyles,
    backgroundColor: isActive ? '#b41313ff' : '#ccc',
  };

  const finalSliderBeforeStyles = {
    ...sliderBeforeStyles,
    transform: isActive ? 'translateX(18px)' : 'none',
  };

  return (
    <div style={containerStyles} onClick={handleToggle}>
      <span style={labelStyles}>💰 Restar Rappel:</span>
      <div style={toggleWrapperStyles}>
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => { }} // The div handles the click
          style={toggleInputStyles}
        />
        <span style={finalSliderStyles}>
          <span style={finalSliderBeforeStyles}></span>
        </span>
      </div>
      <span style={{ ...statusStyles, color: isActive ? '#b41313ff' : '#475569' }}>
        {isActive ? 'SI' : 'NO'}
      </span>
    </div>
  );
};

export default RappelToggle;
