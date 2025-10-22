'use client';
import React, { useState, useEffect, useMemo } from "react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { themeAlpine } from "ag-grid-community";
import cube from "@cubejs-client/core";
import { themeCostum } from "./colorCustom";

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
      dimensions: [
        "main.created_at",
        "main.product_categories_name",
        "main.products_name",
        "main.status",
        "main.users_city",
        "main.users_company",
        "main.users_gender",
        "main.users_state",
      ],
      measures: ["main.line_items_sum_price", "main.line_items_sum_quantity"],
      filters: [],
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
    { headerName: "Fecha de Creación", valueGetter: (p) => p.data["main.created_at"], enableValue: false },
    { headerName: "Categoría de Producto", valueGetter: (p) => p.data["main.product_categories_name"] },
    { headerName: "Nombre de Producto", valueGetter: (p) => p.data["main.products_name"] },
    { headerName: "Estado", valueGetter: (p) => p.data["main.status"] },
    { headerName: "Ciudad de Usuario", valueGetter: (p) => p.data["main.users_city"] },
    { headerName: "Compañía de Usuario", valueGetter: (p) => p.data["main.users_company"] },
    { headerName: "Género de Usuario", valueGetter: (p) => p.data["main.users_gender"] },
    { headerName: "Estado de Usuario", valueGetter: (p) => p.data["main.users_state"] },
    { headerName: "Precio Total", valueGetter: (p) => Number(p.data["main.line_items_sum_price"]), },
    { headerName: "Cantidad Total", valueGetter: (p) => Number(p.data["main.line_items_sum_quantity"]), },
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
      filter: "agSelectableColumnFilter",
    }),
    []
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "100%" }}>
        <AgGridReact
          theme={themeCostum}
          rowData={rowData}
          loading={loading}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pivotMode={false}
          pivotPanelShow="always"
          sideBar={["columns", "filters-new"]}
          enableFilterHandlers={true}
        />
      </div>
    </div>
  );
};

export default GetDatos;
