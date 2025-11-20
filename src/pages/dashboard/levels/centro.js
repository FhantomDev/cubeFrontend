import { measures, getCommonColumnDefs } from './common';

const commonOverrides = {
  "detalle_factura.valor_neto_sum": { width: 110, suppressHeaderMenuButton: true },
  "detalle_factura.ventas_proyeccion": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.precio_unitario": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.peso_neto_sum": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.kilos_proyeccion": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.sku_count": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.margen_unitario": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.margen_porcentaje": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.margen_valor": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.margen_proyeccion": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.producto_foco_valor": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.ratio_sku_cliente": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.combinacion_sku_cliente": { width: 120, suppressHeaderMenuButton: true },
};

export const centro = {
  0: {
    dimensions: ["detalle_factura.centro"],
    measures: measures,
    columnDefs: [
      { headerName: "Centro", field: "detalle_factura.centro", valueGetter: p => p.data ? p.data["detalle_factura.centro"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs(commonOverrides)
    ],
    drillDownField: "detalle_factura.centro",
  },
  1: {
    dimensions: ["detalle_factura.categoria"],
    measures: measures,
    columnDefs: [
      { headerName: "Categoria", field: "detalle_factura.categoria", valueGetter: p => p.data ? p.data["detalle_factura.categoria"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs(commonOverrides)
    ],
    drillDownField: "detalle_factura.categoria",
  },
  2: {
    dimensions: ["detalle_factura.sku"],
    measures: measures,
    columnDefs: [
      { headerName: "SKU", field: "detalle_factura.sku", valueGetter: p => p.data ? p.data["detalle_factura.sku"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs(commonOverrides)
    ],
    drillDownField: "detalle_factura.sku",
  },
  3: {
    dimensions: ["detalle_factura.vendedor"],
    measures: measures,
    columnDefs: [
      { headerName: "Vendedor", field: "detalle_factura.vendedor", valueGetter: p => p.data ? p.data["detalle_factura.vendedor"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs(commonOverrides)
    ],
    drillDownField: "detalle_factura.vendedor",
  },
  4: {
    dimensions: ["detalle_factura.nombre_cliente"],
    measures: measures,
    columnDefs: [
      { headerName: "Cliente", field: "detalle_factura.nombre_cliente", valueGetter: p => p.data ? p.data["detalle_factura.nombre_cliente"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs(commonOverrides)
    ],
    drillDownField: "detalle_factura.nombre_cliente",
  },
  5: {
    dimensions: ["detalle_factura.id_sala"],
    measures: measures,
    columnDefs: [
      { headerName: "Sala", field: "detalle_factura.id_sala", valueGetter: p => p.data ? p.data["detalle_factura.id_sala"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs(commonOverrides)
    ],
    drillDownField: "detalle_factura.id_sala",
  },
};

