import React, { useState } from 'react';

const containerStyles = {
  display: 'flex',
  gap: '0.5rem',
  padding: '0.25rem',
  background: '#f1f5f9',
  borderRadius: '0.75rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
};

const getButtonStyles = (isSelected, isHovering) => ({
  padding: '0.625rem 1.25rem',
  fontSize: '0.925rem',
  fontWeight: '600',
  border: 'none',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  background: isSelected
    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    : 'transparent',
  color: isSelected ? 'white' : '#64748b',
  boxShadow: isSelected ? '0 2px 8px rgba(239, 68, 68, 0.3)' : 'none',
  transform: isHovering && !isSelected ? 'translateY(-1px)' : 'translateY(0)',
});

const ViewSelector = ({ views, selectedView, setSelectedView }) => {
  const [hoveredView, setHoveredView] = useState(null);

  return (
    <div style={containerStyles}>
      {views.map(view => (
        <button
          key={view.id}
          onClick={() => setSelectedView(view.id)}
          onMouseEnter={() => setHoveredView(view.id)}
          onMouseLeave={() => setHoveredView(null)}
          style={getButtonStyles(
            selectedView === view.id,
            hoveredView === view.id
          )}
        >
          {view.name}
        </button>
      ))}
    </div>
  );
};

export default ViewSelector;