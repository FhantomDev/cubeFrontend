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
};

