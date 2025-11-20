import { measures, getCommonColumnDefs } from './common';

export const vendedor = {
  0: {
    dimensions: ["detalle_factura.vendedor"],
    measures: measures,
    columnDefs: [
      { headerName: "Vendedor", field: "detalle_factura.vendedor", valueGetter: p => p.data ? p.data["detalle_factura.vendedor"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.vendedor",
  },
};

