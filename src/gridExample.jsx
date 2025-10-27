// src/GridExample.jsx
'use client';
import React, { useState } from "react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise"; // requiere ag-grid-enterprise instalado
import { AgGridReact } from "ag-grid-react";
import { themeAlpine } from "ag-grid-community";
import Breadcrumb from "./components/Breadcrumb"; // Importar el componente

// registrar módulos (community + enterprise)
ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const GridExample = () => {
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  const [colDefs] = useState([
    { field: "make", rowGroup: true, enableRowGroup: true, enablePivot: true },     // row group
    { field: "model", enableRowGroup: true, enablePivot: true, },                   // opcional
    { field: "price", aggFunc: "sum", enableValue: true, enablePivot: true },
    { field: "electric", pivot: true, enablePivot: true, enablePivot: true },
  ]);

  const defaultColDef = { flex: 1, sortable: true, filter: true, resizable: true };

  // Datos de ejemplo para el breadcrumb
  const [crumbs, setCrumbs] = useState([
    { label: "Inicio", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Grid Example", path: "/dashboard/grid-example" },
  ]);

  // Simula la navegación
  const handleNavigate = (path) => {
    console.log(`Navegando a: ${path}`);
    // En una app real, aquí usarías tu router para cambiar de página
    // y actualizarías el estado de `crumbs` según la nueva ruta.
  };


  return (
    <div>
      <Breadcrumb crumbs={crumbs} onNavigate={handleNavigate} />
      <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
        <AgGridReact
          theme={themeAlpine}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          sideBar={true}        // panel lateral para arrastrar columnas
          pivotMode={true}      // activa pivot
          pivotPanelShow={'always'} // opcional: mostrar panel pivot siempre
        />
      </div>
    </div>
  );
};

export default GridExample;