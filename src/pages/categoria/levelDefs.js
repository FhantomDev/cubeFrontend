export const levelDefs = {
  0: {
    dimensions: [
      "main.product_categories_name",
    ],
    measures: ["main.line_items_sum_price", "main.line_items_sum_quantity"],
    columnDefs: [
      { headerName: "Categoría de Producto", valueGetter: p => p.data ? p.data["main.product_categories_name"] : '', enableRowGroup: true },
      { headerName: "Precio Total", valueGetter: p => p.data ? Number(p.data["main.line_items_sum_price"]) : 0, aggFunc: 'sum', enableValue: true },
      { headerName: "Cantidad Total", valueGetter: p => p.data ? Number(p.data["main.line_items_sum_quantity"]) : 0, aggFunc: 'sum', enableValue: true },
    ],
    drillDownField: "main.product_categories_name",
  },
  1: {
    dimensions: ["main.products_name"],
    measures: ["main.line_items_sum_price", "main.line_items_sum_quantity"],
    columnDefs: [
      { headerName: "Nombre de Producto", valueGetter: p => p.data ? p.data["main.products_name"] : '', enableRowGroup: true },
      { headerName: "Precio Total", valueGetter: p => p.data ? Number(p.data["main.line_items_sum_price"]) : 0, aggFunc: 'sum', enableValue: true },
      { headerName: "Cantidad Total", valueGetter: p => p.data ? Number(p.data["main.line_items_sum_quantity"]) : 0, aggFunc: 'sum', enableValue: true },
    ],
    drillDownField: "main.products_name",
  },
  2: {
    dimensions: ["main.users_state"],
    measures: ["main.line_items_sum_price", "main.line_items_sum_quantity"],
    columnDefs: [
      { headerName: "Estados", valueGetter: p => p.data ? p.data["main.users_state"] : '', enableRowGroup: true },
      { headerName: "Precio Total", valueGetter: p => p.data ? Number(p.data["main.line_items_sum_price"]) : 0, aggFunc: 'sum', enableValue: true },
      { headerName: "Cantidad Total", valueGetter: p => p.data ? Number(p.data["main.line_items_sum_quantity"]) : 0, aggFunc: 'sum', enableValue: true },
    ],
  },
};