import { measures, getCommonColumnDefs } from './common';

const firstColumn = {
  headerName: "Canal",
  field: "detalle_factura.canal",
  valueGetter: p => p.data ? p.data["detalle_factura.canal"] : '',
  enableRowGroup: true,
  filter: 'agSetColumnFilter',
  width: 200,
  pinned: 'left'
};

export const canal = {
  0: {
    dimensions: ["detalle_factura.canal"],
    measures: measures,
    columnDefs: [
      firstColumn,
      ...getCommonColumnDefs()
    ],
    drillDownField: "detalle_factura.canal",
  },
};

