import { measures, getCommonColumnDefs } from './common';

export const sku = {
  0: {
    dimensions: ["detalle_factura.sku"],
    measures: measures,
    columnDefs: [
      { headerName: "SKU", field: "detalle_factura.sku", valueGetter: p => p.data ? p.data["detalle_factura.sku"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.sku",
  },
};

