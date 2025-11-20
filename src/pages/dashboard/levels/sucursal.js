import { measures, getCommonColumnDefs } from './common';

export const sucursal = {
  0: {
    dimensions: ["detalle_factura.oficina_ventas"],
    measures: measures,
    columnDefs: [
      { headerName: "Sucursal", field: "detalle_factura.oficina_ventas", valueGetter: p => p.data ? p.data["detalle_factura.oficina_ventas"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.oficina_ventas",
  },
};

