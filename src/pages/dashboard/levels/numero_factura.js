import { measures, getCommonColumnDefs } from './common';

export const numero_factura = {
  0: {
    dimensions: ["detalle_factura.numero_factura_view"],
    measures: measures,
    columnDefs: [
      { headerName: "Factura", field: "detalle_factura.numero_factura_view", valueGetter: p => p.data ? p.data["detalle_factura.numero_factura_view"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.numero_factura_view",
  },
};

