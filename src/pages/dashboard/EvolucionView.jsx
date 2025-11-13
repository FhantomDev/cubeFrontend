'use client';
import React, { useRef, useCallback } from "react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { themeCostum } from "../../styles/theme";
import Breadcrumb from "../../components/common/Breadcrumb";
import customLoadingOverlay from "../../components/ui/customLoadingOverlay";
import ViewSelector from "../../components/ui/ViewSelector/ViewSelector";
import RappelToggle from "../../components/ui/RappelToggle/RappelToggle";
import MonthFilter from "../../components/ui/MonthFilter/MonthFilter";
import { useDashboard } from "../../hooks/useDashboard";
import { views } from "./dashboardConstants";
import "../../styles/Dashboard.css";

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const ProyeccionView = () => {
  const gridRef = useRef();
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
  } = useDashboard();

  const onColumnPivotModeChanged = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      const isPivotMode = gridRef.current.api.isPivotMode();
      if (!isPivotMode) {
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.setColumnDefs(currentLevelDef.columnDefs);
      }
    }
  }, [rowData, currentLevelDef]);

  return (
    <>
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
            <span>Evolución</span>
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
    </>
  );
};
export default ProyeccionView;
