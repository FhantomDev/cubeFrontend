'use client';
import React, { useState, useEffect, useMemo } from "react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { themeAlpine } from "ag-grid-community";
import cube from "@cubejs-client/core";

// Registrar módulos (Community + Enterprise)
ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

// Variables de entorno (Vite)
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Inicializar Cube.js
const cubeApi = cube(API_KEY, { apiUrl: API_URL });

const GetDatos = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Llamada a la API de Cube.js
  useEffect(() => {
    const query = {
      limit: 100,
      dimensions: ["orders.created_at", "orders.id"],
      measures: ["orders.count"],
      timeDimensions: [
        {
          dimension: "orders.created_at",
          granularity: "month",
        },
      ],
    };

    cubeApi
      .load(query)
      .then((resultSet) => {
        const data = resultSet.tablePivot();
        console.log("Datos de Cube.js:", data);
        setRowData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar datos desde Cube.js:", error);
        setLoading(false);
      });
  }, []);


  const [columnDefs] = useState([
    {
      headerName: "Fecha de Creación",
      valueGetter: (p) => p.data["orders.created_at"],
    },
    { headerName: "ID de Orden", valueGetter: (p) => p.data["orders.id"] },
    { headerName: "Conteo", valueGetter: (p) => p.data["orders.count"] },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: true,
      resizable: true,
      enablePivot: true,
      enableValue: true,
      enableRowGroup: true,
    }),
    []
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "100%" }}>
        <AgGridReact
          theme={themeAlpine}
          rowData={rowData}
          loading={loading}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pivotMode={true}
          sideBar="columns"
          pivotPanelShow="always"
        />
      </div>
    </div>
  );
};

export default GetDatos;
