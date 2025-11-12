'use client';
import React, { useState, useMemo, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { themeCostum } from "../../styles/theme";
import Breadcrumb from "../../components/common/Breadcrumb";
import { levelDefs } from "./levelDefs";
import { useCubeData } from "../../hooks/useCubeData";
import customLoadingOverlay from "../../components/ui/customLoadingOverlay";
import ViewSelector from "../../components/ui/ViewSelector";
import MonthFilter from "../../components/ui/MonthFilter";

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const breadcrumbNameMap = {
  '/dashboard': 'Dashboard',
};

const views = [
  { id: 'categoria', name: 'Categoría' },
  { id: 'cliente', name: 'Cliente' },
  { id: 'vendedor', name: 'Vendedor' },
  { id: 'canal', name: 'Canal' },
  { id: 'zona', name: 'Zona' },
  { id: 'marca', name: 'Marca' },
  { id: 'centro', name: 'Centro Suministrador' },
  { id: 'numero_factura', name: 'Factura' },
  { id: 'familia', name: 'Familia' },
  { id: 'jefe_categoria', name: 'Jefe Categoría' },
  { id: 'region', name: 'Región' },
  { id: 'origen', name: 'Sistema Orígen' },
  { id: 'sociedad', name: 'Sociedad' },
  { id: 'um_venta', name: 'Unidad Medida Venta' },
];

const DataView = () => {
  const gridRef = useRef();
  const [drilldownLevel, setDrilldownLevel] = useState(0);
  const [filters, setFilters] = useState([]);
  const [selectedView, setSelectedView] = useState('categoria');
  const [dynamicDimensions, setDynamicDimensions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const location = useLocation();

  const currentLevelDef = levelDefs[selectedView][drilldownLevel];

  const handleViewChange = (viewId) => {
    setSelectedView(viewId);
    setDrilldownLevel(0);
    setFilters([]);
    setDynamicDimensions([]);
  };

  const query = useMemo(() => {
    const monthFilter = selectedMonth ? [{
      member: "detalle_factura.fecha_year_month",
      operator: "equals",
      values: [selectedMonth]
    }] : [];

    return {
      dimensions: [...currentLevelDef.dimensions, ...dynamicDimensions],
      measures: currentLevelDef.measures,
      filters: [...filters, ...monthFilter],
    };
  }, [currentLevelDef, filters, dynamicDimensions, selectedMonth]);

  const { data: rowData, loading } = useCubeData(query, !!selectedMonth);

  const crumbs = useMemo(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [{ label: 'Inicio', path: '/' }];
    let currentPath = '';
    pathnames.forEach(name => {
      currentPath += `/${name}`;
      if (breadcrumbNameMap[currentPath]) {
        breadcrumbs.push({ label: breadcrumbNameMap[currentPath], path: currentPath, drilldownLevel: 0 });
      }
    });
    filters.forEach((filter, index) => {
      breadcrumbs.push({
        label: filter.values[0],
        path: `#`,
        isDrilldown: true,
        drilldownLevel: index + 1
      });
    });
    return breadcrumbs;
  }, [location.pathname, filters]);

  const handleBreadcrumbClick = (level) => {
    setDrilldownLevel(level);
    setFilters(filters.slice(0, level));
  };

  const handleColumnVisible = useCallback((event) => {
    const { column, visible } = event;
    if (!column) return;

    const colDef = column.getColDef();
    if (colDef.isDynamic) {
      const dimension = colDef.dimension;
      setDynamicDimensions(prev => {
        const newDimensions = new Set(prev);
        if (visible) {
          newDimensions.add(dimension);
        } else {
          newDimensions.delete(dimension);
        }
        return [...newDimensions];
      });
    }
  }, []);

  const handleRowClicked = useCallback((event) => {
    const { drillDownField } = currentLevelDef;
    if (drillDownField && levelDefs[selectedView][drilldownLevel + 1]) {
      const clickedValue = event.data[drillDownField];
      const newFilter = {
        member: drillDownField,
        operator: 'equals',
        values: [clickedValue],
      };
      setFilters([...filters, newFilter]);
      setDrilldownLevel(drilldownLevel + 1);
    } else {
      alert("No hay mas niveles");
    }
  }, [currentLevelDef, drilldownLevel, filters, selectedView]);

  const onColumnPivotModeChanged = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      const isPivotMode = gridRef.current.api.isPivotMode();
      if (!isPivotMode) {
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.setColumnDefs(currentLevelDef.columnDefs);
      }
    }
  }, [rowData, currentLevelDef.columnDefs]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
      enablePivot: true,
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

  const containerStyles = {
    padding: '0.5rem',
    background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
    minHeight: '100vh',
  };

  const headerStyles = {
    background: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  };

  const titleStyles = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const dashboardLogoStyles = {
    height: '50px',
    width: 'auto',
  };

  const controlsStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const backButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    background: 'transparent',
    color: '#3b82f6',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    textShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
  };

  const gridContainerStyles = {
    background: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    height: 'calc(100vh - 300px)',
  };

  const gridWrapperStyles = {
    height: '100%',
    width: '100%',
    borderRadius: '0.5rem',
    overflow: 'hidden',
  };

  return (
    <div style={containerStyles}>
      <Breadcrumb crumbs={crumbs} onDrilldownClick={handleBreadcrumbClick} />

      <div style={headerStyles}>
        {drilldownLevel > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => handleBreadcrumbClick(drilldownLevel - 1)}
              style={backButtonStyles}
              onMouseEnter={(e) => {
                e.target.style.textShadow = '0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4)';
                e.target.style.color = '#2563eb';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.textShadow = '0 0 8px rgba(59, 130, 246, 0.5)';
                e.target.style.color = '#3b82f6';
                e.target.style.textDecoration = 'none';
              }}
            >
              <span>←</span>
              <span>Volver de: <strong>{filters[filters.length - 1]?.values[0]}</strong></span>
            </button>
          </div>
        )}
        <h1 style={titleStyles}>
          <img src="/logo-icbfs.png" alt="ICB Food Services" style={dashboardLogoStyles} />
          <span>Panel de Ventas</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="view-selector" style={{ fontSize: '0.925rem', fontWeight: '600', color: '#64748b' }}>
              Vistas:
            </label>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#64748b' }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <ViewSelector views={views} selectedView={selectedView} setSelectedView={handleViewChange} />
          </div>
          <MonthFilter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
        </div>
      </div>

      <div style={gridContainerStyles}>
        <div style={gridWrapperStyles}>
          <AgGridReact
            ref={gridRef}
            theme={themeCostum}
            rowData={rowData}
            loading={loading}
            columnDefs={currentLevelDef.columnDefs}
            defaultColDef={defaultColDef}
            onRowClicked={handleRowClicked}
            pivotPanelShow="always"
            sideBar={{
              toolPanels: ["columns", "filters"],
              closeToolPanel: false,
            }}
            loadingOverlayComponent={customLoadingOverlay}
            loadingOverlayComponentParams={loadingOverlayComponentParams}
            onColumnPivotModeChanged={onColumnPivotModeChanged}
            onColumnVisible={handleColumnVisible}
            statusBar={statusBar}
            grandTotalRow={"pinnedBottom"}
          />
        </div>
      </div>
    </div>
  );
};
export default DataView;