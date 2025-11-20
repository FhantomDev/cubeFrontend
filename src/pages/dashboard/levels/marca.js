import { measures, getCommonColumnDefs } from './common';

export const marca = {
  0: {
    dimensions: ["detalle_factura.marca"],
    measures: measures,
    columnDefs: [
      { headerName: "Marca", field: "detalle_factura.marca", valueGetter: p => p.data ? p.data["detalle_factura.marca"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.marca",
  },
};

