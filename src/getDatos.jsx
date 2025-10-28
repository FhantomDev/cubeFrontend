'use client';
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { themeAlpine } from "ag-grid-community";
import cube from "@cubejs-client/core";
import { themeCostum } from "./colorCustom";
import Breadcrumb from "./components/Breadcrumb";

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const cubeApi = cube(API_KEY, { apiUrl: API_URL });

const breadcrumbNameMap = {
  '/get-datos': 'Categoria de producto',
  '/grid-example': 'Grid de Ejemplo',
};

// --- Definiciones de Niveles de Drilldown ---
const levelDefs = {
  0: {
    dimensions: [
      "main.product_categories_name",
    ],
    measures: ["main.line_items_sum_price", "main.line_items_sum_quantity"],
    columnDefs: [
      { headerName: "Categoría de Producto", valueGetter: p => p.data["main.product_categories_name"], enableRowGroup: true },
      { headerName: "Precio Total", valueGetter: p => p.data["main.line_items_sum_price"], aggFunc: 'sum' },
      { headerName: "Cantidad Total", valueGetter: p => p.data["main.line_items_sum_quantity"], aggFunc: 'sum' },
    ],
    drillDownField: "main.product_categories_name",
  },
  1: {
    dimensions: ["main.products_name"],
    measures: ["main.line_items_sum_price", "main.line_items_sum_quantity"],
    columnDefs: [
      { headerName: "Nombre de Producto", valueGetter: p => p.data["main.products_name"] },
      { headerName: "Precio Total", valueGetter: p => p.data["main.line_items_sum_price"], aggFunc: 'sum' },
      { headerName: "Cantidad Total", valueGetter: p => p.data["main.line_items_sum_quantity"], aggFunc: 'sum' },
    ],
    // No hay más drilldown desde este nivel en este ejemplo
  },
};

const GetDatos = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drilldownLevel, setDrilldownLevel] = useState(0);
  const [filters, setFilters] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const currentLevelDef = levelDefs[drilldownLevel];

  const crumbs = useMemo(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [{ label: 'Inicio', path: '/' }]; // Corregido: Sin drilldownLevel para que navegue
    let currentPath = '';
    pathnames.forEach(name => {
      currentPath += `/${name}`;
      if (breadcrumbNameMap[currentPath]) {
        breadcrumbs.push({ label: breadcrumbNameMap[currentPath], path: currentPath, drilldownLevel: 0 });
      }
    });
    // Añadir breadcrumbs para el drilldown
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

  useEffect(() => {
    setLoading(true);
    const query = {
      limit: 100,
      dimensions: currentLevelDef.dimensions,
      measures: currentLevelDef.measures,
      filters: filters,
    };

    cubeApi
      .load(query)
      .then((resultSet) => {
        setRowData(resultSet.tablePivot());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar datos desde Cube.js:", error);
        setLoading(false);
      });
  }, [drilldownLevel, filters, currentLevelDef]);

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
    }
  }, [currentLevelDef, drilldownLevel, filters]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  return (
    <div>
      <Breadcrumb crumbs={crumbs} onDrilldownClick={handleBreadcrumbClick} />
      <div style={{ width: "100%", height: "calc(100vh - 120px)" }}>
        <div style={{ height: "100%", width: "100%" }}>
          <AgGridReact
            theme={themeCostum}
            rowData={rowData}
            loading={loading}
            columnDefs={currentLevelDef.columnDefs}
            defaultColDef={defaultColDef}
            onRowClicked={handleRowClicked}
          />
        </div>
      </div>
    </div>
  );
};

export default GetDatos;