import React, { useEffect } from 'react';
import { useCubeMonths } from '../../hooks/useCubeData';

const MonthFilter = ({ selectedMonth, setSelectedMonth }) => {
  const { months, loading, error } = useCubeMonths();

  useEffect(() => {
    if (months.length > 0 && !selectedMonth) {
      setSelectedMonth(months[0]);
    }
  }, [months, selectedMonth, setSelectedMonth]);

  if (loading) return <p>Cargando meses...</p>;
  if (error) return <p>Error al cargar meses</p>;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <label htmlFor="month-select">Mes:</label>
      <select id="month-select" value={selectedMonth || ''} onChange={(e) => setSelectedMonth(e.target.value)}>
        {months.map(month => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
    </div>
  );
};

export default MonthFilter;