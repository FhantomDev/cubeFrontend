import React, { useEffect } from 'react';
import { useCubeMonths } from '../../hooks/useCubeData';

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
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ef4444' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.75rem center',
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
    if (months.length > 0 && !selectedMonth) {
      setSelectedMonth(months[0]);
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
      <label htmlFor="month-select" style={labelStyles}>📅 Mes:</label>
      <select
        id="month-select"
        value={selectedMonth || ''}
        onChange={(e) => setSelectedMonth(e.target.value)}
        style={selectStyles}
      >
        {months.map(month => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
    </div>
  );
};

export default MonthFilter;