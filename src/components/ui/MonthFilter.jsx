import React, { useEffect } from 'react';
import { useCubeMonths } from '../../hooks/useCubeData';
import MultiSelectMonthDropdown from './MultiSelectMonthDropdown';

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

const loadingStyles = {
  fontSize: '0.875rem',
  color: '#64748b',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const errorStyles = {
  fontSize: '0.875rem',
  color: '#ef4444',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const MonthFilter = ({ selectedMonth, setSelectedMonth }) => {
  const { months, loading, error } = useCubeMonths();

  useEffect(() => {
    if (months.length > 0 && (!selectedMonth || selectedMonth.length === 0)) {
      setSelectedMonth([months[0]]);
    }
  }, [months, selectedMonth, setSelectedMonth]);

  if (loading) return (
    <div style={loadingStyles}>
      <span>⏳</span>
      <span>Cargando meses...</span>
    </div>
  );

  if (error) return (
    <div style={errorStyles}>
      <span>⚠️</span>
      <span>Error al cargar meses</span>
    </div>
  );

  return (
    <div style={containerStyles}>
      <label style={labelStyles}>📅 Mes:</label>
      <MultiSelectMonthDropdown
        options={months}
        selectedValues={selectedMonth}
        onChange={setSelectedMonth}
      />
    </div>
  );
};

export default MonthFilter;