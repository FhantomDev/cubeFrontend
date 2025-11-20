import { measures, getCommonColumnDefs } from './common';

export const region = {
  0: {
    dimensions: ["detalle_factura.region"],
    measures: measures,
    columnDefs: [
      { headerName: "Región", field: "detalle_factura.region", valueGetter: p => p.data ? p.data["detalle_factura.region"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.region",
  },
};

