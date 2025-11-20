import { measures, getCommonColumnDefs } from './common';

export const sociedad = {
  0: {
    dimensions: ["detalle_factura.sociedad"],
    measures: measures,
    columnDefs: [
      { headerName: "Sociedad", field: "detalle_factura.sociedad", valueGetter: p => p.data ? p.data["detalle_factura.sociedad"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.sociedad",
  },
};

