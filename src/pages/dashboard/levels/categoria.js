import { measures, getCommonColumnDefs } from './common';

export const categoria = {
  0: {
    dimensions: ["detalle_factura.categoria"],
    measures: measures,
    columnDefs: [
      { headerName: "Categoría", field: "detalle_factura.categoria", valueGetter: p => p.data ? p.data["detalle_factura.categoria"] : '', enableRowGroup: true, filter: false, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.categoria",
  },
  1: {
    dimensions: ["detalle_factura.familia"],
    measures: measures,
    columnDefs: [
      { headerName: "Familia", field: "detalle_factura.familia", valueGetter: p => p.data ? p.data["detalle_factura.familia"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.familia",
  },
  2: {
    dimensions: ["detalle_factura.sub_familia"],
    measures: measures,
    columnDefs: [
      { headerName: "Sub Familia", field: "detalle_factura.sub_familia", valueGetter: p => p.data ? p.data["detalle_factura.sub_familia"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.sub_familia",
  },
  3: {
    dimensions: ["detalle_factura.sku"],
    measures: measures,
    columnDefs: [
      { headerName: "SKUs", field: "detalle_factura.sku", valueGetter: p => p.data ? p.data["detalle_factura.sku"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.sku",
  },
  4: {
    dimensions: ["detalle_factura.nombre_holding"],
    measures: measures,
    columnDefs: [
      { headerName: "Holding", field: "detalle_factura.nombre_holding", valueGetter: p => p.data ? p.data["detalle_factura.nombre_holding"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.nombre_holding",
  },
  5: {
    dimensions: ["detalle_factura.nombre_cliente"],
    measures: measures,
    columnDefs: [
      { headerName: "Cliente", field: "detalle_factura.nombre_cliente", valueGetter: p => p.data ? p.data["detalle_factura.nombre_cliente"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.nombre_cliente",
  },
  6: {
    dimensions: ["detalle_factura.id_sala"],
    measures: measures,
    columnDefs: [
      { headerName: "Sala", field: "detalle_factura.id_sala", valueGetter: p => p.data ? p.data["detalle_factura.id_sala"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.id_sala",
  },
};

