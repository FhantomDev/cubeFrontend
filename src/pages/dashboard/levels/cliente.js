import { measures, getCommonColumnDefs } from './common';

export const cliente = {
  0: {
    dimensions: ["detalle_factura.nombre_cliente"],
    measures: measures,
    columnDefs: [
      { headerName: "Cliente", field: "detalle_factura.nombre_cliente", valueGetter: p => p.data ? p.data["detalle_factura.nombre_cliente"] : '', enableRowGroup: true, filter: false, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.nombre_cliente",
  },
};

