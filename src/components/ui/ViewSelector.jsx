import React from 'react';

const selectStyles = {
  padding: '0.625rem 1.25rem',
  fontSize: '0.925rem',
  fontWeight: '600',
  border: '1px solid #e2e8f0',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  background: 'white',
  color: '#64748b',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
};

const ViewSelector = ({ views, selectedView, setSelectedView }) => {
  const handleViewChange = (e) => {
    setSelectedView(e.target.value);
  };

  return (
    <select
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
  );
};

export default ViewSelector;
