import { measures, getCommonColumnDefs } from './common';

export const jefe_categoria = {
  0: {
    dimensions: ["detalle_factura.jefe_categoria"],
    measures: measures,
    columnDefs: [
      { headerName: "Jefe Categoria", field: "detalle_factura.jefe_categoria", valueGetter: p => p.data ? p.data["detalle_factura.jefe_categoria"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.jefe_categoria",
  },
};

