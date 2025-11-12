import React, { useState, useRef, useEffect } from 'react';

const dropdownContainerStyles = {
  position: 'relative',
  width: '200px', // Adjust as needed
};

const dropdownHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  fontSize: '0.925rem',
  fontWeight: '500',
  border: '1px solid #e2e8f0',
  borderRadius: '0.5rem',
  color: '#1e293b',
  cursor: 'pointer',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
};

const dropdownListStyles = {
  position: 'absolute',
  top: '100%',
  left: '0',
  right: '0',
  zIndex: '10',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  marginTop: '0.5rem',
  maxHeight: '250px',
  overflowY: 'auto',
};

const searchInputStyles = {
  width: 'calc(100% - 2rem)',
  padding: '0.5rem 1rem',
  border: '1px solid #e2e8f0',
  borderRadius: '0.5rem',
  margin: '0.5rem 1rem',
  outline: 'none',
};

const checkboxItemStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
};

const checkboxInputStyles = {
  cursor: 'pointer',
};

const MultiSelectMonthDropdown = ({ options, selectedValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleHeaderClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter((val) => val !== value));
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayValue = selectedValues.length > 0
    ? selectedValues.join(', ')
    : 'Seleccionar mes(es)';

  return (
    <div style={dropdownContainerStyles} ref={dropdownRef}>
      <div style={dropdownHeaderStyles} onClick={handleHeaderClick}>
        <span>{displayValue}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div style={dropdownListStyles}>
          <input
            type="text"
            placeholder="Buscar valor"
            style={searchInputStyles}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {filteredOptions.map((option) => (
            <label key={option} style={checkboxItemStyles}>
              <input
                type="checkbox"
                value={option}
                checked={selectedValues.includes(option)}
                onChange={handleCheckboxChange}
                style={checkboxInputStyles}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectMonthDropdown;
