import { measures, getCommonColumnDefs } from './common';

export const dia = {
  0: {
    dimensions: ["detalle_factura.dia"],
    measures: measures,
    columnDefs: [
      { headerName: "Día", field: "detalle_factura.dia", valueGetter: p => p.data ? p.data["detalle_factura.dia"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.dia",
  },
};

