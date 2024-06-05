import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTablePageReducer } from "../../../../../hooks/useTableReducer";

export const INVENTORY_TABLE = "inventory";

export const useInventoryPageReducer = () => {
  const { t } = useTranslation();
  const INVENTORTY_TABLE_SETTINGS = {
    version: "8524336a-a812-48e7-a0f8-3f9e7006d39a",
    sort: {
      sort: "installed_date",
      sortDir: "desc",
    },
    data: [
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
        reorder: true,
      },
      {
        id: "end_customer",
        allowOverflow: false,
        sortable: false,
        width: "250px",
        // omit: !isReseller,
        omitIfReseller: true,
        selector: (row) => row.end_customer,
        reorder: true,
      },
      {
        id: "service_name",
        allowOverflow: true,
        sortable: true,
        width: "200px",
        selector: (row) => row.service_name,
        reorder: true,
      },
      {
        id: "location_name",
        allowOverflow: true,
        sortable: true,
        selector: (row) => row.location_name,
        reorder: true,
      },
      {
        id: "product_name",
        allowOverflow: true,
        sortable: true,
        width: "250px",
        selector: (row) => row.product_name,
        reorder: true,
      },
      {
        id: "product_attribute",
        allowOverflow: true,
        sortable: false,
        width: "200px",
        selector: (row) => row.product_attribute,
        reorder: true,
      },
      {
        id: "sales_order_name",
        allowOverflow: true,
        sortable: false,
        width: "200px",
        selector: (row) => row.sales_order_name,
        reorder: true,
      },
      {
        id: "qty",
        sortable: true,
        width: "200px",
        selector: (row) => row.qty,
        reorder: true,
      },
      {
        id: "status",
        sortable: true,
        width: "200px",
        selector: (row) => row.status,
        reorder: true,
      },
      {
        id: "created_by",
        sortable: true,
        width: "200px",
        omit: true,
        selector: (row) => row.created_by,
        reorder: true,
      },
      {
        id: "legacy_number",
        sortable: true,
        width: "200px",
        selector: (row) => row.legacy_number,
        reorder: true,
      },
      {
        id: "cs_reference",
        sortable: true,
        width: "200px",
        selector: (row) => row.payment_state,
        reorder: true,
      },
      {
        id: "installed_date",
        sortable: true,
        width: "200px",
        selector: (row) => row.installed_date,
        reorder: true,
      },
      {
        id: "contract_end_date",
        sortable: true,
        width: "200px",
        selector: (row) => (
          <span data-tag="allowRowEvents">{row.contract_end_date}</span>
        ),
        reorder: true,
      },
    ],
  };

  const { state, actions } = useTablePageReducer({
    version: INVENTORTY_TABLE_SETTINGS.version,
    tableName: INVENTORY_TABLE,
    defaultSort: INVENTORTY_TABLE_SETTINGS.sort,
    defaultSettings: INVENTORTY_TABLE_SETTINGS.data.map((s) => ({
      ...s,
      selector: null,
      name: t(`${INVENTORY_TABLE}.${s.id}`),
    })),
    defaultColumnOrder: INVENTORTY_TABLE_SETTINGS.data.map((s) => s.id),
    defaultHiddenColumns: [],
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
      selectors: INVENTORTY_TABLE_SETTINGS.data.map((s) => ({
        id: s.id,
        selector: s.selector,
        sortFunction: (rowA, rowB) => rowA[s.id].localeCompare(rowB[s.id]),
      })),
    },
  });

  return { state, actions };
};
