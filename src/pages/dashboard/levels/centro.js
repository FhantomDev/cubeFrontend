import { measures, getCommonColumnDefs } from './common';

export const centro = {
  0: {
    dimensions: ["detalle_factura.centro"],
    measures: measures,
    columnDefs: [
      { headerName: "Centro", field: "detalle_factura.centro", valueGetter: p => p.data ? p.data["detalle_factura.centro"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.centro",
  },
  1: {
    dimensions: ["detalle_factura.categoria"],
    measures: measures,
    columnDefs: [
      { headerName: "Categoria", field: "detalle_factura.categoria", valueGetter: p => p.data ? p.data["detalle_factura.categoria"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.categoria",
  },
  2: {
    dimensions: ["detalle_factura.sku"],
    measures: measures,
    columnDefs: [
      { headerName: "SKU", field: "detalle_factura.sku", valueGetter: p => p.data ? p.data["detalle_factura.sku"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.sku",
  },
  3: {
    dimensions: ["detalle_factura.vendedor"],
    measures: measures,
    columnDefs: [
      { headerName: "Vendedor", field: "detalle_factura.vendedor", valueGetter: p => p.data ? p.data["detalle_factura.vendedor"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.vendedor",
  },
  4: {
    dimensions: ["detalle_factura.nombre_cliente"],
    measures: measures,
    columnDefs: [
      { headerName: "Cliente", field: "detalle_factura.nombre_cliente", valueGetter: p => p.data ? p.data["detalle_factura.nombre_cliente"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.nombre_cliente",
  },
  5: {
    dimensions: ["detalle_factura.id_sala"],
    measures: measures,
    columnDefs: [
      { headerName: "Sala", field: "detalle_factura.id_sala", valueGetter: p => p.data ? p.data["detalle_factura.id_sala"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.id_sala",
  },
};

