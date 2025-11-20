import { measures, getCommonColumnDefs } from './common';

export const direccion = {
  0: {
    dimensions: ["detalle_factura.id_sala"],
    measures: measures,
    columnDefs: [
      { headerName: "Dirección", field: "detalle_factura.id_sala", valueGetter: p => p.data ? p.data["detalle_factura.id_sala"] : '', enableRowGroup: true, filter: 'agSetColumnFilter', width: 200, pinned: 'left' },
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.id_sala",
  },
};

