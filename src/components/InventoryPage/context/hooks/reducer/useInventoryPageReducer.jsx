import { useTablePageReducer } from "../../../../../hooks/useTableReducer";
import { Tooltip } from "@mui/material";

export const INVENTORY_TABLE = "inventory";

export const useInventoryPageReducer = () => {
  const INVENTORTY_TABLE_SETTINGS = [
    {
      id: "space_id",
      allowOverflow: true,
      sortable: false,
      width: "200px",
      selector: (row) => (
        <Tooltip
          title={row.space_other_name}
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                // color: "purple",
                backgroundColor: "black",
                fontSize: "1em",
              },
            },
          }}
        >
          <span>{row.space_id}</span>
        </Tooltip>
      ),
    },
    {
      id: "end_customer",
      allowOverflow: false,
      sortable: false,
      width: "250px",
      // omit: !isReseller,
      omitIfReseller: true,
      selector: (row) => row.end_customer,
    },
    {
      id: "service_name",
      allowOverflow: true,
      sortable: true,
      width: "200px",
      selector: (row) => row.service_name,
    },
    {
      id: "location_name",
      allowOverflow: true,
      sortable: true,
      selector: (row) => row.location_name,
    },
    {
      id: "product_name",
      allowOverflow: true,
      sortable: true,
      width: "250px",
      selector: (row) => row.product_name,
    },
    {
      id: "product_attribute",
      allowOverflow: true,
      sortable: false,
      width: "200px",
      selector: (row) => row.product_attribute,
    },
    {
      id: "sales_order_name",
      allowOverflow: true,
      sortable: false,
      width: "200px",
      selector: (row) => row.sales_order_name,
    },
    {
      id: "qty",
      sortable: true,
      width: "200px",
      selector: (row) => row.qty,
    },
    {
      id: "status",
      sortable: true,
      width: "200px",
      selector: (row) => row.status,
    },
    {
      id: "created_by",
      sortable: true,
      width: "200px",
      omit: true,
      selector: (row) => row.created_by,
    },
    {
      id: "legacy_number",
      sortable: true,
      width: "200px",
      selector: (row) => row.legacy_number,
    },
    {
      id: "cs_reference",
      sortable: true,
      width: "200px",
      selector: (row) => row.payment_state,
    },
    {
      id: "installed_date",
      sortable: true,
      width: "200px",
      selector: (row) => row.installed_date,
    },
    {
      id: "contract_end_date",
      sortable: true,
      width: "200px",
      selector: (row) => (
        <span data-tag="allowRowEvents">{row.contract_end_date}</span>
      ),
    },
  ];

  const { state, actions } = useTablePageReducer({
    tableName: INVENTORY_TABLE,
    defaultSettings: INVENTORTY_TABLE_SETTINGS.map((s) => ({
      ...s,
      selector: null,
    })),
    extraReducers: {
      setProductCategory: (state, action) => ({
        ...state,
        productCategory: action.payload,
      }),
      setEndCustomer: (state, action) => ({
        ...state,
        endCustomer: action.payload,
      }),
    },
    extraInitialState: {
      sort: {
        sort: "installed_date",
        sortDir: "desc",
      },
      rawFilter: {
        service_name: null,
        location_name: null,
        product_name: null,
        // create_date: null,
        // request_date: null,
        status: ["in service"],
        category: null,
      },
      productCategory: ["CAB", "POW0", "CAG", "OFC", "RMH"],
      endCustomer: [],
      selectors: INVENTORTY_TABLE_SETTINGS.map((s) => ({
        id: s.id,
        selector: s.selector,
      })),
    },
  });

  return { state, actions };
};
