import { useState, useMemo, useCallback } from 'react';
import { useCubeData, useCubeMonths } from './useCubeData';
import { levelDefs } from '../pages/dashboard/levelDefs';

export const useEvolucion = () => {
  const [selectedView, setSelectedView] = useState('categoria');
  const [selectedMetric, setSelectedMetric] = useState('detalle_factura.valor_neto_sum');
  const [numMonths, setNumMonths] = useState(6);
  const { months, loading: monthsLoading } = useCubeMonths();

  // Obtener los últimos N meses
  const selectedMonths = useMemo(() => {
    return months.slice(0, numMonths);
  }, [months, numMonths]);

  // Configuración de la vista actual
  const currentLevelDef = useMemo(() => {
    return levelDefs[selectedView]?.[0] || levelDefs.categoria[0];
  }, [selectedView]);

  // Query para obtener datos con dimensión + mes
  const query = useMemo(() => {
    const monthFilter = selectedMonths.length > 0 ? [{
      member: "detalle_factura.fecha_year_month",
      operator: "in",
      values: selectedMonths
    }] : [];

    return {
      dimensions: [currentLevelDef.dimensions[0], "detalle_factura.fecha_year_month"],
      measures: [selectedMetric],
      filters: monthFilter,
      order: {
        [currentLevelDef.dimensions[0]]: 'asc',
      }
    };
  }, [currentLevelDef, selectedMetric, selectedMonths]);

  const { data: rawData, loading } = useCubeData(query, selectedMonths.length > 0);

  // Transformar datos para mostrar meses como columnas
  const { rowData, columnDefs } = useMemo(() => {
    if (!rawData || rawData.length === 0) {
      return { rowData: [], columnDefs: [] };
    }

    // Obtener el nombre del campo principal (categoría, cliente, etc.)
    const mainDimensionField = currentLevelDef.dimensions[0];
    const metricField = selectedMetric;

    // Agrupar datos por dimensión principal
    const groupedData = {};
    rawData.forEach(row => {
      const key = row[mainDimensionField];
      if (!groupedData[key]) {
        groupedData[key] = {
          [mainDimensionField]: key,
        };
      }
      const month = row['detalle_factura.fecha_year_month'];
      groupedData[key][month] = Number(row[metricField]) || 0;
    });

    // Convertir a array para la grid
    const finalRowData = Object.values(groupedData);

    // Crear definición de columnas
    const cols = [
      {
        headerName: currentLevelDef.columnDefs[0].headerName,
        field: mainDimensionField,
        valueGetter: params => params.data ? params.data[mainDimensionField] : '',
        pinned: 'left',
        minWidth: 270,
        sortable: true,
        filter: 'agSetColumnFilter',
      },
    ];

    // Agregar una columna para cada mes
    const metricFormatter = currentLevelDef.columnDefs.find(
      col => col.field === metricField
    )?.valueFormatter;

    selectedMonths.forEach(month => {
      cols.push({
        headerName: month,
        field: month,
        valueGetter: params => params.data ? params.data[month] || 0 : 0,
        valueFormatter: metricFormatter || (p => p.value),
        sortable: true,
        filter: 'agNumberColumnFilter',
        type: 'numericColumn',
        aggFunc: 'sum',
      });
    });

    return { rowData: finalRowData, columnDefs: cols };
  }, [rawData, currentLevelDef, selectedMetric, selectedMonths]);

  // Generar fila de totales
  const pinnedBottomRowData = useMemo(() => {
    if (rowData.length === 0) return [];

    return [
      selectedMonths.reduce((total, month) => {
        total[currentLevelDef.dimensions[0]] = 'Total';
        total[month] = rowData.reduce((sum, row) => sum + (row[month] || 0), 0);
        return total;
      }, {})
    ];
  }, [rowData, selectedMonths, currentLevelDef]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 150,
      resizable: true,
    }),
    []
  );

  const loadingOverlayComponentParams = useMemo(() => {
    return { loadingMessage: "Un momento por favor..." };
  }, []);

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: 'agTotalRowCountComponent' },
      ]
    };
  }, []);

  const handleViewChange = (viewId) => {
    setSelectedView(viewId);
  };

  return {
    selectedView,
    selectedMetric,
    numMonths,
    months,
    selectedMonths,
    currentLevelDef,
    rowData,
    columnDefs,
    pinnedBottomRowData,
    loading: loading || monthsLoading,
    defaultColDef,
    loadingOverlayComponentParams,
    statusBar,
    handleViewChange,
    setSelectedMetric,
    setNumMonths,
  };
};
