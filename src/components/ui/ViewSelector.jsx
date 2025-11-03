import React from 'react';

const ViewSelector = ({ views, selectedView, setSelectedView }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {views.map(view => (
        <button
          key={view.id}
          onClick={() => setSelectedView(view.id)}
          style={{
            marginRight: '1rem',
            padding: '0.5rem 1rem',
            border: selectedView === view.id ? '2px solid #007bff' : '2px solid #ccc',
            borderRadius: '5px',
            backgroundColor: selectedView === view.id ? '#007bff' : '#fff',
            color: selectedView === view.id ? '#fff' : '#000',
            cursor: 'pointer'
          }}
        >
          {view.name}
        </button>
      ))}
    </div>
  );
};

export default ViewSelector;