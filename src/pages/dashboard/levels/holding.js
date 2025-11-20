import { measures, getCommonColumnDefs } from './common';

export const holding = {
  0: {
    dimensions: ["detalle_factura.nombre_holding"],
    measures: measures,
    columnDefs: [
      { headerName: "Holding", field: "detalle_factura.nombre_holding", valueGetter: p => p.data ? p.data["detalle_factura.nombre_holding"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.nombre_holding",
  },
};

