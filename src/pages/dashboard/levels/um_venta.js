import { measures, getCommonColumnDefs } from './common';

export const um_venta = {
  0: {
    dimensions: ["detalle_factura.um_venta"],
    measures: measures,
    columnDefs: [
      { headerName: "Unidad Medida Venta", field: "detalle_factura.um_venta", valueGetter: p => p.data ? p.data["detalle_factura.um_venta"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.um_venta",
  },
};

