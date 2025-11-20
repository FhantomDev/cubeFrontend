import { measures, getCommonColumnDefs } from './common';

export const especialidad = {
  0: {
    dimensions: ["detalle_factura.grupo_cliente"],
    measures: measures,
    columnDefs: [
      { headerName: "Especialidad", field: "detalle_factura.grupo_cliente", valueGetter: p => p.data ? p.data["detalle_factura.grupo_cliente"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.grupo_cliente",
  },
};

