import { measures, getCommonColumnDefs } from './common';

export const gerencia = {
  0: {
    dimensions: ["detalle_factura.zona_ventas"],
    measures: measures,
    columnDefs: [
      { headerName: "Gerencia", field: "detalle_factura.zona_ventas", valueGetter: p => p.data ? p.data["detalle_factura.zona_ventas"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.zona_ventas",
  },
};

