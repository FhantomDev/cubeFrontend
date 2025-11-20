import { measures, getCommonColumnDefs } from './common';

export const origen = {
  0: {
    dimensions: ["detalle_factura.origen_pedido"],
    measures: measures,
    columnDefs: [
      { headerName: "Orígen", field: "detalle_factura.origen_pedido", valueGetter: p => p.data ? p.data["detalle_factura.origen_pedido"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.origen_pedido",
  },
};

