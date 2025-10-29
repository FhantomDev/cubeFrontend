'use client';
import React, { useState, useMemo, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { themeCostum } from "../../styles/theme";
import Breadcrumb from "../../components/common/Breadcrumb";
import { levelDefs } from "./levelDefs";
import useCubeData from "../../hooks/useCubeData";
import customLoadingOverlay from "../../components/ui/customLoadingOverlay";

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const breadcrumbNameMap = {
  '/categoria': 'Categoria de producto',
};

const GetDatos = () => {
  const gridRef = useRef();
  const [drilldownLevel, setDrilldownLevel] = useState(0);
  const [filters, setFilters] = useState([]);

  const location = useLocation();

  const currentLevelDef = levelDefs[drilldownLevel];

  const query = useMemo(() => ({
    limit: 100,
    dimensions: currentLevelDef.dimensions,
    measures: currentLevelDef.measures,
    filters: filters,
  }), [currentLevelDef, filters]);

  const { data: rowData, loading } = useCubeData(query);

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

  const handleRowClicked = useCallback((event) => {
    const { drillDownField } = currentLevelDef;
    if (drillDownField && levelDefs[drilldownLevel + 1]) {
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
  }, [currentLevelDef, drilldownLevel, filters]);

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
      filter: true,
      resizable: true,
      enablePivot: true,
    }),
    []
  );

  const loadingOverlayComponentParams = useMemo(() => {
    return { loadingMessage: "Un momento por favor..." };
  }, []);

  return (
    <div>
      <Breadcrumb crumbs={crumbs} onDrilldownClick={handleBreadcrumbClick} />
      <div style={{ width: "100%", height: "calc(100vh - 120px)" }}>
        <div style={{ height: "100%", width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            theme={themeCostum}
            rowData={rowData}
            loading={loading}
            columnDefs={currentLevelDef.columnDefs}
            defaultColDef={defaultColDef}
            onRowClicked={handleRowClicked}
            pivotPanelShow="always"
            sideBar={["columns", "filters"]}
            onColumnPivotModeChanged={onColumnPivotModeChanged}
            loadingOverlayComponent={customLoadingOverlay}
            loadingOverlayComponentParams={loadingOverlayComponentParams}
          />
        </div>
      </div>
    </div>
  );
};
export default GetDatos;