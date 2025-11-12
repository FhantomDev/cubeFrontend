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
import ViewSelector from "../../components/ui/ViewSelector/ViewSelector";
import RappelToggle from "../../components/ui/RappelToggle/RappelToggle";
import MonthFilter from "../../components/ui/MonthFilter/MonthFilter";
import "../../styles/Dashboard.css"; // Import the new CSS file

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const breadcrumbNameMap = {
  '/dashboard': 'Dashboard',
};

const views = [
  { id: 'vendedor', name: 'Asesor' },
  { id: 'categoria', name: 'Categoría' },
  { id: 'centro', name: 'Centro Suministrador' },
  { id: 'cliente', name: 'Cliente' },
  // dia
  { id: 'direccion', name: 'Dirección' },
  { id: 'especialidad', name: 'Especialidad' },
  { id: 'numero_factura', name: 'Factura' },
  { id: 'familia', name: 'Familia' },
  { id: 'gerencia', name: 'Gerencia' },
  { id: 'holding', name: 'Holding' },
  { id: 'jefe_categoria', name: 'Jefe Categoría' },
  { id: 'marca', name: 'Marca' },
  { id: 'region', name: 'Región' },
  { id: 'origen', name: 'Sistema Orígen' },
  { id: 'sociedad', name: 'Sociedad' },
  { id: 'sucursal', name: 'Sucursal' },
  { id: 'um_venta', name: 'Unidad Medida Venta' },
  { id: 'canal', name: 'Canal' },
  { id: 'zona', name: 'Zona' },
];

const DataView = () => {
  const gridRef = useRef();
  const [drilldownLevel, setDrilldownLevel] = useState(0);
  const [filters, setFilters] = useState([]);
  const [selectedView, setSelectedView] = useState('categoria');
  const [dynamicDimensions, setDynamicDimensions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [isRappelActive, setIsRappelActive] = useState(false);

  const location = useLocation();

  const currentLevelDef = levelDefs[selectedView][drilldownLevel];

  const handleViewChange = (viewId) => {
    setSelectedView(viewId);
    setDrilldownLevel(0);
    setFilters([]);
    setDynamicDimensions([]);
  };

  const query = useMemo(() => {
    const monthFilter = selectedMonth.length > 0 ? [{
      member: "detalle_factura.fecha_year_month",
      operator: "in",
      values: selectedMonth
    }] : [];

    const measures = isRappelActive
      ? currentLevelDef.measures.map(m => m === "detalle_factura.valor_neto_sum" ? "detalle_factura.resta_rappel" : m)
      : currentLevelDef.measures;

    return {
      dimensions: [...currentLevelDef.dimensions, ...dynamicDimensions],
      measures: measures,
      filters: [...filters, ...monthFilter],
    };
  }, [currentLevelDef, filters, dynamicDimensions, selectedMonth, isRappelActive]);

  const dynamicColumnDefs = useMemo(() => {
    if (!currentLevelDef) return [];
    return currentLevelDef.columnDefs.map(colDef => {
      if (colDef.field === "detalle_factura.valor_neto_sum") {
        if (isRappelActive) {
          return {
            ...colDef,
            headerName: "Venta (Rappel)",
            field: "detalle_factura.resta_rappel",
            valueGetter: p => p.data ? Number(p.data["detalle_factura.resta_rappel"]) : 0,
          };
        }
        // Return to default if rappel is not active
        return {
          ...colDef,
          headerName: "Venta",
          field: "detalle_factura.valor_neto_sum",
          valueGetter: p => p.data ? Number(p.data["detalle_factura.valor_neto_sum"]) : 0,
        };
      }
      return colDef;
    });
  }, [currentLevelDef, isRappelActive]);

  const { data: rowData, loading } = useCubeData(query, selectedMonth.length > 0);

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

  return (
    <div className="dashboard-container">
      <Breadcrumb crumbs={crumbs} onDrilldownClick={handleBreadcrumbClick} />

      <div className="dashboard-header">
        {drilldownLevel > 0 && (
          <div className="back-button-container">
            <button
              onClick={() => handleBreadcrumbClick(drilldownLevel - 1)}
              className="back-button"
            >
              <span>←</span>
              <span>Volver de: <strong>{filters[filters.length - 1]?.values[0]}</strong></span>
            </button>
          </div>
        )}
        <div className="dashboard-header-content">
          <h1 className="dashboard-title">
            <img src="/logo-icbfs.png" alt="ICB Food Services" className="dashboard-logo" />
            <span>Proyección</span>
          </h1>
          <div className="dashboard-controls">
            <ViewSelector views={views} selectedView={selectedView} setSelectedView={handleViewChange} />
            <MonthFilter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            <RappelToggle onToggle={setIsRappelActive} />
          </div>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-wrapper">
          <AgGridReact
            ref={gridRef}
            theme={themeCostum}
            rowData={rowData}
            loading={loading}
            columnDefs={dynamicColumnDefs}
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
