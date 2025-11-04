const currencyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
});

export const levelDefs = {
  categoria: {
    0: {
      dimensions: ["detalle_factura.categoria"],
      measures: ["detalle_factura.valor_neto_sum", "detalle_factura.costo_estandar_sum"],
      columnDefs: [
        { headerName: "Categoría de Producto", valueGetter: p => p.data ? p.data["detalle_factura.categoria"] : '', enableRowGroup: true },
        { headerName: "Valor Neto", valueGetter: p => p.data ? Number(p.data["detalle_factura.valor_neto_sum"]) : 0, aggFunc: 'sum', enableValue: true, valueFormatter: p => currencyFormatter.format(p.value) },
        { headerName: "Costo Estandar", valueGetter: p => p.data ? Number(p.data["detalle_factura.costo_estandar_sum"]) : 0, aggFunc: 'sum', enableValue: true, valueFormatter: p => currencyFormatter.format(p.value) },
        { headerName: "ID Cliente", valueGetter: p => p.data ? p.data["detalle_factura.id_cliente"] : '', enableRowGroup: true, hide: true, isDynamic: true, dimension: "detalle_factura.id_cliente" },
      ],
      drillDownField: "detalle_factura.categoria",
    },
    1: {
      dimensions: ["detalle_factura.nombre_producto"],
      measures: ["detalle_factura.valor_neto_sum", "detalle_factura.costo_estandar_sum"],
      columnDefs: [
        { headerName: "Nombre de Producto", valueGetter: p => p.data ? p.data["detalle_factura.nombre_producto"] : '', enableRowGroup: true },
        { headerName: "Valor Neto", valueGetter: p => p.data ? Number(p.data["detalle_factura.valor_neto_sum"]) : 0, aggFunc: 'sum', enableValue: true, valueFormatter: p => currencyFormatter.format(p.value) },
        { headerName: "Costo Estandar", valueGetter: p => p.data ? Number(p.data["detalle_factura.costo_estandar_sum"]) : 0, aggFunc: 'sum', enableValue: true, valueFormatter: p => currencyFormatter.format(p.value) },
        { headerName: "ID Cliente", valueGetter: p => p.data ? p.data["detalle_factura.id_cliente"] : '', enableRowGroup: true, hide: true, isDynamic: true, dimension: "detalle_factura.id_cliente" },
      ],
      drillDownField: "detalle_factura.nombre_producto",
    },
  },
  cliente: {
    0: {
      dimensions: ["detalle_factura.id_cliente"],
      measures: ["detalle_factura.valor_neto_sum", "detalle_factura.costo_estandar_sum"],
      columnDefs: [
        { headerName: "ID Cliente", valueGetter: p => p.data ? p.data["detalle_factura.id_cliente"] : '', enableRowGroup: true },
        { headerName: "Valor Neto", valueGetter: p => p.data ? Number(p.data["detalle_factura.valor_neto_sum"]) : 0, aggFunc: 'sum', enableValue: true, valueFormatter: p => currencyFormatter.format(p.value) },
        { headerName: "Costo Estandar", valueGetter: p => p.data ? Number(p.data["detalle_factura.costo_estandar_sum"]) : 0, aggFunc: 'sum', enableValue: true, valueFormatter: p => currencyFormatter.format(p.value) },
      ],
      drillDownField: "detalle_factura.id_cliente",
    },
    1: {
      dimensions: ["detalle_factura.nombre_producto"],
      measures: ["detalle_factura.valor_neto_sum", "detalle_factura.costo_estandar_sum"],
      columnDefs: [
        { headerName: "Nombre de Producto", valueGetter: p => p.data ? p.data["detalle_factura.nombre_producto"] : '', enableRowGroup: true },
        { headerName: "Valor Neto", valueGetter: p => p.data ? Number(p.data["detalle_factura.valor_neto_sum"]) : 0, aggFunc: 'sum', enableValue: true, valueFormatter: p => currencyFormatter.format(p.value) },
        { headerName: "Costo Estandar", valueGetter: p => p.data ? Number(p.data["detalle_factura.costo_estandar_sum"]) : 0, aggFunc: 'sum', enableValue: true, valueFormatter: p => currencyFormatter.format(p.value) },
      ],
    },
  },
};