export const DEFAULT_COLUMNS_SETTINGS = [
  {
    selector: "space_id",
    tooltip: "space_other_name",
    allowOverflow: true,
    sortable: false,
    width: "200px",
  },
  {
    selector: "end_customer",
    allowOverflow: false,
    sortable: false,
    width: "250px",
    // omit: !isReseller,
    omitIfReseller: true,
  },
  {
    selector: "service_name",
    allowOverflow: true,
    sortable: true,
    width: "200px",
  },
  {
    selector: "location_name",
    allowOverflow: true,
    sortable: true,
  },
  {
    selector: "product_name",
    allowOverflow: true,
    sortable: true,
    width: "250px",
  },
  {
    selector: "product_attribute",
    allowOverflow: true,
    sortable: false,
    width: "200px",
  },
  {
    selector: "sales_order_name",
    allowOverflow: true,
    sortable: false,
    width: "200px",
  },
  {
    selector: "qty",
    sortable: true,
    width: "200px",
  },
  {
    selector: "status",
    sortable: true,
    width: "200px",
  },
  {
    selector: "created_by",
    sortable: true,
    width: "200px",
    omit: true,
  },
  {
    selector: "legacy_number",
    sortable: true,
    width: "200px",
  },
  {
    selector: "payment_state",
    sortable: true,
    width: "200px",
  },
  {
    selector: "installed_date",
    sortable: true,
    width: "200px",
  },
  {
    selector: "contract_end_date",
    sortable: true,
    width: "200px",
  },
];
