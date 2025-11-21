import { measures, getCommonColumnDefs } from './common';

export const jefe_venta = {
  0: {
    dimensions: ["detalle_factura.jefatura_venta"],
    measures: measures,
    columnDefs: [
      { headerName: "Jefatura Venta", field: "detalle_factura.jefatura_venta", valueGetter: p => p.data ? p.data["detalle_factura.jefatura_venta"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.jefatura_venta",
  },
};

