import { measures, getCommonColumnDefs } from './common';

const commonOverrides = {
  "detalle_factura.valor_neto_sum": { width: 110, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.ventas_proyeccion": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.precio_unitario": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.peso_neto_sum": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.kilos_proyeccion": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.sku_count": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.margen_unitario": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.margen_porcentaje": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.margen_valor": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.margen_proyeccion": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.producto_foco_valor": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.ratio_sku_cliente": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
  "detalle_factura.combinacion_sku_cliente": { flex: 1, suppressHeaderMenuButton: true, type: 'rightAligned' },
};

export const categoria = {
  0: {
    dimensions: ["detalle_factura.categoria"],
    measures: measures,
    columnDefs: [
      { headerName: "Categoría", field: "detalle_factura.categoria", valueGetter: p => p.data ? p.data["detalle_factura.categoria"] : '', enableRowGroup: true, filter: false, width: 170, pinned: 'left' },
      ...getCommonColumnDefs(commonOverrides)
    ],
    drillDownField: "detalle_factura.categoria",
  },
  1: {
    dimensions: ["detalle_factura.familia"],
    measures: measures,
    columnDefs: [
      { headerName: "Familia", field: "detalle_factura.familia", valueGetter: p => p.data ? p.data["detalle_factura.familia"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs({
        ...commonOverrides,
        "detalle_factura.ratio_sku_cliente": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
        "detalle_factura.combinacion_sku_cliente": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
      })
    ],
    drillDownField: "detalle_factura.familia",
  },
  2: {
    dimensions: ["detalle_factura.sub_familia"],
    measures: measures,
    columnDefs: [
      { headerName: "Sub Familia", field: "detalle_factura.sub_familia", valueGetter: p => p.data ? p.data["detalle_factura.sub_familia"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs({
        ...commonOverrides,
        "detalle_factura.combinacion_sku_cliente": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
      })
    ],
    drillDownField: "detalle_factura.sub_familia",
  },
  3: {
    dimensions: ["detalle_factura.sku"],
    measures: measures,
    columnDefs: [
      { headerName: "SKUs", field: "detalle_factura.sku", valueGetter: p => p.data ? p.data["detalle_factura.sku"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs({
        ...commonOverrides,
        "detalle_factura.combinacion_sku_cliente": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
      })
    ],
    drillDownField: "detalle_factura.sku",
  },
  4: {
    dimensions: ["detalle_factura.nombre_holding"],
    measures: measures,
    columnDefs: [
      { headerName: "Holding", field: "detalle_factura.nombre_holding", valueGetter: p => p.data ? p.data["detalle_factura.nombre_holding"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs({
        ...commonOverrides,
        "detalle_factura.combinacion_sku_cliente": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
      })
    ],
    drillDownField: "detalle_factura.nombre_holding",
  },
  5: {
    dimensions: ["detalle_factura.nombre_cliente"],
    measures: measures,
    columnDefs: [
      { headerName: "Cliente", field: "detalle_factura.nombre_cliente", valueGetter: p => p.data ? p.data["detalle_factura.nombre_cliente"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs({
        ...commonOverrides,
        "detalle_factura.combinacion_sku_cliente": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
      })
    ],
    drillDownField: "detalle_factura.nombre_cliente",
  },
  6: {
    dimensions: ["detalle_factura.id_sala"],
    measures: measures,
    columnDefs: [
      { headerName: "Sala", field: "detalle_factura.id_sala", valueGetter: p => p.data ? p.data["detalle_factura.id_sala"] : '', enableRowGroup: true, width: 170, pinned: 'left' },
      ...getCommonColumnDefs({
        ...commonOverrides,
        "detalle_factura.combinacion_sku_cliente": { width: 120, suppressHeaderMenuButton: true, type: 'rightAligned' },
      })
    ],
    drillDownField: "detalle_factura.id_sala",
  },
};

