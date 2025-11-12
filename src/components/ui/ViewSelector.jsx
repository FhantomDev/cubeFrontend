import React from 'react';

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.5rem 1rem',
  background: '#ffffff',
  borderRadius: '0.75rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
};

const labelStyles = {
  fontSize: '0.925rem',
  fontWeight: '600',
  color: '#475569',
};

const selectStyles = {
  padding: '0.5rem 2.5rem 0.5rem 1rem',
  fontSize: '0.925rem',
  fontWeight: '500',
  border: '1px solid #e2e8f0',
  borderRadius: '0.5rem',
  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  color: '#1e293b',
  cursor: 'pointer',
  outline: 'none',
  transition: 'all 0.2s ease',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.75rem center',
};

const ViewSelector = ({ views, selectedView, setSelectedView }) => {
  const handleViewChange = (e) => {
    setSelectedView(e.target.value);
  };

  return (
    <div style={containerStyles}>
      <label htmlFor="view-select" style={labelStyles}>👁️ Vista:</label>
      <select
        id="view-select"
        value={selectedView}
        onChange={handleViewChange}
        style={selectStyles}
      >
        {views.map(view => (
          <option key={view.id} value={view.id}>
            {view.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ViewSelector;