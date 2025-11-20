import { measures, getCommonColumnDefs } from './common';

export const familia = {
  0: {
    dimensions: ["detalle_factura.familia"],
    measures: measures,
    columnDefs: [
      { headerName: "Familia", field: "detalle_factura.familia", valueGetter: p => p.data ? p.data["detalle_factura.familia"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.familia",
  },
};

