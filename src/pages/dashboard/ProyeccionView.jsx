'use client';
import React, { useRef, useCallback, useState } from "react"; // Importar useState
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { themeCostum } from "../../styles/theme";
import Breadcrumb from "../../components/common/Breadcrumb";
import customLoadingOverlay from "../../components/ui/customLoadingOverlay";
import ViewSelector from "../../components/ui/ViewSelector/ViewSelector";
import RappelToggle from "../../components/ui/RappelToggle/RappelToggle";
import MonthFilter from "../../components/ui/MonthFilter/MonthFilter";
import SocietyFilter from "../../components/ui/SocietyFilter/SocietyFilter"; // Importar SocietyFilter
import { useProyeccion } from "../../hooks/useProyeccion";
import { views } from "./dashboardConstants";
import "../../styles/Dashboard.css";

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const ProyeccionView = () => {
  const gridRef = useRef();

  // Estado local para el filtro de sociedad
  const [selectedSociety, setSelectedSociety] = useState('all');

  const {
    drilldownLevel,
    filters,
    selectedView,
    selectedMonth,
    setIsRappelActive,
    handleViewChange,
    setSelectedMonth,
    rowData,
    loading,
    dynamicColumnDefs,
    defaultColDef,
    handleRowClicked,
    handleColumnVisible,
    statusBar,
    loadingOverlayComponentParams,
    crumbs,
    handleBreadcrumbClick,
    currentLevelDef,
    pinnedTopRowData,
  } = useProyeccion(selectedSociety);

  const handleSocietyChange = (newSociety) => {
    setSelectedSociety(newSociety);

    console.log('Sociedad seleccionada en ProyeccionView:', newSociety);
  };

  const onColumnPivotModeChanged = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      const isPivotMode = gridRef.current.api.isPivotMode();
      if (!isPivotMode) {
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.setColumnDefs(currentLevelDef.columnDefs);
      }
    }
  }, [rowData, currentLevelDef]);

  const getRowStyle = params => {
    if (params.node.isRowPinned()) {
      return { 'font-weight': '650', 'background-color': '#ebebebff' };
    }
  };

  return (
    <>

      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-logo">
            <img src="/logo-icbfs.png" alt="ICB Food Services" className="dashboard-logo" />
          </div>
          <div className="dashboard-controls">
            {/* SocietyFilter integrado aquí */}
            <ViewSelector views={views} selectedView={selectedView} setSelectedView={handleViewChange} />
            <MonthFilter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            <SocietyFilter
              selectedSociety={selectedSociety}
              onSocietyChange={handleSocietyChange}
            />
            <RappelToggle onToggle={setIsRappelActive} />
          </div>
        </div>
      </div>

      <Breadcrumb crumbs={crumbs} onDrilldownClick={handleBreadcrumbClick} />

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
            loadingOverlayComponent={customLoadingOverlay}
            loadingOverlayComponentParams={loadingOverlayComponentParams}
            onColumnPivotModeChanged={onColumnPivotModeChanged}
            onColumnVisible={handleColumnVisible}
            statusBar={statusBar}
            pinnedTopRowData={pinnedTopRowData}
            getRowStyle={getRowStyle}
          />
        </div>
      </div>
    </>
  );
};
export default ProyeccionView;
