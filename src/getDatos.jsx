'use client';
import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { themeAlpine } from "ag-grid-community";
import cube from "@cubejs-client/core";
import { themeCostum } from "./colorCustom";
import Breadcrumb from "./components/Breadcrumb"; // Importar Breadcrumb

// Registrar módulos (Community + Enterprise)
ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

// Variables de entorno (Vite)
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Inicializar Cube.js
const cubeApi = cube(API_KEY, { apiUrl: API_URL });

// Mapeo de rutas a nombres legibles
const breadcrumbNameMap = {
  '/get-datos': 'Datos de Cube.js',
  '/grid-example': 'Grid de Ejemplo',
};

const GetDatos = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Generar crumbs dinámicamente
  const crumbs = useMemo(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [{ label: 'Inicio', path: '/' }];

    let currentPath = '';
    pathnames.forEach(name => {
      currentPath += `/${name}`;
      if (breadcrumbNameMap[currentPath]) {
        breadcrumbs.push({ label: breadcrumbNameMap[currentPath], path: currentPath });
      }
    });

    return breadcrumbs;
  }, [location.pathname]);

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
        setRowData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar datos desde Cube.js:", error);
        setLoading(false);
      });
  }, []);


  const [columnDefs] = useState([
    { headerName: "Categoría de Producto", valueGetter: (p) => p.data ? p.data["main.product_categories_name"] : null, enableValue: false, enableRowGroup: true },
    { headerName: "Fecha de Creación", valueGetter: (p) => p.data ? p.data["main.created_at"] : null, enableValue: false, },
    { headerName: "Nombre de Producto", valueGetter: (p) => p.data ? p.data["main.products_name"] : null, enableValue: false, enableRowGroup: true },
    { headerName: "Estado", valueGetter: (p) => p.data ? p.data["main.status"] : null, enableValue: false },
    { headerName: "Ciudad de Usuario", valueGetter: (p) => p.data ? p.data["main.users_city"] : null, enableValue: false },
    { headerName: "Compañía de Usuario", valueGetter: (p) => p.data ? p.data["main.users_company"] : null, enableValue: false },
    { headerName: "Género de Usuario", valueGetter: (p) => p.data ? p.data["main.users_gender"] : null, enableValue: false },
    { headerName: "Estado de Usuario", valueGetter: (p) => p.data ? p.data["main.users_state"] : null, enableValue: false },
    { headerName: "Precio Total", valueGetter: (p) => p.data ? Number(p.data["main.line_items_sum_price"]) : null, enableValue: true, aggFunc: 'sum' },
    { headerName: "Cantidad Total", valueGetter: (p) => p.data ? Number(p.data["main.line_items_sum_quantity"]) : null, enableValue: true, aggFunc: 'sum' },
  ]);

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


  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent' },
        { statusPanel: 'agTotalRowCountComponent' },
      ]
    };
  }, []);

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />
      <div style={{ width: "100%", height: "calc(100vh - 120px)" }}> {/* Ajuste de altura */}
        <div style={{ height: "100%", width: "100%" }}>
          <AgGridReact
            theme={themeCostum}
            rowData={rowData}
            loading={loading}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pivotMode={false}
            pivotPanelShow="always"
            sideBar={["columns", "filters"]}
            enableFilterHandlers={true}
            statusBar={statusBar}
          />
        </div>
      </div>
    </div>
  );
};

export default GetDatos;