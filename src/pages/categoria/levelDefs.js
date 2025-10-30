export const levelDefs = {
  0: {
    dimensions: [
      "detalle_factura.categoria",
    ],
    measures: ["detalle_factura.valor_neto_sum", "detalle_factura.costo_estandar_sum"],
    columnDefs: [
      { headerName: "Categoría de Producto", valueGetter: p => p.data ? p.data["detalle_factura.categoria"] : '', enableRowGroup: true },
      { headerName: "Valor Neto", valueGetter: p => p.data ? Number(p.data["detalle_factura.valor_neto_sum"]) : 0, aggFunc: 'sum', enableValue: true },
      { headerName: "Costo Estandar", valueGetter: p => p.data ? Number(p.data["detalle_factura.costo_estandar_sum"]) : 0, aggFunc: 'sum', enableValue: true },
    ],
    drillDownField: "detalle_factura.categoria",
  },
  1: {
    dimensions: ["detalle_factura.nombre_producto"],
    measures: ["detalle_factura.valor_neto_sum", "detalle_factura.costo_estandar_sum"],
    columnDefs: [
      { headerName: "Nombre de Producto", valueGetter: p => p.data ? p.data["detalle_factura.nombre_producto"] : '', enableRowGroup: true },
      { headerName: "Valor Neto", valueGetter: p => p.data ? Number(p.data["detalle_factura.valor_neto_sum"]) : 0, aggFunc: 'sum', enableValue: true },
      { headerName: "Costo Estandar", valueGetter: p => p.data ? Number(p.data["detalle_factura.costo_estandar_sum"]) : 0, aggFunc: 'sum', enableValue: true },
    ],
    drillDownField: "detalle_factura.nombre_producto",
  },
  2: {
    dimensions: ["detalle_factura.id_cliente"],
    measures: ["detalle_factura.valor_neto_sum", "detalle_factura.costo_estandar_sum"],
    columnDefs: [
      { headerName: "ID Cliente", valueGetter: p => p.data ? p.data["detalle_factura.id_cliente"] : '', enableRowGroup: true },
      { headerName: "Valor Neto", valueGetter: p => p.data ? Number(p.data["detalle_factura.valor_neto_sum"]) : 0, aggFunc: 'sum', enableValue: true },
      { headerName: "Costo Estandar", valueGetter: p => p.data ? Number(p.data["detalle_factura.costo_estandar_sum"]) : 0, aggFunc: 'sum', enableValue: true },
    ],
  },
};