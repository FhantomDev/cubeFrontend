import { measures, getCommonColumnDefs } from './common';

const commonOverrides = {
  "detalle_factura.valor_neto_sum": { width: 110, suppressHeaderMenuButton: true },
  "detalle_factura.ventas_proyeccion": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.precio_unitario": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.peso_neto_sum": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.kilos_proyeccion": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.sku_count": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.margen_unitario": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.margen_porcentaje": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.margen_valor": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.margen_proyeccion": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.producto_foco_valor": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.ratio_sku_cliente": { width: 120, suppressHeaderMenuButton: true },
  "detalle_factura.combinacion_sku_cliente": { width: 120, suppressHeaderMenuButton: true },
};

export const cliente = {
  0: {
    dimensions: ["detalle_factura.nombre_cliente"],
    measures: measures,
    columnDefs: [
      { headerName: "Cliente", field: "detalle_factura.nombre_cliente", valueGetter: p => p.data ? p.data["detalle_factura.nombre_cliente"] : '', enableRowGroup: true, filter: false, width: 170, pinned: 'left' },
      ...getCommonColumnDefs(commonOverrides)
    ],
    drillDownField: "detalle_factura.nombre_cliente",
  },
};

