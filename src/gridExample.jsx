'use client';
import React, { useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { themeBalham } from "ag-grid-community";

// Registrar los módulos de AG Grid
ModuleRegistry.registerModules([AllCommunityModule]);

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
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  const defaultColDef = { flex: 1, sortable: true, filter: true };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <AgGridReact
        theme={themeBalham}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default GridExample;
