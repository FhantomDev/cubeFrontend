'use client';
import React, { useMemo, useState } from "react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { themeCostum } from "../../styles/theme";
import Breadcrumb from "../../components/common/Breadcrumb";
import customLoadingOverlay from "../../components/ui/customLoadingOverlay";
import ViewSelector from "../../components/ui/ViewSelector/ViewSelector";
import MonthFilter from "../../components/ui/MonthFilter/MonthFilter";
import MetricSelector from "../../components/ui/MetricSelector/MetricSelector";
import { useCubeData, useCubeMonths } from "../../hooks/useCubeData";
import { views } from "./dashboardConstants";
import { levelDefs } from "./levelDefs";
import "../../styles/Dashboard.css";

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const EvolucionView = () => {
  const [selectedView, setSelectedView] = useState('categoria');
  const [selectedMetric, setSelectedMetric] = useState('detalle_factura.valor_neto_sum');
  const [numMonths, setNumMonths] = useState(6);
  const { months, loading: monthsLoading } = useCubeMonths();

  const gridRef = React.useRef();

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

  return (
    <>
      <Breadcrumb crumbs={[{ label: 'Inicio', path: '/' }, { label: 'Evolución', path: '/dashboard/evolucion', drilldownLevel: 0 }]} />

      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-title">
            <img src="/logo-icbfs.png" alt="ICB Food Services" className="dashboard-logo" />
            <span>Evolución</span>
          </h1>
          <div className="dashboard-controls">
            <div className="control-group">
              <label>Vista:</label>
              <ViewSelector
                views={views}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
              />
            </div>
            <div className="control-group">
              <label>Métrica:</label>
              <MetricSelector
                selectedMetric={selectedMetric}
                setSelectedMetric={setSelectedMetric}
              />
            </div>
            <div className="control-group">
              <label>Períodos:</label>
              <input
                type="number"
                value={numMonths}
                onChange={(e) => setNumMonths(Math.max(1, parseInt(e.target.value) || 6))}
                min="1"
                max={months.length}
                style={{ width: '60px', padding: '5px' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-wrapper">
          <AgGridReact
            ref={gridRef}
            theme={themeCostum}
            rowData={rowData}
            loading={loading || monthsLoading}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            loadingOverlayComponent={customLoadingOverlay}
            loadingOverlayComponentParams={loadingOverlayComponentParams}
            statusBar={statusBar}
            pinnedBottomRowData={rowData.length > 0 ? [
              selectedMonths.reduce((total, month) => {
                total[currentLevelDef.dimensions[0]] = 'Total';
                total[month] = rowData.reduce((sum, row) => sum + (row[month] || 0), 0);
                return total;
              }, {})
            ] : []}
          />
        </div>
      </div>
    </>
  );
};

export default EvolucionView;
